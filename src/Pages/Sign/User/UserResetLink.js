import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignPhotos from "../SignPhotos";
import axios from "axios";

export default function UserResetLink() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = (event) => {
    event.preventDefault();
    navigate("/signInUser");
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://apis-2-4nek.onrender.com/auth/forget-password",
        { email }
      );
      console.log(response.data);
      navigate(`/otp-forget-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Error:", error);
      setError("Email not found. Please check again.");
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
          {!isMobile && (
            <>
              <Typography
                fontFamily="Roboto"
                fontWeight="500"
                fontSize="2.5rem"
                color="#362566"
                lineHeight="1.185em"
                marginBottom="0.2em"
              >
                Don't worry
              </Typography>
              <Typography
                style={{ inlineSize: "80%" }}
                fontFamily="Roboto"
                fontSize="0.875rem"
                color="#5D5C66"
                lineHeight="1.214em"
                marginBottom="2.286em"
              >
                Don't worry, you can reset your password using your email
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
            Reset your password
          </Typography>
          {isMobile && (
            <Typography
              fontFamily="Roboto"
              fontWeight="400"
              fontSize="1rem"
              lineHeight="1.1875em"
              color="#5D5C66"
              marginBottom="1em"
            >
              Enter e-mail address using with the account. We'll e-mail a link
              to reset your password.
            </Typography>
          )}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleResetPassword}>
            <label
              className="form-label"
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
              className="form-control"
              type="email"
              placeholder="Example@gmail.com"
              style={{
                color: "#5D5C66",
                fontFamily: "Roboto",
                borderRadius: "0.9375em",
                height: "3em",
                border: "1px solid #C4C4C4",
                padding: "1em",
                backgroundColor: "#FBFBFB",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              Send Reset OTP
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
      <SignPhotos />
    </Box>
  );
}
