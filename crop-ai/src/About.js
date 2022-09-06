import React,{useEffect} from "react";
import { Grid, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import { getAnalytics, logEvent } from "firebase/analytics";
import "./about.css";
import Slideshow from "./Slideshow";

export default function About() {
  const analytics = getAnalytics()

  useEffect(()=>{
   logEvent( analytics, "aboutPage_visited")
   
  },[])
  return (
    <div>
      <Navbar typeOfBar="mainNav" />
      <Grid container direction="column"sx={{padding:"1em"}}> 
        <Grid item>
          <div className="about_head">
            <Typography variant="h2">ABOUT US</Typography>
          </div>
        </Grid>
      
          <Grid
            item
            sx={{
              // border: "1px solid orange",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                background: "#308335",
                opacity: "80%",
                padding: "1em",
                color: "#ffffff",
              }}
            >
              For farms with low mechanization, crop harvesting is the most
              labor-intensive activity of the season. Harvesting is not limited
              to just fields but includes orchards, vineyards, and plantations
              too. Name-A-Crop makes it easier for farmers to identify crops.
              this process can be implemented at various parts of the farming
              value chain. Most farmers are using the system during the
              packaging process in order to identify the type of crop that is
              being packaged. This helps farmers reduce labour intensive jobs
              and focus on higher-priority duties.
            </Typography>
          </Grid>
        

        <Grid
          item
          xs={6}
          sx={{
            padding: "0.5em",
            // border: "1px solid orange",
          }}
        >
          <Slideshow />
        </Grid>
      </Grid>
    </div>
  );
}
