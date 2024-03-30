import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignPhotos from "../SignPhotos";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function UserResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const handleLogIn = (event) => {
    event.preventDefault();
    navigate("/signInUser");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({ password, confirmPassword }, { abortEarly: false });

      const email = new URLSearchParams(window.location.search).get("email");

      const response = await axios.post(
        "https://apis-2-4nek.onrender.com/auth/reset-password",
        { email, newPassword: password }
      );

      console.log(response.data);
      navigate("/signInUser");

    } catch (validationError) {
      setError(validationError.errors.join("\n"));
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
          <Typography
            fontFamily="Roboto"
            fontWeight="500"
            fontSize="1.5rem"
            color="#362566"
            lineHeight="1.6667em"
            marginBottom="1.33em"
          >
            Reset your password
          </Typography>
          <Typography
            fontFamily="Roboto"
            fontSize="1rem"
            color="#5D5C66"
            lineHeight="1.1875em"
            marginBottom="1em"
          >
            To keep your valuable information safe, <br></br>
            we require that you use a strong password.
          </Typography>

          <form onSubmit={handleSubmit}>
            <label htmlFor="password" className="form-label fs-5 fw-bold ">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control p-3 fs-6 fw-bold mb-4"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />

            <label htmlFor="confirmPassword" className="form-label fs-5 fw-bold ">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control p-3 fs-6 fw-bold mb-4"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
              <button type="submit" className="btn col-md-12" style={{ width: '100%', height: '3em', borderRadius: '0.9375em', backgroundColor: '#5F41B2', color: '#FFFFFF', fontFamily: 'Roboto', fontSize: '1rem', textTransform: 'none', margin: '2em 0' }}>
                Reset Password
              </button>
            </form>
  
            <p
              onClick={handleLogIn}
              style={{
                textAlign: "center",
                fontFamily: "Roboto",
                fontWeight: "600",
                lineHeight: "1.1875em",
                color: "#5F41B2",
                fontSize: "1rem",
                textDecoration: "underline",
                cursor: "pointer",
                textUnderlineOffset: "3px",
              }}
            >
              Back to log in
            </p>
          </Box>
        </Box>
        <SignPhotos isAgency={true} />
      </Box>
    );
  }
  
