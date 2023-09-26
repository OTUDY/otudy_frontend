import React from "react";
import { ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useClassSubSectionContext } from "../context/ClassSubSectionContext";

interface ClassSubSectionSelectProps {
  classId: string;
}

const ClassSubSectionSelect: React.FC<ClassSubSectionSelectProps> = ({
  classId,
}) => {
  const navigate = useNavigate();
  const { selectedItem, setSelectedItem } = useClassSubSectionContext();

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);

    const encodedClassId = encodeURIComponent(classId);

    // Navigate based on the selected item
    if (item === "student") {
      navigate(`/class/${encodedClassId}`);
    } else if (item === "mission") {
      navigate(`/class/${encodedClassId}/mission`);
    } else if (item === "reward") {
      navigate(`/class/${encodedClassId}/reward`);
    } else if (item === "leaderboard") {
      navigate(`/class/${encodedClassId}/leaderboard`);
    }
  };

  return (
    <ButtonGroup variant="outlined" aria-label="class-subsection-select">
      <Button
        onClick={() => handleMenuItemClick("student")}
        variant={selectedItem === "student" ? "contained" : "outlined"}
      >
        Student
      </Button>
      <Button
        onClick={() => handleMenuItemClick("mission")}
        variant={selectedItem === "mission" ? "contained" : "outlined"}
      >
        Mission
      </Button>
      <Button
        onClick={() => handleMenuItemClick("reward")}
        variant={selectedItem === "reward" ? "contained" : "outlined"}
      >
        Reward
      </Button>
      <Button
        onClick={() => handleMenuItemClick("leaderboard")}
        variant={selectedItem === "leaderboard" ? "contained" : "outlined"}
      >
        Leaderboard
      </Button>
    </ButtonGroup>
  );
};

export default ClassSubSectionSelect;
