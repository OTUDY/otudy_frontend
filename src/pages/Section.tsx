import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import ClassTable from "../components/ClassTable";
import ClassForm from "../components/ClassForm";
import { Button, Grid } from "@mui/material";

const Section = () => {
  const [isAddClassFormOpen, setIsAddClassFormOpen] = useState(false);

  const handleOpenAddClassForm = () => {
    setIsAddClassFormOpen(true);
  };

  const handleCloseAddClassForm = () => {
    setIsAddClassFormOpen(false);
  };

  return (
    <div className="page-container">
      <div className="header-bar">
        <HeaderBar />
      </div>

      <div className="section-container">
        <div className="section-content">
          <Grid container spacing={2} alignItems="center" marginTop={"20px"}>
            <Grid item xs={12} md={6}>
              <h1>Section</h1>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddClassForm}
                sx={{ marginBottom: 2 }}
              >
                Add Class
              </Button>
            </Grid>
          </Grid>
          <ClassTable />
        </div>
      </div>

      <ClassForm open={isAddClassFormOpen} onClose={handleCloseAddClassForm} isEdit={false} />
    </div>
  );
};

export default Section;
