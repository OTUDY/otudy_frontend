import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClassSubSectionSelect from "../components/ClassSubSectionSelect";
import { useEffect, useState } from "react";
import MissionForm from "../components/MissionForm";
import { Typography } from "@mui/material";
import MissionTable from "../components/MissionTable";
import axios from "axios";
import { useCookies } from "react-cookie";

const Mission = () => {
  const { classId } = useParams();
  const [isAddMissionOpen, setIsAddMissionOpen] = useState(false);
  const [cookies] = useCookies(['access_token']);
  const [rows, setRows] = useState([{
    id: '',
    name: '',
    description: '',
    receivedPoints: '',
    expiredDate: '',
    tags: '',
    slotsAmount: 0,
    activeStatus: false
  }]);
  const [unactiveMissions, setUnactiveMissions] = useState([{}]);

  const handleOpenAddMission = () => {
    setIsAddMissionOpen(true);
  };

  const handleCloseAddMission = () => {
    setIsAddMissionOpen(false);
    getMissionsData();
  };

  const getMissionsData = async () => {
    const response: any = await axios.get(
      `https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    const missionResponse: any[]= response.data.missions;
    const activeMissions: any[] = [];
    const unactiveMissions: any[] = [];
    for (let i = 0; i < missionResponse.length; i++) {
      const expiredDate = missionResponse[i].expiredDate.replaceAll("/", '-');
      if (new Date() > new Date(expiredDate)) {
        missionResponse[i]["activeStatus"] = "ไม่เปิดให้ทำ";
        unactiveMissions.push(missionResponse[i])
        }
      else {
        missionResponse[i]["activeStatus"] = "เปิดให้ทำ";
        activeMissions.push(missionResponse[i]);
        } 
      //console.log(`${missionResponse[i]['expiredDate'].replaceAll('/', '-')}`);
      //console.log(new Date(`${year}-${month.length > 1? month: `0${month}`}-${day.length == 1? `0${day}`: day}`));
      }
    setRows(activeMissions);
    setUnactiveMissions(unactiveMissions as any);
    //console.log(missionResponse);
  };

  useEffect(() => {
    getMissionsData();
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
              <Typography variant="h6">
                Class {classId}{" "}
                {classId && <ClassSubSectionSelect classId={classId} />}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                onClick={handleOpenAddMission}
              >
                Add Mission
              </Button>
            </Grid>
          </Grid>
          <MissionTable active={true} data={rows} classId={classId as string} />
          <Typography
            variant="h6"
            sx={{ marginTop: 2, justifyContent: "flex-start" }}
          >
            Expired Mission
          </Typography>
          <MissionTable active={false} data={unactiveMissions} classId={classId as string} />
        </div>
      </div>
      <MissionForm
        classId={classId}
        open={isAddMissionOpen}
        onClose={handleCloseAddMission}
        isEdit={false}
        data={{
          id: "",
          name: "",
          description: "",
          receivedPoints: 0,
          expiredDate: "",
          tags: "",
          slotsAmount: 0
        }}
      />
    </div>
  );
};

export default Mission;
