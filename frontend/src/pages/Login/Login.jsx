import React, {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { configureStore } from "@reduxjs/toolkit";
import {  useDispatch, useSelector } from "react-redux";
import {setLogin,setUserId} from "../redux/reducers/auth/index"


// import "./style.css";

import axios from "axios";

// import { AuthContext } from "../../contexts/authContext";

//===============================================================

const Login = () => {
  const dispatch = useDispatch()
 const {token,isLoggedIn} = useSelector ((state)=>{
  return {
    token:state.auth.token,
    isLoggedIn:state.auth.isLoggedIn
  }
 })
  // const { isLoggedIn, saveToken } = useContext(AuthContext);
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
  
      if (result.data) {
        setMessage("");
        // localStorage.setItem("token", result.data.token);
        // localStorage.setItem("userId", result.data.userId);
        // saveToken(result.data.token, result.data.userId);
dispatch (setLogin (result.data.token))
dispatch (setUserId (result.data.userId))

      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    if (isLoggedIn) {
      history("/landing");
    }
  });

  //===============================================================

  return (
    <>
      <div className="Form">
        <p className="Title">Login:</p>
        <form onSubmit={login}>
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
          <button
            onClick={(e) => {
             login(e);
            }}
          >
            Login
          </button>
        </form>

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};

export default Login;
