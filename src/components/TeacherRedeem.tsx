import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useCookies } from "react-cookie";
import axios from "axios";

interface prop {
  open: boolean;
  onClose: () => void;
}

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

const TeacherRedeem: React.FC<prop> = ({
  open,
  onClose,
}) => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const [rows, setRows] = useState([]);
  const [cookies] = useCookies(['access_token', 'classId', 'rewardId']);

  const handleRedeem = () => {
    // Update completion status for selected students
    console.log("Redeem", selectionModel);
  };

  const fetchData = async() => {
    const classIdEncoded = encodeURIComponent(cookies.classId);
    const response = await axios.get(
      `https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classIdEncoded}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      }
    );
    for (let i = 0; i < response.data.rewards.length; i++) {
      if (response.data.rewards[i]['id'] === cookies.rewardId) {
        setRows(response.data.rewards[i]['onGoingRedemption']);
        break;
      }
    }
  }
  useEffect(() => {
  }, [fetchData])

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
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
          <Button variant="contained" onClick={onClose}>
            Close
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
    </Dialog>
  );
};

export default TeacherRedeem;
