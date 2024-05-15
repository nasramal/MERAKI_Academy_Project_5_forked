import React from 'react'
// import { useNavigate } from "react-router-dom";

const PatientOrDoctor = () => {
    // const navigate = useNavigate();

  return (
    <div className='PatientOrDoctor'>
    <div className='PatientButton'>
    <img className='patImg' src=""/>

      <button className='patButton' onClick={()=>{
// navigate("/patientregister")
      }}>Patient</button>
    </div>
       <div className='DoctorButton'>
       <img className='docImg' src=""/>
       <button className='DocButton' onClick={()=>{
//  navigate("/doctorregister")
       }}>Doctor</button>
       
     </div>
     
 </div>

  )}
  export default PatientOrDoctor