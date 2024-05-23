import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


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
        <p className="Title">Register:</p>
        <form onSubmit={addNewPatient}>
          <br />
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <input
            type="number"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <br />

          <input
            type="tel"
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="patregbut" type="submit">
            Register
          </button>
          <br />
        </form>
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};

export default RegisterPatient;
