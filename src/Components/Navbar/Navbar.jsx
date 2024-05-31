import {Box,Button,Drawer,IconButton,Link,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Toolbar,Typography,} from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import BookingsIcon from "../../Images/icons/BookingsIcon";
import HomeIcon from "../../Images/icons/HomeIcon";
import SettingsIcon from "../../Images/icons/SettingsIcon";
import TripsIcon from "../../Images/icons/TripsIcon";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import LanguageToggleButton from "../../Localization/LanguageToggleButton";
import { colors } from "../../colors";
import { useTranslation } from "react-i18next";
import { useAuth  } from "../../Contexts/authContext ";
import { jwtDecode } from "jwt-decode";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  color: "white",
  backgroundColor: "white",
}));
const styles = {
  drawertxt: {
    fontFamily: "Roboto",
    fontWeight: "500",
    color: "#362566",
    fontSize: "1rem",
  },
  Trollii: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "600",
    color: "#5F41B3",
    fontSize: "1.5rem",
    marginLeft: "auto",
    marginRight: "0.667em",
  },
};
const Navbar = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  
  const token = localStorage.getItem("token");
  let user = null;
  let userRole = "";

  if (token) {
    try {
      user = jwtDecode(token);
      userRole = user.role;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goToProfile = () => {
    if (user) {
      navigate("/profile");
    }
  };

  const goTODashboard = () => {
    if(userRole === "organizer" || userRole === "admin") {
      navigate("/organizer/dashboard");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box>
      <Box
        sx={{
          p: "14px 80px",
          backgroundColor: "white",
          boxShadow: "0px 2px 8px rgba(38, 36, 131, 0.05)",
          alignItems: "center",
          display: { md: "flex", sm: "none", xs: "none" },
        }}
      >
        <Typography
          onClick={() => {
            navigate("/");
          }}
          align="left"
          style={{
            cursor: "pointer",
            color: "#5F41B3",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: 35,
            lineHeight: "42px",
            letterSpacing: -0.3,
          }}
        >
          Trollii
        </Typography>

        <Box
          md={5}
          sm={5}
          xs={0}
          sx={{
            display: {
              xs: "none",
              md: "flex",
              sm: "flex",
            },
            marginLeft: "auto",
            marginRight: "3.5%",
            alignItems: "center",
          }}
        >
          {[
            { label: t("Tours"), path: "/search" },
            { label: t("navbar.bookings"), path: "/bookings" },
            { label: t("navbar.favourites"), path: "/favourites" },
          ].map(({ label, path }) => {
            return (
              <Link
                key={uuid()}
                onClick={() => {
                  if (path) {
                    navigate(path);
                  }
                }}
                sx={{
                  fontFamily: "Roboto",
                  color: "#362566",
                  cursor: "pointer",
                  marginRight: "3.5vw",
                }}
                underline="none"
              >
                {label}
              </Link>
            );
          })}

          <LanguageToggleButton />
        </Box>

        <Box
          md={1}
          sm={1}
          xs={0}
          sx={{
            display: { xs: "none", md: "block", sm: "block" },
          }}
        >
          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                style={{ backgroundColor: "white" }}
                id="dropdown-basic"
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: 18,
                    textAlign: "center",
                    textTransform: "none",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faCircleUser} />{" "}
                  {user.firstName}
                  <FontAwesomeIcon icon={faAngleDown} />
                </Typography>{" "}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                
                {
                  userRole === "organizer" || userRole === "admin" ? <Dropdown.Item onClick={goTODashboard}>Dashboard</Dropdown.Item> : <Dropdown.Item onClick={goToProfile}>Profile</Dropdown.Item>
                }
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              onClick={() => {
                navigate("/signInUser");
              }}
              style={{
                backgroundColor: "#5F41B3",
                borderRadius: "10px",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "1rem",
                textTransform: "none",
                color: "white",
                padding: "11px 32px",
                lineHeight: "19px",
              }}
            >
              {t("navbar.login")}
            </Button>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: {
            md: "none",
            sm: "flex",
            xs: "flex",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100vw",
          }}
        >
          <AppBar
            sx={{
              boxShadow: "0px 2px 8px rgba(38, 36, 131, 0.05)",
              position: "unset",
              width: "100%",
              display: "flex",
            }}
            color="transparent"
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
                sx={{ color: purple[900] }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: "600",
                  fontSize: "1.25rem",
                  color: "#5F41B3",
                }}
              >
                Trollii
              </Typography>

              {user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    style={{ backgroundColor: "white" }}
                    id="dropdown-basic"
                  >
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: 18,
                        textAlign: "center",
                        textTransform: "none",
                        color: "black",
                        cursor: "pointer",
                        borderRadius: "50%",
                        padding: "10px",
                        backgroundColor: colors.violet,
                        color: colors.background,
                        width: "40px",
                        height: "40px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {localStorage.getItem("firstName")
                        ? localStorage.getItem("firstName").toUpperCase()[0]
                        : "User"}
                    </Typography>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item href="/profile">
                      Account Settings
                    </Dropdown.Item> */}
                    {userRole === "organizer" || userRole === "admin" ? (
                      <Dropdown.Item onClick={goTODashboard}>
                        Dashboard
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item onClick={goToProfile}>Profile</Dropdown.Item>
                      
                    )}
                    <Dropdown.Item
                      // href="#/logged out"

                      onClick={() => {
                        // setToken(localStorage.removeItem("token"));
                        localStorage.removeItem("token");
                        // localStorage.removeItem("firstName");
                        navigate("/signInUser");

                      }}
                    >
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <IconButton
                  aria-label="login in"
                  edge="end"
                  onClick={() => {
                    navigate("/signInUser");
                  }}
                  sx={{ color: purple[900] }}
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              flexShrink: 0,
              "& .MuiDrawer-paper": { width: "70vw", maxWidth: "400px" },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <HighlightOffRoundedIcon sx={{ color: purple[900] }} />
              </IconButton>
              <Typography paddingLeft={15} sx={styles.Trollii}>
                Trollii
              </Typography>
            </DrawerHeader>
            <Box sx={{ width: "100%", bgcolor: "white" }}>
              <List sx={{ p: 0 }}>
                <div className="p-3">
                  <LanguageToggleButton />
                </div>
                {[
                  {
                    icon: <HomeIcon />,
                    path: "/",
                    primary: t("navbar.home"),
                    logOut: false,
                  },
                  {
                    icon: <TripsIcon />,
                    path: "/favourites",
                    primary: t("navbar.favourites"),
                    logOut: false,
                  },
                  {
                    icon: <BookingsIcon />,
                    path: "/bookings",
                    primary: t("navbar.bookings"),
                    logOut: false,
                  },
                  {
                    icon: (
                      <img
                        alt="logout icon"
                        src={require("../../Images/Navbar/logout.png")}
                        onClick={() => {
                          // setToken(localStorage.removeItem("token"));
                          localStorage.removeItem("token");
                          setOpen(false);
                        }}
                      />
                    ),
                    path: "/",
                    primary: t("navbar.logout"),
                    logOut: true,
                  },
                ].map(({ icon, path, primary, logOut }) => {
                  return (
                    <ListItem
                      key={uuid()}
                      sx={{ p: 0, paddingBottom: !logOut && "5px" }}
                    >
                      <ListItemButton>
                        <ListItemIcon
                          sx={{ minWidth: "unset", marginRight: "10px" }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          sx={{ cursor: path && "pointer" }}
                          onClick={() => {
                            if (path) {
                              navigate(`${path}`);
                            }
                          }}
                          primaryTypographyProps={{
                            ...styles.drawertxt,
                            color: logOut && "#FF3636",
                          }}
                          primary={primary}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
