import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import ClassSubSectionSelect from "../components/ClassSubSectionSelect";
import RewardForm from "../components/RewardForm";
import { useEffect, useState } from "react";
import RewardCard from "../components/RewardCard";
import axios from "axios";
import { useCookies } from "react-cookie";

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
  const [rewards, setRewards] = useState([{
    id: 0,
    reward_name: "",
    reward_spent_points: 0,
    reward_desc: "",
    reward_pic: "",
    reward_active_status: false,
    reward_amount: 0,
    classId: classId as string
  }]);
  const [cookie] = useCookies(['access_token']);

  useEffect(() => {
    const fetchData = async() => {
      const classIdEncoded = encodeURIComponent(classId as string);
      const url = `https://backend.otudy.co/api/v1/reward/get_all_rewards?_class=${classIdEncoded}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`
        }
      });
      for (let i = 0; i < response.data.rewards.length; i++) {
        response.data.rewards[i]['id'] = i;
        response.data.rewards[i]['reward_active_status'] = Boolean(response.data.rewards[i]['reward_active_status']);
        response.data.rewards[i]['classId'] = classId as string;
      }
      setRewards(response.data.rewards);
    }
    fetchData();
  }, [])

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
      <RewardForm open={isAddRewardOpen} onClose={handleCloseAddReward} classId={classId as string}/>
    </div>
  );
};

export default Reward;
