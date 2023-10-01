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
    { field: "id", headerName: "รหัส", width: 150 },
    { field: "inClassId", headerName: "เลขที่", width: 150 },
    { field: "firstName", headerName: "ชื่อจริง", width: 150 },
    { field: "lastName", headerName: "นามสกุล", width: 150 },
    { field: "status", headerName: "สถานะปัจจุบัน", width: 200 },
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
  const [cookies] = useCookies(["missionId", "access_token"]);

  const handleComplete = async() => {
    // Update completion status for selected students
    console.log("Selected Students:", selectionModel);
    for (let i = 0; i < selectionModel.length; i++) {
      const response = await axios.get(`https://backend.otudy.co/api/v1/mission/change_mission_status?_class=${encodeURIComponent(classId as string)}&student_id=${encodeURIComponent(selectionModel[i])}&mission_id=${encodeURIComponent(cookies.missionId)}&_status=${encodeURIComponent('เสร็จสิ้นภารกิจ')}`, {
        headers: {
          'Authorization': `Bearer ${cookies.access_token}`
        }
      });
      if (response.status == 200) {
        console.log(response.data);
      }
    }
    //window.location.reload();
    
  };
  const handleDeny = async () => {
    for (let i = 0; i < selectionModel.length; i++) {
      const response = await axios.get(`https://backend.otudy.co/api/v1/mission/change_mission_status?_class=${encodeURIComponent(classId as string)}&student_id=${encodeURIComponent(selectionModel[i])}&mission_id=${encodeURIComponent(cookies.missionId)}&_status=${encodeURIComponent('ปฏิเสธการมอบหมาย')}`, {
        headers: {
          'Authorization': `Bearer ${cookies.access_token}`
        }
      });
      if (response.status == 200) {
        console.log(response.data);
      }
    }
    //window.location.reload();
}
  const handleAssign = async() => {
    for (let i = 0; i < selectionModel.length; i++) {
      const response = await axios.get(`https://backend.otudy.co/api/v1/mission/change_mission_status?_class=${encodeURIComponent(classId as string)}&student_id=${encodeURIComponent(selectionModel[i])}&mission_id=${encodeURIComponent(cookies.missionId)}&_status=${encodeURIComponent('ได้รับมอบหมาย')}`, {
        headers: {
          'Authorization': `Bearer ${cookies.access_token}`
        }
      });
      if (response.status == 200) {
        console.log(response.data);
      }
    }
    //window.location.reload();
  }

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get(`https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classId}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      })
      console.log(cookies.missionId)
      for (let i = 0; i < response.data.missions.length; i++) {
        if (response.data.missions[i].id === cookies.missionId) {
          setMissionDetail(response.data.missions[i]['onGoingStatus'])
        }
      }
    }
    fetchData();
  }, [cookies.missionId])

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>
      <div className="classroom-container">
        <div className="classroom-content">
          <Typography variant="h4" sx={{ marginTop: "20px" }}>
            สถานะการทำภารกิจ
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
              onClick={handleAssign}
              disabled={selectionModel.length === 0}
            >
              มอบหมาย
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
