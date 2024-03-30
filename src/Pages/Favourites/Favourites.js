import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import locationIcon from "../../Images/icons/locationIcon.png";
import travellersIcon from "../../Images/icons/travellersIcon.png";
import checkIcon from "../../Images/icons/checkIcon.png";
import savedIcon from "../../Images/icons/savedIcon.png";
import { colors } from "../../colors";
import axios from "axios";

export default function Favourties() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const userId = localStorage.getItem("id");
  const [cardContent, setCardContent] = useState([
    // {
    //   id: 1,
    //   image: bookingsImage1,
    //   upcoming: "2",
    //   discount: null,
    //   location: "Giza, Egypt",
    //   title: "Full-Day Tour Giza Great Pyramids, Sphinx, Memphis, And Saqqara",
    //   date: "08/13/2022",
    //   travellers: "2",
    //   payment: "Reserve now pay later",
    //   pickUpLocation: "I will select my pickup location later",
    //   freeCancellation:
    //     "Free Cancellation before 8:00 AM (local time) on Aug 15, 2024",
    //   price: 155,
    //   isSaved: true,
    //   isCancelled: false,
    // },
    // {
    //   id: 2,
    //   image: bookingsImage2,
    //   upcoming: "8",
    //   discount: 8,
    //   location: "Giza, Egypt",
    //   title: "Full-Day Tour Giza Great Pyramids, Sphinx, Memphis, And Saqqara",
    //   date: "08/13/2024",
    //   travellers: "2",
    //   payment: "Payed by credit card",
    //   pickUpLocation: "I will select my pickup location later",
    //   freeCancellation:
    //     "Free Cancellation before 8:00 AM (local time) on Aug 15, 2022",
    //   price: 155,
    //   isSaved: true,
    //   isCancelled: false,
    // },
  ]);
  React.useEffect(() => {
    axios
      .get(`https://apis-2-4nek.onrender.com/favourits/get-favourits/${userId}`)
      .then((response) => {
        setCardContent(response.data || []);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSaveToggle = (id) => {
    try {
      axios.delete(
        `https://apis-2-4nek.onrender.com/favourits/remove-favourit`,
        {
          data: {
            userId: userId,
            tourId: id,
          },
        }
      );

      setCardContent((prevCardContent) =>
        prevCardContent.filter((card) => card.tour._id !== id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      {!token && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <div className="text-center alert alert-danger w-75 fs-2 fw-bold">
            Please Log In
          </div>
        </div>
      )}
      {token && (
        <Box sx={{ padding: 9 }}>
          <h1 className="text-center mb-5" style={{ color: colors.secondary }}>
            Favourites
          </h1>
          {cardContent.length > 0?
            cardContent.map((card) => {
              return (
                <Card
                  key={card.tour._id}
                  sx={{
                    display: "flex",
                    borderRadius: "20px",
                    textAlign: "left",
                    position: "relative",
                    marginBottom: "20px",
                    border: "1px solid #C1BFC8",
                  }}
                >
                  <img
                    alt="save icon"
                    src={savedIcon}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSaveToggle(card.tour._id)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "50px",
                      right: "50px",
                    }}
                  >
                    <Typography
                      color="#5F41B2"
                      fontSize="48px"
                      fontWeight="bold"
                      textAlign="right"
                    >
                      ${card.tour.price}
                    </Typography>
                  </div>
                  <CardMedia
                    sx={{ minWidth: "249px", minHeight: "300px" }}
                    image={card.tour.mainImage}
                    title="Great Pyramids of Giza Tour Voucher"
                  />
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <img
                          alt="location icon"
                          src={locationIcon}
                          style={{ marginRight: "5px" }}
                        />
                        <Typography>{card.tour.location}</Typography>
                      </div>
                      <Typography
                        fontSize="18px"
                        color="#362566"
                        fontWeight="bold"
                      >
                        {card.tour.title}
                      </Typography>
                      <Divider
                        sx={{ borderWidth: "thin !important", opacity: "1" }}
                      />
                      <Typography>{card.tour.startDate}</Typography>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          alt="travellers icon"
                          src={travellersIcon}
                          style={{ marginRight: "5px" }}
                        />
                        <Typography>
                          {card.tour.totalTravelers} Travellers
                        </Typography>
                      </div>
                      <Typography>Payed by credit card</Typography>
                      <Typography>
                        I will select my pickup location later
                      </Typography>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          alt="checked icon"
                          src={checkIcon}
                          style={{ marginRight: "5px" }}
                        />
                        <Typography>
                          Free Cancellation before 8:00 AM (local time) on Aug
                          15, 2022
                        </Typography>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            }):<h1 className="text-center">No Favourites Were Added.</h1>}
        </Box>
      )}
      {cardContent.length > 0 ? <Footer/>:<div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Footer />
      </div>}
    </>
  );
}
