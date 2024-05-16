import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Provider.css";


function Schedule() {
  const dispatch = useDispatch();
  const [information, setInformation] = useState(null);
  const { token } = useSelector((state) => ({
    token: state.auth.token
  }));
  const getSchedule = () => {
    axios
      .get(`http://localhost:5000/schedule/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setInformation(result.data.result);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSchedule();
  }, []);
  return (
    <div>
{information && (
  <div></div>
) }



    </div>
  )
}

export default Schedule

