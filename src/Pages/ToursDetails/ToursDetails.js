import React, { useEffect, useState } from "react";
import Tabs from "../../Components/Tabs/Tabs";
import RelatedTours from "../../Components/RelatedTours/RelatedTours";
import axios from "axios";
import TourCard from "../../Components/ToursDetailsFirstSection/TourCard";
import PayPalButtonComponent from "../../Components/PaymentDetails/PaymentDetails";
import { Col, Container, Row } from "react-bootstrap";
import TimeDetailsCard from "../../Components/ToursDetailsFirstSection/TimeDetailsCard";
import TourCardAndTimeSM from "../../Components/ToursDetailsFirstSection/TourCardAndTimeSM";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom/dist";
import { useContext } from "react";
import { TourdetailsContext } from "../../Contexts/TourdetailsContext";
export default function ToursDetails() {
  // const {relatedTours , setRelatedTours , tour} = useContext(TourdetailsContext)
  const { setTour } = useContext(TourdetailsContext);
  let theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams();
  const [tourPrice, setTourPrice] = useState(0); // State to hold the tour price

  useEffect(() => {
    axios
      .get(`https://apis-2-4nek.onrender.com/tours/tour/${id}`)
      .then((res) => {
        setTour(res.data.data);
        setTourPrice(parseFloat(res.data.data.price));

      });
  }, [id]);
  console.log("Received tourPrice:", tourPrice);

  return (
    <>
      <Navbar />
      <div className="mb-5">
        <Container>
          <Row className="d-none d-md-flex">
            <Col className="col-8">
              <TourCard />
            </Col>
            <Col className="col-4">
              <TimeDetailsCard />
            </Col>
          </Row>
          <Row className="d-md-none">
            <TourCardAndTimeSM />
          </Row>
          <Row>
            {" "}
            <Tabs></Tabs>
          </Row>
          <Row>
            <RelatedTours></RelatedTours>
          </Row>
        </Container>
        <PayPalButtonComponent tourPrice={tourPrice} />
      </div>
      {!isMobile && (
        <div
          style={{
            backgroundColor: "#F7F5FB",
            padding: "2em 0",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#212427",
              fontSize: "3.5rem",
              fontWeight: "700",
              fontFamily: "Roboto",
              lineHeight: "1.18em",
            }}
          >
            Subscribe
          </Typography>
          <Typography
            sx={{
              color: "#5F41B2",
              fontSize: "3.5rem",
              fontWeight: "700",
              fontFamily: "Roboto",
              lineHeight: "1.18em",
            }}
          >
            Trollii Newsletter
          </Typography>
          <Typography
            sx={{
              color: "#212427",
              fontSize: "3.5rem",
              fontWeight: "700",
              fontFamily: "Roboto",
              lineHeight: "1.18em",
            }}
          >
            Get New Offers And News
          </Typography>
          <div
            style={{
              position: "relative",
              width: "fit-content",
              margin: "2em auto 0",
            }}
          >
            <input
              name="email"
              placeholder="Enter your email address"
              autoComplete="off"
              style={{
                padding: "16px 64px",
                border: "none",
                borderRadius: "15px",
                boxShadow:
                  "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)",
                height: "97px",
                width: "65.5vw",
                fontFamily: "Roboto",
                outline: "none",
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#5F41B3",
                borderRadius: "20px",
                height: "65px",
                width: "201px",
                fontFamily: "Roboto",
                fontWeight: "600",
                fontSize: "1.125rem",
                textTransform: "none",
                position: "absolute",
                top: "0.889em",
                right: "3.6em",
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
