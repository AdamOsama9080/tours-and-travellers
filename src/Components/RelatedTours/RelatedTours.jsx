import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faClock,
  faCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../colors.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { TourdetailsContext } from "../../Contexts/TourdetailsContext.js";
import { useTranslation } from "react-i18next";
const RelatedTours = () => {
  const { t, i18n } = useTranslation();

  // const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const { relatedTours, setRelatedTours, tour } =
    useContext(TourdetailsContext);
  useEffect(() => {
    axios.get("https://apis-2-4nek.onrender.com/tours/tours").then((res) => {
      let temp = res.data.data.filter((el) => el.location === tour.location);
      setRelatedTours(temp);
      setLoading(false);
    });
  }, [tour]);

  // if (loading) {
  //   return (
  //     <div className="">
  //       <div className="spinner-border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      className="mt-5"
      style={{ direction: i18n.language === "ar" && "rtl" }}
    >
      <h3>{t("related_tours.relatedTours")}</h3>
      <div className="container">
        <div className={`row`}>
          {relatedTours.map((tour) => (
            <div
              key={tour.tour_id}
              className="col col-sm-12 col-md-6 col-lg-4"
              style={{ margin: "0 auto" }}
            >
              <div style={{ borderRadius: "20px" }} className="card my-3">
                <div className="position-relative">
                  <img
                    src={tour.mainImage}
                    className="card-img-top "
                    alt={tour.location}
                    height={250}
                  />
                  <div
                    style={{ top: "94%", right: "5px" }}
                    className="position-absolute "
                  >
                    <img
                      className="rounded-circle"
                      src={require("../../Images/RelatedTours/Avatar3.png")}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      width: "35px",
                      height: "35px",
                    }}
                  >
                    <FontAwesomeIcon
                      className="fs-4"
                      icon={faHeart}
                      style={{ color: "#CCCCCC", borderColor: "white" }}
                    />
                  </div>
                  <div
                    style={{ top: "5px", left: "15px" }}
                    className="position-absolute"
                  >
                    <Stack spacing={2} direction="row">
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          backgroundColor: colors.violet,
                          color: "white",
                          textTransform: "none",
                        }}
                      >
                        {t("related_tours.featured")}
                      </Button>
                    </Stack>
                  </div>
                </div>

                <div className="card-body ">
                  <div className="d-flex mb-2">
                    <img
                      style={{ width: "18px", lineHeight: "16.59px" }}
                      src="assets/Images/location-svgrepo-com.svg"
                      alt=""
                    />
                    <p
                      style={{ lineHeight: "16.59px" }}
                      className="card-title mx-2"
                    >
                      {tour.location}
                    </p>
                  </div>
                  <div
                    className={`text-${
                      i18n.language === "ar" ? "end" : "start"
                    }`}
                  >
                    <p className="  fw-semibold">{tour.description}</p>

                    <div className="">
                      <FontAwesomeIcon
                        icon={solidStar}
                        style={{ color: "gold" }}
                      />
                      <FontAwesomeIcon
                        icon={solidStar}
                        style={{ color: "gold" }}
                      />
                      <FontAwesomeIcon
                        icon={solidStar}
                        style={{ color: "gold" }}
                      />
                      <FontAwesomeIcon
                        icon={solidStar}
                        style={{ color: "gold" }}
                      />
                      <FontAwesomeIcon
                        icon={solidStar}
                        style={{ color: "gold" }}
                      />
                      ({tour.reviews.length} {t("related_tours.reviews")})
                    </div>
                  </div>
                </div>
                <div className="card-footer p-3 d-flex align-items-center justify-content-around">
                  <div className="d-flex">
                    <span style={{ lineHeight: "28.44px" }}>
                      {t("related_tours.from")}
                    </span>
                    <span
                      className="fw-bold fs-4"
                      style={{ color: colors.violet, lineHeight: "28.44px" }}
                    >{` ${tour.price}`}</span>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-clock mx-2"></i>

                      <span className="">
                        {tour.startTime} to {tour.endTime}{" "}
                        {t("related_tours.hours")}
                      </span>
                    </div>
                    <div className="d-block">
                      <FontAwesomeIcon
                        className="mx-2"
                        icon={faCheck}
                        style={{ backgroundColor: "transparent" }}
                      />
                      {t("related_tours.freeCancellation")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedTours;
