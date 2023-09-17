import React from "react";
import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";

const ClassRoom = () => {
  const { classId } = useParams();
  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="classroom-container">
        <div className="classroom-content">
          <h1>Class ID: {classId}</h1>
        </div>
      </div>
    </div>
  );
};

export default ClassRoom;
