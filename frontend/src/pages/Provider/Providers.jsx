import React, { useEffect, useState } from "react";
import {  useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import img from "./profile.png";
import axios from "axios"
import {addAppointment} from "../../Service/Redux/Slice/Appointment"
import{updateSchedules}from "../../Service/Redux/Slice/Schedules"
export default function Providers() {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [schedules, setSchedules] = useState("");
  const [date, setDate] = useState("")
  const [timeFrom, setTimeFrom] = useState("")
  const [timeTo, setTimeTo] = useState("")
  const dispatch = useDispatch();
const navigat = useNavigate()

  const { providerId, token  } = useSelector((state) => ({
    providerId: state.providerId.providerId,
    token: state.auth.token,
  }));
  const getNotBookedSchedule = () => {
    axios
      .get(`http://localhost:5000/schedule/notBooked/${providerId.users_id}`)
      .then((result) => {
        console.log(result.data);
        setSchedules(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getNotBookedSchedule();
  }, []);
  console.log(schedules);
console.log(providerId.users_id);

  return (
    <>
      {providerId && (
        <div id="card">
          <img id="avatar" src={img} alt="avatar" />
          <div id="info">
            <p id="name">
              {providerId.firstname} {providerId.lastname}
            </p>
            <p id="activity"> </p>
            <div id="stats">
              <p className="stats-text">
                <span>📞</span>
                {providerId.phone}
              </p>
              <p className="stats-text">
                <span>📧</span>
                {providerId.email}
              </p>
            </div>
            <p
              id="btn"
              onClick={() => {navigat("/review")
                setShow(true);
              }}
            >
              Reviews
            </p>
            <>{show ? <div> review</div> : <></>}</>
            <p
              id="btn"
              onClick={() => {
                
                setShow1(true);
              }}
            >
              Schedule
            </p>
            <>{show1 ? <div> {schedules && schedules.map((schedule,i)=>{return<div key={i}>
<button onClick={()=>{
setDate(schedule.date)
setTimeFrom(schedule.timefrom)
setTimeTo(schedule.timeto)
try {
  const result = axios.post(
      `http://localhost:5000/appointment/${providerId.users_id}`,
      { date, timeFrom, timeTo},
      {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
  );
  if (result.data.success) {
    dispatch(addAppointment(result.data.result))
    console.log(result.data.result);
      setMessage("Appointment added successfully.");
  } else {
      setMessage("Failed to add Appointment.");
  }
} catch (error) {
  console.log(error);
  setMessage("Error happened while creating history, please try again.");
}
try {
  const result = axios.put(
      `http://localhost:5000/schedule/update/${schedule.schedule_id}`,
      {booked:true},
      {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
  );
  if (result.data.success) {
    dispatch(updateSchedules(result.data.result))
    console.log(result.data.result);
      setMessage("Appointment updeted successfully.");
  } else {
      setMessage("Failed to updete Appointment.");
  }
} catch (error) {
  console.log(error);
  setMessage("Error happened while creating history, please try again.");
}
}}>{schedule.date.split("T")[0]} - {schedule.timefrom} - {schedule.timeto}</button>
</div>
            })}</div> : <></>}</>
          </div>
        </div>
      )}
    </>
  );
}
