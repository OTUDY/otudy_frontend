import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import ClassSubSectionSelect from "../components/ClassSubSectionSelect";

const Reward = () => {
  const { classId } = useParams();
  const handleAddReward = () => {
    console.log("add reward");
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
                Add Mission
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Reward;
