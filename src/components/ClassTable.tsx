import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ClassForm from "./ClassForm.tsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
    class_name: 'p6/2',
    class_level: 'ประถมปลาย',
    teacher: 'teacher@otudy.co',
    class_desc: 'test test test'
  }]);
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
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const rows = [];
      for (let i = 0; i < response.data.classes.length; i++) {
        let data = response.data.classes[i];
        data['id'] = response.data.classes[i].class_name;
        rows.push(data);
      }

      setRows(rows);
    }
    fetchData();
    console.log(rows);
  }, [])

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[
          // { field: "classNumber", headerName: "#", width: 150 },
          { field: "class_name", headerName: "Class Name", width: 200 },
          { field: "class_level", headerName: "Class Level", width: 200 },
          { field: "teacher", headerName: "Class` teacher", width: 250 },
          { field: "class_desc", headerName: "Class description", width: 550 },
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
          const classId = encodeURIComponent(params.row.id);
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
