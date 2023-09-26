import { useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import HeaderBar from "../components/HeaderBar";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "studentId", headerName: "Student ID", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "point", headerName: "Point", width: 150 },
  {
    field: "redeemed",
    headerName: "Redeemed",
    width: 150,
    renderCell: (params: GridCellParams) => {
      return params.value ? "Redeemed" : "Not Redeemed";
    },
  },
];

const RewardRedeem = () => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  //Temp data
  const students = [
    {
      id: "0",
      studentId: "123456",
      name: "John",
      lastName: "Doe",
      point: 100,
      redeemed: false,
    },
  ];
  //   const [students, setStudents] = useState([
  //     {
  //       student_id: "",
  //       firstname: "",
  //       surname: "",
  //       point: 0,
  //       redeemed: false,
  //     },
  //   ]);

  //TODO: get students from backend

  const handleRedeem = () => {
    // Update completion status for selected students
    console.log("Redeem", selectionModel);
  };

  const handleCancel = () => {
    // Update completion status for selected students
    console.log("Cancle", selectionModel);
  };

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>
      <div className="classroom-container">
        <div className="classroom-content">
          <Typography variant="h4" sx={{ marginTop: "20px" }}>
            Redeem Reward
          </Typography>
          <DataGrid
            rows={students}
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
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCancel}
              disabled={selectionModel.length === 0}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRedeem}
              disabled={selectionModel.length === 0}
            >
              Redeem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardRedeem;
