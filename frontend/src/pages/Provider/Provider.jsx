import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Providerr.css";
import img from "./profile.png";

function Provider() {
  const [information, setInformation] = useState(null);
  const [docInfo, setDocInfo] = useState(null);
  const [editExperience, setEditExperience] = useState(false); 
  const [editCertificates, setEditCertificates] = useState(false); 
  const [newExperience, setNewExperience] = useState(""); 
  const [newCertificates, setNewCertificates] = useState("");

  const { token } = useSelector((state) => ({
    token: state.auth.token,
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
      <div className="infoContainer">
        {information && (
          <div className="providerImg">
            <img style={{ width: "200px" }} src={img} alt="Provider Image" />
            <div className="infoo">
              <div>
                {information[0].firstname} {information[0].lastname}
                <br />
              </div>
              Contact Information: <br />
              <div>
                <span>📞</span>
                {information[0].phone}
              </div>
              <div>📧{information[0].email}</div>
            </div>
          </div>
        )}

        {docInfo && (
          <div className="info">
            <div>Specialty: {docInfo[0].specialty}</div>
            {editExperience ? (
              <div>
                <input
                  type="text"
                  autoFocus
                  value={newExperience}
                  onChange={(e)=>{setNewExperience(e.target.value)}}
                  placeholder="Update your Experience"
                />
                <button onClick={()=>{
axios
.put(`http://localhost:5000/docInfo/`,{experience:newExperience}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((result) => {
  setDocInfo(result);
})
.catch((err) => {
  console.log(err);
});
                }}>Save</button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setEditExperience(!editExperience); 
                }}
              >
                ✏️ Experience: {docInfo[0].experience}
              </div>
            )}

            {editCertificates ? (
              <div>
                <input
                  type="text"
                  autoFocus
                  value={newCertificates}
                  onChange={(e)=>{setNewCertificates(e.target.value)}}
                  placeholder="Update your Certificates"
                />
                <button onClick={()=>{axios
.put(`http://localhost:5000/docInfo/`,{certificates:newCertificates}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((result) => {
  setDocInfo(result);
})
.catch((err) => {
  console.log(err);
});}}>Save</button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setEditCertificates(!editCertificates);
                }}
              >
                ✏️ Certificates: {docInfo[0].certificates}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Provider;
