import React from "react";
import HeaderBar from "../components/HeaderBar";
import "../styles/HeaderBar.css";
import "../styles/Section.css"; // Import your custom CSS file for the Section component

const Section = () => {
  return (
    <div>
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="content">
        <div className="left-menu"></div>
        <div className="section-content">
          <h1>Section</h1>
          <p>
            This is a basic example of a React Section page in your application.
            You can customize this page with your own content and components.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
