import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientOrDoctor.css';


const PatientOrDoctor = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="patButton" onClick={() => navigate('/Register_patient')}>
        <h1 className='pat'>Patient</h1>
        <img
          className="patimage"
          src="https://www.clipartmax.com/png/full/87-874961_oncologie-patient-cartoon.png"
          alt="Patient"
        />
      </div>
      <div className="Button" onClick={() => navigate('/Register_Provider')}>
        <h1 className='doc'>Doctor</h1>
        <img
          className="docimage"
          src="https://i.pinimg.com/originals/2d/c8/c1/2dc8c1226be5e35e284a7925b027718c.jpg"
          alt="Doctor"
        />
      </div>
    </div>
  );
};

export default PatientOrDoctor;