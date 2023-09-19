import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MissionForm from "./MissionForm";
import MissionCompleteList from "./MissionCompleteList";

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

  //Generate Sample student data
  interface Student {
    id: number;
    studentId: string;
    name: string;
    lastName: string;
    completed: boolean;
  }
  const generateSampleStudentData = (count: number): Student[] => {
    const students: Student[] = [];

    for (let i = 1; i <= count; i++) {
      const student: Student = {
        id: i, // Unique ID
        studentId: `S${i}`,
        name: `Student ${i}`,
        lastName: `Lastname ${i}`,
        completed: false,
      };

      students.push(student);
    }

    return students;
  };
  const sampleStudentData = generateSampleStudentData(2);

  const handleOpenAddMissionForm = () => {
    setIsAddMissionFormOpen(true);
  };

  const handleCloseAddMissionForm = () => {
    setIsAddMissionFormOpen(false);
  };

  const [viewCompleteStatus, setViewCompleteStatus] = useState(false);

  const handleOpenCompleteStatus = () => {
    setViewCompleteStatus(true);
  };

  const handleCloseCompleteStatus = () => {
    setViewCompleteStatus(false);
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
          handleOpenCompleteStatus();
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
      <MissionCompleteList
        students={sampleStudentData}
        open={viewCompleteStatus}
        onClose={handleCloseCompleteStatus}
      />
    </div>
  );
};

export default MissionTable;
