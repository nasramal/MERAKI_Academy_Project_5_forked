import "./Provider.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAppointment,
  updateAppointment,
  addAppointment,
} from "../../Service/Redux/Slice/Appointment";

export default function Appointment() {
  const dispatch = useDispatch();
  const { token, appointment } = useSelector((state) => ({
    token: state.auth.token,
    appointment: state.appointment.appointment,
  }));

  const getAppointments = () => {
    axios
      .get(`http://localhost:5000/appointment/provider`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result.data);
        dispatch(setAppointment(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppointments();
  }, [appointment]);

  // console.log(appointment);

  return (
    <div className="container">
      {appointment.map((appointment, index) => (
        <div id="cards" key={index}>
          <div id="infos">
            <p id="names">{appointment.user_id}</p>
            <p id="activitys"> </p>
            <div id="statss">
              <p className="stats-texts">
                Date: {appointment.date.split("T")[0]}
              </p>
              <p className="stats-texts">From: {appointment.timefrom}</p>
              <p className="stats-texts">To: {appointment.timeto}</p>
              <p className="stats-texts">status : {appointment.status}</p>
            </div>
            <button
              id="btns"
              onClick={() => {
                axios
                  .put(
                    `http://localhost:5000/appointment/status/${appointment.appointmint_id}`,
                    { status: "approved" }
                  )
                  .then((result) => {
                    console.log(result.data);
                    dispatch(updateAppointment(result.data.result));
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Accept
            </button>
            <button
              id="btns"
              style={{ background: "red" }}
              onClick={() => {
                axios
                  .put(`http://localhost:5000/appointment`, {
                    appointmint_id: appointment.appointmint_id,
                  })
                  .then((result) => {
                    dispatch(updateAppointment(result.data.result));
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
