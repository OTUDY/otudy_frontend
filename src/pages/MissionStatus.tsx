import { useState } from "react";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Typography from "@mui/material/Typography";

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

  const missionDetail = [
    {
      id: "0",
      firstname: "John",
      surname: "Doe",
      status: "Pending Approval",
      student: "123456",
    },
  ];

  const navigate = useNavigate();
  const { classId } = useParams();
  const handleClose = () => {
    navigate(`/class/${classId}/mission`);
  };

  const handleComplete = () => {
    // Update completion status for selected students
    console.log("Selected Students:", selectionModel);
    console.log(classId);
  };
  const handleDeny = async () => {};

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
