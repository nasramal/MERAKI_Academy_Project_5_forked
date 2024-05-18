import React, { useEffect, useState } from "react";
import "./Appointment.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, updateHistory } from "../../Service/Redux/Slice/Users";

function Appointment() {
  const [message, setMessage] = useState("");

const [Appointment, setAppointment] = useState("")
const {token } = useSelector((state) => ({
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
        setAppointment(result.data.result);
        console.log(result.data.result);
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
    <div>
{Appointment.length > 0 && Appointment.map((elem,index)=>{
  return <div key={index} className="Appointment"> 
  <p> Your Appointment Number : {elem.appointmint_id}  with Doctor : {elem.firstname} {elem.lastname} from {elem.timefrom} to {elem.timeto} Status is {elem.status} </p>
  </div>
})}
{message && <div className="message">{message}</div>}

    </div>
  )
}

export default Appointment