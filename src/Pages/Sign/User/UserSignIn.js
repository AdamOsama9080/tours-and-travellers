import {
  Box,
  Button,
  Checkbox,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignPhotos from "../SignPhotos";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

export default function UserSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const history = useNavigate();

  // const token = localStorage.getItem("token");

  // let decodedToken = null;
  // if (token) {
  //   decodedToken = jwtDecode(token);
  //   console.log("Decoded Token:", decodedToken);
  //   localStorage.setItem("role", decodedToken.role);
  //   localStorage.setItem("email", decodedToken.email);
  //   localStorage.setItem("id", decodedToken.id);
  //   localStorage.setItem("firstName", decodedToken.firstName);
  //   localStorage.setItem("lastName", decodedToken.lastName);
  // }

  // React.useEffect(() => {
  //   if (token) {
  //     history("/");
  //   }
  // }, [token, history]);

  const handleSignUp = (event) => {
    event.preventDefault();
    history("/signUpUser");
  };

  const handleResetLink = (event) => {
    event.preventDefault();
    history("/resetLinkUser");
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post(
        "https://apis-2-4nek.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      const decodedToken = jwtDecode(token);

      localStorage.setItem("token", token);
      localStorage.setItem("role", decodedToken.role);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("id", decodedToken.id);
      localStorage.setItem("firstName", decodedToken.firstName);
      localStorage.setItem("lastName", decodedToken.lastName);

      if (decodedToken.role === "user") {
        history("/");
      } else if (decodedToken.role === "organizer") {
        history("/organizer/dashboard");
        return;
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100vw" : "38vw",
          display: "flex",
          alignItems: isMobile ? "start" : "center",
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              margin: { lg: "0.875em 0 0 5em", md: "0.875em 0 0 2em" },
              position: "fixed",
              top: "0",
            }}
          >
            <Typography
              fontFamily="Roboto"
              fontWeight="600"
              fontSize="2.19rem"
              color="#5F41B2"
              lineHeight="1.2em"
            >
              Trollii
            </Typography>
            <Typography
              fontFamily="Roboto"
              fontWeight="500"
              fontSize="0.875rem"
              color="#362566"
              lineHeight="1.21em"
            >
              Travel Admin Dashboard
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "91%" : "60%",
            minWidth: "20.5em",
            marginTop: isMobile ? "2.5em" : "0",
          }}
        >
          {!isMobile && (
            <>
              <Typography
                fontFamily="Roboto"
                fontWeight="500"
                fontSize="2.5rem"
                color="#362566"
                lineHeight="1.175em"
                marginBottom="0.2em"
              >
                Welcome Back
              </Typography>
              <Typography
                fontFamily="Roboto"
                fontSize="0.875rem"
                color="#5D5C66"
                lineHeight="1.214em"
                marginBottom="2.286em"
              >
                Let's Set Up Your Website
              </Typography>
            </>
          )}
          <Typography
            fontFamily="Roboto"
            fontWeight="500"
            fontSize="1.25rem"
            color="#362566"
            lineHeight="1.2em"
            marginBottom={isMobile ? "1.6em" : "0.8em"}
          >
            Login to your account
          </Typography>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleFormSubmit}>
            <label
              style={{
                color: "#5D5C66",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "0.875rem",
                lineHeight: "1.214em",
                marginBottom: "0.57em",
                textAlign: "left",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Example@gmail.com"
              id="email"
              className="form-control"
              style={{
                color: "#5D5C66",
                fontFamily: "Roboto",
                marginBottom: "1em",
                borderRadius: "0.9375em",
                height: "3em",
                border: "1px solid #C4C4C4",
                padding: "1em",
                backgroundColor: "#FBFBFB",
              }}
            />
            <label
              style={{
                color: "#5D5C66",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "0.875rem",
                lineHeight: "1.214em",
                marginBottom: "0.57em",
                textAlign: "left",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••"
                id="password"
                style={{
                  fontFamily: "Roboto",
                  borderRadius: "0.9375em",
                  height: "3em",
                  border: "1px solid #C4C4C4",
                  padding: "1em",
                  backgroundColor: "#FBFBFB",
                  color: "#5D5C66",
                  marginBottom: "1.1875em",
                  fontSize: "1rem",
                  width: "100%",
                }}
              />
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  lineHeight: "1.1875em",
                  color: "#5F41B2",
                  margin: "0",
                  cursor: "pointer",
                  position: "absolute",
                  top: "0.9375em",
                  right: "1em",
                }}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? "hide" : "show"}
              </p>
            </div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "0.4375em",
              }}
            >
              <Checkbox
                id="remember-me"
                sx={{
                  width: "1.125em",
                  height: "1.125em",
                  marginRight: "0.6875em",
                }}
              />
              <label
                htmlFor="remember-me"
                style={{
                  color: "#5D5C66",
                  fontFamily: "Roboto",
                  fontSize: "0.875rem",
                  lineHeight: "1.214em",
                  margin: "0",
                }}
              >
                Remember me
              </label>
              <p
                onClick={handleResetLink}
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  lineHeight: "1.214em",
                  textDecoration: "underline",
                  color: "#212427",
                  margin: "0 0 0 auto",
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </p>
            </Box>
            <button
              type="submit"
              className="btn col-md-12"
              style={{
                width: "100%",
                height: "3em",
                borderRadius: "0.9375em",
                backgroundColor: "#5F41B2",
                color: "#FFFFFF",
                fontFamily: "Roboto",
                fontSize: "1rem",
                textTransform: "none",
                margin: "2em 0",
              }}
            >
              Log in
            </button>
          </form>
          <Divider
            sx={{
              fontFamily: "Roboto",
              fontSize: "0.875rem",
              color: "#5D5C66",
              marginBottom: "1.5em",
            }}
          >
            Or
          </Divider>
          <div className="m-auto text-center">
            <GoogleLogin
              clientId="46424832078-grv3nhik7b2bii270htb8fots0bnj8ib.apps.googleusercontent.com"
              onSuccess={(response) => {
                let decodedUser = jwtDecode(response.credential);
                console.log(decodedUser);
                console.log(decodedUser.birthday);

                axios
                  .post(
                    "https://apis-2-4nek.onrender.com/auth/signinOrSignupWithGoogle",
                    {
                      firstName: decodedUser.given_name,
                      lastName: decodedUser.family_name,
                      email: decodedUser.email,
                      password: decodedUser.email + "hashedPassword123",
                      birthdate: "1990-01-01",
                      role: "user",
                      active: decodedUser.email_verified,
                    }
                  )
                  .then((response) => {
                    let decodedUser = jwtDecode(response.data.token);
                    console.log("Response:", decodedUser);
                    localStorage.setItem("token", JSON.stringify(decodedUser));
                    history("/");
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }}
              onFailure={(error) => {
                console.error("Google authentication failed:", error);
                // Handle error, possibly display an error message to the user
              }}
              scope="https://www.googleapis.com/auth/user.birthday.read"
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Roboto",
              fontWeight: "500",
              lineHeight: "1.1875em",
              color: "#212427",
              fontSize: "1rem",
            }}
          >
            Don't have an account?{" "}
            <span
              style={{
                fontWeight: "600",
                color: "#5F41B2",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                cursor: "pointer",
              }}
              onClick={handleSignUp}
            >
              Sign up
            </span>
          </p>
        </Box>
      </Box>
      <SignPhotos />
    </Box>
  );
}
