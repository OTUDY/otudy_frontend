import React, { useState } from "react";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

interface MissionCompleteListProps {
  missionId: string;
  open: boolean;
  onClose: () => void;
  classId: string;
  data: object[];
}

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "student", headerName: "Student ID", width: 150 },
  { field: "firstname", headerName: "FirstName", width: 150 },
  { field: "surname", headerName: "LastName", width: 150 },
  { field: "status", headerName: "Current Status", width: 200 },
];

const MissionCompleteList: React.FC<MissionCompleteListProps> = ({
  missionId,
  open,
  onClose,
  classId,
  data,
}) => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const handleComplete = () => {
    // Update completion status for selected students
    console.log("Selected Students:", selectionModel);
    console.log(missionId);
    console.log(classId);
  };
  const handleDeny = async () => {};

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
