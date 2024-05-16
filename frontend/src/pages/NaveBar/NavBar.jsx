import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css"
//===============================================================

const NavBar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const {isLoggedIn,logout,role_id} = useSelector ((state)=>{
   return {
    role_id:state.auth.role_id,
    logout:state.auth.logout,
    isLoggedIn:state.auth.isLoggedIn
   }
  })


  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearchSubmit = () => {
     
      console.log('Searching for:', searchQuery);
    };
  

  //===============================================================

  return (
  
<>
  <div className="NavBar">
    <div className="logoContainer">
      <img src="medical_logo.png" alt="Medical Logo" className="logo" />
    </div>
    <div className="navLinks">
      {isLoggedIn && role_id === 1 && (
        <>
          <NavLink className="Link" to="/landing">Home Page</NavLink>
          <NavLink className="Link" to="/notes">My Notes</NavLink>
          <NavLink className="Link" to="/Appointment">Book Appointment</NavLink>
          <NavLink className="Link" to="/User">My Profile</NavLink>
        </>
      )}
      {isLoggedIn && role_id === 2 && (
        <>
          <NavLink className="Link" to="/landing">Home Page</NavLink>
          <NavLink className="Link" to="/Appointment">My Appointments</NavLink>
          <NavLink className="Link" to="/Appointment">My Schedule</NavLink>
          <NavLink className="Link" to="/User">My Profile</NavLink>
        </>
      )}
      {!isLoggedIn && (
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
      <button className="logout" onClick={logout}>Logout</button>
    )}
  </div>
</>
)};

export default NavBar;

