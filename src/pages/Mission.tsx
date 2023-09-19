import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { useParams } from "react-router-dom";

const Mission = () => {
  const { classId } = useParams();
  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="classroom-container">
        <div className="classroom-content">
          <h2>Class {classId} / Mission</h2>
        </div>
      </div>
    </div>
  );
};

export default Mission;
