import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import RewardForm from "./RewardForm";
import TeacherRedeem from "./TeacherRedeem";

interface RewardCardProps {
  reward_name: string;
  reward_spent_points: Number;
  reward_desc: string;
  reward_active_status: string;
  reward_amount: Number;
  classId: string
}

const RewardCard: React.FC<RewardCardProps> = ({ reward_name, reward_spent_points, reward_desc, reward_active_status, reward_amount, classId }) => {
  const [isRewardFormOpen, setIsRewardFormOpen] = useState(false);
  const [isTeacherRedeemOpen, setIsTeacherRedeemOpen] = useState(false);
  const handleTeacherRedeem = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTeacherRedeemOpen(true);
  };

  const handleCloseTeacherRedeem = () => {
    setIsTeacherRedeemOpen(false);
  };

  const handleCardClick = () => {
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
        <Typography variant="h6">{reward_name}</Typography>
        <Typography variant="subtitle1">Point: {reward_spent_points.toString()}</Typography>
        <Typography variant="body2">Description: {reward_desc}</Typography>
        <Typography variant="body2">Active Status: {reward_active_status}</Typography>
        <Typography variant="body2">Amount: {reward_amount.toString()}</Typography>
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
      <RewardForm open={isRewardFormOpen} onClose={handleCloseRewardForm} classId={classId} />
      <TeacherRedeem
        open={isTeacherRedeemOpen}
        onClose={handleCloseTeacherRedeem}
        students={[]}
      />
    </Card>
  );
};

export default RewardCard;
