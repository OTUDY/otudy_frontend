// StudentClassTable.tsx

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"
import StudentClassForm from "./StudentClassForm";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as Swal from 'sweetalert2';

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
  const [rows, setRows] = useState(data);
  const handleEditStudent = () => {
    setIsEdit(true);
    setOpenStudentForm(true);
  };

  const getClassDetails = async () => {
    const response = await axios.get(
      `https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    setRows(response.data.students)
  };

  const deleteStudent = async( id: string) => {
    const result = await Swal.default.fire({
      title: `ต้องการลบนักเรียน ${id} ออกจากห้องใช่หรือไม่`,
      text: "โปรดตัดสินใจอย่างรอบคอบเพราะท่านจะไม่สามารถแก้ไขได้",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ'
    })
    if (result.isConfirmed) {
        const data = [id];
        const response = await axios.put(`https://backend.otudy.co/api/v1/class/remove_students?_class=${classId}`, data, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`
          }
        });
        if (response.status == 200) {
          console.log(response.data);
          Swal.default.fire(
            `ลบนักเรียนเรียบร้อย`,
            `ลบนักเรียน ${id} ออกจากห้องเรียนเรียบร้อย`,
            'success'
          )
          getClassDetails();
        }
        
      }
  }

  const onClose = () => {
    console.log('trigger onclose studentclasstable.tsx')
    setOpenStudentForm(false);
    getClassDetails();
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

  useEffect(() => {
    setRows(data);
  }, [data])

  return (
    <div style={{ height: 400, width: "100%" }}>
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
