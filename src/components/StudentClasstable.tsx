// StudentClassTable.tsx

import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"
import StudentClassForm from "./StudentClassForm";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

interface Student {
  id: string;
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
  const [studentId, setStudentId] = useState('');
  const [studentInClassId, setStudentInClassId] = useState(0);
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [cookies] = useCookies(['access_token']);
  const handleEditStudent = () => {
    setIsEdit(true);
    setOpenStudentForm(true);
  };

  const deleteStudent = async( id: string) => {
    const data = [id];
    const response = await axios.put(`https://backend.otudy.co/api/v1/class/remove_students?_class=${classId}`, data, {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`
      }
    });
    if (response.status == 200) {
      console.log(response.data);
      //localStorage.setItem('myAppState', JSON.stringify(myAppState));
      //window.location.reload();
    }
  }

  const onClose = () => {
    setOpenStudentForm(false);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "รหัส", width: 150 },
    { field: "inClassId", headerName: "เลขที่", width: 150 },
    { field: "firstName", headerName: "ชื่อจริง", width: 200 },
    { field: "lastName", headerName: "นามสกุล", width: 200 },
    { field: "points", headerName: "คะแนนสะสม", width: 200 },
    {
      field: "edit",
      headerName: "แก้ไข",
      width: 100,
      renderCell: (params) => (
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            setStudentId(params.row.id);
            setStudentInClassId(params.row.inClassId);
            setStudentFirstName(params.row.firstName);
            setStudentLastName(params.row.lastName);
            handleEditStudent();
            //console.log(cookies.currentStudentId);
          }}
          disabled={false}
        >
          <EditIcon/>
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "ลบ",
      width: 100,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            deleteStudent(params.row.id);
            //console.log(cookies.currentStudentId);
          }}
        >
          <DeleteIcon />
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
        onClose={onClose}
        classId={classId}
        isEdit={isEdit}
        data={
          {
            id: studentId,
            firstName: studentFirstName,
            lastName: studentLastName,
            inClassId: studentInClassId
          }
        }
      />
    </div>
  );
};

export default StudentClassTable;
