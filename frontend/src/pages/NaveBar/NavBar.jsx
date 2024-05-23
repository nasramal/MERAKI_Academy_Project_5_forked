import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../Service/Redux/Slice/Auth";
import SearchResult from "../../pages/NaveBar/SearchResult";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role_id } = useSelector((state) => ({
    role_id: state.auth.role_id,
    isLoggedIn: state.auth.isLoggedIn,
  }));

  const logout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <div className="NavBar">
      <div className="logoContainer">
        <NavLink to="/" className="logoLink">
          <img
            src="https://png.pngtree.com/png-vector/20220920/ourmid/pngtree-healthcare-png-image_6207439.png"
            alt="Medical Logo"
            className="Medical"
          />
        </NavLink>
      </div>
      <div className="navLinks">
        {isLoggedIn && role_id == "1" ? (
          <>
            <NavLink className="Link" to="/">
              Home Page
            </NavLink>
            <NavLink className="Link" to="/Diagnosis">
              My Diagnosis
            </NavLink>
            <NavLink className="Link" to="/Appointment">
              Book Appointment
            </NavLink>
            <NavLink className="Link" to="/user">
              My Profile
            </NavLink>
          </>
        ) : isLoggedIn && role_id == "2" ? (
          <>
            <NavLink className="Link" to="/">
              Home Page
            </NavLink>
            <NavLink className="Link" to="/Appointments">
              My Appointments
            </NavLink>
            <NavLink className="Link" to="/schedule">
              My Schedule
            </NavLink>
            <NavLink className="Link" to="/notes">
              My Notes
            </NavLink>
            <NavLink className="Link" to="/provider">
              My Profile
            </NavLink>
            <NavLink className="Link" to="/docInfo">
              My Info
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="Link" to="/">
              Home Page
            </NavLink>
            <NavLink className="Link" to="/about">
              About
            </NavLink>
            <NavLink className="Link" to="/Contactus">
              Contact Us
            </NavLink>
            <NavLink className="Link" to="/register">
              Register
            </NavLink>
            <NavLink className="Link" to="/login">
              Login
            </NavLink>
          </>
        )}
        <SearchResult />
      </div>

      {isLoggedIn && (
        <button className="logout" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default NavBar;
