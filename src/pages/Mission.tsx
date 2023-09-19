import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClassSubSectionSelect from "../components/ClassSubSectionSelect";
import { useState } from "react";
import MissionForm from "../components/MissionForm";

const Mission = () => {
  const { classId } = useParams();
  const [isAddMissionOpen, setisAddMissionOpen] = useState(false);

  const handleOpenAddMission = () => {
    setisAddMissionOpen(true);
  };

  const handleCloseAddMission = () => {
    setisAddMissionOpen(false);
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
              <p>
                Class{classId} /
                {classId && <ClassSubSectionSelect classId={classId} />}
              </p>
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
        </div>
      </div>
      <MissionForm open={isAddMissionOpen} onClose={handleCloseAddMission} />
    </div>
  );
};

export default Mission;
