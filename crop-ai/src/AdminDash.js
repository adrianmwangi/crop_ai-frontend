import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import NavBar from "./components/Navbar";
import { Link } from "react-router-dom";
import { getAnalytics } from "firebase/analytics";
import "./adminDash.css";
import ManageUsers from "./ManageUsers";

export default function AdminDash() {

  const [show, setShow] = useState(false);

  function handleDeleteUsr() {}

  return (
    <>
      <NavBar typeOfBar="dashNav" />
      <Grid container>
        <Grid
          item
          xs={4}
          sx={{
            // border: "1em dotted yellow",
            padding: "2em",
          }}
        >
          <div className="admin_widget">
            <List component="nav">
              <ListItem>
                <ListItemText>ADMIN DASHBOARD</ListItemText>
              </ListItem>
              {}
              <ListItem button divider className="list_btn">
                <ListItemText primary="View Users" />
              </ListItem>
              <Link to="/signup">
                <ListItem button divider className="list_btn">
                  <ListItemText primary="Add Users" />
                </ListItem>
              </Link>
              <a href="http://127.0.0.1:5000/">
                <ListItem button divider className="list_btn">
                  <ListItemText primary="Check Image" />
                </ListItem>
              </a>
            </List>
          </div>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            // border: "1em solid yellow",
            padding: "2em",
          }}
        >
          <ManageUsers />
        </Grid>
      </Grid>
    </>
  );
}
