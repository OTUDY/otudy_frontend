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
  const [className, setClassName] = useState('');
  const handleAddReward = () => {
    setIsAddRewardOpen(true);
  };

  const handleCloseAddReward = () => {
    setIsAddRewardOpen(false);
    fetchData();
  };

  // Sample rewards data (you will replace this with your actual data)
  const [rewards, setRewards] = useState([
    {
      id: 0,
      name: "",
      spentPoints: 0,
      description: "",
      pic: "",
      activeStatus: "",
      slotsAmount: 0,
      classId: classId as string,
      expiredDate: ''
    },
  ]);
  const [cookie] = useCookies(["access_token"]);
  const fetchData = async () => {
    const classIdEncoded = encodeURIComponent(classId as string);
    const url = `https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classIdEncoded}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookie.access_token}`,
      },
    });
    const rewardData: any[] = response.data.rewards;
    for (let i = 0; i < rewardData.length; i++) {
      if (new Date() < new Date(rewardData[i]['expiredDate'].replaceAll('/', '-'))) {
        response.data.rewards[i]["activeStatus"] = "เปิดให้แลก";
      } else {
        response.data.rewards[i]["activeStatus"] = "ไม่เปิดให้แลก";
      }
      response.data.rewards[i]["classId"] = classId as string;
    }
    setRewards(rewardData);
    setClassName(response.data.name);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>
      <div className="classroom-container">
        <div className="classroom-content">
          <Grid container spacing={2} alignItems="center" marginTop={"20px"}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                Class {`${className} (${classId})`}{" "}
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
                เพิ่มรางวัล
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {rewards.map((reward) => (
              <Grid key={reward.id} item xs={12} sm={6} md={4}>
                <RewardCard {...reward}/>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <RewardForm
        open={isAddRewardOpen}
        onClose={handleCloseAddReward}
        classId={classId as string}
        isEdit={false}
        data={
          {
            id: "ไม่ต้องกรอก",
            name: "",
            spentPoints: 0,
            description: "",
            expiredDate: "",
            slotsAmount: 0,
          }
        }
      />
    </div>
  );
};

export default Reward;
