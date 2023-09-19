import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import ClassSubSectionSelect from "../components/ClassSubSectionSelect";
import RewardForm from "../components/RewardForm";
import { useState } from "react";
import RewardCard from "../components/RewardCard";

const Reward = () => {
  const { classId } = useParams();
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false);
  const handleAddReward = () => {
    setIsAddRewardOpen(true);
  };

  const handleCloseAddReward = () => {
    setIsAddRewardOpen(false);
  };

  // Sample rewards data (you will replace this with your actual data)
  const rewards = [
    // Sample rewards data (you will replace this with your actual data)
    {
      id: 1,
      title: "Reward 1",
      point: "100",
      description: "Description for Reward 1",
      amount: "50",
      expiredDate: "2023-12-31",
    },
    {
      id: 2,
      title: "Reward 2",
      point: "200",
      description: "Description for Reward 2",
      amount: "75",
      expiredDate: "2023-12-31",
    },
    {
      id: 3,
      title: "Reward 3",
      point: "150",
      description: "Description for Reward 3",
      amount: "60",
      expiredDate: "2023-12-31",
    },
    // Add more reward objects as needed
  ];

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>
      <div className="classroom-container">
        <div className="classroom-content">
          <Grid container spacing={2} alignItems="center" marginTop={"20px"}>
            <Grid item xs={12} md={6}>
              <Typography>
                Class{classId} /Reward
                {classId && <ClassSubSectionSelect classId={classId} />}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                onClick={handleAddReward}
              >
                Add Reward
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {rewards.map((reward) => (
              <Grid key={reward.id} item xs={12} sm={6} md={4}>
                <RewardCard {...reward} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <RewardForm open={isAddRewardOpen} onClose={handleCloseAddReward} />
    </div>
  );
};

export default Reward;
