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
import { v1 as uuidv1, v1 } from "uuid";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";

export default function SignupPage() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, verifyEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userId = "ADM-" + v1(emailRef.current.ref);
    console.log(userId);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      let email = emailRef.current.value;
      let userName = userNameRef.current.value;
      let password = passwordRef.current.value;

      await signup(email, password, userId, userName);
      verifyEmail();
      alert("New Admin Added!!");
      navigate("/login");
    } catch {
      setError("Failed to create account");
    }
    setLoading(false);
  }

  return (
    <div>
      <NavBar typeOfBar="mainNav" />

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
                ADMIN SIGN UP
              </Typography>

              <Stack alignItems={"center"} spacing={6}>
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
                    inputRef={userNameRef}
                    required
                    id="filled-required"
                    label="UserName"
                    placeholder="User Name"
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
                <div>
                  <TextField
                    inputRef={passwordConfirmRef}
                    id="filled-password-input"
                    label="ConfirmPassword"
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
                    Already have an account?{" "}
                    <span style={{ color: "#308335" }}>
                      {" "}
                      <Link to="/login">Login</Link>{" "}
                    </span>
                  </Typography>
                </div>
              </Stack>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
