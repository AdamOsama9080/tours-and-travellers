import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { colors } from "./../../colors";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "axios";
const Reviews = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const [ratings, setRatings] = useState([]);
  console.log("Type of ratings:", typeof ratings);

  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    title: "",
    review: "",
    guide: 0,
    location: 0,
    cleanliness: 0,
    service: 0,
    transportion: 0,
  });
  // console.log(id);

  const handleStarClick = (category, index) => {
    const numberOfStarsClicked = index + 1;
    console.log(` ${numberOfStarsClicked} stars for ${category}`);
    setFormData({
      ...formData,
      [category]: numberOfStarsClicked,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    axios
      .get(`https://apis-2-4nek.onrender.com/reviews/reviews/tour/${id}`)
      .then((res) => {
        const reviews = res.data; // Get the array of reviews from the response data
        setRatings(reviews); // Set the ratings state to the array of reviews
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const calculateAverageRating = () => {
    // Create an array of keys to exclude from the calculation
    const keysToExclude = ["email", "name", "title", "review"];

    // Filter out keys that are not in the keysToExclude array
    const ratingKeys = Object.keys(formData).filter(
      (key) => !keysToExclude.includes(key)
    );

    // Calculate total ratings based on the filtered keys
    const totalRatings = ratingKeys.reduce(
      (acc, key) => acc + formData[key],
      0
    );

    // Calculate total categories based on the number of filtered keys
    const totalCategories = ratingKeys.length;

    // Check if totalCategories is 0 to avoid division by zero
    if (totalCategories === 0) {
      return 0; // Handle this case appropriately based on your requirements
    }
    console.log(totalRatings / totalCategories);
    // Calculate and return the average rating
    return totalRatings / totalCategories;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      const response = await axios.post(
        "https://apis-2-4nek.onrender.com/reviews/review",
        {
          userId: "65ee2efc9e7432530fe502f4",
          tourId: id,
          name: formData.name,
          email: formData.email,
          reviewText: formData.review,
          reviewTitle: formData.title,
          rating: calculateAverageRating(), // Calculate the average rating
        }
      );

      if (response.status === "ok") {
        console.log("Review submitted successfully");
        // Reset form data after successful submission
        setFormData({
          email: "",
          name: "",
          title: "",
          review: "",
          guide: 0,
          location: 0,
          cleanliness: 0,
          service: 0,
          transportion: 0,
        });
      } else {
        console.error("Error submitting review:", response.statusText);
        // Handle error appropriately, such as displaying an error message
        // For example, you can set an error state to display an alert to the user
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error appropriately, such as displaying an error message
      // For example, you can set an error state to display an alert to the user
    }
  };

  // useEffect(() => {
  //   setRatings(4.1);
  // }, []);

  return (
    <div
      className="container"
      style={{ direction: i18n.language === "ar" && "rtl" }}
    >
      <div className="row">
        <div className="col-md-8 ">
          <div style={{ borderRadius: "25px" }} className="card my-5 ">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4 ">
                  <div className="container ">
                    <div className="row justify-content-center">
                      <p
                        style={{ color: colors.violet }}
                        className="fw-bolder fs-3"
                      >
                        5/5
                      </p>
                      <p
                        style={{
                          color: colors.black,
                          fontWeight: "400",
                          fontSize: "29px",
                        }}
                        className="fw-400 "
                      >
                        {t("reviews.excellent")}
                      </p>
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
                        <span> {t("reviews.numberOfReviews")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-1 d-lg-block  d-md-none d-sm-none   ">
                  <p
                    style={{
                      width: "2px",
                      height: "200px",
                      backgroundColor: colors.lightGrey,
                    }}
                  ></p>
                </div>

                <div className="col-lg-7">
                  <div className="row">
                    <div className="col-md-3">
                      <p>{t("reviews.excellent")}</p>
                    </div>
                    <div className="col-md-7">
                      <div className="progress mx-4" style={{ height: "5px" }}>
                        <div
                          className="progress-bar dark"
                          style={{
                            width: "98%",
                            height: "5px",
                            backgroundColor: "#000000",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <p>48</p>{" "}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <p>{t("reviews.very_good")}</p>
                    </div>
                    <div className="col-md-7">
                      <div className="progress mx-4" style={{ height: "5px" }}>
                        <div
                          className="progress-bar dark"
                          style={{
                            width: "98%",
                            height: "5px",
                            backgroundColor: "#000000",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <p>98</p>{" "}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <p>{t("reviews.average")}</p>
                    </div>
                    <div className="col-md-7">
                      <div className="progress mx-4" style={{ height: "5px" }}>
                        <div
                          className="progress-bar dark"
                          style={{
                            width: "98%",
                            height: "5px",
                            backgroundColor: "#000000",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <p>80</p>{" "}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <p>{t("reviews.poor")}</p>
                    </div>
                    <div className="col-md-7">
                      <div className="progress mx-4" style={{ height: "5px" }}>
                        <div
                          className="progress-bar dark"
                          style={{
                            width: "98%",
                            height: "5px",
                            backgroundColor: "#000000",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <p>50</p>{" "}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <p>{t("reviews.bad")}</p>
                    </div>
                    <div className="col-md-7">
                      <div className="progress mx-4" style={{ height: "5px" }}>
                        <div
                          className="progress-bar dark"
                          style={{
                            width: "98%",
                            height: "5px",
                            backgroundColor: "#000000",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <p>5</p>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-5">
            <p>{t("reviews.reviewparagraph")}</p>
            <div
              className="my-1"
              style={{ width: "100%", height: "1px", border: "1px solid gray" }}
            ></div>
          </div>
          <div className="user_review d-flex justify-content-between ">
            {ratings.length > 0 &&
              ratings.map((review) => (
                <div className="review_info" key={review._id}>
                  <div className="d-flex align-items-start">
                    <div className="user_img me-3">
                      <img src="assets/Images/Ellipse 366.svg" alt="" />
                    </div>
                    <div className="user_info text-start">
                      <h4>
                        {review.userId.firstName} {review.userId.lastName}
                      </h4>
                      <h6>{t("reviews.date")} 08 2024</h6>
                      <p className="">
                        {[...Array(5)].map((_, index) => (
                          <FontAwesomeIcon
                            key={index}
                            icon={solidStar}
                            style={{ color: "gold" }}
                          />
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="description text-start mt-4">
                    <h4>{review.reviewTitle}</h4>
                    <p>{review.reviewText}</p>
                  </div>
                </div>
              ))}
          </div>
          {ratings.length > 0 && (
            <div className="col-3">
              <div
                className="helpful"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    color: colors.violet,
                    fontWeight: "600",
                  }}
                >
                  {t("reviews.helpful")}
                </span>
                <FontAwesomeIcon
                  className="fs-5"
                  icon={faThumbsUp}
                  style={{ color: colors.violet }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="my-3"
        style={{ width: "100%", height: "1px", border: "1px solid gray" }}
      ></div>

      <div className="user_review d-flex justify-content-between ">
        <div className="review_info">
          <div className="d-flex align-items-start ">
            <div className="user_img me-3">
              <img src="assets/Images/Ellipse 366.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "201px",
          height: "65px",
          borderRadius: "20px",
          backgroundColor: colors.violet,
          color: "white",
          fontWeight: "700",
          fontSize: "16px",
        }}
      >
        <p> {t("reviews.write_a_review")}</p>
      </div>
      <p
        className={`fw-bold fs-4 text-${
          i18n.language === "ar" ? "end" : "start"
        } my-2`}
      >
        {t("reviews.leave_a_review")}
      </p>
      <p className={`text-${i18n.language === "ar" ? "end" : "start"}`}>
        {t("reviews.email_note")}
      </p>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            style={{ height: "85px", borderRadius: "20px" }}
            placeholder={t("form.namePlaceholder")}
            type="text"
            className="form-control fw-bold"
            id="inputName"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            style={{ height: "85px", borderRadius: "20px" }}
            placeholder={t("form.emailPlaceholder")}
            className="form-control fw-bold"
            id="inputEmail4"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <input
            style={{ height: "85px", borderRadius: "20px" }}
            placeholder={t("form.reviewTitlePlaceholder")}
            type="text"
            className="form-control fw-bold"
            id="inputName"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 col-sm-12 position-relative">
          <textarea
            style={{ height: "257px", borderRadius: "20px" }}
            className="form-control"
            readOnly
          />
          <span
            style={{ left: "20px", top: "20px" }}
            className="position-absolute"
          >
            {t("form.guide")}
          </span>
          <div
            className="position-absolute"
            style={{ right: "20px", top: "20px" }}
          >
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={formData.guide > index ? solidStar : regularStar}
                style={{ color: "gold", cursor: "pointer" }}
                onClick={() => handleStarClick("guide", index)}
              />
            ))}
          </div>

          <span
            className="position-absolute"
            style={{ left: "20px", top: "60px" }}
          >
            {t("form.location")}
          </span>
          <div
            className="position-absolute"
            style={{ right: "20px", top: "60px" }}
          >
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={formData.location > index ? solidStar : regularStar}
                style={{ color: "gold", cursor: "pointer" }}
                onClick={() => handleStarClick("location", index)}
              />
            ))}
          </div>

          <span
            className="position-absolute"
            style={{ left: "20px", top: "100px" }}
          >
            {t("form.cleanliness")}
          </span>
          <div
            className="position-absolute"
            style={{ right: "20px", top: "100px" }}
          >
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={formData.cleanliness > index ? solidStar : regularStar}
                style={{ color: "gold", cursor: "pointer" }}
                onClick={() => handleStarClick("cleanliness", index)}
              />
            ))}
          </div>

          <span
            className="position-absolute"
            style={{ left: "20px", top: "140px" }}
          >
            {t("form.service")}
          </span>
          <div
            className="position-absolute"
            style={{ right: "20px", top: "140px" }}
          >
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={formData.service > index ? solidStar : regularStar}
                style={{ color: "gold", cursor: "pointer" }}
                onClick={() => handleStarClick("service", index)}
              />
            ))}
          </div>

          <span
            className="position-absolute"
            style={{ left: "20px", top: "180px" }}
          >
            {t("form.transportion")}
          </span>
          <div
            className="position-absolute"
            style={{ right: "20px", top: "180px" }}
          >
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={formData.transportion > index ? solidStar : regularStar}
                style={{ color: "gold", cursor: "pointer" }}
                onClick={() => handleStarClick("transportion", index)}
              />
            ))}
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <input
            style={{ height: "257px", borderRadius: "20px" }}
            placeholder={t("form.writeReviewPlaceholder")}
            type="text"
            className="form-control fw-bold"
            id="inputreview"
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: "201px",
            height: "65px",
            borderRadius: "20px",
            backgroundColor: colors.violet,
            color: "white",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          {t("form.submitButton")}
        </button>
      </form>
    </div>
  );
};

export default Reviews;
