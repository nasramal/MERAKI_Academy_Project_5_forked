import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLogout } from "../../Service/Redux/Slice/Auth";
import Modal from "./Modal"; // Import the Modal component
import "./NavBar.css";
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoggedIn, role_id } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to handle the selected doctor
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal open/close
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/providers")
      .then((response) => {
        if (response.data.success) {
          setDoctors(response.data.result);
          setFilteredDoctors(response.data.result);
        }
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const searchDoctors = () => {
    const filtered = doctors.filter((doctor) =>
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };
  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };
  const logout = () => {
    dispatch(setLogout());
    navigate("/");
  };
  return (
    <div className="NavBar">
      <div className="logoContainer">
        <img src="medical_logo.png" alt="Medical Logo" className="logo" />
      </div>
      <div className="navLinks">
        {isLoggedIn ? (
          role_id === "1" ? (
            <>
              <NavLink className="Link" to="/">Home Page</NavLink>
              <NavLink className="Link" to="/Diagnosis">My Diagnosis</NavLink>
              <NavLink className="Link" to="/Appointment">Book Appointment</NavLink>
              <NavLink className="Link" to="/user">My Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink className="Link" to="/">Home Page</NavLink>
              <NavLink className="Link" to="/Appointments">My Appointments</NavLink>
              <NavLink className="Link" to="/schedule">My Schedule</NavLink>
              <NavLink className="Link" to="/notes">My Notes</NavLink>
              <NavLink className="Link" to="/provider">My Profile</NavLink>
            </>
          )
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
        <button onClick={searchDoctors}>Search</button>
        <ul>
          {filteredDoctors.map((doc, index) => (
            <li key={index} onClick={() => handleDoctorClick(doc)}>
              {doc.firstName} {doc.lastName}
            </li>
          ))}
        </ul>
      </div>
      {isLoggedIn && (
        <button className="logout" onClick={logout}>
          Logout
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} doctor={selectedDoctor} />
    </div>
  );
};
export default NavBar;


// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setLogout } from "../../Service/Redux/Slice/Auth";

// import "./NavBar.css";

// const NavBar = () => {
//   const dispatch = useDispatch();

//   const navigate = useNavigate();

  
//   const logged = localStorage.getItem("token")


//   const [searchQuery, setSearchQuery] = useState('');
//   const { isLoggedIn, role_id } = useSelector((state) => ({
//     role_id: state.auth.role_id,
//     isLoggedIn: state.auth.isLoggedIn
//   }));

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = () => {
//     console.log('Searching for:', searchQuery);
//   };
  
//   const logout = () => {
//     dispatch(setLogout());
//     navigate("/");
//   };

//   return (
//     <>
//       <div className="NavBar">
//         <div className="logoContainer">
//           <img src="medical_logo.png" alt="Medical Logo" className="logo" />
//         </div>
//         <div className="navLinks">
//           {(logged && role_id === 1) ? (
//             <>
//               <NavLink className="Link" to="/">Home Page</NavLink>
//               <NavLink className="Link" to="/Diagnosis">My Diagnosis</NavLink>
//               <NavLink className="Link" to="/Appointment">Book Appointment</NavLink>
//               <NavLink className="Link" to="/user">My Profile</NavLink>
//             </>
//           ) : (logged && role_id === 2) ? (
//             <>
//               <NavLink className="Link" to="/">Home Page</NavLink>
//               <NavLink className="Link" to="/Appointments">My Appointments</NavLink>
//               <NavLink className="Link" to="/schedule">My Schedule</NavLink>
//               <NavLink className="Link" to="/notes">My Notes</NavLink>
//               <NavLink className="Link" to="/provider">My Profile</NavLink>
//             </>
//           ) : (
//             <>
//               <NavLink className="Link" to="/">Home Page</NavLink>
//               <NavLink className="Link" to="/about">About</NavLink>
//               <NavLink className="Link" to="/Contactus">Contact Us</NavLink>
//               <NavLink className="Link" to="/register">Register</NavLink>
//               <NavLink className="Link" to="/login">Login</NavLink>
//             </>
//           )}
//         </div>
//         <div className="searchContainer">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           <button onClick={handleSearchSubmit}>Search</button>
//         </div>
//         {isLoggedIn && (
//           <button className="logout" onClick={logout}>
//             Logout
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default NavBar;