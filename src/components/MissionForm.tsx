import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
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

const MissionForm: React.FC<AddMissionFormProps> = ({
  open,
  onClose,
  classId,
  isEdit,
}) => {
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [rewardPoints, setRewardPoints] = useState(0);
  let activeStatus = true;
  const [tagsInput, setTagsInput] = useState("Tags");
  const [cookie] = useCookies(["access_token"]);

  const handleTagsChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTagsInput(event.target.value); // Update the selected class level
  };

  const handleCreateAndEdit = async () => {
    const tagsToSendCreate: string[] = [];
    const tagsSplitted = tagsInput.split(", ");
    tagsSplitted.forEach((currentItem) => {
      tagsToSendCreate.push(currentItem);
    });

    const body = {
      mission_name: missionTitle,
      mission_desc: missionDescription,
      mission_points: rewardPoints,
      mission_active_status: activeStatus,
      mission_class_id: classId,
      mission_expired_date: dueDate,
      tags: tagsToSendCreate,
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
      if (
        !(
          response.status == 200 ||
          response.status == 201 ||
          response.status == 202
        )
      ) {
        // show false modal here
      }
    } else {
      const response = await axios.put(
        "https://backend.otudy.co/api/v1/mission/update_mission_detail",
        body,
        { headers: headers }
      );
      if (
        response.status == 200 ||
        response.status == 201 ||
        response.status == 202
      ) {
        console.log(response.data);
      } else {
        //show false modal here
      }
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create new mission</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Mission Name"
            value={missionTitle}
            onChange={(e) => setMissionTitle(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Reward points"
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
          {/* <TextField
            label="Active Status"
            value={activeStatus}
            onChange={(e) => setActiveStatus(Boolean(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          /> */}
          <TextField
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Select
            label="Tags"
            value={tagsInput}
            onChange={handleTagsChange}
            fullWidth
            renderValue={(value) => (!value ? value : "Select Tag")}
            sx={{ marginBottom: 2, width: "100%" }}
          >
            <MenuItem value="active">Tags 1</MenuItem>
            <MenuItem value="inactive">Tags 2</MenuItem>
          </Select>
        </form>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
      >
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateAndEdit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissionForm;
