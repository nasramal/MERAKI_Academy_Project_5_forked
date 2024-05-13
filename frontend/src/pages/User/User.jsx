
import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
 import { useDispatch, useSelector } from "react-redux";
import {setuser} from "./Service/Redux/auth/Store.js"/// from the redux.. 
const User = () => {
    const {users} = useSelector((state) => {
       
        return {
            users: state.users.users /// from the redux.. 
        };
      });
    // const { token, isLoggedIn, users_Id } = useContext(AuthContext); /// from the redux.. 

    const [message, setMessage] = useState("");
    


    const getuserinfo = async () => {
        try {
          const result = await axios.get("http://localhost:5000/users/info", {
            headers: {
              Authorization: `Bearer ${token}`,// we have to creat Authorization
            },
          });
          if (result.data.success) {
            console.log(result.data);
             dispatch(setuser(result.data));
            setMessage("");
          } else throw Error;
        } catch (error) {
          if (!error.response.data.success) {
            return setMessage(error.response.data.message);
          }
          setMessage("Error happened while Get Data, please try again");
        }
      };
      useEffect(() => {
        getuserinfo();
      }, []);

  return (
  <>
  {users?.map((users,index)=>{
    <div key={index} className="users">
          <h1>{users.firstName}</h1>
          <h2>{users.lastName}</h2>
          <h3>{users.age}</h3>
          <h4>{users.email}</h4>
          <h5>{users.phone}</h5>
    </div>
  })}


   {message && <div>{message}</div>}
  </>
  )
}

export default User