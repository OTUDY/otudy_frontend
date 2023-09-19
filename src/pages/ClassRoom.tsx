import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import StudentClassTable from "../components/StudentClasstable";
import StudentClassForm from "../components/StudentClassForm";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState("student");

  const handleMenuItemChange = (event: SelectChangeEvent<string>) => {
    const selectedItem = event.target.value;

    // Navigate to the Mission page if "Mission" is selected
    if (selectedItem === "mission") {
      navigate(`/class/${classId}/mission`);
    } else {
      setSelectedMenuItem(selectedItem);
    }
  };

  const { classId } = useParams();
  const [isAddStudentClassFormOpen, setIsAddStudentClassFormOpen] =
    useState(false);

  const handleOpenAddStudentClassForm = () => {
    setIsAddStudentClassFormOpen(true);
  };

  const handleCloseAddStudentClassForm = () => {
    setIsAddStudentClassFormOpen(false);
  };

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="classroom-container">
        <div className="classroom-content">
          <Grid container spacing={2} alignItems="center" marginTop={"20px"}>
            <Grid item xs={12} md={6}>
              <p>
                Class {classId} /
                <Select
                  value={selectedMenuItem}
                  onChange={handleMenuItemChange}
                  sx={{
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="mission">Mission</MenuItem>
                  <MenuItem value="reward">Reward</MenuItem>
                  <MenuItem value="leaderboard">Leaderboard</MenuItem>
                </Select>
              </p>
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
          <StudentClassTable data={sampleStudentData} />
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
