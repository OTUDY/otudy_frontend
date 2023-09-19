import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import RewardForm from "./RewardForm";

interface RewardCardProps {
  title: string;
  point: string;
  description: string;
  amount: string;
  expiredDate: string;
}

const RewardCard: React.FC<RewardCardProps> = ({
  title,
  point,
  description,
  amount,
  expiredDate,
}) => {
  const [isRewardFormOpen, setIsRewardFormOpen] = useState(false);

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
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">Point: {point}</Typography>
        <Typography variant="body2">Description: {description}</Typography>
        <Typography variant="body2">Amount: {amount}</Typography>
        <Typography variant="body2">Expired Date: {expiredDate}</Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        Redeem
      </Button>
      <RewardForm open={isRewardFormOpen} onClose={handleCloseRewardForm} />
    </Card>
  );
};

export default RewardCard;
