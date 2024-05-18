import React, { useEffect, useState } from "react";
import "./Profile.modules.css";
import { useTranslation } from "react-i18next";
import LanguageToggleButton from "../../Localization/LanguageToggleButton";
import { colors } from "../../colors";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useAuth } from "../../Contexts/authContext ";
import  axios  from 'axios';
import Swal from "sweetalert2";
const Profile = () => {
  const { t, i18n } = useTranslation();
  const [openCard, setOpenCard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [previewImage, setPreviewImage] = useState(null);
  const [profilePicture , setProfilePicture] = useState(null);

  // useEffect(() => {
  //   const fetchProfilePicture =  () => {
  //     try {
  //       const response =  axios.post(`http://localhost:2000/register/profile`, { email: user.email });
  //       if (response.data && response.data.profilePicture) {
  //         setProfilePicture(response.data.profilePicture);
  //       } else {
  //         console.error("Profile picture not found in server response:", response);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile picture:", error);
  //     }
  //   };
  
  //   fetchProfilePicture();
  // }, [user.email]);

  console.log(user.email)
  

  const handleToggle = (cardName) => {
    if (openCard === cardName) {
      return;
    } else {
      setOpenCard(cardName);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setUpdatedUser({ ...updatedUser, profilePictureFile: file }); // Store the file itself
    const reader = new FileReader();
    reader.onloadend = () => {
        setPreviewImage(reader.result); // Optionally, set a preview image
    };
    reader.readAsDataURL(file);
};


  const handleEdit = () => {
    setIsEditing(true);
  };

  // const handleUpdate = async () => {
  //   try {
  //     const updatedUserData = {
  //       email: updatedUser.email,
  //       firstName: updatedUser.firstName,
  //       lastName: updatedUser.lastName,
  //       phone: updatedUser.phone,
  //       gender: updatedUser.gender
  //     };
  
  //     if (updatedUser.profilePicture) {
  //       if (typeof updatedUser.profilePicture === 'string') {
  //         const base64Image = updatedUser.profilePicture;
  //         const mimeType = base64Image.split(';')[0].split(':')[1];
  //         const blob = await fetch(base64Image).then((res) => res.blob());
  //         updatedUserData.profilePicture = new File([blob], 'profilePicture', { type: mimeType });
  //       } else {
  //         updatedUserData.profilePicture = updatedUser.profilePicture;
  //       }
  //     }
  //     console.log(updatedUserData.profilePicture);
  //     console.log(updatedUserData);
  
  //     const response = await axios.post('http://localhost:2000/register/update-profile', updatedUserData);
  //     console.log(response.data);
  
  //     if (response.status === 200) {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Profile updated successfully',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       setIsEditing(false);
  //       console.log("Updated user data:", updatedUserData);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Failed to update profile. Please try again later.",
  //       icon: "error"
  //     });
  //   }
  // };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('email', updatedUser.email);
      formData.append('firstName', updatedUser.firstName);
      formData.append('lastName', updatedUser.lastName);
      formData.append('phone', updatedUser.phone);
      formData.append('gender', updatedUser.gender);
      formData.append('profilePicture', updatedUser.profilePictureFile); // Append profile picture file
      
      console.log(formData);
  
      const response = await axios.post('http://localhost:2000/register/update-profile', formData);
      console.log(response.data);
  
      if (response.status === 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Profile updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        setIsEditing(false);
        console.log("Updated user data:", updatedUser);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile. Please try again later.",
        icon: "error"
      });
    }
  };  
  
  useEffect(() => {
    // console.log("Updated user state:", updatedUser);
    const pictureOfUesr = axios.post('http://localhost:2000/register/profile',{

    })
  }, []);


  return (
    <>
      <Navbar></Navbar>
      <div
        className="container"
        style={{ direction: i18n.language === "ar" && "rtl" }}
      >
        <div className="row">
          <h5
            className="fs-3 fw-bold mt-4 ms-3"
            style={{ color: colors.secondary }}
          >
            {t("profile.accountSettings")}
          </h5>
          <div className="col-md-4 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div
                  className={`py-4 px-2`}
                  style={{
                    backgroundColor:
                      openCard === "personal"
                        ? "rgba(231, 229, 246, 1)"
                        : "transparent",
                    color: colors.secondary,
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                >
                  <h5
                    className="card-title"
                    onClick={() => handleToggle("personal")}
                  >
                    <i className="me-2 bi bi-person fs-4"></i>{" "}
                    {t("profile.personalDetails")}
                  </h5>
                </div>
                <hr />
                <div
                  className={`py-4 px-2`}
                  style={{
                    backgroundColor:
                      openCard === "security"
                        ? "rgba(231, 229, 246, 1)"
                        : "transparent",
                    color: colors.secondary,
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                >
                  <h5
                    className="card-title"
                    onClick={() => handleToggle("security")}
                  >
                    <i className="me-2 bi bi-shield fs-4"></i>{" "}
                    {t("profile.privacyandSafety")}
                  </h5>
                </div>
                <hr />
                <div
                  className={`py-4 mb-4 px-2`}
                  style={{
                    backgroundColor:
                      openCard === "payment"
                        ? "rgba(231, 229, 246, 1)"
                        : "transparent",
                    color: colors.secondary,
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                >
                  <h5
                    className="card-title"
                    onClick={() => handleToggle("payment")}
                  >
                    <i className="me-2 bi bi-credit-card fs-4"></i>{" "}
                    {t("profile.paymentDetails")}
                  </h5>
                </div>
                <hr />
                <div
                  className={`py-4 px-2`}
                  style={{
                    backgroundColor:
                      openCard === "settings"
                        ? "rgba(231, 229, 246, 1)"
                        : "transparent",
                    color: colors.secondary,
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                >
                  <h5
                    className="card-title"
                    onClick={() => handleToggle("settings")}
                  >
                    <i className="me-2 bi bi-gear fs-4"></i>{" "}
                    {t("profile.siteSettings")}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          {openCard === "personal" && (
   <div className="col-md-8 col-sm-12">
   <div className="card shadow">
     <div className="card-body p-3">
       <div className="mb-2">
         <h5 className="card-title fs-3" style={{ color: colors.secondary }}>
           {t("profile.personalDetails")}
         </h5>
       </div>
       <p>{t("profile.updateYourInfo")}</p>
       <div className="mt-4 mb-4">
         <p className="card-title" style={{ color: colors.secondary }}></p>
       </div>
       <div className="mt-4 mb-4">
         <p className="card-title ">
           <img
             src={previewImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
             className="rounded-circle text-center me-3 img-fluid"
             alt="Profile img .... "
             style={{ height: "80px", width: "80px" }}
           />
           {t("profile.changeProfilePicture")}
         </p>
         <input
           type="file"
           accept="image/*"
           onChange={handleProfilePictureChange}
           disabled={!isEditing}
         />
       </div>

       <div className="input-group row">
         <label htmlFor="firstname" className="d-block mt-3">
           {t("profile.firstName")}
         </label>
         <input
           type="text"
           className="form-control text-center"
           placeholder="firstname"
           aria-label="firstname"
           aria-describedby="addon-wrapping"
           disabled={!isEditing}
           value={updatedUser.firstName}
           onChange={handleChange}
           name="firstName"
         />
          <label htmlFor="lastname" className="d-block mt-3">
            {t("profile.lastName")}
          </label>
          <input
            type="text"
            className="form-control text-center"
            placeholder="Lastname"
            aria-label="Lastname"
            aria-describedby="addon-wrapping"
            disabled={!isEditing}
            value={updatedUser.lastName}
            onChange={handleChange}
            name="lastName"
          />
          <label htmlFor="email" className="d-block mt-3">
            {t("profile.email")}
          </label>
          <input
            type="text"
            className="form-control text-center"
            placeholder="email"
            aria-label="email"
            aria-describedby="addon-wrapping"
            disabled
            value={updatedUser.email}
          />
          <label htmlFor="phone" className="d-block mt-3">
            {t("profile.phone")}
          </label>
          <input
            type="number"
            className="form-control text-center rounded-4"
            placeholder="phone"
            aria-label="phone"
            aria-describedby="addon-wrapping"
            disabled={!isEditing}
            value={updatedUser.phone}
            onChange={handleChange}
            name="phone"
          />
          <label htmlFor="gender" className="d-block mt-3">
            {t("profile.gender")}
          </label>
          <select
            className="form-control text-center"
            id="gender"
            disabled={!isEditing}
            value={updatedUser.gender}
            onChange={handleChange}
            name="gender"
          >
            <option value="other">Other</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mt-4 mb-4">
            {isEditing ? (
              <button className="btn btn-primary ms-5" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

          )}

          {openCard === "security" && (
            <div className="col-md-8 col-sm-12">
              <div className="card shadow">
                <div className="card-body p-3">
                  <div className="mb-2">
                    <h5
                      className="card-title fs-3"
                      style={{ color: colors.primary }}
                    >
                      {t("profile.privacyandSafety")}
                    </h5>
                  </div>

                  <div className="mt-3">
                    <p
                      className="card-title link-underline-secondary fw-bold"
                      style={{
                        color: colors.secondary,
                        textDecoration: "underline",
                      }}
                    >
                      {t("profile.requestYouPersonalData")}
                    </p>
                    <p className="">{t("profile.createFile")}</p>
                  </div>
                  <hr></hr>
                  <div className="mt-3">
                    <p
                      className="card-title link-underline-secondary fw-bold"
                      style={{
                        color: colors.secondary,
                        textDecoration: "underline",
                      }}
                    >
                      {t("profile.deactivateYourAccount")}
                    </p>
                    <p className="">{t("profile.deactivateYourAccountTemp")}</p>
                  </div>
                  <hr></hr>
                  <div className="mt-3">
                    <p
                      className="card-title link-underline-secondary fw-bold"
                      style={{
                        color: colors.secondary,
                        textDecoration: "underline",
                      }}
                    >
                      {t("profile.deleteYourAccount")}
                    </p>
                    <p className="">{t("profile.permanentlyDelete")}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {openCard === "payment" && (
            <div className="col-md-8 col-sm-12">
              <div className="card shadow">
                <div className="card-body p-3">
                  <div className="mb-2">
                    <h5
                      className="card-title fs-3"
                      style={{ color: colors.primary }}
                    >
                      {t("profile.paymentDetails")}
                    </h5>
                  </div>

                  <div className="d-flex mt-4 mb-4 align-items-center">
                    <img
                      src="data:image/png;base64,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"
                      className=" text-center me-3 img-fluid"
                      alt="Profile img .... "
                      style={{ height: "50px", width: "80px" }}
                    />
                    <div>
                      <p
                        className="fw-bold me-3"
                        style={{ color: colors.secondary }}
                      >
                        **** **** **** 4513
                        <span
                          className="fw-bold p-1 bg-body-secondary text-black ms-5 px-2"
                          style={{ borderRadius: "3px", borderRadius: "3px" }}
                        >
                          {t("profile.default")}
                        </span>
                      </p>
                      <p>{t("profile.expires")}: 10/24</p>
                    </div>
                  </div>

                  <hr></hr>

                  <div className="d-flex mt-4 mb-4 align-items-center">
                    <img
                      src="data:image/png;base64,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"
                      className=" text-center me-3 img-fluid"
                      alt="Profile img .... "
                      style={{ height: "50px", width: "80px" }}
                    />
                    <div>
                      <p
                        className="fw-bold me-3"
                        style={{ color: colors.secondary }}
                      >
                        **** **** **** 2623
                      </p>
                      <p>{t("profile.expires")}: 10/28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {openCard === "settings" && (
            <div className="col-md-8 col-sm-12">
              <div className="card shadow">
                <div className="card-body p-3">
                  <div className="mb-2">
                    <h5
                      className="card-title fs-3"
                      style={{ color: colors.primary }}
                    >
                      {t("profile.language")}
                    </h5>
                  </div>
                  <div class="input-group row">
                    <label htmlFor="firstname" className="d-block mt-3">
                      {t("profile.language")}
                    </label>
                    <select className="form-select text-center mb-3">
                      <option value="english">English (US)</option>
                      <option value="arabic">العربية</option>
                    </select>
                    <hr></hr>
                    <label htmlFor="currency" className="d-block ">
                      {t("profile.currency")}
                    </label>
                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="currency"
                      aria-label="currency"
                      aria-describedby="addon-wrapping"
                      disabled
                      value={"Egyptian Pound"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
      </div> */}
        <Footer></Footer>
    </>
  );
};

export default Profile;
