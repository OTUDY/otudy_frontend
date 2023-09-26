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
import axios from "axios";
import { useCookies } from "react-cookie";

interface AddClassFormProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
}

const ClassForm: React.FC<AddClassFormProps> = ({ open, onClose, isEdit }) => {
  const [className, setClassName] = useState("");
  const [classLevel, setClassLevel] = useState("class");
  const [description, setDescription] = useState("");
  const [cookie] = useCookies(["access_token"]);

  const handleClassLevelChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setClassLevel(event.target.value); // Update the selected class level
  };

  const handleCreate = async () => {
    // Handle create action
    console.log("Class Name:", className);
    console.log("Class Level:", classLevel);
    console.log("Description:", description);

    const okStatus: Number[] = [200, 201, 202];

    const body = {
      class_name: className,
      level: classLevel,
      class_desc: description,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.access_token}`,
    };
    if (!isEdit) {
      const response = await axios.post(
        "https://backend.otudy.co/api/v1/class/create_class",
        body,
        {
          headers: headers,
        }
      );
      if (!okStatus.includes(response.status)) {
        console.error("Error: Something gone wrong.");
        // Show modal here
      }
    } else {
      const response = await axios.put(
        "https://backend.otudy.co/api/v1/class/update_class_detail",
        body,
        {
          headers: headers,
        }
      );
      if (!okStatus.includes(response.status)) {
        console.error("Error: Something gone wrong");
        // show modal here
      }
    }

    onClose(); // Close the dialog
  };

  // const handleEdit = async() => {
  //   const body = {
  //     'class_name': className,
  //     'level': classLevel,
  //     'class_desc': description
  //   };
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   };

  //   const response = await axios.put(
  //     'https://backend.otudy.co/api/v1/class/update_class_detail',
  //     body,
  //     {
  //     headers: headers
  //   });

  //   console.log(response.data);
  //   window.location.reload();

  //   onClose();
  // }

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
          <Select
            label="Class Level"
            value={classLevel}
            onChange={handleClassLevelChange}
            fullWidth
            renderValue={(value) => (!value ? value : "Select Class Level")}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem disabled value="">
              <em>Please select a class level</em>
            </MenuItem>
            <MenuItem value="อนุบาล">อนุบาล</MenuItem>
            <MenuItem value="ประถมต้น">ประถมต้น</MenuItem>
            <MenuItem value="ประถมปลาย">ประถมปลาย</MenuItem>
            <MenuItem value="มัธยมต้น">มัธยมต้น</MenuItem>
            <MenuItem value="มัธยมปลาย">มัธยมปลาย</MenuItem>
          </Select>
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
        <Button
          onClick={handleCreate}
          color="primary"
          variant="contained"
          sx={{ minWidth: "100px" }}
          disabled={!className || classLevel == "class" || !description}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassForm;
