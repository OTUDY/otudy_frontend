import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClassForm from "./ClassForm.tsx";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
import { useCookies } from "react-cookie";
import * as Swal from 'sweetalert2';

// const generateSampleRows = (count: number) => {
//   const rows = [];
//   for (let i = 1; i <= count; i++) {
//     rows.push({
//       id: i,
//       classNumber: ` ${i}`,
//       className: `Class ${i} Name`,
//       classLevel: i % 2 === 0 ? "High School" : "Middle School",
//       memberCount: Math.floor(Math.random() * 30) + 20,
//     });
//   }
//   return rows;
// };

interface Classes {
  id: string;
  name: string;
  level: string;
  description: string;
}
interface Props {
  data: Classes[];
}

const ClassTable: React.FC<Props> = ( {data} ) => {
  const [rows, setRows] = useState(data);
  const okStatus: Number[] = [200, 201, 202];
  const [isEdit, setIsEdit] = useState(false);
  const [cookie] = useCookies(['access_token']);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [isAddClassFormOpen, setIsAddClassFormOpen] = useState(false);
  const handleOpenAddClassForm = () => {
    setIsAddClassFormOpen(true);
  };

  const handleCloseAddClassForm = () => {
    console.log('Trigger onclose()');
    fetchData();
    setIsAddClassFormOpen(false);
  };
  const navigate = useNavigate();

  const fetchData = async() => {
    const response = await axios.get('https://backend.otudy.co/api/v1/user/teacher/get_assigned_classes', {
      headers: {
        Authorization: `Bearer ${cookie.access_token}`
      }
    });
    const rows = [];
    for (let i = 0; i < response.data.classes.length; i++) {
      let data = response.data.classes[i];
      response.data.classes[i]['teachers'] = response.data.classes[i]['teachers'].toString()
      //response.data.classes[i]['totalStudents'] = response.data.classes[i]['students'].length
      rows.push(data);
    }
    if (!(okStatus.includes(response.status))){
      console.error('Error: Something is gone wrong.')
      // show modal here.
    }
    else {
      setRows(rows);
    }
  }

  const handleDeleteClass = async(classId: string) => {
    const encodedClassId: string = encodeURIComponent(classId);
    const response: AxiosResponse = await axios.delete(
      `https://backend.otudy.co/api/v1/class/delete_class?_class=${encodedClassId}`,
      {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`
        }
      }
    )
    if (response.status == 200) {
      Swal.default.fire({
        icon: 'success',
        title: 'ลบห้องเรียนสำเร็จ',
        text: `ห้องเรียน ${classId} ได้ถูกลบแล้ว`
      });
      fetchData();
    }
    else {
      Swal.default.fire({
        icon: 'error',
        title: 'ลบห้องเรียนไม่สำเร็จ',
        text: 'โปรดลองอีกครั้งภายหลังหรือติดต่อทีมผู้ให้บริการ'}
      );
    }
  }

  useEffect(() => {
    setRows(data)
  }, [data])

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[
          { field: "id", headerName: "ไอดี", width: 150 },
          { field: "name", headerName: "ชื่อห้องเรียน", width: 200 },
          { field: "level", headerName: "ระดับชั้นการศึกษา", width: 200 },
          { field: "teachers", headerName: "ครูประจำห้อง", width: 250 },
          { field: "description", headerName: "คำอธิบาย", width: 250 },
          { field: "totalStudents", headerName: "จำนวนนักเรียนทั้งหมด", width: 150 },
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
                  handleOpenAddClassForm();
                  setIsEdit(true);
                  setId(params.row.id);
                  setName(params.row.name);
                  setLevel(params.row.level);
                  setDescription(params.row.description);
                }}
              >
                <EditIcon />
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
                  handleDeleteClass(params.row.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            ),
          },
        ]}
        onRowClick={(params) => {
          const classId = encodeURIComponent(params.row.id);
          setId(params.row.id);
          navigate(`/class/${classId}`);
          localStorage.setItem('currentClass', params.row.id);
          console.log(navigate);
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <ClassForm 
      open={isAddClassFormOpen} 
      onClose={handleCloseAddClassForm} 
      isEdit={isEdit}
      id={id}
      name={name}
      level={level}
      currentDescription={description}
      />
    </div>
  );
};

export default ClassTable;
