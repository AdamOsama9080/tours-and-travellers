import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Typography } from "@mui/material";
import { colors } from "../../colors";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../Images/NotFound/not-found.png";

export default function NotFound() {
  const history = useNavigate();
  return (
    <>
      <Navbar />
      <img
        src={notFoundImg}
        style={{ position: "absolute", top: "15vw", right: "10vw" }}
      />
      <div className="d-flex flex-column gap-3" style={{ padding: "90px" }}>
        <Typography variant="h2" color={colors.black} fontWeight="bold">
          404
        </Typography>
        <Typography variant="h3" color={colors.black}>
          oops!
        </Typography>
        <Typography variant="h4" color={colors.black}>
          Page Not Found!
        </Typography>
        <Typography variant="h5" color="#777777">
          Don't worry, we got your back! You can always search for your
          <br /> desired destination or activity on our homepage.
        </Typography>
        <button
          className="btn"
          style={{
            backgroundColor: colors.violet,
            color: "white",
            padding: "11px 64px",
            width: "fit-content",
            fontWeight: "500",
            borderRadius: "15px",
          }}
          onClick={() => {
            history("/");
          }}
        >
          Back to Home
        </button>
      </div>
      <div style={{ position: "fixed", bottom: "0", left: "0", width: "100%" }}>
        <Footer />
      </div>
    </>
  );
}
