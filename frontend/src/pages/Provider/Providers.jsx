import React, { useState } from "react";
import { useSelector } from "react-redux";
import img from "./profile.png";


export default function Providers() {
const [show, setShow] = useState(false)



  const { providerId } = useSelector((state) => ({
    providerId: state.providerId.providerId,
  }));
console.log(providerId);
  return (
    <>
      {providerId &&
          <div id="card">
            <img id="avatar" src={img} alt="avatar" />
            <div id="info">
              <p id="name">
                {providerId.firstname} {providerId.lastname}
              </p>
              <p id="activity"> </p>
              <div id="stats">
                <p className="stats-text">
                  <span>📞</span>
                  {providerId.phone}
                </p>
                <p className="stats-text">
                  <span>📧</span>
                  {providerId.email}
                </p>
              </div>
              <p
                id="btn"
                onClick={() => {
                 setShow(true)
                }}
              >
                reviews
              </p>
<>
{show?<div> review</div>:<></>}

</>
            </div>
          </div>
}
    </>
  );
}
