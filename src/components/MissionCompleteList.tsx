import React, { useEffect, useState } from "react";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { useCookies } from "react-cookie";

interface MissionCompleteListProps {
  missionId: string;
  open: boolean;
  onClose: () => void;
  classId: string;
}

const columns = [
  { field: "id", headerName: "รหัส", width: 70 },
  { field: "inClassNo", headerName: "เลขที่", width: 150 },
  { field: "firstName", headerName: "ชื่อจริง", width: 150 },
  { field: "lastName", headerName: "นามสกุล", width: 150 },
  { field: "status", headerName: "สถานะปัจจุบัน", width: 200 },
];

const MissionCompleteList: React.FC<MissionCompleteListProps> = ({
  missionId,
  open,
  onClose,
  classId,
}) => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [data, setData] = useState([{}]);
  const [cookies] = useCookies(['access_token']);

  const handleComplete = () => {
    // Update completion status for selected students
    console.log("Selected Students:", selectionModel);
    console.log(missionId);
    console.log(classId);
  };
  const handleDeny = async () => {};

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get(`https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${encodeURIComponent(classId)}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      });
      const studentsData = response.data.students;
      for (let i = 0; i < studentsData.length; i++) {
        studentsData[i]['status'] = 'ยังไม่ได้รับมอบหมาย';
      }
      setData(studentsData);
    }
    fetchData();
  }, [])

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
        />
        <div
          style={{
            margin: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeny}
            disabled={selectionModel.length === 0}
          >
            Deny
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleComplete}
            disabled={selectionModel.length === 0}
          >
            Complete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default MissionCompleteList;
