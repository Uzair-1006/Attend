import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Brand Logo */}
        <a className="navbar-brand fw-bold text-primary" href="#">
          Attendance Visualizer
        </a>

        {/* Navbar Toggle Button (for Mobile View) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Buttons pushed to the right using ms-auto */}
          <div className="ms-auto d-flex">
            <button
              className={`btn mx-2 ${
                location.pathname === "/student" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => navigate("/student")}
            >
              Student
            </button>

            <button
              className={`btn mx-2 ${
                location.pathname === "/faculty" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => navigate("/faculty")}
            >
              Faculty
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
