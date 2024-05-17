import "./Provider.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Appointment() {
    const [information, setInformation] = useState(null);
    const { token } = useSelector((state) => ({
        token: state.auth.token
      }));

    const getInfo = () => {
        axios
        .get(`http://localhost:5000/appointment/provider`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        .then((result) => {
            console.log(result.data);
          setInformation(result.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
      };

      useEffect(() => {
        getInfo();
      }, []);





  return (
    <div>{information  &&   (
        <div id="card">
    <div id="info">
      <p id="name">{information[0].user_id}</p>
      <p id="activity"> </p>
      <div id="stats">
        <p className="stats-text">Date :
        {information[0].date.split("T")[0]}
        </p>
        <p className="stats-text">
        <p>From :{information[0].timefrom}</p>
        </p>
        <p className="stats-text">
        <p>To :{information[0].timeto}</p>
        </p>
      </div>
      <p id="btn" onClick={()=>{
       
      }}>Accept</p>
       <p id="btn" style={{background:"red"}} onClick={()=>{
        axios
        .put(`http://localhost:5000/appointment`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        .then((result) => {
            console.log(result.data);
          setInformation(result.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }}>Reject</p>
    </div>
  </div>)}

  </div>
  )
}
