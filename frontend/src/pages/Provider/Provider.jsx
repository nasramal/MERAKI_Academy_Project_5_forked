import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Provider.css";
import img from "./profile.png";
function Provider() {
  const [information, setInformation] = useState(null);
  const [docInfo, setDocInfo] = useState(null);

  const { token } = useSelector((state) => ({
    token: state.auth.token
  }));

  const getInfo = () => {
    axios
      .get(`http://localhost:5000/users/info`, {
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

  const getDocInfo = () => {
    axios
      .get(`http://localhost:5000/docInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setDocInfo(result.data.result);
      })
      .catch((err) => {
       
        console.log(err);
      });
  };

  useEffect(() => {
    getInfo();
    getDocInfo();
  }, []);
console.log(docInfo);
  return (
    <><div className="infoContainer">
      {information && (
          <div className="providerImg">
            <img style={{width:"200px"}} src={img} alt="Provider Image" />
            <div className="infoo">
              <p>
                {information[0].firstname} {information[0].lastname}<br/>
              </p>
              Contact Information: <br />
              <p><span>📞</span>{information[0].phone}</p>
              <p>📧{information[0].email}</p>
            </div>
          </div>
        
      )}

      {docInfo && (
        <div className="info">
          <p>Specialty: {docInfo[0].specialty}</p>
          <p>Experience: {docInfo[0].experience}</p>
          <p>Certificates: {docInfo[0].certificates}</p>
        </div>
      )}</div>
    </>
  );
}

export default Provider;