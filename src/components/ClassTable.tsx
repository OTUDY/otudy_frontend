import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ClassForm from "./ClassForm.tsx";
import { useNavigate } from "react-router-dom";

const generateSampleRows = (count: number) => {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    rows.push({
      id: i,
      classNumber: ` ${i}`,
      className: `Class ${i} Name`,
      classLevel: i % 2 === 0 ? "High School" : "Middle School",
      memberCount: Math.floor(Math.random() * 30) + 20,
    });
  }
  return rows;
};

const ClassTable = () => {
  const rows = generateSampleRows(10); // Generate 10 sample rows
  const [isAddClassFormOpen, setIsAddClassFormOpen] = useState(false);
  const handleOpenAddClassForm = () => {
    setIsAddClassFormOpen(true);
    console.log("Open");
  };

  const handleCloseAddClassForm = () => {
    setIsAddClassFormOpen(false);
  };
  const navigate = useNavigate();

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[
          { field: "classNumber", headerName: "#", width: 150 },
          { field: "className", headerName: "Class Name", width: 200 },
          { field: "classLevel", headerName: "Class Level", width: 200 },
          { field: "memberCount", headerName: "Amount of Members", width: 250 },
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
                  handleOpenAddClassForm();
                }}
              >
                <EditIcon />
              </IconButton>
            ),
          },
        ]}
        onRowClick={(params) => {
          const classId = params.row.id;
          navigate(`/class/${classId}`);
          console.log(params.row.classNumber);
          console.log(navigate);
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <ClassForm open={isAddClassFormOpen} onClose={handleCloseAddClassForm} />
    </div>
  );
};

export default ClassTable;
