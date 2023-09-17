import React from "react";
import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import StudentClassTable from "../components/StudentClasstable";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ClassRoom = () => {
  interface Student {
    id: number;
    student_id: string;
    name: string;
    lastname: string;
  }
  const generateSampleStudentData = (count: number): Student[] => {
    const students: Student[] = [];

    for (let i = 1; i <= count; i++) {
      const student: Student = {
        id: i, // Unique ID
        student_id: `S${i}`,
        name: `Student ${i}`,
        lastname: `Lastname ${i}`,
      };

      students.push(student);
    }

    return students;
  };
  const sampleStudentData = generateSampleStudentData(2);
  console.log(sampleStudentData);
  const { classId } = useParams();
  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="classroom-container">
        <div className="classroom-content">
          <Grid container spacing={2} alignItems="center" marginTop={"20px"}>
            <Grid item xs={12} md={6}>
              <h1>Class ID: {classId}</h1>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
              >
                Add Student
              </Button>
            </Grid>
          </Grid>
          <StudentClassTable data={sampleStudentData} />
        </div>
      </div>
    </div>
  );
};

export default ClassRoom;
