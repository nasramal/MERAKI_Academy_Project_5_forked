import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import img from "./profile.png";
import axios from "axios"
export default function Providers() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [schedules, setSchedules] = useState("");


  const { providerId } = useSelector((state) => ({
    providerId: state.providerId.providerId,
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
              onClick={() => {
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

}}>{schedule.date.split("T")[0]} - {schedule.timefrom} - {schedule.timeto}</button>
</div>
            })}</div> : <></>}</>
          </div>
        </div>
      )}
    </>
  );
}
