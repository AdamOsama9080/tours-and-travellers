import React from "react";
import SideBarOrganizer from "./../../Components/SidebarOrganizer/SideBarOrganizer";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import CreateTour from "../../Components/CreateTour/CreateTour";
import UpdateandDeleteTour from "../../Components/UpdateandDeleteTour/UpdateandDeleteTour";
import OrganizerProfile from "../../Components/organizerProfile/OrganizerProfile";
import Finance from "../../Components/FinanceOragnaizer/Finance";
import CreateOrganizerEmail from "../../Components/CreateOrganizerEmail/CreateOrganizerEmail";
import Discounts from "../../Components/Discounts/Discounts";
import OrganzierCustomService from "../../Components/OrganizerCostoumService/OrganzierCustomService";
import OrganizerAcrivation from "../../Components/Organizer Ativation/OrganizerAcrivation";
import Reports from "../../Components/Reports/Reports";

export default function Organize() {
  return (
    // <div>Organize</div>
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideBarOrganizer></SideBarOrganizer>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-tour" element={<CreateTour></CreateTour>} />
          <Route path="/update-tour" element={<UpdateandDeleteTour></UpdateandDeleteTour>}></Route>
          <Route path="/profile" element={<OrganizerProfile></OrganizerProfile>}></Route>
          <Route path="/finance" element={<Finance></Finance>}></Route>
          <Route path="/create-organizer" element={<CreateOrganizerEmail></CreateOrganizerEmail>}></Route>
          <Route path="/disscount" element={<Discounts></Discounts>}></Route>
          {/* <Route path="/organize-tours" element={<OrganzierCustomService></OrganzierCustomService>}></Route> */}
          <Route path="/organizer-Activation" element={<OrganizerAcrivation></OrganizerAcrivation>}></Route>
          <Route path="/custom-service" element={<OrganzierCustomService></OrganzierCustomService>}></Route>
          <Route path="reports" element={<Reports></Reports>}></Route>
        </Routes>
      </div>
    </div>
  );
}
