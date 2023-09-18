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
// import { useNavigate } from "react-router-dom";

interface AddClassFormProps {
  open: boolean;
  onClose: () => void;
}

const ClassForm: React.FC<AddClassFormProps> = ({ open, onClose }) => {
  const [className, setClassName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    // Handle create action
    console.log("Class Name:", className);
    console.log("Class Level:", classLevel);
    console.log("Description:", description);

    const body = {
      'class_name': className,
      'level': classLevel,
      'class_desc': description
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    const response = await axios.post(
      'https://backend.otudy.co/api/v1/class/create_class', 
      body, 
      {
      headers: headers
    });

    console.log(response.data);
    window.location.reload();

    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Class</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Class Level"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default ClassForm;
