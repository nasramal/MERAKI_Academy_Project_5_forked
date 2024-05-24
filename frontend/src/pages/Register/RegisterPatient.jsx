import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './RegisterPatient.css'

const RegisterPatient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const addNewPatient = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/users/registerPatient",
        {
          firstName,
          lastName,
          age,
          email,
          password,
          phone,
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage(result.data.message);
        navigate("/Login");
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
      setStatus(false);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error happened while register, please try again");
      }
    }
  };

  const [google, setGoogle] = useState("")
  const respMsg = (response) => {
    const a = jwtDecode(response.credential)
    setGoogle(a)
  }
  const errMsg = (error) => {
    console.log(error)
  }

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      console.log(credentialResponse);
      const { credential } = credentialResponse;
      const payload = credential ? jwtDecode(credential) : undefined;
      if (payload) {
        console.log(payload);
        try {
          const response = await axios.post("http://localhost:5000/users/registerPatient", {
            firstName: payload.given_name,
            lastName: payload.family_name,
            age: payload.iat,
            email: payload.email,
            password: payload.azp,
            phone: payload.nbf
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    ,


    onError: () => {
      console.log('Login Failed');
    }
  });
  return (
    <>
     <div className="Form">
  <p className="Title">Register as a patient:</p>
  <form onSubmit={addNewPatient}>
    <div className="input-container">
      <label className="inf" htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        placeholder="Enter your first name"
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </div>
    <div className="input-container">
      <label className="inf" htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        placeholder="Enter your last name"
        onChange={(e) => setLastName(e.target.value)}
        required
      />
    </div>
    <div className="input-container">
      <label className="inf" htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        placeholder="Enter your age"
        onChange={(e) => setAge(e.target.value)}
        required
      />
    </div>
    <div className="input-container">
      <label className="inf" htmlFor="phone">Phone number:</label>
      <input
        type="tel"
        id="phone"
        placeholder="Enter your phone number"
        onChange={(e) => setPhone(e.target.value)}
        required
      />
    </div>
    <div className="input-container">
      <label className="inf" htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="input-container">
      <label className="inf" htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button className="patregbut" type="submit">
      Register
    </button>
  </form>
</div>
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
  
  
</>
  )}

export default RegisterPatient;
