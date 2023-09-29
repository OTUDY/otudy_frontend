import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface AddClassFormProps {
  open: boolean;
  onClose: () => void;
  classId: any;
  isEdit: boolean;
}

const StudentClassForm: React.FC<AddClassFormProps> = ({
  open,
  onClose,
  classId,
  isEdit,
}) => {
  const [studentId, setstudentId] = useState(0);
  const [cookies] = useCookies(["access_token", 'currentStudentId']);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  //const navigate = useNavigate();

  const handleCreateAndEdit = async () => {
    // CREATE LOGIC
    if (!isEdit) {
      const response = await axios.post(
        `https://backend.otudy.co/api/v1/class/add_student`,
        {
          fname: firstName,
          surname: lastName,
          class_id: classId,
          inclass_id: studentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      console.log(response.data);
      if (
        !(
          response.status == 200 ||
          response.status == 201 ||
          response.status == 202
        )
      ) {
        //show false modal here
      }
    }
    // EDIT LOGIC
    else {
      const response = await axios.put('https://backend.otudy.co/api/v1/class/edit_student_detail', {
        original_id: cookies.currentStudentId,
        firstname: firstName,
        lastname: lastName,
        inclass_no: studentId,
        class_id: classId as string
      },{
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      });
      if (response.status == 200) {
        // show sucess modal here
        console.log(response.data);
      } else {
        console.error(response.data);
      }
    }
    onClose(); // Close the dialog
    navigate(`/class/${encodeURIComponent(classId)}`);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? "Edit" : "Add"} student</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="No. "
            value={studentId}
            onChange={(e) => setstudentId(Number(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
          marginRight: 2,
          marginLeft: 2,
        }}
      >
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        {isEdit ? (
          <Button
            onClick={handleCreateAndEdit}
            color="primary"
            variant="contained"
            sx={{ minWidth: "100px" }}
            disabled={!studentId || firstName == "class" || !lastName}
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={handleCreateAndEdit}
            color="primary"
            variant="contained"
            sx={{ minWidth: "100px" }}
            disabled={!studentId || firstName == "class" || !lastName}
          >
            Add
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StudentClassForm;
