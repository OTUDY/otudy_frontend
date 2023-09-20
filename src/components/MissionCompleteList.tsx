import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import axios from "axios";


interface MissionCompleteListProps {
  missionId: string;
  open: boolean;
  onClose: () => void;
  classId: string;
  data: object[]
}

const columns = [
  { field: "student", headerName: "Student ID", width: 150 },
  { field: "firstname", headerName: "Name", width: 150 },
  { field: "surname", headerName: "Last Name", width: 150 },
  { field: "status", headerName: "Current Status", width: 150}
];

const MissionCompleteList: React.FC<MissionCompleteListProps> = ({
  missionId,
  open,
  onClose,
  classId,
  data

interface Student {
  id: number;
  studentId: string;
  name: string;
  lastName: string;
  completed: boolean;
}

interface MissionCompleteListProps {
  students: Student[];
  open: boolean;
  onClose: () => void;
}

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "studentId", headerName: "Student ID", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  {
    field: "completed",
    headerName: "Completed",
    width: 150,
    renderCell: (params: GridCellParams) => {
      return params.value ? "Completed" : "Not Completed";
    },
  },
];

const MissionCompleteList: React.FC<MissionCompleteListProps> = ({
  students,
  open,
  onClose,
}) => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const handleComplete = () => {
    // Update completion status for selected students
    console.log("Selected Students:", selectionModel);
  };
  const handleDeny = async() => {

  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={data}
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
    </Dialog>
  );
};

export default MissionCompleteList;
