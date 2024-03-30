// import React, { useState } from "react";
// import "./Profile.modules.css";
// import { useTranslation } from "react-i18next";
// import LanguageToggleButton from "../../Localization/LanguageToggleButton";
// import { colors } from "../../colors";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// const Profile = () => {
//   const { t } = useTranslation();
  // const [activeSection, setActiveSection] = useState("personal");
  // const [picture, setPicture] = useState(null);
  // const email = localStorage.getItem("email");
  // const firstName = localStorage.getItem("firstName");
  // const lastName = localStorage.getItem("lastName");

  // const toggleDetails = (section) => {
  //   setActiveSection(section);
  // };

  // const handleImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setPicture(URL.createObjectURL(event.target.files[0]));
  //   }
  // };

  // const handleDeactivateAccount = () => {
  //   alert(t("personalDetails.deactivateAlert"));
  // };

  // const handleDeleteAccount = () => {
  //   alert(t("personalDetails.deleteAlert"));
  // };

  // function SettingsPage() {
  //   const [openCard, setOpenCard] = useState(null);

  //   const handleToggle = (cardName) => {
  //     setOpenCard(cardName === openCard ? null : cardName);
  //   }
  // }


  return (
    // <div className="container">
    //   <div className="row">
    //     <div className="col-lg-3 col-md-12">
    //       <div className="card">
    //         <div
    //           className={`toggle-button ${
    //             activeSection === "personal" ? "active" : ""
    //           }`}
    //           onClick={() => toggleDetails("personal")}
    //         >
    //           <span className="icon">&#128100;</span>{" "}
    //           {t("personalDetails.personalDetails")}
    //         </div>
    //         <hr />
    //         <div
    //           className={`toggle-button ${
    //             activeSection === "payment" ? "active" : ""
    //           }`}
    //           onClick={() => toggleDetails("payment")}
    //         >
    //           <span className="icon">&#128179;</span>{" "}
    //           {t("personalDetails.paymentDetails")}
    //         </div>
    //         <hr />
    //         <div
    //           className={`toggle-button ${
    //             activeSection === "privacy" ? "active" : ""
    //           }`}
    //           onClick={() => toggleDetails("privacy")}
    //         >
    //           <span className="icon">&#128274;</span>{" "}
    //           {t("personalDetails.privacyPolicy")}
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-lg-8 col-md-12">
    //       <div
    //         id="personalDetails"
    //         className={`card details-section ${
    //           activeSection === "personal" && "active"
    //         }`}
    //       >
    //         <h2 style={{ color: "#3B3666" }}>
    //           {t("personalDetails.personalDetails")}
    //         </h2>
    //         <p style={{ color: "gray" }}>{t("personalDetails.updateInfo")}</p>
    //         <div className=" align-items-center mb-3">
    //           <img
    //             src={
    //               picture
    //                 ? picture
    //                 : "assets/Images/man-avatar-profile-vector-21372065.jpg"
    //             }
    //             alt="Profile Picture Preview"
    //             style={{ width: "100px", height: "100px", objectFit: "cover" }}
    //           />
    //           <div>
    //             <input
    //               type="file"
    //               id="profilePictureInput"
    //               style={{ display: "none" }}
    //               onChange={handleImageChange}
    //             />
    //             <label htmlFor="profilePictureInput">
    //               {t("personalDetails.changeProfilePicture")}
    //             </label>
    //           </div>
    //           <div>
    //             <form>
    //               <div className="form-row ">
    //                 <div className="form-group col-md-12">
    //                   <label htmlFor="firstName">
    //                     {t("personalDetails.firstName")}
    //                   </label>
    //                   <input
    //                     type="text"
    //                     className="form-control"
    //                     id="firstName"
    //                     value={firstName}
    //                   />
    //                 </div>
    //                 <div className="form-group col-md-12">
    //                   <label htmlFor="lastName">
    //                     {t("personalDetails.lastName")}
    //                   </label>
    //                   <input
    //                     type="text"
    //                     className="form-control"
    //                     id="lastName"
    //                     value={lastName}
    //                   />
    //                 </div>
    //               </div>
    //               <div className="form-group">
    //                 <label htmlFor="email">{t("personalDetails.email")}</label>
    //                 <input
    //                   type="email"
    //                   className="form-control"
    //                   id="email"
    //                   value={email}
    //                 />
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>

    //       <div
    //         id="paymentDetails"
    //         className={`card details-section ${
    //           activeSection === "payment" && "active"
    //         }`}
    //       >
    //         <h2 style={{ color: "#3B3666" }}>
    //           {t("personalDetails.paymentDetails")}
    //         </h2>
    //         <div className="credit-card">
    //           <img src="assets/Images/visa.png" alt="Credit Card" />
    //           <div>
    //             <span style={{ color: "#3B3666", fontWeight: "bold" }}>
    //               **** **** **** 4215
    //             </span>
    //             <br />
    //             <span style={{ color: "#959595" }}>
    //               {t("personalDetails.expireDate")}: 10/25
    //             </span>
    //           </div>
    //           <span style={{ background: "#EEEEEE", marginLeft: "10px" }}>
    //             {t("personalDetails.default")}
    //           </span>
    //         </div>
    //         <hr />
    //         <div className="credit-card">
    //           <img src="assets/Images/master.png" alt="Credit Card" />
    //           <div>
    //             <span style={{ color: "#3B3666", fontWeight: "bold" }}>
    //               **** **** **** 2623
    //             </span>
    //             <br />
    //             <span style={{ color: "#959595" }}>
    //               {t("personalDetails.expireDate")}: 12/25
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //       <div
    //         id="privacyPolicy"
    //         className={`card details-section ${
    //           activeSection === "privacy" && "active"
    //         }`}
    //       >
    //         <h2 style={{ color: "#3B3666" }}>
    //           {t("personalDetails.privacyPolicy")}
    //         </h2>

    //         <div>
    //           <a href="/request-data" style={{ color: "#665EB1" }}>
    //             {t("personalDetails.requestData")}
    //           </a>
    //           <p style={{ color: "#5D5C66" }}>
    //             {t("personalDetails.requestDataDesc")}
    //           </p>
    //         </div>
    //         <hr />
    //         <div>
    //           <a
    //             href="/deactivate-account"
    //             style={{ color: "#665EB1" }}
    //             onClick={handleDeactivateAccount}
    //           >
    //             {t("personalDetails.deactivateAccount")}
    //           </a>
    //           <p style={{ color: "#5D5C66" }}>
    //             {t("personalDetails.deactivateAccountDesc")}
    //           </p>
    //         </div>
    //         <hr />
    //         <div>
    //           <a
    //             href="/delete-account"
    //             style={{ color: "#665EB1" }}
    //             onClick={handleDeleteAccount}
    //           >
    //             {t("personalDetails.deleteAccount")}
    //           </a>
    //           <p style={{ color: "#5D5C66" }}>
    //             {t("personalDetails.deleteAccountDesc")}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>