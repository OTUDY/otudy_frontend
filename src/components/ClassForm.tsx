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

interface AddClassFormProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
}

const ClassForm: React.FC<AddClassFormProps> = ({ open, onClose, isEdit }) => {
  const [className, setClassName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [description, setDescription] = useState("");
  const [cookie] = useCookies(['access_token'])

  const handleCreate = async () => {
    // Handle create action
    console.log("Class Name:", className);
    console.log("Class Level:", classLevel);
    console.log("Description:", description);
    
    const okStatus: Number[] = [200, 201, 202];

    const body = {
      'class_name': className,
      'level': classLevel,
      'class_desc': description
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie.access_token}`
    };
    if (!isEdit) {
      const response = await axios.post(
        'https://backend.otudy.co/api/v1/class/create_class', 
        body, 
        {
        headers: headers
      });
      if (!(okStatus.includes(response.status))) {
        console.error('Error: Something gone wrong.')
        // Show modal here
      }
    }
    else {
      const response = await axios.put(
        'https://backend.otudy.co/api/v1/class/update_class_detail', 
        body, 
        {
        headers: headers
      });
      if (!(okStatus.includes(response.status))) {
        console.error('Error: Something gone wrong');
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
