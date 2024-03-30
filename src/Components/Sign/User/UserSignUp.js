import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignPhotos from "../SignPhotos";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";

export default function UserSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const errorMessages = {
    email: "Invalid email address",
    password: "Password is required",
    confirmPassword: "Passwords must match",
    firstname: "First name is required and must be at least 3 characters",
    lastname: "Last name is required and must be at least 3 characters",
    birthdate: "Invalid date",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await fetch(
        "https://apis-2-4nek.onrender.com/register/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstname,
            lastName: formData.lastname,
            email: formData.email,
            password: formData.password,
            birthdate: formData.birthdate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      console.log("Registration successful");
      navigate(
        `/one-time-password?email=${encodeURIComponent(formData.email)}`
      );
      setErrors({});
    } catch (error) {
      console.error("Registration error:", error.message);
      setErrors({ server: "Registration failed. Please try again later." });
      setShowErrorAlert(true);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    firstname: Yup.string().required("Required"),
    lastname: Yup.string()
      .required("Required")
      .min(3, "Must be at least 3 characters"),
    birthdate: Yup.date()
      .required("Required")
      .min(new Date("1900-01-01"), "Invalid date")
      .max(new Date(), "Invalid date"),
  });

  const history = useNavigate();
  const handleLogIn = (event) => {
    event.preventDefault();
    history("/signInUser");
  };

  let theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  {Object.keys(errors).length > 0 && (
    <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
      Registration failed. Please try again later.
    </Alert>
  )}
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
                sx={{ inlineSize: "110%" }}
                fontFamily="Roboto"
                fontWeight="500"
                fontSize="2.5rem"
                color="#362566"
                lineHeight="1.175em"
                marginBottom="0.2em"
              >
                Welcome on board
              </Typography>
              <Typography
                fontFamily="Roboto"
                fontSize="0.875rem"
                color="#5D5C66"
                lineHeight="1.214em"
                marginBottom="2.286em"
              >
                Join us now and Let's Set Up Your Website
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
            Create an account
          </Typography>
          {showErrorAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowErrorAlert(false)}
              dismissible
            >
              Registration failed. Please try again later.
            </Alert>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label fs-5 fw-bold ">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control p-3 fs-6 fw-bold"
                  id="firstname"
                  placeholder="First Name..."
                  name="firstname"
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <Alert variant="danger">{errors.firstname}</Alert>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label fs-5 fw-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control p-3 fs-6 fw-bold"
                  id="lastname"
                  placeholder="Last Name..."
                  name="lastname"
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <Alert variant="danger">{errors.lastname}</Alert>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fs-5 fw-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control p-3 fs-6 fw-bold"
                  id="email"
                  placeholder="Write your email..."
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <Alert variant="danger">{errors.email}</Alert>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label fs-5 fw-bold">
                  Birthdate
                </label>
                <input
                  type="date"
                  className="form-control p-3 fs-6 fw-bold"
                  id="birthdate"
                  name="birthdate"
                  onChange={handleChange}
                />
                {errors.birthdate && (
                  <Alert variant="danger">{errors.birthdate}</Alert>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fs-5 fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control y p-3 fs-6 fw-bold"
                  id="password"
                  placeholder="Password..."
                  name="password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <Alert variant="danger">{errors.password}</Alert>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="confirmPassword"
                  className="form-label fs-5 fw-bold"
                >
                  Confirm Password
                </label>
                <input
                  type="Password"
                  className="form-control p-3 fs-6 fw-bold"
                  id="confirmPassword"
                  placeholder="confirmPassword..."
                  name="confirmPassword"
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <Alert variant="danger">{errors.confirmPassword}</Alert>
                )}
              </div>
            </div>
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                marginTop: "0.4375em",
              }}
            >
              <Checkbox
                id="confirm-privacy-policy"
                sx={{
                  width: "1.125em",
                  height: "1.125em",
                  marginRight: "0.6875em",
                  marginTop: "1px",
                }}
              />
              <label
                htmlFor="confirm-privacy-policy"
                style={{
                  color: "#5D5C66",
                  fontFamily: "Roboto",
                  fontSize: "0.875rem",
                  lineHeight: "140%",
                  margin: "0",
                  textAlign: "left",
                }}
              >
                I confirm that I have read and accepted the{" "}
                <span style={{ color: "#5F41B2" }}>privacy policy</span>
              </label>
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
              Sign up
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
          <Button
            startIcon={
              <img
                alt="google logo"
                src={require("../../../Images/google.png")}
              />
            }
            style={{
              height: "3.2em",
              borderRadius: "1.33em",
              color: "#5D5C66",
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "0.9375rem",
              textTransform: "none",
              marginBottom: "1.0667em",
              border: "1px solid #C4C4C4",
            }}
          >
            Sign in with Google
          </Button>
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
            Already have an account?{" "}
            <span
              style={{
                fontWeight: "600",
                color: "#5F41B2",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                cursor: "pointer",
              }}
              onClick={handleLogIn}
            >
              Log in
            </span>
          </p>
        </Box>
      </Box>
      <SignPhotos />
    </Box>
  );
}
