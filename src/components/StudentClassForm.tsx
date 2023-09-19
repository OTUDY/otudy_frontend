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
//import { useNavigate } from "react-router-dom";

interface AddClassFormProps {
  open: boolean;
  onClose: () => void;
}

const StudentClassForm: React.FC<AddClassFormProps> = ({ open, onClose }) => {
  const [studentId, setstudentId] = useState("");
  const [classId, setClassId] = useState("");
  //const navigate = useNavigate();

  const handleCreate = async() => {
    // Handle create action
    console.log("StudentId:", studentId);

    const studentIdEncoded = encodeURIComponent(studentId);
    const classIdEncoded = encodeURIComponent(classId);
    const response = await axios.get(
      `https://backend.otudy.co/api/v1/class/add_student?_class=${classIdEncoded}&student_username=${studentIdEncoded}`,
      {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log(response.data);
    //navigate(`/class/${classIdEncoded}`, { replace: true })
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Student ID"
            value={studentId}
            onChange={(e) => setstudentId(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </form>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
      >
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentClassForm;
