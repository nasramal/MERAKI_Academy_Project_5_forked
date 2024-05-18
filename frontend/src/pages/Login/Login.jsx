import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogin, setUserId, setRoleId, setLogout } from "../../Service/Redux/Slice/Auth";
// import jwt_decode from "jwt-decode"


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
        setMessage("");
console.log(result.data)
        dispatch(setLogin(result.data));
        dispatch(setRoleId(result.data.role_id));
        dispatch(setUserId(result.data.userId));
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



  useEffect(() => {
    if (isLoggedIn) {
  
    }
  }, []); 

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
          <button>Login</button>
        </form>
        {status ? (
          message && <div className="SuccessMessage">{message}</div>
        ) : (
          message && <div className="ErrorMessage">{message}</div>
        )}
      </div>
      <div className='google' style={{ textAlign: 'center' }}>
        <GoogleLogin
          onSuccess={(credentialResponse)=>{
            console.log (credentialResponse)
          
          // const credentialResponsedDec = jwt_decode(credentialResponse.credential)
          //   }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </>
  );
};

export default Login;