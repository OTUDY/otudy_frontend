import { useEffect, useState } from "react";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import axios from "axios";

const MissionStatus = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "student", headerName: "Student ID", width: 150 },
    { field: "firstname", headerName: "FirstName", width: 150 },
    { field: "surname", headerName: "LastName", width: 150 },
    { field: "status", headerName: "Current Status", width: 200 },
  ];

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  //temporary data
  // const [missionDetail, setMissionDetail] = useState([
  //   {
  //     id: "0",
  //     firstname: "John",
  //     surname: "Doe",
  //     status: "Pending Approval",
  //     student: "123456",
  //   },
  // ]);

  const [missionDetail, setMissionDetail] = useState([
    {
      id: "0",
      firstname: "John",
      surname: "Doe",
      status: "Pending Approval",
      student: "123456",
    },
  ]);

  const navigate = useNavigate();
  const { classId } = useParams();
  const handleClose = () => {
    navigate(`/class/${classId}/mission`);
  };
  const [cookies] = useCookies(["mission_id", "access_token"]);

  const handleComplete = async() => {
    // Update completion status for selected students
    console.log("Selected Students:", selectionModel);
    for (let i = 0; i < selectionModel.length; i++) {
      let index: any = selectionModel[i];
      const studentId = missionDetail[index].student
      console.log(studentId);
      const response = await axios.get(`https://backend.otudy.co/api/v1/mission/update_mission_student_status?student_id=${encodeURIComponent(studentId)}&mission_name=${encodeURIComponent(cookies.mission_id)}&status_=${encodeURIComponent("approve")}&_class=${classId}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      });
      if (response.status == 200 || response.status == 201 || response.status == 202) {
        console.log(response.data);
      }
      else {
        console.error(response.data);
      }
    };

  };
  const handleDeny = async () => {
    for (let i = 0; i < selectionModel.length; i++) {
      let index: any = selectionModel[i];
      const studentId = missionDetail[index].student
      const response = await axios.get(`https://backend.otudy.co/api/v1/mission/update_mission_student_status?student_id=${encodeURIComponent(studentId)}&mission_name=${encodeURIComponent(cookies.mission_id)}&status_=${encodeURIComponent("deny")}&_class=${classId}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      });
      if (response.status == 200 || response.status == 201 || response.status == 202) {
        console.log(response.data);
      }
      else {
        console.error(response.data);
      }
  };
}

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get(`https://backend.otudy.co/api/v1/mission/get_on_going_missions_by_mission?_class=${classId}&mission_name=${encodeURIComponent(cookies.mission_id)}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      })
      for (let i = 0; i < response.data.on_going_missions.length; i++){
        response.data.on_going_missions[i]['id'] = i;
        if (response.data.on_going_missions[i]['status'] == 2) {
          response.data.on_going_missions[i]['status'] = 'Pending Approval';
        }
        else if (response.data.on_going_missions[i]['status'] == 0) {
          response.data.on_going_missions[i]['status'] = 'Denied';
        }
        else {
          response.data.on_going_missions[i]['status'] = 'Approved';
        }
      }
      setMissionDetail(response.data.on_going_missions)
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
          <Typography variant="h4" sx={{ marginTop: "20px" }}>
            Mission Status
          </Typography>
          <DataGrid
            rows={missionDetail}
            columns={columns}
            checkboxSelection
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
          />
          <div
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeny}
              disabled={selectionModel.length === 0}
            >
              Deny
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleComplete}
              disabled={selectionModel.length === 0}
            >
              Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatus;
