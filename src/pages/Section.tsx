import React from "react";
import HeaderBar from "../components/HeaderBar";
import ClassTable from "../components/ClassTable";

const Section = () => {
  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="content">
        <div className="section-content">
          <h1>Class</h1>
          <p>
            This is a basic example of a React Section page in your application.
            You can customize this page with your own content and components.
          </p>
          <ClassTable />
        </div>
      </div>
    </div>
  );
};

export default Section;
