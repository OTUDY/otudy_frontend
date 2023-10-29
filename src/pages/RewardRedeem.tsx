import { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import HeaderBar from "../components/HeaderBar";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as Swal from 'sweetalert2';

interface Props {
  rewardId: string;
  rewardPoint: Number;
}

const RewardRedeem: React.FC<Props> = ( {} ) => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [cookies] = useCookies(['access_token', 'rewardId', 'rewardPoint', 'rewardSlot']);
  const [slot, setSlot] = useState(cookies.rewardSlot);
  //Temp data
  const [data, setData] = useState([
    {
      id: "",
      firstName: "",
      lastName: "",
      inClassId: 0,
      status: ""
    },
  ]);
  //   const [students, setStudents] = useState([
  //     {
  //       student_id: "",
  //       firstname: "",
  //       surname: "",
  //       point: 0,
  //       redeemed: false,
  //     },
  //   ]);

  //TODO: get students from backend

  const navigate = useNavigate();
  const { classId } = useParams();
  const encodedClassId = classId ? encodeURIComponent(classId) : "";
  const handleCancel = () => {
    // Update completion status for selected students
    navigate(`/class/${encodedClassId}/reward`);
  };

  const handleRedeem = async() => {
    // Update completion status for selected students
    console.log("Redeem", selectionModel);
    const rewardIdEncoded = encodeURIComponent(cookies.rewardId);
    for (let i = 0; i < selectionModel.length; i++) {
      const studentPoint = await axios.get(`https://backend.otudy.co/api/v1/class/get_student_point?_class=${classId}&student_id=${encodeURIComponent(selectionModel[i])}`, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      });
      console.log(`Point = ${studentPoint.data}, slot = ${cookies.rewardSlot}, rewardPoints = ${cookies.rewardPoint}`);
      if ((studentPoint.data >= Number(cookies.rewardPoint)) && (slot > 0)) {
        const response = await axios.get(
          `https://backend.otudy.co/api/v1/reward/change_redeem_status?reward_id=${rewardIdEncoded}&_class=${classId}&student_id=${encodeURIComponent(selectionModel[i])}&_status=${encodeURIComponent("แลกเสร็จสิ้น")}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`
            }
          }
        );
        if (response.status != 200) {
          console.log(`Student ${selectionModel[i]} is unable to redeem.`);
          Swal.default.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'ไม่สามารถแลกรางวัลให้กับนักเรียนได้'
          })
        } else {
          Swal.default.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'แลกรางวัลให้กับนักเรียนเสร็จสิ้น'
          })
          setSlot(slot - 1);
          fetchData();
        }
      } else {
        Swal.default.fire({
          icon: 'error',
          title: 'ไม่สำเร็จ',
          text: 'ไม่สามารถแลกรางวัลให้กับนักเรียนได้เนื่องมีคะแนนไม่เพียงพอ'
        })
      }
    }
  };

  const fetchData = async() => {
    const response = await axios.get(
      `https://backend.otudy.co/api/v1/class/get_class_meta_data?_class=${classId}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`
        }
      }
    );
    //console.log(response.data.rewards[0].onGoingRedemption);
    let index: any = null;
    for (let i = 0; i < response.data.rewards.length; i++) {
      if (response.data.rewards[i].id === cookies.rewardId) {
        index = i;
        break;
      }
    }
    setData(response.data.rewards[index].onGoingRedemption);
    console.log(response.data.rewards[index].onGoingRedemption);
    console.log(`Reward ID: ${cookies.rewardId}`);
  };

  useEffect(() => {
    fetchData();
    setSlot(cookies.rewardSlot);
  }, [cookies.rewardSlot]);

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>
      <div className="classroom-container">
        <div className="classroom-content">
          <Typography variant="h4" sx={{ marginTop: "20px" }}>
            แลกรางวัล
          </Typography>
          <DataGrid
            rows={data}
            columns={[
              { field: "id", headerName: "รหัส", width: 100 },
              { field: "inClassId", headerName: "เลขที่", width: 70 },
              { field: "firstName", headerName: "ชื่อจริง", width: 150 },
              { field: "lastName", headerName: "นามสกุล", width: 150 },
              { field: "status", headerName: "สถานะ", width: 150 },
            ]}
            checkboxSelection
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            isRowSelectable={(params) => !(
              params.row.status === 'แลกเสร็จสิ้น'
            )}
          />
          <div
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outlined" color="primary" onClick={handleCancel}>
              ยกเลิก
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRedeem}
              disabled={selectionModel.length === 0}
            >
              แลกรางวัล
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardRedeem;
