// StudentClassTable.tsx

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Student {
  studentId: string;
  firstName: string;
  surName: string;
}

interface StudentClassTableProps {
  data: Student[];
}

const columns: GridColDef[] = [
  { field: "studentId", headerName: "Student ID", width: 150 },
  { field: "firstName", headerName: "First Name", width: 200 },
  { field: "surName", headerName: "Last Name", width: 200 },
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
