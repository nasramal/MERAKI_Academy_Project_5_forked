
import "./Notes.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function ProviderInfo() {
    const [information, setInformation] = useState(null);
    const navigate = useNavigate();
    const [NewNote, setNewNote] = useState("")
    const { token } = useSelector((state) => ({
      token: state.auth.token
    }));
  
    const getInfo = () => {
      axios
        .get(`http://localhost:5000/notes/provider`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    
    <div >{information  &&   (
      <><search></search>
        <div id="card">
  
    <div id="info">
      <p id="name">{information[0].users_id}</p>
      <p id="activity"> </p>
      <p id="">
        <p>
        {information[0].notes}
        </p>
        <p className="stats-text">
        <p>{information[0].provider_id}</p>
        </p>
        <input type="text"placeholder="Edit Note" onChange={(e)=>{setNewNote(e.target.value)}} />
      </p>
      <p id="btn" onClick={()=>{
 axios
 .put(`http://localhost:5000/notes/providers/${information[0].users_id}`,{notes:NewNote,notes_id:information[0].notes_id}, {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 })
 .then((result) => {
   setInformation(result.data.result);

 })
 .catch((err) => {
   console.log(err);
 });
      }}>Edit Note</p>
    </div>
  </div></>)}

  </div>
  )
}
