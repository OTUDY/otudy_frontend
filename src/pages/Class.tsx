import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import ClassTable from "../components/ClassTable";
import ClassForm from "../components/ClassForm";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";

const Class = () => {
  const [isAddClassFormOpen, setIsAddClassFormOpen] = useState(false);
  const [cookies] = useCookies(['access_token']);
  const [data, setData] = useState([{
    id: '',
    name: '',
    level: '',
    description: '',
    totalStudents: 0,
    teachers: '',
  }]);
  const okStatus: Number[] = [200, 201, 202];
  const handleOpenAddClassForm = () => {
    setIsAddClassFormOpen(true);
  };

  const handleCloseAddClassForm = () => {
    console.log('Trigger class.tsx close');
    setIsAddClassFormOpen(false);
    fetchData();
  };

  const fetchData = async() => {
    const response = await axios.get('https://backend.otudy.co/api/v1/user/teacher/get_assigned_classes', {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`
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
      setData(rows);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="section-container">
        <div className="section-content">
          <Grid container spacing={2} position='relative' alignItems="center" marginTop={"1rem"}>
            <Grid item xs={6} md={6}>
              <h2>ห้องเรียน</h2>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddClassForm}
                sx={{
                      position: 'relative'}}
              >
                เพิ่มห้องเรียน
              </Button>
            </Grid>
          </Grid>
          <ClassTable data={data as any}/>
        </div>
      </div>

      <ClassForm
        open={isAddClassFormOpen}
        onClose={handleCloseAddClassForm}
        isEdit={false}
        id={''}
        name={''}
        level={''}
        currentDescription={''}
      />
    </div>
  );
};

export default Class;
