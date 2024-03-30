import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import bookingsImage1 from "../../Images/bookings-1.png";
import bookingsImage2 from "../../Images/bookings-2.png";
import locationIcon from "../../Images/icons/locationIcon.png";
import travellersIcon from "../../Images/icons/travellersIcon.png";
import checkIcon from "../../Images/icons/checkIcon.png";
import notSavedIcon from "../../Images/icons/notSavedIcon.png";
import savedIcon from "../../Images/icons/savedIcon.png";
import cancelledImg from "../../Images/cancelledImg.png";
import axios from "axios";
import { v4 as uuid } from "uuid";
export default function Bookings() {
  const [value, setValue] = useState(0);
  const [cardContent, setCardContent] = useState([]);
  const currentDate = new Date();
  const userId = localStorage.getItem("id");
  console.log(userId);
  useEffect(() => {
    console.log("ahhhhh");
    axios
      .get(`https://apis-2-4nek.onrender.com/booking/${userId}`)
      .then((response) => {
        setCardContent(response.data.data || []);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // const [cardContent, setCardContent] = useState([
  //   {
  //     id: 1,
  //     image: bookingsImage1,
  //     upcoming: "2",
  //     discount: null,
  //     location: "Giza, Egypt",
  //     title: "Full-Day Tour Giza Great Pyramids, Sphinx, Memphis, And Saqqara",
  //     date: "08/13/2022",
  //     travellers: "2",
  //     payment: "Reserve now pay later",
  //     pickUpLocation: "I will select my pickup location later",
  //     freeCancellation:
  //       "Free Cancellation before 8:00 AM (local time) on Aug 15, 2024",
  //     price: 155,
  //     isSaved: false,
  //     isCancelled: false,
  //   },
  //   {
  //     id: 2,
  //     image: bookingsImage2,
  //     upcoming: "8",
  //     discount: 8,
  //     location: "Giza, Egypt",
  //     title: "Full-Day Tour Giza Great Pyramids, Sphinx, Memphis, And Saqqara",
  //     date: "08/13/2024",
  //     travellers: "2",
  //     payment: "Payed by credit card",
  //     pickUpLocation: "I will select my pickup location later",
  //     freeCancellation:
  //       "Free Cancellation before 8:00 AM (local time) on Aug 15, 2022",
  //     price: 155,
  //     isSaved: false,
  //     isCancelled: false,
  //   },
  // ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSaveToggle = (id) => {
    axios
      .post(`https://apis-2-4nek.onrender.com/favourits/add-favourit`, {
        userId: userId,
        tourId: id,
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancelBooking = (id) => {
    console.log(id, userId)
    axios
      .put(`https://apis-2-4nek.onrender.com/booking/`, {
        tour: id,
        user: userId,
      })
      .then((response) => {
        setValue(2);
        console.log("Response:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 9 }}>
        <AppBar
          position="static"
          color="default"
          sx={{
            marginBottom: "50px",
            backgroundColor: "white", // Light gray background
            borderRadius: "20px", // Rounded corners
            "& .MuiTabs-root": {
              // Target the Tabs container
              display: "flex",
              justifyContent: "center", // Center tabs horizontally
            },
            "& .MuiTab-root": {
              // Target individual tabs
              minWidth: "100px", // Set minimum width for each tab
              fontWeight: "bold", // Bold font weight
              color: "#333", // Dark gray text color
              "&.Mui-selected": {
                // Style the selected tab
                color: "#5F41B2",
              },
            },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: {
                background: "#FFC725",
                height: "4px",
                borderRadius: "8px",
              },
            }}
            sx={{
              "& .css-1wf8b0h-MuiTabs-flexContainer": {
                justifyContent: "space-around",
              },
            }}
          >
            <Tab label="Active" />
            <Tab label="Past" />
            <Tab label="Cancelled" />
          </Tabs>
        </AppBar>
        {cardContent.map((card, index) => {
          const isPast = new Date(card.tour.startDate) < currentDate;
          const savedImg = card.isFavorite ? savedIcon : notSavedIcon;

          if (
            (value === 0 && !isPast && !card.isCanceld) ||
            (value === 1 && isPast && !card.isCanceld) ||
            (value === 2 && card.isCanceld)
          ) {
            return (
              <Card
                key={uuid()}
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
                  src={savedImg}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "50px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSaveToggle(card.tour._id)}
                />
                {card.isCanceld && (
                  <img
                    alt="cancelled logo"
                    src={cancelledImg}
                    style={{
                      position: "absolute",
                      top: "70px",
                      right: "250px",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    right: "50px",
                  }}
                >
                  <Typography
                    color={value === 0 ? "#5F41B2" : "#5D5C66"}
                    fontSize="48px"
                    fontWeight="bold"
                    textAlign="right"
                  >
                    ${card.tour.price}
                  </Typography>
                  {!card.isCanceld && (
                    <button
                      className={`btn ${
                        value === 0 ? "btn-danger" : "btn-secondary"
                      } px-5 py-3`}
                      style={{ borderRadius: "15px", fontWeight: "500" }}
                      onClick={() => handleCancelBooking(card.tour._id)}
                    >
                      Cancel
                    </button>
                  )}
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
                      <Typography>{card.numOfPeople} Travellers</Typography>
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
                        Free Cancellation before 8:00 AM (local time) on Aug 15,
                        2022
                      </Typography>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          }
          return null;
        })}
        {value === 0 &&
          cardContent.filter((card) => !card.isCanceld).length === 0 && (
            <p style={{ textAlign: "center", fontSize: "2rem" }}>
              You don't have any active tours.
            </p>
          )}
        {value === 1 &&
          cardContent.filter((card) => {
            const cardDate = new Date(card.tour.startDate);
            const currentDate = new Date();
            return cardDate < currentDate && !card.isCanceld;
          }).length === 0 && (
            <p style={{ textAlign: "center", fontSize: "2rem" }}>
              You don't have any past tours.
            </p>
          )}
        {value === 2 &&
          cardContent.filter((card) => card.isCanceld).length === 0 && (
            <p style={{ textAlign: "center", fontSize: "2rem" }}>
              You don't have any cancelled tours.
            </p>
          )}
      </Box>
      {cardContent.length > 0 ? <Footer/>:<div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          marginTop: "50px"
        }}
      >
        <Footer />
      </div>}
    </>
  );
}
