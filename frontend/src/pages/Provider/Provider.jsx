import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Provider.css";

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

  return (
    <>
      {information && (
        <div className="infoContainer">
          <div className="providerImg">
            <img src="YOUR_IMAGE_URL_HERE" alt="Provider Image" />
            <div>
              <p>
                {information[0].firstname} {information[0].lastname}<br/>
              </p>
              Contact Information: <br />
              <p><span>📞</span>{information[0].phone}</p>
              <p>📧{information[0].email}</p>
            </div>
          </div>
        </div>
      )}

      {docInfo && (
        <div>
          <p>Specialty: {docInfo[0].specialty}</p>
          <p>Experience: {docInfo[0].experience}</p>
          <p>Certificates: {docInfo[0].certificates}</p>
        </div>
      )}
    </>
  );
}

export default Provider;
