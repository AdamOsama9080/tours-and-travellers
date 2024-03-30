import "./cardStyle.modules.css";
import { Container, Row } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import { LuClock } from "react-icons/lu";
import { IoCheckmarkSharp } from "react-icons/io5";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ToursCard({ tour }) {
  const { t, i18n } = useTranslation();
  const [ratingIsFractions, setRatingIsFractions] = useState(false);
  const starsArrIndexs = [1, 2, 3, 4, 5];
  const navigator = useNavigate();

  useEffect(() => {
    if (Math.ceil(tour.rating) !== tour.rating) {
      setRatingIsFractions(true);
    }
  }, [tour.rating]);

  return (
    <>
      <Container fluid>
        <div
          className="card-container card my-3 mx-1"
          style={{ padding: "0px" }}
        >
          <Row>
            <div
              className="col col-4 col-md-4 h-100"
              style={{ padding: "0px" }}
            >
              <div className="div-badges">
                <div className="badge my-1">{t("tours_card.featured")}</div>
                {tour.discout ? (
                  <div className="badge bg-danger">-8%</div>
                ) : (
                  <></>
                )}
              </div>
              <img
                className="my-card-img card-img-top"
                height={300}
                src={tour.mainImage}
                alt="cardImg"
              />
            </div>
            <div className="col col-6 col-md-5 text-start py-2">
              <div className="px-2">
                <p>
                  <FiMapPin /> {tour.location}
                </p>
                <p className="tour-header fw-bold fs-5">{tour.title}</p>
                <div>
                  {starsArrIndexs.map((el) => {
                    if (el <= tour.rating) {
                      return <FaStar className="fw-bolder fs-5 text-warning" />;
                    } else if (ratingIsFractions === true) {
                      if (Math.ceil(tour.rating) === el) {
                        return (
                          <FaStarHalfAlt className="fw-bolder fs-5 text-warning" />
                        );
                      }
                    } else {
                      return (
                        <FaRegStar className="fw-bolder fs-5 text-warning" />
                      );
                    }
                  })}
                  {tour.numberOfreviews ? (
                    <span className="text-secondary fw-bolder">
                      {" "}
                      (250 {t("tours_card.reviews")})
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <p className="d-none d-md-block">{tour.description}</p>
              <p>
                <LuClock /> {tour.startDate.slice(0, 10)} to{" "}
                {tour.endDate.slice(0, 10)} <IoCheckmarkSharp />
                {t("tours_card.free_cancellation")}
              </p>
            </div>
            <div className="col col-2 col-md-3 text-start">
              <div className="booking-div-details">
                <p>From</p>
                <p className="price fs-5 fw-bolder">EGP {tour.price}</p>
                {tour.discout ? (
                  <p>
                    <span className="text-danger">
                      50 {t("tours_card.saving")}{" "}
                    </span>
                    <del>550</del>
                  </p>
                ) : (
                  <></>
                )}
                <p>{t("tours_card.prices_varies")}</p>
                <button
                  className="select-tour btn btn-primary w-100"
                  onClick={() => {
                    navigator(`/tours/${tour._id}`);
                  }}
                >
                  {t("tours_card.select_tour")}
                </button>
              </div>
            </div>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default ToursCard;
