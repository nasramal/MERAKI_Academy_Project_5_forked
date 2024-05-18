
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Diagnosis.css"
import axios from "axios";
function Diagnosis() {
  const [message, setMessage] = useState("");

const [Diagnosis, setDiagnosis] = useState("")
const {token } = useSelector((state) => ({
  token: state.auth.token,
}));
  const getdignosisByUser = async () => {
    try {
        const result = await axios.get("http://localhost:5000/notes/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (result.data.success) {
          setDiagnosis(result.data.result);
          console.log(result.data.result);
            setMessage("");
        } else {
            throw new Error();
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            setMessage(error.response.data.message);
        } else {
            setMessage("Error happened while getting data, please try again.");
        }
    }
};
useEffect(() => {
  getdignosisByUser();
}, []);

  return (
    <div>
{Diagnosis.length > 0 && Diagnosis.map((elem,index)=>{
  return <div key={index} className="Diagnosis"> 
  <h1>Doctor : {elem.firstname} {elem.lastname}</h1>
  <h2>Diagnos:{elem.notes}</h2>
  </div>
})}

{message && <div className="message">{message}</div>}

    </div>
  )
}

export default Diagnosis