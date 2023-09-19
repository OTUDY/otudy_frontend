import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
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
    setIsRewardFormOpen(false);
  };
  return (
    <div>
      <Card
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1">Point: {point}</Typography>
          <Typography variant="body2">Description: {description}</Typography>
          <Typography variant="body2">Amount: {amount}</Typography>
          <Typography variant="body2">Expired Date: {expiredDate}</Typography>
        </CardContent>
      </Card>
      <RewardForm open={isRewardFormOpen} onClose={handleCloseRewardForm} />
    </div>
  );
};

export default RewardCard;
