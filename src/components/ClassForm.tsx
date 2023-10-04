import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import * as Swal from 'sweetalert2';

interface AddClassFormProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  id: string;
  name: string;
  level: string;
  currentDescription: string;
}

const ClassForm: React.FC<AddClassFormProps> = ({ open, onClose, isEdit, id, name, level, currentDescription }) => {
  const [className, setClassName] = useState('');
  const [classLevel, setClassLevel] = useState("เลือกระดับชั้น");
  const [description, setDescription] = useState("คำอธิบายห้องเรียน");
  const [cookie] = useCookies(["access_token"]);

  const handleClassLevelChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setClassLevel(event.target.value); // Update the selected class level
  };

  const handleCreateAndEdit = async () => {
    // Handle create action
    console.log("Class Name:", className);
    console.log("Class Level:", classLevel);
    console.log("Description:", description);

    const okStatus: Number[] = [200, 201, 202];
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.access_token}`,
    };
    if (!isEdit) {
      const body = {
        class_name: className,
        level: classLevel,
        class_desc: description,
      };
      const response = await axios.post(
        "https://backend.otudy.co/api/v1/class/create_class",
        body,
        {
          headers: headers,
        }
      );
      if (!okStatus.includes(response.status)) {
        console.error("Error: Something gone wrong.");
        // Show modal here
      }
      else {
        Swal.default.fire({
          icon: 'success',
          title: 'เพิ่มห้องเรียนสำเร็จ',
          text: 'เพิ่มห้องเรียนเสร็จสิ้น'
        });
      }
    } else {
      const body = {
        id: id,
        class_name: className,
        level: classLevel,
        class_desc: description,
      };
      const response = await axios.put(
        "https://backend.otudy.co/api/v1/class/update_class_detail",
        body,
        {
          headers: headers,
        }
      );
      if (!okStatus.includes(response.status)) {
        console.error("Error: Something gone wrong");
        // show modal here
      }
      else {
        Swal.default.fire({
          icon: 'success',
          title: 'แก้ไขห้องเรียนเสร็จสิ้น',
          text: 'แก้ไขห้องเรียนเสร็จสิ้น'
        })
      }
    }
    onClose();
  };
  useEffect(() => {
    setClassName(name);
    setClassLevel(level);
    setDescription(currentDescription);
  }, [id, isEdit])
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? "แก้ไขข้อมูลห้องเรียน" : "เพิ่มห้องเรียน"}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="รหัสห้องเรียน (ไม่ต้องกรอก)"
            value={id}
            disabled={true}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="ชื่อห้องเรียน"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Select
            label="ระดับชั้น"
            value={classLevel}
            onChange={handleClassLevelChange}
            fullWidth
            renderValue={(value => value = classLevel)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem disabled value="">
              <em>เลือกระดับชั้น</em>
            </MenuItem>
            <MenuItem value="อนุบาล">อนุบาล</MenuItem>
            <MenuItem value="ประถมต้น">ประถมต้น</MenuItem>
            <MenuItem value="ประถมปลาย">ประถมปลาย</MenuItem>
            <MenuItem value="มัธยมต้น">มัธยมต้น</MenuItem>
            <MenuItem value="มัธยมปลาย">มัธยมปลาย</MenuItem>
          </Select>
          <TextField
            label="คำอธิบาย"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
          marginRight: 2,
          marginLeft: 2,
        }}
      >
        <Button onClick={onClose} color="primary" variant="outlined">
          ยกเลิก
        </Button>
        {isEdit ? (
          <Button
            onClick={handleCreateAndEdit}
            color="primary"
            variant="contained"
            sx={{ minWidth: "100px" }}
            disabled={!className || classLevel == "class" || !description}
          >
            แก้ไข
          </Button>
        ) : (
          <Button
            onClick={handleCreateAndEdit}
            color="primary"
            variant="contained"
            sx={{ minWidth: "100px" }}
            disabled={!className || classLevel == "class" || !description}
          >
            เพิ่ม
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ClassForm;
