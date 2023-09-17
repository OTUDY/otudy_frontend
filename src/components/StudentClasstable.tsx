// StudentClassTable.tsx

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Student {
  student_id: string;
  name: string;
  lastname: string;
}

interface StudentClassTableProps {
  data: Student[];
}

const columns: GridColDef[] = [
  { field: "student_id", headerName: "Student ID", width: 150 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "lastname", headerName: "Last Name", width: 200 },
];

const StudentClassTable: React.FC<StudentClassTableProps> = ({ data }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
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

export default StudentClassTable;
