import { useEffect, useState } from "react";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as Swal from 'sweetalert2';

const MissionStatus = () => {

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  //temporary data
  // const [missionDetail, setMissionDetail] = useState([
  //   {
  //     id: "0",
  //     firstname: "John",
  //     surname: "Doe",
  //     status: "Pending Approval",
  //     student: "123456",
  //   },
  // ]);

  const [missionDetail, setMissionDetail] = useState([
    {
      id: "0",
      firstname: "John",
      surname: "Doe",
      status: "Pending Approval",
      student: "123456",
    },
  ]);
  const navigate = useNavigate();
  const { classId } = useParams();
  const handleClose = () => {
    navigate(`/class/${classId}/mission`);
  };
  const [cookies] = useCookies(["missionId", "access_token", 'missionSlot']);
  const [slot, setSlot] = useState(cookies.missionSlot);
  const handleComplete = async() => {
    // Update completion status for selected students
    console.log("Selected Students:", selectionModel);
    if (slot > 0) {
      for (let i = 0; i < selectionModel.length; i++) {
        const response = await axios.get(`https://backend.otudy.co/api/v1/mission/change_mission_status?_class=${encodeURIComponent(classId as string)}&student_id=${encodeURIComponent(selectionModel[i])}&mission_id=${encodeURIComponent(cookies.missionId)}&_status=${encodeURIComponent('เสร็จสิ้นภารกิจ')}`, {
          headers: {
            'Authorization': `Bearer ${cookies.access_token}`
          }
        });
        if (response.status == 200) {
          Swal.default.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'สถานะของภารกิจได้ถูกปรับให้เป็น เสร็จสิ้น แล้ว'
          })
          fetchData();
        } else {
          Swal.default.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'ไม่สามารถเปลี่ยนแปลงสถานะได้ โปรดลองอีกครั้งภายหลัง'
          })
        }
      }
    }
    else {
      Swal.default.fire({
        icon: 'error',
        title: 'ไม่สำเร็จ',
        text: 'ไม่สามารถเปลี่ยนแปลงสถานะได้เนื่องจากจำนวนนักเรียนที่ทำภารกิจได้ถึงกำหนดแล้ว'
      })
    }
    //window.location.reload();
    
  };
//   const handleDeny = async () => {
//     for (let i = 0; i < selectionModel.length; i++) {
//       const response = await axios.get(`https://backend.otudy.co/api/v1/mission/change_mission_status?_class=${encodeURIComponent(classId as string)}&student_id=${encodeURIComponent(selectionModel[i])}&mission_id=${encodeURIComponent(cookies.missionId)}&_status=${encodeURIComponent('ปฏิเสธการมอบหมาย')}`, {
//         headers: {
//           'Authorization': `Bearer ${cookies.access_token}`
//         }
//       });
//       if (response.status == 200) {
//         Swal.default.fire({
//           icon: 'success',
//           title: 'สำเร็จ',
//           text: 'สถานะของภารกิจได้ถูกปรับให้เป็น ยกเลิก แล้ว'
//         })
//         fetchData();
//       }
//     }
//     //window.location.reload();
// }
  // const handleAssign = async() => {
  //   for (let i = 0; i < selectionModel.length; i++) {
  //     if (slot > 0) {
  //     const response = await axios.get(`https://backend.otudy.co/api/v1/mission/change_mission_status?_class=${encodeURIComponent(classId as string)}&student_id=${encodeURIComponent(selectionModel[i])}&mission_id=${encodeURIComponent(cookies.missionId)}&_status=${encodeURIComponent('ได้รับมอบหมาย')}`, {
  //       headers: {
  //         'Authorization': `Bearer ${cookies.access_token}`
  //       }
  //     });
  //     if (response.status == 200) {
  //       Swal.default.fire({
  //         icon: 'success',
  //         title: 'สำเร็จ',
  //         text: 'สถานะของภารกิจได้ถูกปรับให้เป็น มอบหมาย แล้ว'
  //       })
  //       fetchData();
  //     }
  //     else {
  //       Swal.default.fire({
  //         icon: 'error',
  //         title: 'ไม่สำเร็จ',
  //         text: 'สถานะของภารกิจไม่ถูกปรับ'
  //       })
  //     }
  //     }
  //     else {
  //       Swal.default.fire({
  //         icon: 'error',
  //         title: 'ไม่สำเร็จ',
  //         text: 'สถานะของภารกิจไม่ถูกปรับเนื่องจากจำนวนนักเรียนที่ทำได้ไม่เพียงพอ'
  //       })
  //     }
  //   }
  //   //window.location.reload();
  // }
  
  const fetchData = async() => {
    const response = await axios.get(`https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classId}`, {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`
      }
    })
    console.log(cookies.missionId)
    for (let i = 0; i < response.data.missions.length; i++) {
      if (response.data.missions[i].id === cookies.missionId) {
        setMissionDetail(response.data.missions[i]['onGoingStatus'])
      }
    }
  }

  useEffect(() => {
    fetchData();
    setSlot(cookies.missionSlot);
  }, [cookies.missionId, cookies.missionSlot])

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>
      <div className="classroom-container">
        <div className="classroom-content">
          <Typography variant="h4" sx={{ marginTop: "2.5rem" }}>
            สถานะการทำภารกิจ
          </Typography>
          <DataGrid
            rows={missionDetail}
            sx={{
              marginTop: '1rem',
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              }
            }}
            columns={[
              { field: "id", headerName: "รหัส", width: 150 },
              { field: "inClassId", headerName: "เลขที่", width: 150 },
              { field: "firstName", headerName: "ชื่อจริง", width: 150 },
              { field: "lastName", headerName: "นามสกุล", width: 150 },
              { field: "status", headerName: "สถานะปัจจุบัน", width: 200 },
            ]}
            checkboxSelection
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            isRowSelectable={(params) => !( 
              params.row.status === 'เสร็จสิ้นภารกิจ' || params.row.status === 'ปฏิเสธการมอบหมาย'
            )}
          />
          <div
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" onClick={handleClose}>
              ปิด
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleDeny}
              disabled={selectionModel.length === 0}
            >
              ยกเลิก
            </Button> */}
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleAssign}
              disabled={selectionModel.length === 0}
            >
              มอบหมาย
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleComplete}
              disabled={selectionModel.length === 0}
            >
              เสร็จสิ้น
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatus;
