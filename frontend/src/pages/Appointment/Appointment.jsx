import React, { useEffect, useState } from "react";
import "./Appointment.css";
import axios from "axios";
import { useSelector } from "react-redux";

function Appointment() {
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const getAppointmentByUser = async () => {
    try {
      const result = await axios.get("http://localhost:5000/appointment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.data.success) {
        setAppointments(result.data.result);
        setMessage("");
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error happened while getting data, please try again.");
      }
    }
  };

  useEffect(() => {
    getAppointmentByUser();
  }, []);

  return (
    <div className="container">
      {appointments.length > 0 &&
        appointments.map((elem, index) => {
          const statusClass =
            elem.status === "accept"
              ? "status-accept"
              : elem.status === "pending"
              ? "status-pending"
              : "status-reject";

          return (
            <div key={index} className="Appointment">
              <h1>Appointment Number: {elem.appointmint_id}</h1>
              <h2>
                Doctor: {elem.firstname} {elem.lastname}
              </h2>
              <h3>Date: {elem.date.split("T")[0]}</h3>
              <h4>From: {elem.timefrom}</h4>
              <h5>To: {elem.timeto}</h5>
              <h6>
                Status: <span className={statusClass}>{elem.status}</span>
              </h6>
            </div>
          );
        })}
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Appointment;
