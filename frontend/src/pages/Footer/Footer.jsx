import React from 'react'
import "./Footer.css"
export default function Footer() {
  return (
    <footer className="footer">
    <div className="container">
      <div className="footer-section">
        <h1>About Us</h1>
        <p>Our health app revolutionizes the way individuals manage their healthcare. With seamless appointment booking functionality, users can easily schedule appointments with trusted doctors. Once booked, users receive timely notifications upon the doctor's acceptance. The app streamlines the healthcare journey further by enabling doctors to provide personalized diagnoses directly to patients' profiles, ensuring efficient and confidential communication between healthcare providers and users.</p>
      </div>
      <div className="footer-section">
        <h1>Product</h1>
        <ul>
          <li>Node.js</li>
          <li>React</li>
          <li>Redux</li>
          <li>Css</li>
          <li>HTML</li>
          <li>PostgrSQL</li>
        </ul>
      </div>
      <div className="footer-section">
        <h1>Useful Links</h1>
        <ul>
          <li><a href="/ContactUs">Contact Us</a></li>
          <li><a href="/About">About Us</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h1>Contact Us</h1>
        <ul>
          <li> Amman ,Jordan </li>
          <li>tbeileh.radwan@gmail.com</li>
          <li>amalradwan.nasr@gmail.com </li>
          <li>farahrefaie.fr@gmail.com </li>
          <li>+962798026160</li>
          <li>+962798782476</li>
          <li>+962777982098</li>
        </ul>
      </div>
    </div>
  </footer>  )
}
