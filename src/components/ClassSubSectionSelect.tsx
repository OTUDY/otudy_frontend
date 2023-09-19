import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ClassSubSectionSelectProps {
  classId: string;
}

const ClassSubSectionSelect: React.FC<ClassSubSectionSelectProps> = ({
  classId,
}) => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState("student");

  const handleMenuItemChange = (event: SelectChangeEvent<string>) => {
    const selectedItem = event.target.value as string;
    setSelectedMenuItem(selectedItem);

    // Navigate to the Mission page if "Mission" is selected
    if (selectedItem === "mission") {
      navigate(`/class/${classId}/mission`);
    }
  };

  return (
    <Select
      value={selectedMenuItem} // Set the value based on the selectedMenuItem
      onChange={handleMenuItemChange}
      sx={{ ".MuiOutlinedInput-notchedOutline": { border: 0 } }}
    >
      <MenuItem value="student">Student</MenuItem>
      <MenuItem value="mission">Mission</MenuItem>
      <MenuItem value="reward">Reward</MenuItem>
      <MenuItem value="leaderboard">Leaderboard</MenuItem>
    </Select>
  );
};

export default ClassSubSectionSelect;
