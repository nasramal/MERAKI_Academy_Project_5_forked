
import React, {useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
 import { useDispatch, useSelector } from "react-redux";

import {setUsers} from "../../Service/Redux/Slice/Users"

const User = () => {
    const {users,token} = useSelector((state) => {
        return {   
            users: state.users.users ,
            token: state.auth.token
        };
      });
     

    const [message, setMessage] = useState("");
    

    const dispatch = useDispatch();
    
    const getUserInfo = async () => {
        try {
          const result = await axios.get("http://localhost:5000/users/info",
           {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          );
          if (result.data.success) {
            console.log(result.data.result);
             dispatch(setUsers(result.data.result));
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
        getUserInfo();
      }, []);

  return (
  <>
  {users.length && users.map((user,index)=>{
    console.log(user);
    return<div key={index} className="users">
          <h1>{user.firstname}</h1>
          <h2>{user.lastname}</h2>
          <h3>{user.age}</h3>
          <h4>{user.email}</h4>
          <h5>{user.phone}</h5>
    </div>
  })}


   {message && <div>{message}</div>}
  </>
  )
}

export default User