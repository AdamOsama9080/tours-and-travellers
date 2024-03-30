import React from "react";
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
import ToursDetailsandBooking from "../../Components/Tours Detailsand information/ToursDetailsandBooking";
const getUserRole = () => {
  const role = localStorage.getItem("role");
  return role ? role : "";
};
export default function Test() {
  const userRole = getUserRole();
  return (
    <GoogleOAuthProvider clientId="46424832078-grv3nhik7b2bii270htb8fots0bnj8ib.apps.googleusercontent.com">
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
                        {/* Handle Organize Routing */}
                        <Route path="/resetLinkUser" element={<UserResetLink />} />
                        <Route
                          path="/resetPasswordUser"
                          element={<UserResetPassword />}
                          />
                        <Route path="/signUpUser" element={<UserSignUp />} />
                        <Route path="/signInUser" element={<UserSignIn />} />
                        <Route
                          path="/one-time-password"
                          element={<Onetimepassword />}
                          />
                        <Route
                          path="/otp-forget-password"
                          element={<OtpForgetpassword />}
                          />
                        {userRole === "organizer" && (
                          <Route path="/organizer" element={<Organize />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="create-tour" element={<CreateTour />} />
                            <Route
                              path="update-tour"
                              element={<UpdateandDeleteTour />}
                              />
                            <Route path="profile" element={<OrganizerProfile />} />
                            <Route path="finance" element={<Finance />} />
                          </Route>
                        )}
                        {/* <Route path="/tours" element={<ToursDetails />} /> */}
                        <Route path="/tours" element={<ToursDetailsandBooking></ToursDetailsandBooking>}></Route>
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </SearchProvider>
                </TourDetailsProvider>
              </AdultsProvider>
            </TourDetailsProvider>
          </FilterContextProvider>
        </ModalProvider>
      </DataToShowProvider>
    </GoogleOAuthProvider>
  );
}
