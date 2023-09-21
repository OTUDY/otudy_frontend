import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useCookies } from "react-cookie";

interface AddMissionFormProps {
  open: boolean;
  onClose: () => void;
  classId: any;
  isEdit: boolean;
}

const MissionForm: React.FC<AddMissionFormProps> = ({ open, onClose, classId, isEdit }) => {
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [rewardPoints, setRewardPoints] = useState(0);
  const [activeStatus, setActiveStatus] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [cookie] = useCookies(['access_token']);
  const [toSendTitle, setToSendTitle] = useState('');

  const handleCreate = async () => {
    const tagsToSendCreate: string[] = [];
    const tagsSplitted = tagsInput.split(', ');
    tagsSplitted.forEach((currentItem) => {
      tagsToSendCreate.push(currentItem);
    })
    if (!(missionTitle.includes(classId))) {
      setToSendTitle(classId + " " + missionTitle);
    }
    else {
      setToSendTitle(missionTitle);
    }
    const body = {
      mission_name: toSendTitle,
      mission_desc: missionDescription,
      mission_points: rewardPoints,
      mission_active_status: activeStatus,
      mission_class_id: classId,
      mission_expired_date: dueDate,
      tags: tagsToSendCreate
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.access_token}`,
    };

    if (!isEdit) {
      const response = await axios.post(
        "https://backend.otudy.co/api/v1/mission/create_mission",
        body,
        {
          headers: headers,
        }
      );
      console.log(response.data);
      if (!(response.status == 200 || response.status == 201 || response.status == 202)) {
        // show false modal here
      }
    }
    else {
      const response = await axios.put(
        'https://backend.otudy.co/api/v1/mission/update_mission_detail', body, { headers: headers }
      )
      if (response.status == 200 || response.status == 201 || response.status == 202) {
        console.log(response.data);
      }
      else {
        //show false modal here
      }
    }


    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create new mission</DialogTitle>
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
            label="Reward points"
            value={rewardPoints}
            onChange={(e) => setRewardPoints(parseInt(e.target.value))}
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
            label="Active Status"
            value={activeStatus}
            onChange={(e) => setActiveStatus(Boolean(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value as string)}
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
          Create / Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissionForm;
