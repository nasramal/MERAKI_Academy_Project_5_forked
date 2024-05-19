import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors data
    axios.get("http://localhost:5000/docInfo")
      .then(response => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      })
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredDoctors(users.filter(doctor =>
      doctor.firstName.toLowerCase().includes(event.target.value.toLowerCase())
    ));
  };

  return (
    <div>
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
  );
};

export default DoctorSearch;


