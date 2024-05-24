import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../colors";
import {jwtDecode} from "jwt-decode";
import { useAuth } from "../../Contexts/authContext ";

export default function SideBarOrganizer() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const token = localStorage.getItem("token");
  let user = null;
  let userRole = "";

  if (token) {
    try {
      user = jwtDecode(token);
      userRole = user.role;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token"); // Optional: remove invalid token
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Call the logout function from useAuth if additional cleanup is needed
    logout();
    navigate("/"); // Adjust the path according to your routing setup
  };

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
              <span className="fs-2 d-none d-sm-inline p-4 fw-bold ">
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
                to="profile"
                className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
              >
                Profile
              </Link>
            </li>
            {
              userRole === "organizer" && (
                <>
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
                    to="create-tour"
                    className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
                  >
                    Create Tour
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="disscount"
                    className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
                  >
                    Disscount
                  </Link>
                </li>
                <li className="custom-service">
                  <Link
                    to="custom-service"
                    className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
                  >
                    Custom Service
                  </Link>
                </li>
                </>
              )
            }


            {userRole === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    to="create-organizer"
                    className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
                  >
                    Create Organizer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="organizer-Activation"
                    className="nav-link p-4 mt-3 fs-5 fw-bold text-white align-middle px-0"
                  >
                    Activation
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="#"
                onClick={handleLogout} // Use onClick prop correctly
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
