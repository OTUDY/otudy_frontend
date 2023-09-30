import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import RewardForm from "./RewardForm";
import { useNavigate } from "react-router-dom";

interface RewardCardProps {
  id: any;
  name: string;
  spentPoints: Number;
  description: string;
  activeStatus: string;
  slotsAmount: Number;
  classId: string;
  expiredDate: string;
}

const RewardCard: React.FC<RewardCardProps> = ({
  id,
  name,
  spentPoints,
  description,
  activeStatus,
  slotsAmount,
  classId,
  expiredDate
}) => {
  const [isRewardFormOpen, setIsRewardFormOpen] = useState(false);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const encodedClassId = encodeURIComponent(classId);
  const handleTeacherRedeem = () => {
    navigate(`/class/${encodedClassId}/reward-redeem`);
  };

  const handleCardClick = () => {
    setIsEdit(true);
    setIsRewardFormOpen(true);
  };

  const handleCloseRewardForm = () => {
    console.log("close");
    setIsRewardFormOpen(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: 2, position: "relative" }}
      onClick={handleCardClick}
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
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        Redeem
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
      />
    </Card>
  );
};

export default RewardCard;
