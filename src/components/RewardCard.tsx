import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import RewardForm from "./RewardForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import * as Swal from 'sweetalert2';
interface RewardCardProps {
  id: any;
  name: string;
  spentPoints: Number;
  description: string;
  activeStatus: string;
  slotsAmount: Number;
  classId: string;
  expiredDate: string;
  reload: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({
  id,
  name,
  spentPoints,
  description,
  activeStatus,
  slotsAmount,
  classId,
  expiredDate,
  reload
}) => {
  const [isRewardFormOpen, setIsRewardFormOpen] = useState(false);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const encodedClassId = encodeURIComponent(classId);
  const [cookies, setCookies] = useCookies(['access_token', 'rewardId', 'rewardPoint']);
  const handleTeacherRedeem = () => {
    setCookies('rewardId',id);
    setCookies('rewardPoint', spentPoints);
    navigate(`/class/${encodedClassId}/reward-redeem`);
  };

  const handleDeleteReward = async() => {
    const result = await Swal.default.fire({
      title: `ต้องการลบรางวัล ${id} ใช่หรือไม่`,
      text: "โปรดตัดสินใจอย่างรอบคอบเพราะท่านจะไม่สามารถแก้ไขได้",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ'
    })
    if (result.isConfirmed) {
      const idEncoded = encodeURIComponent(id);
      const classIdEncoded = encodeURIComponent(classId);
      const response = await axios.delete(`https://backend.otudy.co/api/v1/reward/delete_reward?reward_name=${idEncoded}&_class=${classIdEncoded}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
    })
      if (response.status == 200) {
        console.log(response.data);
        Swal.default.fire({
          icon: 'success',
          title: 'ลบสำเร็จ',
          text: 'ลบรางวัลสำเร็จแล้ว'
        })
        reload();
      } else {
        Swal.default.fire({
          icon: 'error',
          title: 'ไม่สำเร็จ',
          text: 'ไม่สามารถลบรางวัลได้ โปรดลองใหม่ภายหลัง'
        })
      }
    }
    
  }

  const handleEditClick = () => {
    setIsEdit(true);
    setIsRewardFormOpen(true);
  };

  const handleCloseRewardForm = () => {
    setIsRewardFormOpen(false);
    reload();
  };

  return (
    <Card
      variant="outlined"
      sx={{ position: "relative", blockSize: 250, marginTop: 2}}
    >
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h6">{`rewardId = ${id}`}</Typography>
        <Typography variant="subtitle1">
          Point: {spentPoints.toString()}
        </Typography>
        <Typography variant="body2">Description: {description}</Typography>
        <Typography variant="body2">
          Active Status: {activeStatus}
        </Typography>
        <Typography variant="body2">
          Amount: {slotsAmount.toString()}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        onClick={handleTeacherRedeem}
        sx={{
          position: "relative",
          bottom: 0,
        }}
      >
        แลก
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditClick}
        sx={{
          position: "relative",
          bottom: 0,
          marginLeft: 1
        }}
      >
        แก้ไข
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDeleteReward}
        sx={{
          position: "relative",
          bottom: 0,
          marginLeft: 1
        }}
      >
        ลบ
      </Button>
      <RewardForm
        open={isRewardFormOpen}
        onClose={handleCloseRewardForm}
        classId={classId}
        isEdit={isEdit}
        data={
          {
            id: id,
            name: name,
            spentPoints: spentPoints,
            description: description,
            expiredDate: expiredDate,
            slotsAmount: slotsAmount,
          }
        }
        reload={reload}
      />
    </Card>
  );
};

export default RewardCard;
