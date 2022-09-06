import {
  Grid,
  Typography,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import React, { useRef, useState } from "react";
import NavBar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";

export default function SignupPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, readUserData } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let email = emailRef.current.value;
      console.log(email);
      console.log(password)

      let password = passwordRef.current.value;

      await login(email, password);
      let x = await readUserData(email);

      if (x === "client") {
        console.log("logged in as client");
        navigate("/user-dash");
      } else if (x === "admin") {
        console.log("logged in as Admin");
        navigate("/admin-dash");
      }
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <div>
   
        <NavBar typeOfBar ="mainNav"/>
      
      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        sx={{
          padding: "5em",
        }}
      >
        <Grid item lg={4}>
          <Typography variant="h2" color={"#ffffff"}>
            Check out our <span style={{ color: "#308335" }}>NEW</span> crop
            recognition software
          </Typography>
        </Grid>
        <Grid item lg={5}>
          <div>
            <form className="login_form">
              <Typography
                variant="h2"
                textAlign={"center"}
                sx={{
                  marginBottom: "1em",
                  color: "#ffffff",
                }}
              >
                LOGIN
              </Typography>

              <Stack alignItems={"center"} spacing={4}>
                <div>
                  <TextField
                    inputRef={emailRef}
                    required
                    id="filled-required"
                    label="Email"
                    placeholder="Email"
                    variant="filled"
                    sx={{
                      background: "#ffffff",
                      borderRadius: "10rem",
                      width: "20em",
                    }}
                  />
                </div>
                <div>
                  <TextField
                    inputRef={passwordRef}
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    sx={{
                      background: "#ffffff",
                      borderRadius: "10rem",
                      width: "20em",
                    }}
                  />
                </div>

                <div> {error && <Alert severity="error"> {error} </Alert>}</div>
                <div className="form_button">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
                <div>
                  <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    Don't have an account?
                    <Link to="/signup">
                      <span
                        style={{ color: "#308335", textDecoration: "none" }}
                      >
                        Signup
                      </span>
                    </Link>
                  </Typography>
                </div>
                <Link to={"/forgot-password"}>
                  <div>
                    <span style={{ color: "#308335", textDecoration: "none" }}>
                      {" "}
                      Forgot Password
                    </span>
                  </div>
                </Link>
              </Stack>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
