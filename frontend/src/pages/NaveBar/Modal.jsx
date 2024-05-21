import React from "react";
import "./Modal.css";
const Modal = ({ isOpen, onClose, doctor }) => {
  if (!isOpen) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>{doctor.firstName} {doctor.lastName}</h2>
        <p>Email: {doctor.email}</p>
        <p>Specialty: {doctor.specialty}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default Modal;