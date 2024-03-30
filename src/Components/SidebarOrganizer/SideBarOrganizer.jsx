import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../colors";

export default function SideBarOrganizer() {


  return (
    <>
      <div
        className="col-auto col-md-3 col-xl-2 px-sm-2 px-0"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <div className="text-center">
            <Link
              to="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-2 d-none d-sm-inline p-4  fw-bold ">
                Trolli
              </span>
            </Link>
          </div>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li>
              <Link
                to="dashboard"
                className="nav-link p-4 mt-3 fs-5 fw-bold text-white px-0 align-middle"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="finance"
                className="nav-link p-4 mt-3 fs-5 fw-bold text-white px-0 align-middle"
              >
                Finance
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="create-tour"
                className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
              >
                Create Tour
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="update-tour"
                className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
              >
                Update Or Delete Tour
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="profile"
                className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="nav-link p-4 mt-3 fs-5 fw-bold text-white px-0 align-middle"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
