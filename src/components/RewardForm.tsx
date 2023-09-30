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
//import axios from "axios";
//import { useNavigate } from "react-router-dom";

interface RewardFormProps {
  open: boolean;
  onClose: () => void;
  classId: string;
  isEdit: boolean;
  data: any;
}

const RewardForm: React.FC<RewardFormProps> = ({ open, onClose, classId, isEdit, data }) => {
  const [title, setTitle] = useState(data.name);
  const [point, setPoint] = useState(data.spentPoints);
  const [description, setDescription] = useState(data.description);
  const [amount, setAmount] = useState(data.slotsAmount);
  const [expiredDate, setExpiredDate] = useState(data.expiredDate);
  const [cookie] = useCookies(['access_token']);


  const handleCreateAndEdit = async() => {
    console.log("Title:", title);
    console.log("Point:", point);
    console.log("Description:", description);
    console.log("Amount:", amount);
    console.log("ExpiredDate:", expiredDate);

    if (isEdit) {
      
      const body = {
        reward_id: data.id,
        reward_name: title,
        reward_desc: description,
        reward_pic: '',
        reward_spent_points: point,
        expired_date: expiredDate,
        class_id: classId,
        amount: amount
      };
      const url = `http://localhost:8000/api/v1/reward/update_reward_detail`;
      const response = await axios.put(url, body, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${cookie.access_token}`
        }
      })
    
    if (response.status == 200 || response.status == 201 || response.status == 202) {
      console.log('Successfully editted');
    }
    else {
      console.error('Error: Something gone wrong.');
      //show modal here
    }
  } else {
    const body = {
      reward_name: title,
      reward_desc: description,
      reward_pic: '',
      reward_spent_points: point,
      expired_date: expiredDate,
      class_id: classId,
      amount: amount
    };
    const url = `https://backend.otudy.co/api/v1/reward/create_reward`;
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${cookie.access_token}`
        }
      })
    
    if (response.status == 200 || response.status == 201 || response.status == 202) {
      console.log('Successfully created.');
    }
    else {
      console.error('Error: Something gone wrong.');
      //show modal here
    }
  }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit? 'Edit Reward Detail': 'Create a Reward'}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="id"
            value={data['id']}
            fullWidth
            sx={{ marginBottom: 2 }}
            disabled={true}
          />
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Point to Redeem"
            value={point}
            onChange={(e) => setPoint(Number(e.target.value))}
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
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Expired Date"
            value={expiredDate}
            onChange={(e) => setExpiredDate(e.target.value)}
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
        <Button onClick={handleCreateAndEdit} color="primary">
          {isEdit? "Edit": "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RewardForm;
