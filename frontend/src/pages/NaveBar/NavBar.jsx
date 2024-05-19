import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../Service/Redux/Slice/Auth";

import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  
  const logged = localStorage.getItem("token")


  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/docInfo")
      .then(response => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      })
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

 
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredDoctors(users.filter(doctor =>
      doctor.firstName.toLowerCase().includes(event.target.value.toLowerCase())
    ));
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
          {(logged && role_id === 1) ? (
            <>
              <NavLink className="Link" to="/">Home Page</NavLink>
              <NavLink className="Link" to="/Diagnosis">My Diagnosis</NavLink>
              <NavLink className="Link" to="/Appointment">Book Appointment</NavLink>
              <NavLink className="Link" to="/user">My Profile</NavLink>
            </>
          ) : (logged && role_id === 2) ? (
            <>
              <NavLink className="Link" to="/">Home Page</NavLink>
              <NavLink className="Link" to="/Appointments">My Appointments</NavLink>
              <NavLink className="Link" to="/schedule">My Schedule</NavLink>
              <NavLink className="Link" to="/notes">My Notes</NavLink>
              <NavLink className="Link" to="/provider">My Profile</NavLink>
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
        placeholder="Search doctors..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredDoctors.map((doctor, index) => (
          <li key={index}>{doctor.firstName}</li>
        ))}
      </ul>
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