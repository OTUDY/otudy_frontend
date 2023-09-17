import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

interface AddClassFormProps {
  open: boolean;
  onClose: () => void;
}

const StudentClassForm: React.FC<AddClassFormProps> = ({ open, onClose }) => {
  const [studentId, setstudentId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const handleCreate = () => {
    // Handle create action
    console.log("StudentId:", studentId);
    console.log("FirstName:", firstName);
    console.log("LastName:", lastName);
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Class</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Class Name"
            value={studentId}
            onChange={(e) => setstudentId(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Class Level"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="lastName"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
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
