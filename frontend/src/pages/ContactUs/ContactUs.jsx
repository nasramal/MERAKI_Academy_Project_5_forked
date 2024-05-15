import React from 'react'
import "./ContactUs.css";
function ContactUs() {
  return (
    <div className="contact-us-container">
    <div className="contact-us-text">
      <h2>Contact Us</h2>
      <p>If you have any questions, please feel free to contact us using the form on the right.</p>
    </div>
    <div className="contact-us-form">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
  )
}

export default ContactUs