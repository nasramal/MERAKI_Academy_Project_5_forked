import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../Service/Redux/Slice/Auth";

import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, role_id } = useSelector((state) => ({
    role_id: state.auth.role_id,
    isLoggedIn: state.auth.isLoggedIn
  }));

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('Searching for:', searchQuery);
  };
  
  const logout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <>
      <div className="NavBar">
        <div className="logoContainer">
          <img src="medical_logo.png" alt="Medical Logo" className="logo" />
        </div>
        <div className="navLinks">
          {(isLoggedIn && role_id === 1) ? (
            <>
              <NavLink className="Link" to="/">Home Page</NavLink>
              <NavLink className="Link" to="/Diagnosis">My Diagnosis</NavLink>
              <NavLink className="Link" to="/Appointment">Book Appointment</NavLink>
              <NavLink className="Link" to="/provider">My Profile</NavLink>
            </>
          ) : (isLoggedIn && role_id === 2) ? (
            <>
              <NavLink className="Link" to="/">Home Page</NavLink>
              <NavLink className="Link" to="/Appointment">My Appointments</NavLink>
              <NavLink className="Link" to="/Schedual">My Schedule</NavLink>
              <NavLink className="Link" to="/Notes">My Notes</NavLink>
              <NavLink className="Link" to="/User">My Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink className="Link" to="/">Home Page</NavLink>
              <NavLink className="Link" to="/about">About</NavLink>
              <NavLink className="Link" to="/Contactus">Contact Us</NavLink>
              <NavLink className="Link" to="/register">Register</NavLink>
              <NavLink className="Link" to="/login">Login</NavLink>
            </>
          )}
        </div>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        {isLoggedIn && (
          <button className="logout" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default NavBar;