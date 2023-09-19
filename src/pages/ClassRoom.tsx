import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import StudentClassTable from "../components/StudentClasstable";
import StudentClassForm from "../components/StudentClassForm";
import axios from "axios";

const ClassRoom = () => {
  // interface Student {
  //   id: number;
  //   student_id: string;
  //   name: string;
  //   lastname: string;
  // }

  // const generateSampleStudentData = (count: number): Student[] => {
  //   const students: Student[] = [];

  //   for (let i = 1; i <= count; i++) {
  //     const student: Student = {
  //       id: i, // Unique ID
  //       student_id: `S${i}`,
  //       name: `Student ${i}`,
  //       lastname: `Lastname ${i}`,
  //     };

  //     students.push(student);
  //   }

  //   return students;
  // };
  //const sampleStudentData = generateSampleStudentData(2);
  const [studentData, setStudentData] = useState([{
    studentId: '',
    id: '',
    firstName: '',
    surName: ''
  }])

  const { classId } = useParams();
  const [isAddStudentClassFormOpen, setIsAddStudentClassFormOpen] =
    useState(false);

  const handleOpenAddStudentClassForm = () => {
    setIsAddStudentClassFormOpen(true);
  };

  const handleCloseAddStudentClassForm = () => {
    setIsAddStudentClassFormOpen(false);
  };

  useEffect(() => {
    const getClassDetails = async() => {
      const response = await axios.get(`https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classId}`, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      for (let i = 0; i < response.data.classStudents.length; i++) {
        response.data.classStudents[i]['id'] = response.data.classStudents[i]['studentId'];
      };
      setStudentData(response.data.classStudents);
    }
    getClassDetails();
  }, [])

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="classroom-container">
        <div className="classroom-content">
          <Grid container spacing={2} alignItems="center" marginTop={"20px"}>
            <Grid item xs={12} md={6}>
              <h2>
                Class {classId}
              </h2>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                onClick={handleOpenAddStudentClassForm}
              >
                Add Student
              </Button>
            </Grid>
          </Grid>
          <StudentClassTable data={studentData} />
        </div>
      </div>
      <StudentClassForm
        open={isAddStudentClassFormOpen}
        onClose={handleCloseAddStudentClassForm}
      />
    </div>
  );
};

export default ClassRoom;
