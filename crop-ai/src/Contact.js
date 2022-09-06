import { Grid, TextField, InputLabel, TextareaAutosize } from "@mui/material";
import React, { useRef } from "react";

import emailjs from "@emailjs/browser";

import NavBar from "./components/Navbar";

export default function Contact() {
    const sendEmail = (e) => {
      e.preventDefault();

      emailjs
        .sendForm(
          "service_fd0n04k",
          "template_pxego3j",
          form.current,
          "rX1vSkhCVg5lqMoyj"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Message sent SUCCESS!");
          },
          (error) => {
            console.log(error.text);
          }
        );
    };
  const form = useRef();
  return (
    <div>
      <NavBar typeOfBar ="mainNav" />
      <Grid container direction={"row"} justifyContent="center" spacing={2}>
        <Grid item lg={6}>
          <h2 style={{ color: "#ffffff" }}>Find Us Here!</h2>
          <iframe
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            id="gmap_canvas"
            src="https://maps.google.com/maps?width=550&amp;height=261&amp;hl=en&amp;q=USIU%20rd%20Nairobi+(AgriMatch%20)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            width="80%"
            height="80%"
            frameborder="0"
          ></iframe>{" "}
          <script
            type="text/javascript"
            src="https://embedmaps.com/google-maps-authorization/script.js?id=0964616d4509c4d3dcd7972a0b52542fe8a9f927"
          ></script>
        </Grid>
        <Grid item lg={4}>
          <div
            style={{
              color: "white",
              background: "transparent",
              padding: "1em",
              border:"5px solid green",
              borderRadius: "1.2em",
            }}
          >
            <form ref={form} onSubmit={sendEmail}>
              <h2>Contact Us</h2>

              <TextField
                label="Name"
                type="text"
                name="user_name"
                variant="filled"
                fullWidth
                margin="normal"
                sx={{
                  background: "rgba(48, 131, 53, 0.8)",
                }}
              >
                {" "}
              </TextField>
              <br></br>
              <TextField
                label="Email"
                type="email"
                name="user_email"
                variant="filled"
                fullWidth
                margin="normal"
                sx={{
                  background: "rgba(48, 131, 53, 0.8)",
                }}
              >
                {" "}
              </TextField>
              <br></br>
              <br />
              <TextField
                margin="normal"
                label="Message"
                multiline
                rows={8}
                name="message"
                variant="filled"
                fullWidth
                sx={{
                  background: "rgba(48, 131, 53, 0.8)",
                }}
              ></TextField>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0.5em",

                }}
              >
                <TextField
                  type="submit"
                  value="Submit"
                  sx={{
                    width: "40%",
                    background: "rgba(48, 131, 53, 0.8)",
                  }}
                />
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
