import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";

interface RewardFormProps {
  open: boolean;
  onClose: () => void;
}

const RewardForm: React.FC<RewardFormProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [point, setPoint] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  //const navigate = useNavigate();

  const handleCreate = () => {
    console.log("Title:", title);
    console.log("Point:", point);
    console.log("Description:", description);
    console.log("Amount:", amount);
    console.log("ExpiredDate:", expiredDate);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Reward</DialogTitle>
      <DialogContent>
        <form>
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
            onChange={(e) => setPoint(e.target.value)}
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
            onChange={(e) => setAmount(e.target.value)}
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
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RewardForm;
