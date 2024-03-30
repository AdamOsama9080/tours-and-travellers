import React, { useState } from "react";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SearchCard from "../../Components/SearchCard/SearchCard";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeText from './../../Components/HomeText/HomeText';
import { colors } from "../../colors";
const Home = () => {
  const { t } = useTranslation();
  let theme = useTheme();
  const navigate = useNavigate();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const { i18n } = useTranslation();
  const [email, setEmail] = React.useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubscribe = () => {
    axios.post("http://localhost:2000/send/subscribe", { senderEmail: email })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSuccessMessage("Subscription successful!"); 
          setTimeout(() => {
            setSuccessMessage(""); 
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
        if (error.response && error.response.status === 400) {
          setAlertMessage(`The email ${email} is already subscribed`);
          setTimeout(() => {
            setAlertMessage("");
          }, 3000);
        }
      });
  };

  function handleClick(location) {
    axios.post('http://localhost:2000/tours/related-tours', {
      location: location
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  return (
    <>
      <Navbar />
      <div
        style={{
          padding: isMobile ? "2em" : "7.5em",
          paddingBottom: !isMobile && "2em",
        }}
      >
        {!isMobile && <HomeText />}
        <SearchCard />
        {/* <img src="../../Images/home-card.png" className="w-100"alt=""/> */}
      </div>

      <div className="container-fluid ">
  <div className="row">
    <div className="col-md-3">
      <div className="card shadow">
        <div className="text-center">
          <i className="bi bi-check2-circle" style={{ color: colors.secondary, fontSize: '5rem' }}></i>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold fs-4 mt-2">Step 1: Select</h5>
          <p className="card-text fs-5">Choose your selection.</p>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card shadow">
        <div className="text-center">
          <i className="bi bi-funnel" style={{ color: colors.secondary, fontSize: '5rem' }}></i>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold fs-4 mt-2">Step 2: Filter</h5>
          <p className="card-text fs-5">You can filter the results.</p>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card shadow">
        <div className="text-center">
          <i className="bi bi-search" style={{ color: colors.secondary, fontSize: '5rem' }}></i>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold fs-4 mt-2">Step 3: Select</h5>
          <p className="card-text fs-5">Choose another selection.</p>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card shadow">
        <div className="text-center">
          <i className="bi bi-bag-check" style={{ color: colors.secondary, fontSize: '5rem' }}></i>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold fs-4 mt-2">Step 4: Complete</h5>
          <p className="card-text fs-5">Complete your action.</p>
        </div>
      </div>
    </div>
  </div>
</div>

      
<div style={{ padding: !isMobile && "7.5em", paddingBottom: "2em" }}>
    <div className="text-center">
      <h2 className="font-weight-bold" style={{ fontFamily: "Roboto", color: "#362566" }}>
        {t("home.popular_destinations")}
      </h2>
    </div>
    <div className={`d-flex ${isMobile ? 'flex-column' : 'flex-row'} justify-content-between align-items-center gap-4 mt-4`}>
      <div className="col-12 col-lg-3 mx-auto">
        <div className="image-container" onClick={() => handleClick("Aswan, Egypt")}>
          <img src={require("../../Images/aswan.jpg")} height={300} className="w-100 rounded border-1" alt="Aswan, Egypt" />
          <h4 className="fw-bold image-title rounded-bottom">Aswan, Egypt</h4>
        </div>
      </div>
      <div className="col-12 col-lg-3 mx-auto">
        <div className="image-container" onClick={() => handleClick("Alexandria, Egypt")}>
          <img src={require("../../Images/alx.jpg")} height={300} className="w-100 rounded border-1" alt="Alexandria, Egypt" />
          <h4 className="fw-bold image-title rounded-bottom">Alexandria, Egypt</h4>
        </div>
      </div>
      <div className="col-12 col-lg-3 mx-auto">
        <div className="image-container" onClick={() => handleClick("Cairo, Egypt")}>
          <img src={require("../../Images/cairo.jpg")} height={300} className="w-100 rounded border-1" alt="Cairo, Egypt" />
          <h4 className="fw-bold image-title rounded-bottom">Cairo, Egypt</h4>
        </div>
      </div>
      <div className="col-12 col-lg-3 mx-auto">
        <div className="image-container" onClick={() => handleClick("Giza, Egypt")}>
          <img src={require("../../Images/9c707b0ffd93a9a3268815dbed5b2fb0.jpg")} height={300} className="w-100 rounded border-1" alt="Giza, Egypt" />
          <h4 className="fw-bold image-title rounded-bottom">Giza, Egypt</h4>
        </div>
      </div>
    </div>
  </div>


      {!isMobile && (
        <div style={{ backgroundColor: "#F7F5FB", padding: "2em 0", textAlign: "center" }}>
          <Typography variant="h2" sx={{ color: "#212427", fontWeight: 700 }}>
            {t("home.subscribe")}
          </Typography>
          <Typography variant="h2" sx={{ color: "#5F41B2", fontWeight: 700, direction: i18n.language === "ar" ? "rtl" : null }}>
            {t("home.trollii_newsletter")}
          </Typography>
          <Typography variant="h2" sx={{ color: "#212427", fontWeight: 700 }}>
            {t("home.get_new_offers_and_news")}
          </Typography>
          <div style={{ position: "relative", width: "fit-content", margin: "2em auto 0" }}>
            <input
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("home.enter_email_address")}
              autoComplete="off"
              style={{
                padding: "16px 64px",
                border: "none",
                borderRadius: "15px",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)",
                height: "97px",
                width: "65.5vw",
                fontFamily: "Roboto",
                outline: "none",
                direction: i18n.language === "ar" && "rtl",
              }}
            />
            <Button
              onClick={handleSubscribe}
              variant="contained"
              sx={{
                backgroundColor: "#5F41B3",
                borderRadius: "20px",
                height: "65px",
                width: "201px",
                fontFamily: "Roboto",
                fontWeight: 600,
                fontSize: "1.125rem",
                textTransform: "none",
                position: "absolute",
                top: "0.889em",
                right: i18n.language === "en" ? "3.6em" : null,
                left: i18n.language === "ar" ? "3.6em" : null,
              }}
            >
              {t("home.subscribe")}
            </Button>
            {alertMessage && (
              <div className="alert alert-danger mt-3">
                {alertMessage}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {successMessage}
              </div>
            )}

          </div>
        </div>
      )}


      <Footer />
    </>
  );
};
export default Home;
