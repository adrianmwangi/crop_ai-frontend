import React, { useEffect } from "react";
import NavBar from "./components/Navbar";
import { Grid, Typography } from "@mui/material";
import { getAnalytics, logEvent } from "firebase/analytics";
import seedling from "./assets/images/seedling.jpg";

import "./home.css";

export default function Home() {
  const analytics = getAnalytics();

  useEffect(() => {
    logEvent(analytics, "homepage_visited");
  }, []);
  return (
    <div>
      <NavBar typeOfBar="mainNav" />
      <Grid
        container
        justifyContent="center"
        sx={{
          padding: "3em",
          // border: "3px solid orange",
        }}
      >
        <Grid
          item
          lg={6}
          sx={{
            padding: "3em",
            // border: "4px solid pink",
          }}
        >
          <Typography variant="h2" color={"#ffffff"}>
            Check out our <span style={{ color: "#308335" }}>NEW</span> crop
            recognition software
          </Typography>
        </Grid>
        <Grid
          item
          lg={6}
          justifyContent={"center"}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            // border: "4px solid pink",
          }}
        >
          <img src={seedling} alt="seedling_image" className="home_img" />
        </Grid>
      </Grid>
    </div>
  );
}
