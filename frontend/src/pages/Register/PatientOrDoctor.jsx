import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Register.css"
const PatientOrDoctor = () => {
    const navigate = useNavigate();

  return (
    <div className='Patient,Doctor'>
    <div className='Patient'>
      <h1>Patient</h1>
    <img className='patImgs' src="https://img.freepik.com/free-vector/tiny-doctor-heart-patient-with-high-blood-pressure-medical-checkup-hospital-clinic-risk-cholesterol-cardiovascular-disease-flat-vector-illustration-cardiology-health-concept_74855-20983.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716076800&semt=sph" onClick={()=>{
navigate("/Register_patient")
      }}/>
    </div>
       <div className='Doctor'>
        <h2>Doctor</h2>
       <img className='docImgs' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5WoQ_ei9oSS3sxMdAH8BEj0wXQdx7LU-vrqwYgLcHg&s" onClick={()=>{
 navigate("/Register_Provider")
       }}/>
     </div>
 </div>

  )}
  export default PatientOrDoctor