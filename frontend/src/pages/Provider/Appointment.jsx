import "./Provider.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAppointment,
  updateAppointment,
  addAppointment,
} from "../../Service/Redux/Slice/Appointment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // **************for notification************************
  const notifySucc = () =>
    toast.success("Approved Appointment", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyErr = () =>
    toast.error("Reject Appointment", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  // *****************************************
  useEffect(() => {
    getAppointments();
  }, [appointment]);

  // console.log(appointment);

  return (
    <>
      <ToastContainer />
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
                      dispatch(addAppointment(result.data.result));
                    })
                    .catch((err) => {
                      console.log(err);
                      notifySucc();
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
                      notifyErr();
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
    </>
  );
}
