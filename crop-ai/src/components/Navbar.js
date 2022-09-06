import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import {
  Button,
  Grid,
  Stack,
  Alert,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import "./navbar.css";
import { border } from "@mui/system";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function NavBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //function to logout user
  async function handleLogout() {
    setError(" ");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  if (props.typeOfBar === "mainNav") {
    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <ElevationScroll {...props}>
            <AppBar
              position="static"
              sx={{
                background: "rgba(255, 255, 255, 0.6)",
                // border: "4px solid green",
              }}
            >
              <Grid container spacing={2}>
                <Grid item lg={2}>
                  <Typography
                    sx={{
                      padding: "1em",
                    }}
                  >
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "1.5rem",
                      }}
                      to="/"
                    >
                      <span>
                        Name-<span style={{ color: "#308335" }}>A</span>-Crop
                      </span>
                    </Link>
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography
                    sx={{
                      padding: "1em",
                    }}
                  >
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "1.5rem",
                      }}
                      to="/"
                    >
                      <span>
                        Name-<span style={{ color: "#308335" }}>A</span>-Crop
                      </span>
                    </Link>
                  </Typography>
                </Grid>

                <Grid item lg={6} sx={{}}>
                  <Container maxWidth="xl">
                    <Toolbar
                      disableGutters
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {/* responsive appbar*/}

                      <Box
                        sx={{
                          flexGrow: 1,
                          display: { xs: "flex", md: "none" },
                        }}
                      >
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                            display: { xs: "block", md: "none" },
                          }}
                        >
                          <Grid
                            container
                            direction={"column"}
                            spacing={4}
                            sx={{
                              display: { md: "flex" },
                              justifyContent: "space-between",
                            }}
                          >
                            <Grid item>
                              <Link to="/about-us">
                                <span
                                  style={{
                                    textDecoration: "none",
                                    padding: "0.5em",
                                    color: "#000000",
                                  }}
                                >
                                  About
                                </span>
                              </Link>
                            </Grid>
                            <Grid item>
                            <a
                              sx={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              href="http://127.0.0.1:5000/"
                            >
                              <span>Predict</span>
                            </a>
                            </Grid>
                            <Grid item>
                              <Link to="/contact">
                                <span
                                  style={{
                                    textDecoration: "none",
                                    padding: "0.5em",
                                    color: "#000000",
                                  }}
                                >
                                  Contact
                                </span>
                              </Link>
                            </Grid>

                            <Grid item>
                              <Link to="/signup">
                                <span
                                  style={{
                                    textDecoration: "none",
                                    padding: "0.5em",
                                    color: "#000000",
                                  }}
                                >
                                  {" "}
                                  SIGNUP
                                </span>
                              </Link>
                            </Grid>
                            <Grid item>
                              <Link to="/login">
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#308335",
                                    padding: "0.5em",
                                  }}
                                >
                                  LOGIN
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </Menu>
                      </Box>

                      {/* open appbar*/}

                      <Box
                        sx={{
                          display: { xs: "none", md: "flex" },
                        }}
                      >
                        <Grid container direction={"row"} sx={{}}>
                          <Grid
                            item
                            sx={{
                              padding: "1em",
                            }}
                          >
                            <Link
                              style={{ color: "white", textDecoration: "none" }}
                              to="/about-us"
                            >
                              <span
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                              >
                                About
                              </span>
                            </Link>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              padding: "1em",
                            }}
                          >
                            <a
                              sx={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              href="http://127.0.0.1:5000/"
                            >
                              <span>Predict</span>
                            </a>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              padding: "1em",
                            }}
                          >
                            <Link
                              style={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              to="/contact"
                            >
                              <span>Contact</span>
                            </Link>
                          </Grid>

                          <Grid
                            item
                            sx={{
                              padding: "1em",
                            }}
                          >
                            <Link
                              style={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              to="/signup"
                            >
                              <span> SIGNUP</span>
                            </Link>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              padding: "1em",
                            }}
                          >
                            <Link
                              style={{
                                color: "white",
                                textDecoration: "none",
                                padding: "1em",
                              }}
                              to="/login"
                            >
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  backgroundColor: "#308335",
                                }}
                              >
                                LOGIN
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </Toolbar>
                  </Container>
                </Grid>
              </Grid>
            </AppBar>
          </ElevationScroll>
          <Toolbar />
        </React.Fragment>
      </div>
    );
  } else if (props.typeOfBar === "dashNav") {
    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <ElevationScroll {...props}>
            <AppBar
              position="static"
              sx={{
                background: "rgba(255, 255, 255, 0.6)",
                // border: "4px solid green",
              }}
            >
              <Grid container spacing={2}>
                <Grid item lg={2}>
                  <Typography
                    sx={{
                      padding: "1em",
                    }}
                  >
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "1.5rem",
                      }}
                      to="/"
                    >
                      <span>
                        Name-<span style={{ color: "#308335" }}>A</span>-Crop
                      </span>
                    </Link>
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography
                    sx={{
                      padding: "1em",
                    }}
                  >
                    <Link
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "1.5rem",
                      }}
                      to="/"
                    >
                      <span>
                        Name-<span style={{ color: "#308335" }}>A</span>-Crop
                      </span>
                    </Link>
                  </Typography>
                </Grid>

                <Grid item lg={6} sx={{}}>
                  <Container maxWidth="xl">
                    <Toolbar
                      disableGutters
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {/* responsive appbar*/}

                      <Box
                        sx={{
                          flexGrow: 1,
                          display: { xs: "flex", md: "none" },
                        }}
                      >
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                            display: { xs: "block", md: "none" },
                          }}
                        >
                          <Grid
                            container
                            direction={"column"}
                            spacing={4}
                            sx={{
                              display: { md: "flex" },
                              justifyContent: "space-between",
                            }}
                          >
                            <Grid item>
                              <Link to="/about-us">
                                <span
                                  style={{
                                    textDecoration: "none",
                                    padding: "0.5em",
                                    color: "#000000",
                                  }}
                                >
                                  About
                                </span>
                              </Link>
                            </Grid>
                            <Grid item>
                            <a
                              sx={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              href="http://127.0.0.1:5000/"
                            >
                              <span>Predict</span>
                            </a>
                            </Grid>
                            <Grid item>
                              <Link to="/contact">
                                <span
                                  style={{
                                    textDecoration: "none",
                                    padding: "0.5em",
                                    color: "#000000",
                                  }}
                                >
                                  Contact
                                </span>
                              </Link>
                            </Grid>

                            <Grid item>
                              <Link to="/signup">
                                <span
                                  style={{
                                    textDecoration: "none",
                                    padding: "0.5em",
                                    color: "#000000",
                                  }}
                                >
                                  {" "}
                                  SIGNUP
                                </span>
                              </Link>
                            </Grid>
                            <Grid item>
                              <Link to="/login">
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#308335",
                                    padding: "0.5em",
                                  }}
                                >
                                  LOGIN
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </Menu>
                      </Box>

                      {/* open appbar*/}

                      <Box
                        sx={{
                          display: { xs: "none", md: "flex" },
                        }}
                      >
                        <Grid container direction={"row"} sx={{}}>
                          <Grid
                            item
                            sx={{
                              padding: "1em",
                            }}
                          >
                            <Link
                              style={{ color: "white", textDecoration: "none" }}
                              to="/about-us"
                            >
                              <span
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                              >
                                About
                              </span>
                            </Link>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              padding: "1em",
                            }}
                          >
                            <a
                              sx={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              href="http://127.0.0.1:5000/"
                            >
                              <span>Predict</span>
                            </a>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              padding: "1em",
                            }}
                          >
                            <Link
                              style={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              to="/contact"
                            >
                              <span>Contact</span>
                            </Link>
                          </Grid>

                          <Grid
                        item
                        sx={{
                         
                          padding: "1em",
                        }}
                      >
                        <Button variant="outlined" onClick={handleLogout}>
                          LOGOUT
                        </Button>
                      </Grid>
                        </Grid>
                      </Box>
                    </Toolbar>
                  </Container>
                </Grid>
              </Grid>
            </AppBar>
          </ElevationScroll>
          <Toolbar />
        </React.Fragment>
      </div>
    );
  }
}
