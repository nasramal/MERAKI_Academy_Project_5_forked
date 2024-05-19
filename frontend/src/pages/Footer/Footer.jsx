import React from 'react'
import "./Footer.css"
export default function Footer() {
  return ( 
    <footer className="footer-container">
      <div className="footer-section about-us">
        <h3>About Us</h3>
        <p>
          Our health app revolutionizes the way individuals manage their healthcare. With seamless appointment booking functionality, users can easily schedule appointments with trusted doctors. Once booked, users receive timely notifications upon the doctor's acceptance. The app streamlines the healthcare journey further by enabling doctors to provide personalized diagnoses directly to patients' profiles, ensuring efficient and confidential communication between healthcare providers and users.
        </p>
      </div>
      <div className="footer-section product">
        <h3>Product</h3>
        <ul>
        <li>Node.js</li>
           <li>React</li>
           <li>Redux</li>
          <li>Css</li>
           <li>HTML</li>
          <li>PostgrSQL</li>
        </ul>
      </div>
      <div className="footer-section join-us">
        <h3>Help</h3>
        <ul>
          <li><a href="/ContactUs">Contact Us</a></li>
          <li><a href="/About">About Us</a></li>
        </ul>
      </div>
      <div className="footer-section contact-us">
        <h3>Contact Us</h3>
        <ul>
          <li>Amman, Jordan</li>
          <li><a href="mailto:tbeileh.radwan@gmail.com">tbeileh.radwan@gmail.com</a></li>
          <li><a href="mailto:amalradwan.nasr@gmail.com">amalradwan.nasr@gmail.com</a></li>
          <li><a href="mailto:farahrefaie.fr@gmail.com">farahrefaie.fr@gmail.com</a></li>
          <li>+962798026160</li>
          <li>+962798782476</li>
          <li>+962777982098</li>
        </ul>
      </div>
    </footer>
  );
};

