import React from 'react';
import "./ContactUs.css";
import Swal from 'sweetalert2';

function ContactUs() {

  const handleClick = (e) => {
    e.preventDefault();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Great! we will get in touch soon",
      showConfirmButton: false,
      timer: 2800
    });
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-text">
        <h2 className='welcoming'>We will love to hear from you!</h2>
        <p className='feed'>If you have any question, feedback, or even a suggestion, do not hesitate to contact us and fill the form ... </p>
      </div>
      <div className="contact-us-form">
        <form>
          <div className="name">
            <label className='bigName' htmlFor="Name">Full Name:</label>
            <input className='name' type="text" placeholder='write your full Name'  name="name" required />
          </div>
          <div className="form-group">
            <label  className='bigemail' htmlFor="email">Email Address</label>
            <input className='email' type="email" placeholder='write your email' id="email" name="email" required />
          </div>
          <div className="form-group">
            <label className='bigemail' htmlFor="message">Message</label>
            <textarea id="message" placeholder='write your thoughts here!' name="message" rows="4" required></textarea>
          </div>
          <button className='but' type="submit" onClick={handleClick}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;