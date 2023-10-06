import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MissionForm from "./MissionForm";
import MissionCompleteList from "./MissionCompleteList";
import { useNavigate } from "react-router-dom";

//import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import * as Swal from 'sweetalert2';

interface IsActiveMissionTable {
  active: boolean;
  classId: string;
  data: any[];
}

const MissionTable: React.FC<IsActiveMissionTable> = ({ active, classId, data }) => {
  //const [rows, setRows] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const [isAddMissionFormOpen, setIsAddMissionFormOpen] = useState(false);
  const [rows, setRows] = useState(data);
  const [cookie, setCookie] = useCookies(["access_token", 'missionId', 'missionSlot']);
  const [unactiveMissions, setUnactiveMissions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const currentClass: string = classId;
  const [currentMission, setCurrentMission] = useState({
    id: "",
    name: "",
    description: "",
    receivedPoints: 0,
    expiredDate: "",
    tags: [],
    slotsAmount: 0
  });

  const [missionId] = useState("");

  const navigate = useNavigate();
  const encodedClassId = encodeURIComponent(classId);

  const handleOpenAddMissionForm = () => {
    setIsAddMissionFormOpen(true);
  };

  const handleCloseAddMissionForm = () => {
    setIsAddMissionFormOpen(false);
    getMissionsData();
  };

  const [viewCompleteStatus, setViewCompleteStatus] = useState(false);

  const handleOpenCompleteStatus = () => {
    navigate(`/class/${encodedClassId}/mission-status`);
  };
  const handleCloseCompleteStatus = () => {
    console.log(`Trigger onClose() MissionTable.tsx.`)
    setViewCompleteStatus(false);
    getMissionsData();
  };

  const deleteMission = async( id: string ) => {
    const result = await Swal.default.fire({
      title: `ต้องการลบภารกิจ ${id} ใช่หรือไม่`,
      text: "โปรดตัดสินใจอย่างรอบคอบเพราะท่านจะไม่สามารถแก้ไขได้",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ'
    })
    if (result.isConfirmed) {
      const idEncoded = encodeURIComponent(id);
      const classIdEncoded: any = encodeURIComponent(currentClass);
      const response = await axios.delete(`https://backend.otudy.co/api/v1/mission/delete_mission?mission_name=${idEncoded}&_class=${classIdEncoded}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      })
      if (response.status == 200) {
        console.log(response.data);
        //window.location.reload();
        Swal.default.fire(
          `ลบภารกิจ`,
          `ลบนักเรียน ${id} ออกจากห้องเรียนเรียบร้อย`,
          'success'
        )
        getMissionsData();
      }
    }
  }
  const getMissionsData = async () => {
    const classIdEncoded: any = encodeURIComponent(currentClass);
    const response: any = await axios.get(
      `https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classIdEncoded}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
      }
    );
    const missionResponse: any[]= response.data.missions;
    const activeMissions: any[] = [];
    const unactiveMissions: any[] = [];
    for (let i = 0; i < missionResponse.length; i++) {
      const expiredDate = missionResponse[i].expiredDate.replaceAll("/", '-');
      if (new Date() > new Date(expiredDate)) {
        missionResponse[i]["activeStatus"] = "ไม่เปิดให้ทำ";
        unactiveMissions.push(missionResponse[i])
        }
      else {
        missionResponse[i]["activeStatus"] = "เปิดให้ทำ";
        activeMissions.push(missionResponse[i]);
        } 
      //console.log(`${missionResponse[i]['expiredDate'].replaceAll('/', '-')}`);
      //console.log(new Date(`${year}-${month.length > 1? month: `0${month}`}-${day.length == 1? `0${day}`: day}`));
      }
    setRows(activeMissions);
    setUnactiveMissions(unactiveMissions as any);
    //console.log(missionResponse);
  };

  useEffect(() => {
    setRows(data)
  }, [data]);
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={active ? rows : unactiveMissions}
        disableRowSelectionOnClick={!active}
        columns={[
          { field: "id", headerName: "รหัสภารกิจ", width: 150 },
          { field: "name", headerName: "ชื่อภารกิจ", width: 200 },
          {
            field: "description",
            headerName: "คำอธิบายภารกิจ",
            width: 350,
          },
          { field: "receivedPoints", headerName: "คะแนนรางวัล", width: 150 },
          { field: "slotsAmount", headerName: "จำนวนนักเรียนที่ทำได้", width: 150 },
          { field: "activeStatus", headerName: "สถานะ", width: 200 },
          { field: "expiredDate", headerName: "วันหมดอายุ", width: 200 },
          { field: "tags", headerName: "แท็ก", width: 250 },
          {
            field: "edit",
            headerName: "แก้ไข",
            width: 100,
            renderCell: (params) => (
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={(e) => {
                  setIsEdit(true);
                  e.stopPropagation();
                  handleOpenAddMissionForm();
                  setCurrentMission(params.row as any);
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
                  console.log(params.row)
                  e.stopPropagation();
                  deleteMission(params.row.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            ),
          },
        ]}
        onRowClick={(params) => {
          handleOpenCompleteStatus();
          setCookie('missionId', params.row.id);
          setCookie('missionSlot', params.row.slotsAmount);
          // Navigate to mission details page or handle as needed
          console.log("Mission ID:", params.row.id);
          
          //getInDepthMissionDetail();
          // Navigate to mission details page or handle as needed
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <MissionForm
        open={isAddMissionFormOpen}
        onClose={handleCloseAddMissionForm}
        classId={currentClass as string}
        isEdit={isEdit}
        data={currentMission as any}
      />
      <MissionCompleteList
        missionId={missionId}
        open={viewCompleteStatus}
        onClose={handleCloseCompleteStatus}
        classId={currentClass}
      />
    </div>
  );
};

export default MissionTable;
