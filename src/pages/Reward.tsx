import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import ClassSubSectionSelect from "../components/ClassSubSectionSelect";
import RewardForm from "../components/RewardForm";
import { useState } from "react";

const Reward = () => {
  const { classId } = useParams();
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false);
  const handleAddReward = () => {
    setIsAddRewardOpen(true);
  };

  const handleCloseAddReward = () => {
    setIsAddRewardOpen(false);
  };

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
        </div>
      </div>
      <RewardForm open={isAddRewardOpen} onClose={handleCloseAddReward} />
    </div>
  );
};

export default Reward;
