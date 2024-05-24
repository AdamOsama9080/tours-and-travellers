import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import UserResetLink from "../../Pages/Sign/User/UserResetLink";
import UserResetPassword from "../../Pages/Sign/User/UserResetPassword";
import UserSignUp from "../../Pages/Sign/User/UserSignUp";
import UserSignIn from "../../Pages/Sign/User/UserSignIn";
import Onetimepassword from "../OTP/Onetimepassword";
import OtpForgetpassword from "../OTP-forget-password/Otp-Forget-password";
import Search from "../Search/Search";
import Bookings from "../Bookings/Bookings";
import Organize from "../Organizer/Organize";
import ToursDetails from "../ToursDetails/ToursDetails";
import Favourites from "../Favourites/Favourites";
import Profile from "../../Components/Profile/Profile";
import { DataToShowProvider } from "../../Contexts/dataToShow";
import { FilterContextProvider, FilterationProvider } from "../../Contexts/filterationContext";
import { TourDetailsProvider } from "../../Contexts/TourdetailsContext";
import NotFound from "../NotFound/NotFound";
import { AdultsProvider } from "../../Contexts/AdultsContext";
import Dashboard from "../Dashboard/Dashboard";
import CreateTour from "../../Components/CreateTour/CreateTour";
import UpdateandDeleteTour from "../../Components/UpdateandDeleteTour/UpdateandDeleteTour";
import OrganizerProfile from "../../Components/organizerProfile/OrganizerProfile";
import Finance from "../../Components/FinanceOragnaizer/Finance";
import { ModalProvider } from "../../Contexts/pypalContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SearchProvider } from "../../Contexts/SearchResultContext";
// import { AuthProvider, useAuth } from "../../Contexts/authContext";
import ToursDetailsandBooking from "../../Components/Tours Detailsand information/ToursDetailsandBooking";
import ContactUs from "../ContactUs/ContactUs";
import Aboutus from "../AboutUs/Aboutus";
import Frequentlyaskedquestions from "../Frequentlyaskedquestions/Frequentlyaskedquestions";
import BookingVisa from "../BookingVisa/BookingVisa";
import OrderResponse from "../OrderResponse/OrderResponse";
import CreateOrganizerEmail from "../../Components/CreateOrganizerEmail/CreateOrganizerEmail";
import {jwtDecode} from "jwt-decode";
import { AuthProvider , useAuth } from './../../Contexts/authContext ';
import Discounts from "../../Components/Discounts/Discounts";
import OrganzierCustomService from "../../Components/OrganizerCostoumService/OrganzierCustomService";
import OrganizerAcrivation from "../../Components/Organizer Ativation/OrganizerAcrivation";

export default function Test() {
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setUserRole(decodedUser.role);
    }
  }, []);

  return (
    
    <GoogleOAuthProvider clientId="46424832078-grv3nhik7b2bii270htb8fots0bnj8ib.apps.googleusercontent.com">
      <AuthProvider>
        <DataToShowProvider>
          <ModalProvider>
            <FilterContextProvider>
              <TourDetailsProvider>
                <AdultsProvider>
                  <TourDetailsProvider>
                    <SearchProvider>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="/resetLinkUser" element={<UserResetLink />} />
                        <Route path="/resetPasswordUser" element={<UserResetPassword />} />
                        <Route path="/signUpUser" element={<UserSignUp />} />
                        <Route path="/signInUser" element={<UserSignIn />} />
                        <Route path="/one-time-password" element={<Onetimepassword />} />
                        <Route path="/otp-forget-password" element={<OtpForgetpassword />} />
                        {user && (userRole === "admin" || userRole === "organizer") && (
                          <Route path="/organizer" element={<Organize />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="profile" element={<OrganizerProfile />} />
                            <Route path="create-tour" element={<CreateTour />} />
                            <Route path="update-tour" element={<UpdateandDeleteTour />} />
                            <Route path="finance" element={<Finance />} />
                            <Route path="disscount" element={<Discounts />} />
                            <Route path="custom-service" element={<OrganzierCustomService></OrganzierCustomService>}></Route>
                            {userRole === "admin" && (  
                            <>
                              <Route path="create-organizer" element={<CreateOrganizerEmail />} />
                              <Route path="organizer-Activation" element={<OrganizerAcrivation></OrganizerAcrivation>} />
                            </>
                            )}
                          </Route>
                        )}
                        <Route path="/tours/:tourId" element={<ToursDetailsandBooking />} />
                        <Route path="/ContactUs" element={<ContactUs />} />
                        <Route path="/AboutUs" element={<Aboutus />} />
                        <Route path="/Frequentlyaskedquestions" element={<Frequentlyaskedquestions />} />
                        <Route path="/BookingVisa" element={<BookingVisa />} />
                        <Route path="/OrderResponse" element={<OrderResponse />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </SearchProvider>
                  </TourDetailsProvider>
                </AdultsProvider>
              </TourDetailsProvider>
            </FilterContextProvider>
          </ModalProvider>
        </DataToShowProvider>
      </AuthProvider>
    </GoogleOAuthProvider>

    // <CreateOrganizerEmail></CreateOrganizerEmail>
  );
}
