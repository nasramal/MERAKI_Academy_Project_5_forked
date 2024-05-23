import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, updateHistory } from "../../Service/Redux/Slice/Users";

const User = () => {
  const { users, token } = useSelector((state) => ({
    users: state.users.users,
    token: state.auth.token,
  }));
  const [message, setMessage] = useState("");
  const [medications, setMedications] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const result = await axios.get("http://localhost:5000/users/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        dispatch(setUsers(result.data.result));
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

  const getHistoryByUserId = async (userId) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/history/gethistory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        const updatedUsers = users.map((user) =>
          user.users_id === userId
            ? { ...user, history: result.data.history[0] }
            : user
        );
        dispatch(setUsers(updatedUsers));
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

  const createHistory = async (userId) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/history/creathistory",
        { medications, medicalHistory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        getHistoryByUserId(userId);
        setMessage("Medical history added successfully.");
      } else {
        setMessage("Failed to add medical history.");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error happened while creating history, please try again.");
    }
  };

  const updateHistoryHandler = async (userId) => {
    try {
      const result = await axios.put(
        "http://localhost:5000/history/updatehistory",
        { medications, medicalHistory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        dispatch(updateHistory({ userId, medications, medicalHistory }));
        getHistoryByUserId(userId);
        setMessage("Medical history updated successfully.");
      } else {
        setMessage("Failed to update medical history.");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error happened while updating history, please try again.");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  
  return (
    <div className="container">
      {users.length > 0 &&
        users.map((user, index) => (
          <div key={index} className="users">
            <h1>First Name : {user.firstname}</h1>
            <h2>Last Name : {user.lastname}</h2>
            <h3>Age : {user.age}</h3>
            <h4>Email : {user.email}</h4>
            <h5>Phone number:{user.phone}</h5>
            {user.history ? (
              <div className="history">
                <h3>Medications: {user.history.medications}</h3>
                <h3>Medical History: {user.history.medicalhistory}</h3>
              </div>
            ) : (
              <button
                className="Show"
                onClick={() => getHistoryByUserId(user.users_id)}
              >
                Show History
              </button>
            )}
            <button className="Show" onClick={() => setSelectedUser(user)}>
              {user.history ? "Update History" : "Add History"}
            </button>
          </div>
        ))}
      {selectedUser && (
        <div>
          <textarea
            className="historyBox"
            placeholder="Your Medications"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
          />
          <textarea
            className="historyBox"
            placeholder="Your Medical History"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          />
          <button
            className="commentBtn"
            onClick={() => {
              if (selectedUser.history) {
                updateHistoryHandler(selectedUser.users_id);
              } else {
                createHistory(selectedUser.users_id);
              }
            }}
          >
            {selectedUser.history
              ? "Update Medical History"
              : "Add Medical History"}
          </button>
        </div>
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default User;
