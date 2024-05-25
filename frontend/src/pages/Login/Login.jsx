import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Login.css"

import { setLogin, setUserId, setRoleId, setLogout, setSpecialty } from "../../Service/Redux/Slice/Auth";

import { jwtDecode } from "jwt-decode";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const { token, isLoggedIn, role_id } = useSelector((state) => ({
    token: state.auth.token,
    role_id:state.auth.role_id,

    isLoggedIn: state.auth.isLoggedIn,
  }));

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {

    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      if (result.data) {
        console.log(result.data.role_id);
        setMessage("");
console.log(result.data)
        dispatch(setLogin(result.data));
        dispatch(setRoleId(result.data.role_id));
        dispatch(setUserId(result.data.userId));
        dispatch(setSpecialty(result.data.specialty));

        navigate("/");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);

      } else {
        console.log(error)
        setMessage("Error happened while Login, please try again");

      }
    }
  };

const [google,setGoogle]=useState("")
const respMsg= (response)=>{
  const a = jwtDecode(response.credential)
  axios.post("http://localhost:5000/users/login", {
    email: a.email,
    password: a.azp, 
  })
  .then((result) => {
    console.log(result)
    if (result.data) {
      navigate("/");
      setMessage("");
      console.log(result.data);
      dispatch(setLogin(result.data));
      dispatch(setRoleId(result.data.role_id));
      dispatch(setUserId(result.data.userId));
      dispatch(setSpecialty(result.data.specialty));
     
    } else {
      throw new Error("Login failed"); 
    }
  })
  .catch((error) => {
    console.error("Login error:", error); 
  });

}
const errMsg = (error)=>{
  console.log(error)
}
  

  useEffect(() => {
    if (isLoggedIn) {

    }
  }, []); 

  return (
<>
  <div className="Form">
    <p className="Title">Login:</p>
    <form onSubmit={login}>
      <div className="input-container">
        <input
          className="inputField"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          className="inputField"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="loginButton">Login</button>
    </form>
    {status ? (
      message && <div className="SuccessMessage">{message}</div>
    ) : (
      message && <div className="ErrorMessage">{message}</div>
    )}
  </div>
  <div className='google' style={{ textAlign: 'center' }}>
    <button className="googleButton" onClick={()=>{
      axios.post("http://localhost:5000/users/login", {
        email: google.email,
        password: google.azp, 
      })
      .then((result) => {
        if (result.data) {
          navigate("/");
          setMessage("");
          console.log(result.data);
          dispatch(setLogin(result.data));
          dispatch(setRoleId(result.data.role_id));
          dispatch(setUserId(result.data.userId));
          dispatch(setSpecialty(result.data.specialty));
        } else {
          throw new Error("Login failed"); 
        }
      })
      .catch((error) => {
        console.error("Login error:", error.message); 
      });
    }}>
      <GoogleLogin onSuccess={respMsg} onError={errMsg} />
    </button>
  </div>
</>
  );
};

export default Login;