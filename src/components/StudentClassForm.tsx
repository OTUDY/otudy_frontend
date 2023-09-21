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
//import { useNavigate } from "react-router-dom";

interface AddClassFormProps {
  open: boolean;
  onClose: () => void;
  classId: string
}

const StudentClassForm: React.FC<AddClassFormProps> = ({ open, onClose, classId }) => {
  const [studentId, setstudentId] = useState("");
  const [cookie] = useCookies(['access_token']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //const navigate = useNavigate();

  const handleCreate = async() => {

    const response = await axios.post(
      `https://backend.otudy.co/api/v1/class/add_student`, {
        username: studentId,
        fname: firstName,
        surname: lastName,
        class_id: classId
      },
      {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${cookie.access_token}`
        }
      }
    );
    console.log(response.data);
    if (!(response.status == 200 || response.status == 201 || response.status == 202)) {
      //show false modal here
      
    }
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
