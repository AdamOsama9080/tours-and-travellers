import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { colors } from "../../colors";
import { TourdetailsContext } from "../../Contexts/TourdetailsContext";

export default function TimeDetailsCard() {
  const { t, i18n } = useTranslation(); // Initialize useTranslation hook
  const { tour } = useContext(TourdetailsContext);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [startDate, setStartDate] = useState(
    new Date(tour.startDate).getDate()
  );
  const [startMonth, setStartMonth] = useState(
    new Date(tour.startDate).getMonth()
  );
  const [day, setDay] = useState(new Date(tour.startDate).getDay());
  useEffect(() => {
    setStartDate(new Date(tour.startDate).getDate());
    setStartMonth(new Date(tour.startDate).getMonth());
    setDay(new Date(tour.startDate).getDay());
  }, [tour.startDate]);

  return (
    <>
      <Container
        style={{
          borderRadius: "20px",
          direction: i18n.language === "ar" && "rtl",
        }}
        className={`border shadow-sm bg-light text-${
          i18n.language === "ar" ? "end" : "start"
        } ps-5 pt-3 my-5`}
      >
        <div className="row">
          <div className="fs-3 fw-bolder" style={{ color: colors.violet }}>
            {t("time.destination")} {/* Translate destination */}
          </div>
          <p className="fs-4">{tour.destination}</p>
        </div>
        <hr className="m-auto me-4"></hr>

        <div className="row">
          <div className="fs-4 d-flex justify-content-between">
            <span className="fs-3 fw-bolder" style={{ color: colors.violet }}>
              {t("time.date")} {/* Translate date */}
            </span>
          </div>
          <p className="fs-4">
            {daysOfWeek[day]}, {startDate} {monthNames[startMonth]}
          </p>
        </div>
        <hr className="m-auto me-4"></hr>

        <div className="row">
          <div className="fs-4 d-flex justify-content-between">
            <span className="fs-3 fw-bolder" style={{ color: colors.violet }}>
              {t("time.time")} {/* Translate time */}
            </span>
          </div>
          <p className="fs-4">
            {tour.startTime} - {tour.endTime} {t("time.cairoZone")}
          </p>
        </div>
        <hr className="m-auto me-4"></hr>

        <div className="row">
          <div className="fs-4 d-flex justify-content-between">
            <span className="fs-3 fw-bolder" style={{ color: colors.violet }}>
              {t("time.group")} {/* Translate group */}
            </span>
          </div>
          <p className="fs-4">
            {tour.totalTravelers} {t("time.people")}
          </p>
        </div>
      </Container>
    </>
  );
}
