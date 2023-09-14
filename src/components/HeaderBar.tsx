import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Grid from "@mui/material/Grid";

const HeaderBar: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Name logo</Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit" aria-label="Notifications">
                <NotificationsIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Profile">
                <AccountCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderBar;
