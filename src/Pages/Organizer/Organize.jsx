import React from "react";
import SideBarOrganizer from "./../../Components/SidebarOrganizer/SideBarOrganizer";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import CreateTour from "../../Components/CreateTour/CreateTour";
import UpdateandDeleteTour from "../../Components/UpdateandDeleteTour/UpdateandDeleteTour";
import OrganizerProfile from "../../Components/organizerProfile/OrganizerProfile";
import Finance from "../../Components/FinanceOragnaizer/Finance";

export default function Organize() {
  return (
    // <div>Organize</div>
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideBarOrganizer></SideBarOrganizer>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-tour" element={<CreateTour></CreateTour>} />
          <Route
            path="/update-tour"
            element={<UpdateandDeleteTour></UpdateandDeleteTour>}
          ></Route>
          <Route
            path="/profile"
            element={<OrganizerProfile></OrganizerProfile>}
          ></Route>
          <Route path="/finance" element={<Finance></Finance>}></Route>
        </Routes>
      </div>
    </div>
  );
}
