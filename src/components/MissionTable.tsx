import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MissionForm from "./MissionForm";

const MissionTable = () => {
  //const [rows, setRows] = useState([]);
  const [isAddMissionFormOpen, setIsAddMissionFormOpen] = useState(false);
  //const [selectedMission, setSelectedMission] = useState(null);
  const generateSampleRows = (count: number) => {
    const rows = [];
    for (let i = 1; i <= count; i++) {
      rows.push({
        id: i,
        mission_name: `Mission ${i}`,
        available: i % 2 === 0 ? "Yes" : "No",
        reward_point: Math.floor(Math.random() * 100) + 20,
        mission_tag: `Tag ${i}`,
      });
    }
    return rows;
  };

  const sampleRows = generateSampleRows(10); // Generate 10 sample rows

  const handleOpenAddMissionForm = () => {
    setIsAddMissionFormOpen(true);
  };

  const handleCloseAddMissionForm = () => {
    setIsAddMissionFormOpen(false);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={sampleRows}
        columns={[
          { field: "id", headerName: "Mission Id", width: 150 },
          { field: "mission_name", headerName: "Mission Name", width: 200 },
          { field: "available", headerName: "Available", width: 150 },
          { field: "reward_point", headerName: "Reward Point", width: 150 },
          { field: "mission_tag", headerName: "Mission Tag", width: 200 },
          {
            field: "edit",
            headerName: "Edit",
            width: 100,
            renderCell: () => (
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenAddMissionForm();
                }}
              >
                <EditIcon />
              </IconButton>
            ),
          },
        ]}
        onRowClick={(params) => {
          const missionId = params.row.id;
          // Navigate to mission details page or handle as needed
          console.log("Mission ID:", missionId);
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <MissionForm
        open={isAddMissionFormOpen}
        onClose={handleCloseAddMissionForm}
      />
    </div>
  );
};

export default MissionTable;
