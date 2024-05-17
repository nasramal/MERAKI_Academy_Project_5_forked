import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Provider.css";
import {updateSchedules ,setSchedules} from "../../Service/Redux/Slice/Schedules"
import Table from "react-bootstrap/Table";


function Schedule() {
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => ({
    schedules: state.schedules.schedules,
  }));
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));
  const getSchedule = () => {
    axios
      .get(`http://localhost:5000/schedule/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(setSchedules(result.data.result))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSchedule();
  }, []);
  console.log(schedules);
  return (
    <div>
      <Table><thead>
        <tr>
          <th>Date</th>
          <th>Time From</th>
          <th>Time To</th>
          <th>Booked</th>
          <th>Delete</th>
        </tr> </thead>
        {schedules &&
          schedules.map((schedule, index) => {
            return (
              <tbody>
                <tr>
                  <td>{schedule.date}</td>
                  <td>{schedule.timefrom}</td>
                  <td>{schedule.timeto}</td>
                  <td>{schedule.status}</td>
                  <td onClick={()=>{
                    axios.put(`http://localhost:5000/schedule/delete/${schedule.schedule_id}`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then ((result) => {
                      console.log(result.data.result);
                      dispatch(updateSchedules(schedule.schedule_id))
                      
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  }}>❌</td>
                </tr></tbody>
              
            );
          })}
      </Table>
    </div>
  );
}

export default Schedule;
