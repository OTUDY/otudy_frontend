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

interface AddMissionFormProps {
  open: boolean;
  onClose: () => void;
}

const MissionForm: React.FC<AddMissionFormProps> = ({ open, onClose }) => {
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreate = async () => {
    // Handle create action
    console.log("Class Name:", missionTitle);
    console.log("Class Level:", missionDescription);
    console.log("Description:", dueDate);

    const body = {
      class_name: missionTitle,
      level: missionDescription,
      class_desc: dueDate,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const response = await axios.post(
      "https://backend.otudy.co/api/v1/class/create_class",
      body,
      {
        headers: headers,
      }
    );

    console.log(response.data);
    window.location.reload();

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Class</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Title"
            value={missionTitle}
            onChange={(e) => setMissionTitle(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            value={missionDescription}
            onChange={(e) => setMissionDescription(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Due Date (optional)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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

export default MissionForm;
