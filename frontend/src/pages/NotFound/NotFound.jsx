import React from 'react'
import "./NotFound.css";
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
    <h1>404 - Page Not Found</h1>
    <a href="/">
      <img src="https://via.placeholder.com/300x200.png?text=Page+Not+Found" alt="medical-image" />
    </a>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="go-back-home-button">Go Back Home</Link>
    
  </div>
  )
}

export default NotFound