import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import "./Overview.modules.css";
import { TourdetailsContext } from "../../Contexts/TourdetailsContext";

const Overview = () => {
  const { t, i18n } = useTranslation();
  const { tour } = useContext(TourdetailsContext);

  return (
    <div
      style={{
        direction: i18n.language === "ar" && "rtl",
        padding: "0 40px 40px",
      }}
    >
      <div className="icon-container">
        <div className="icon">
          <i className="bi bi-clock"></i>
          <div className="text-container">
            <h5>{t("tourDetails.Duration")}</h5>
            <p>{tour.duration}</p>
          </div>
        </div>
        <div className="icon">
          <i className="bi bi-calendar"></i>
          <div className="text-container">
            <h5>{t("tourDetails.Tour Type")}</h5>
            <p>{t("tourDetails.full day")}</p>
          </div>
        </div>
        <div className="icon">
          <i className="bi bi-people"></i>
          <div className="text-container">
            <h5>{t("tourDetails.Group Size")}</h5>
            <p>{tour.totalTravelers}</p>
          </div>
        </div>
        <div className="icon">
          <i className="bi bi-translate"></i>
          <div className="text-container">
            <h5>{t("tourDetails.Language")}</h5>
            <p>{t("tourDetails.arabic and english")}</p>
          </div>
        </div>
      </div>
      <div className="p1">
        <h2>{t("tourDetails.About Tour")}</h2>
        <p>{tour.description}</p>
      </div>
      <div className="p2">
        <h2>{t("tourDetails.Highlights")}</h2>
        <ul>
          {tour.highlights &&
            tour.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
        </ul>
      </div>
      <div className="included-excluded-section">
        <h2>{t("tourDetails.Included & Excluded")}</h2>
        <div className="items-container">
          <div className="nm">
            <div style={{ marginRight: "20px" }}>
              {tour.included &&
                tour.included.map((item, index) => (
                  <div key={index}>
                    <span style={{ color: "green" }}>✔️</span>
                    <span>{item}</span>
                  </div>
                ))}
            </div>
            <div>
              {tour.excluded &&
                tour.excluded.map((item, index) => (
                  <div key={index}>
                    <span style={{ color: "red", marginLeft: "5px" }}>❌</span>
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
