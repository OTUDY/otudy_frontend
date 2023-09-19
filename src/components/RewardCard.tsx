import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

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
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">Point: {point}</Typography>
        <Typography variant="body2">Description: {description}</Typography>
        <Typography variant="body2">Amount: {amount}</Typography>
        <Typography variant="body2">Expired Date: {expiredDate}</Typography>
      </CardContent>
    </Card>
  );
};

export default RewardCard;
