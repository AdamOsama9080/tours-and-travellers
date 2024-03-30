import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { colors } from "../../colors";
import {
  FaRegCalendarAlt,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { LuUsers2 } from "react-icons/lu";
import { LuClock3 } from "react-icons/lu";
import { LuLoader } from "react-icons/lu";
import { ImBookmark } from "react-icons/im";
import { TourdetailsContext } from "../../Contexts/TourdetailsContext";

export default function TourCardAndTimeSM() {
  const {tour} = useContext(TourdetailsContext);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const starsArr = [1, 2, 3, 4, 5];
  const [startDate, setStartDate] = useState(
    new Date(tour.startDate).getDate()
  );
  const [endDate, setEndDate] = useState(new Date(tour.endDate).getDate());
  const [endMonth, setEndMonth] = useState(new Date(tour.endDate).getMonth());
  const [startMonth, setStartMonth] = useState(
    new Date(tour.startDate).getMonth()
  );
  useEffect(() => {
    setStartDate(new Date(tour.startDate).getDate());
    setEndDate(new Date(tour.endDate).getDate());
    setEndMonth(new Date(tour.endDate).getMonth());
    setStartMonth(new Date(tour.startDate).getMonth());
  }, [tour.startDate]);
  if (tour.images === undefined)
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <LuLoader className="m-auto fw-bolder fs-1" />
      </div>
    );
  return (
    <>
      <Container fluid className="text-start">
        <Row className="my-3">
          <div className="fs-3 fw-bold" style={{ color: colors.violet }}>
            {tour.location}
          </div>
          <div className="fw-bolder fs-4 text-secondary">
            <FaRegCalendarAlt className="fw-bolder fs-4" />
            {startMonth === endMonth ? (
              <span>
                {" "}
                {startDate} - {endDate} {monthNames[endMonth]}{" "}
              </span>
            ) : (
              <span>
                {" "}
                {startDate} {monthNames[startMonth]} - {endDate}{" "}
                {monthNames[endMonth]}{" "}
              </span>
            )}
            <span>
              &nbsp; &nbsp;
              <LuUsers2 className="fw-bolder fs-4" /> {tour.totalTravelers}{" "}
              People
            </span>
          </div>
          <div className=" fs-4 text-secondary">
            <LuClock3 className="fw-bolder fs-4 " /> {tour.startTime} -{" "}
            {tour.endTime}
          </div>
        </Row>
        <Row>
          <div
            id="carouselExampleIndicators"
            className="carousel slide "
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {tour.images.map((el, index) => {
                return (
                  <button
                    type="button"
                    className={
                      index === 0 ? "active rounded-circle" : "rounded-circle"
                    }
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    aria-label={`slider ${index}`}
                  ></button>
                );
              })}
            </div>
            <div className="carousel-inner">
              {tour.images.map((el, index) => {
                return (
                  <div
                    className={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <img
                      src={el}
                      className="w-100"
                      style={{ height: "15rem" }}
                      alt={el}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-between mt-3 fs-1 fw-bolder">
            <h2 className="fs-1 fw-bolder" style={{ color: colors.violet }}>
              {tour.title}
            </h2>
            <ImBookmark className="fs-1 fw-bolder text-secondary" />
          </div>
          <div className="d-flex">
            {starsArr.map((el) => {
              if (el <= tour.rating) {
                return <FaStar className="fw-bolder fs-3 text-warning" />;
              } else if (Math.ceil(tour.rating) === el) {
                return (
                  <FaStarHalfAlt className="fw-bolder fs-3 text-warning" />
                );
              } else {
                return <FaRegStar className="fw-bolder fs-3 text-warning" />;
              }
            })}
            <span className="fw-bolder fs-5 text-secondary">
              &nbsp;{tour.rating} / 5
            </span>
          </div>
          <div className="fs-5">{tour.destination}</div>
        </Row>
      </Container>
    </>
  );
}
