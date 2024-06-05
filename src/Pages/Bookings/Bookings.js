import {AppBar,Box,Card,CardContent,CardMedia,Divider,Tab,Tabs,Typography,} 
from "@mui/material";
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
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
export default function Bookings() {
  // const { user } = useAuth(); 
  const user = jwtDecode(localStorage.getItem("token"));
  console.log(user);
  console.log(user.id);
  const [value, setValue] = useState(0);
  const [cardContent, setCardContent] = useState([]);
  const currentDate = new Date();
  const [savedTours, setSavedTours] = useState([]); 

  // const userId = localStorage.getItem("id");
  // console.log(userId);
  useEffect(() => {
    console.log("ahhhhh");
    axios
      .get(`https://tours-api-7hh1.onrender.com/booking/${user.id}`)
      .then((response) => {
        setCardContent(response.data.data || []);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://tours-api-7hh1.onrender.com/favourits/get-favourits/${user.id}`)
      .then((response) => {
        const favoriteTours = response.data.map(favorite => favorite.tour._id);
        console.log(favoriteTours);
        setSavedTours(favoriteTours);
        // console.log(response.data[0].tour._id)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(savedTours);

  console.log(cardContent);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`https://tours-api-7hh1.onrender.com/booking`, {
            tour: id,
            user: user.id,
          })
          .then((response) => {
            setValue(2);
            Swal.fire({
              title: "Canceled!",
              text: "Your booking has been canceled.",
              icon: "success"
            });
            console.log("Response:", response);
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to cancel booking. Please try again later.",
              icon: "error"
            });
          });
        }
      });
    };
    
    const handleSaveToggle = (id) => {
      const isSaved = savedTours.includes(id); 
      
      // If the tour is already saved, remove it from favorites
      if (isSaved) {
        axios
          .delete(`https://tours-api-7hh1.onrender.com/favourits/remove-favourit`, {
            data: {
              userId: user.id,
              tourId: id,
            }
          })
          .then((response) => {
            console.log("Response:", response.data);
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Tour removed from favorites successfully.',
            });
            // Update the savedTours list to reflect the removal
            setSavedTours(savedTours.filter(tourId => tourId !== id));
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An error occurred while removing the tour from favorites.',
            });
          });
      } else {
        axios
          .post(`https://tours-api-7hh1.onrender.com/favourits/add-favourit`, {
            userId: user.id,
            tourId: id,
          })
          .then((response) => {
            console.log("Response:", response.data);
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Tour added to favorites successfully.',
            });
            // Update the savedTours list to reflect the addition
            setSavedTours([...savedTours, id]);
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An error occurred while adding the tour to favorites.',
            });
          });
      }
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
            backgroundColor: "white", 
            borderRadius: "20px", 
            "& .MuiTabs-root": {
              display: "flex",
              justifyContent: "center", 
            },
            "& .MuiTab-root": {
              minWidth: "100px", 
              fontWeight: "bold",
              color: "#333", 
              "&.Mui-selected": {
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
                    ${card.tour.price * card.numOfPeople}
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
                        Free Cancellation before {card.tour.startTime} (local time) on {card.tour.startDate}
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
      <Footer />
    </>
  );
}
