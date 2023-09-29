import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ClassForm from "./ClassForm.tsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCookies } from "react-cookie";

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

const ClassTable = () => {
  const [rows, setRows] = useState([{
    id: 0,
    name: '',
    level: '',
    teachers: [].toString(),
    description: '',
    totalStudents: 0
  }]);
  const okStatus: Number[] = [200, 201, 202];
  const [isEdit, setIsEdit] = useState(false);
  const [cookie] = useCookies(['access_token']);
  const [isAddClassFormOpen, setIsAddClassFormOpen] = useState(false);
  const handleOpenAddClassForm = () => {
    setIsAddClassFormOpen(true);
    console.log("Open");
  };

  const handleCloseAddClassForm = () => {
    setIsAddClassFormOpen(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get('https://backend.otudy.co/api/v1/user/teacher/get_assigned_classes', {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`
        }
      });
      const rows = [];
      for (let i = 0; i < response.data.classes.length; i++) {
        let data = response.data.classes[i];
        response.data.classes[i]['name'] = response.data.classes[i]['id']
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
    fetchData();
  }, [])

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[
          // { field: "classNumber", headerName: "#", width: 150 },
          { field: "name", headerName: "Class Name", width: 200 },
          { field: "level", headerName: "Class Level", width: 200 },
          { field: "teachers", headerName: "Class` teacher", width: 250 },
          { field: "description", headerName: "Class description", width: 250 },
          { field: "totalStudents", headerName: "Total students", width: 150 },
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
                  setIsEdit(true);
                }}
              >
                <EditIcon />
              </IconButton>
            ),
          },
        ]}
        onRowClick={(params) => {
          const classId = encodeURIComponent(params.row.id);
          navigate(`/class/${classId}`);
          localStorage.setItem('currentClass', params.row.id);
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
      <ClassForm open={isAddClassFormOpen} onClose={handleCloseAddClassForm} isEdit={isEdit} />
    </div>
  );
};

export default ClassTable;
