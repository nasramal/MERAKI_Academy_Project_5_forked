
import "./Provider.css";
import img from "./profile.png";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function ProviderInfo() {
    const [information, setInformation] = useState(null);
    const navigate = useNavigate();
    const { token } = useSelector((state) => ({
      token: state.auth.token
    }));
  
    const getInfo = () => {
      axios
        .get(`http://localhost:5000/users/info`, {
          
        })
        .then((result) => {
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
    <img 
      id="avatar"
      src={img}
      alt="avatar"
    />
    <div id="info">
      <p id="name">{information[0].firstname} {information[0].lastname}</p>
      <p id="activity"> </p>
      <div id="stats">
        <p className="stats-text">
        <span>📞</span>{information[0].phone}
        </p>
        <p className="stats-text">
        <p>📧{information[0].email}</p>
        </p>
      </div>
      <p id="btn" onClick={()=>{
        navigate("/")
      }}>visit</p>
    </div>
  </div>)}

  </div>
  )
}
