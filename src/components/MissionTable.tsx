import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MissionForm from "./MissionForm";
import MissionCompleteList from "./MissionCompleteList";
import { useNavigate } from "react-router-dom";

//import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

interface IsActiveMissionTable {
  active: boolean;
  classId: string;
}

const MissionTable: React.FC<IsActiveMissionTable> = ({ active, classId }) => {
  //const [rows, setRows] = useState([]);
  const [isAddMissionFormOpen, setIsAddMissionFormOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      id: "",
      name: "",
      description: "",
      redeem_points: 0,
      active_status: false,
      expired_date: "",
      tags: "",
    },
  ]);
  const [cookie, setCookie] = useCookies(["access_token", 'mission_id']);
  const [unactiveMissions, setUnactiveMissions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const currentClass: string = classId;
  const [missionDetail] = useState([
    {
      firstname: "",
      surname: "",
      status: "",
      student: "",
    },
  ]);

  const [missionId] = useState("");

  const navigate = useNavigate();
  const encodedClassId = encodeURIComponent(classId);

  const handleOpenAddMissionForm = () => {
    setIsAddMissionFormOpen(true);
  };

  const handleCloseAddMissionForm = () => {
    setIsAddMissionFormOpen(false);
  };

  const [viewCompleteStatus, setViewCompleteStatus] = useState(false);

  const handleOpenCompleteStatus = () => {
    navigate(`/class/${encodedClassId}/mission-status`);
  };
  const handleCloseCompleteStatus = () => {
    setViewCompleteStatus(false);
  };


  useEffect(() => {
    const getMissionsData = async () => {
      const classIdEncoded: any = encodeURIComponent(currentClass);
      const response: any = await axios.get(
        `https://backend.otudy.co/api/v1/mission/get_all_missions?_class=${classIdEncoded}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookie.access_token}`,
          },
        }
      );
      const activeMissions = [];
      const unactiveMissions = [];
      for (let i = 0; i < response.data.missions.length; i++) {
        response.data.missions[i]["id"] = i;

        if (response.data.missions[i].active_status) {
          response.data.missions[i]["active_status"] = "Yes";
          activeMissions.push(response.data.missions[i]);
        } else {
          response.data.missions[i]["active_status"] = "No";
          unactiveMissions.push(response.data.missions[i]);
        }
      }
      setRows(activeMissions);
      setUnactiveMissions(unactiveMissions as any);
    };
    getMissionsData();
  }, []);
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={active ? rows : unactiveMissions}
        columns={[
          { field: "id", headerName: "Mission Id", width: 150 },
          { field: "name", headerName: "Mission Name", width: 200 },
          {
            field: "description",
            headerName: "Mission Description",
            width: 350,
          },
          { field: "redeem_points", headerName: "Reward Point", width: 150 },
          { field: "active_status", headerName: "Active Status", width: 200 },
          { field: "expired_date", headerName: "Expired Date", width: 200 },
          { field: "tags", headerName: "Tags subjects", width: 250 },
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
                  handleOpenAddMissionForm();
                  setIsEdit(true);
                }}
              >
                <EditIcon />
              </IconButton>
            ),
          },
        ]}
        onRowClick={(params) => {
          handleOpenCompleteStatus();
          setCookie('mission_id', params.row.name);
          // Navigate to mission details page or handle as needed
          console.log("Mission ID:", params.row.name);
          
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
      />
      <MissionCompleteList
        missionId={missionId}
        open={viewCompleteStatus}
        onClose={handleCloseCompleteStatus}
        classId={currentClass}
        data={missionDetail}
      />
    </div>
  );
};

export default MissionTable;
