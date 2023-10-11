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
import * as Swal from 'sweetalert2';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";

interface RewardFormProps {
  open: boolean;
  onClose: () => void;
  classId: string;
  isEdit: boolean;
  data: any;
  reload: () => void;
}

const RewardForm: React.FC<RewardFormProps> = ({ open, onClose, classId, isEdit, data, reload }) => {
  const [title, setTitle] = useState(data.name);
  const [point, setPoint] = useState(data.spentPoints);
  const [description, setDescription] = useState(data.description);
  const [amount, setAmount] = useState(data.slotsAmount);
  const [expiredDate, setExpiredDate] = useState(data.expiredDate === ''? dayjs((new Date()).toString()): dayjs(data.expiredDate));
  const [cookie] = useCookies(['access_token']);


  const handleCreateAndEdit = async() => {
    console.log("Title:", title);
    console.log("Point:", point);
    console.log("Description:", description);
    console.log("Amount:", amount);
    console.log("ExpiredDate:", expiredDate);

    if (isEdit) {
      onClose();
      const result = await Swal.default.fire({
        title: `ต้องการแก้ไขรางวัลใช่หรือไม่`,
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'แก้ไข'
      })
      if (result.isConfirmed) {
        if (expiredDate as any <= new Date()) {
          Swal.default.fire({
            icon: 'error',
            title: 'แก้ไขไม่สำเร็จ',
            text: 'วันหมดอายุของรางวัลต้องมากกว่าวันปัจจุบันอย่างน้อย 1 วัน'
          })
          return;
        }
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
        const url = `https://backend.otudy.co/api/v1/reward/update_reward_detail`;
        const response = await axios.put(url, body, {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${cookie.access_token}`
          }
        })
      
      if (response.status == 200 || response.status == 201 || response.status == 202) {
        console.log('Successfully editted');
        Swal.default.fire({
          icon: 'success',
          title: 'แก้ไขสำเร็จ',
          text: 'แก้ไขข้อมูลรางวัลเสร็จสิ้น'
        });
      }
      else {
        console.error('Error: Something gone wrong.');
        //show modal here
        Swal.default.fire({
          icon: 'error',
          title: 'แก้ไขไม่สำเร็จ',
          text: 'ไม่สามารถแก้ไขข้อมูลรางวัล โปรดลองใหม่ภายหลัง'
        })
      }
      }
  } else {
    if (expiredDate as any <= new Date()) {
      onClose();
      Swal.default.fire({
        icon: 'error',
        title: 'แก้ไขไม่สำเร็จ',
        text: 'วันหมดอายุของรางวัลต้องมากกว่าวันปัจจุบันอย่างน้อย 1 วัน'
      });
      return;
    }
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
      Swal.default.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'เพิ่มรางวัลเสร็จสิ้น'
      })
    }
    else {
      console.error('Error: Something gone wrong.');
      Swal.default.fire({
        icon: 'error',
        title: 'ผิดพลาด',
        text: 'ไม่สามารถเพิ่มรางวัลใหม่ได้ โปรดลองใหม่ภายหลัง'
      });
      
    }
  }
  onClose();
  reload();
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            label="Expired Date"
            value={expiredDate}
            onChange={(newValue) => setExpiredDate(newValue as any)} 
            sx={{ marginBottom: 2,
                  width: '100%'}}/>
          </LocalizationProvider>
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
