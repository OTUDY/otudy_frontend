import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "classNumber", headerName: "aaaa", width: 150 },
  { field: "className", headerName: "Class Name", width: 200 },
  { field: "classLevel", headerName: "Class Level", width: 200 },
  { field: "memberCount", headerName: "Amount of Members", width: 150 },
];

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

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default ClassTable;
