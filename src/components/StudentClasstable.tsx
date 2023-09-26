// StudentClassTable.tsx

import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StudentClassForm from "./StudentClassForm";
import { useParams } from "react-router-dom";

interface Student {
  studentId: string;
  firstName: string;
  surName: string;
  point: number;
}

interface StudentClassTableProps {
  data: Student[];
}

const StudentClassTable: React.FC<StudentClassTableProps> = ({ data }) => {
  const { classId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [openStudentForm, setOpenStudentForm] = useState(false);
  const handleEditStudent = () => {
    setIsEdit(true);
    setOpenStudentForm(true);
  };

  const columns: GridColDef[] = [
    { field: "studentId", headerName: "Student ID", width: 150 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "surName", headerName: "Last Name", width: 200 },
    { field: "point", headerName: "Point", width: 200 },
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
            handleEditStudent();
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];
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
      <StudentClassForm
        open={openStudentForm}
        onClose={() => setOpenStudentForm(false)}
        classId={classId}
        isEdit={isEdit}
      />
    </div>
  );
};

export default StudentClassTable;
