
import "./Provider.css";
import img from "./profile.png";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProvider } from "../../Service/Redux/Slice/Provider";



export default function ProviderInfo() {
  
    const navigate = useNavigate();
    const { token ,provider} = useSelector((state) => ({
      token: state.auth.token,
      provider: state.auth.provider,

    }));
  
    // const getInfo = () => {
    //   axios
    //     .get(`http://localhost:5000/users/`, {
          
    //     })
    //     .then((result) => {
    //       setProvider(result.data.result);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
  

  
    useEffect(() => {
    
    }, []);


console.log(provider);


  return (
    r

    ) 
}
