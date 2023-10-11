import React, { useEffect, useState } from "react";
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
import * as Swal from 'sweetalert2';
interface data {
  id: string;
  name: string;
  description: string;
  expiredDate: string;
  receivedPoints: Number;
  tags: string;
  slotsAmount: Number;
}

interface AddMissionFormProps {
  open: boolean;
  onClose: () => void;
  classId: any;
  isEdit: boolean;
  data: data;
}

const MissionForm: React.FC<AddMissionFormProps> = ({
  open,
  onClose,
  classId,
  isEdit,
  data
}) => {
  const [missionTitle, setMissionTitle] = useState(data.name);
  const [missionDescription, setMissionDescription] = useState(data.description);
  const [dueDate, setDueDate] = useState(data.expiredDate);
  const [rewardPoints, setRewardPoints] = useState(data.receivedPoints);
  //let activeStatus = true;
  const [tagsInput, setTagsInput] = useState(data.tags);
  const [cookie] = useCookies(["access_token"]);
  const [amount, setAmount] = useState(data.slotsAmount);
  const id = data.id;
  // const handleTagsChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setTagsInput(event.target.value); // Update the selected class level
  // };


  const handleCreateAndEdit = async () => {
    const tagsToSendCreate: string[] = [];
    const tagsSplitted = tagsInput.split(",");
    tagsSplitted.forEach((currentItem: any) => {
      tagsToSendCreate.push(currentItem);
    });

    const body = {
      mission_id: id,
      mission_name: missionTitle,
      mission_desc: missionDescription,
      mission_points: rewardPoints,
      mission_class_id: classId,
      mission_expired_date: dueDate,
      slot_amount: amount,
      tags: tagsToSendCreate,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.access_token}`,
    };

    if (!isEdit) {
      if (new Date(dueDate) <= new Date()) {
        onClose();
        Swal.default.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ท่านจำเป็นต้องตั้งค่าวันหมดอายุของภารกิจอย่างน้อย 1 วันนับจากวันนี้'
        });
        return;
      }
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
        Swal.default.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการแก้ไข'
        })
      } else {
        Swal.default.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'เพิ่มภารกิจเสร็จสิ้น'
        })
      }
    } else {
      onClose();
      const result = await Swal.default.fire({
        title: `ต้องการแก้ไขภารกิจ ${id} ใช่หรือไม่`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'แก้ไข'
      })
      if (result.isConfirmed) {
      const response = await axios.put(
        "https://backend.otudy.co/api/v1/mission/update_mission_detail",
        body,
        { headers: headers }
      );
      if (response.status == 200 || response.status == 201 || response.status == 202) {
          Swal.default.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'แก้ไขภารกิจเสร็จสิ้น'
          })
      }
    
      else {
        //show false modal here
        Swal.default.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการแก้ไข'
        })
      }
    }
  }
    onClose();
  };

  useEffect(() => {
    setMissionTitle(data.name);
    setAmount(data.slotsAmount);
    setDueDate(data.expiredDate);
    setRewardPoints(data.receivedPoints);
    setMissionDescription(data.description);
    setTagsInput(data.tags);
  }, [isEdit, id])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit? "แก้ไขข้อมูลภารกิจ": "เพิ่มภารกิจใหม่"}</DialogTitle>
      <DialogContent>
        <form>
        <TextField
            label="Mission ID"
            value={id}
            fullWidth
            sx={{ marginBottom: 2 }}
            disabled={true}
          />
          <TextField
            label="Mission Name"
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
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {/* <Select
            label="Tags"
            value={tagsInput}
            onChange={handleTagsChange}
            fullWidth
            renderValue={(value) => (!value ? value : "Select Tag")}
            sx={{ marginBottom: 2, width: "100%" }}
          >
            <MenuItem value="active">Tags 1</MenuItem>
            <MenuItem value="inactive">Tags 2</MenuItem>
          </Select> */}
        </form>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
      >
        <Button onClick={onClose} color="primary">
          ยกเลิก
        </Button>
        <Button onClick={handleCreateAndEdit} disabled={missionDescription === '' || missionTitle === '' || dueDate === '' || rewardPoints == 0 || tagsInput === ''} color="primary">
          {isEdit? "แก้ไข": "เพิ่ม"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissionForm;
