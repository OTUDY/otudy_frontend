import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import StudentClassTable from "../components/StudentClasstable";
import StudentClassForm from "../components/StudentClassForm";
import ClassSubSectionSelect from "../components/ClassSubSectionSelect";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useCookies } from "react-cookie";


const ClassRoom = () => {
  
  const [className, setClassName] = useState('');
  const [studentData, setStudentData] = useState([
    {
      studentId: "",
      id: 0,
      firstName: "",
      surName: "",
      point: 0,
    },
  ]);
  const [cookie] = useCookies(["access_token"]);
  const { classId } = useParams();
  const formData = {
    id: '',
    firstName: '',
    lastName: '',
    inClassId: 0
  };
  const [isAddStudentClassFormOpen, setIsAddStudentClassFormOpen] =
    useState(false);

  const handleOpenAddStudentClassForm = () => {
    setIsAddStudentClassFormOpen(true);
  };

  const handleCloseAddStudentClassForm = () => {
    setIsAddStudentClassFormOpen(false);
    getClassDetails();
    
  };

  const getClassDetails = async () => {
    const response = await axios.get(
      `https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
      }
    );
    console.log(response.data);
    setStudentData(response.data.students);
    setClassName(response.data.name);
  };

  useEffect(() => {
    getClassDetails();
  }, []);

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="classroom-container">
        <div className="classroom-content">
          <Grid container spacing={2} alignItems="center" marginTop={"20px"}>
            <Grid item xs={12} md={6}>
              <div>
                <Typography variant="h6">
                  {`ห้องเรียน:  ${className} (${classId})`}{' '}
                  {classId && <ClassSubSectionSelect classId={classId} />}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                onClick={handleOpenAddStudentClassForm}
              >
                เพิ่มนักเรียน
              </Button>
            </Grid>
          </Grid>
          <StudentClassTable data={studentData as any} />
        </div>
      </div>
      <StudentClassForm
        open={isAddStudentClassFormOpen}
        onClose={handleCloseAddStudentClassForm}
        classId={classId as string}
        isEdit={false}
        data={formData}
      />
    </div>
  );
};

export default ClassRoom;
