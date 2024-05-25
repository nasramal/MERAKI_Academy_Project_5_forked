import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Provider.css";
import {
  updateSchedules,
  setSchedules,
  addSchedules,
} from "../../Service/Redux/Slice/Schedules";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Schedule() {
  const dispatch = useDispatch();
  const [data, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  const { schedules } = useSelector((state) => ({
    schedules: state.schedules.schedules,
  }));
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));
  // **************for notification************************
  const notifySucc = () =>
    toast.success("Schedule Add Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyErr = () =>
    toast.error("Schedule Deleted Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  // *****************************************

  const getSchedule = () => {
    axios
      .get(`http://localhost:5000/schedule/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setSchedules(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSchedule();
  }, [schedules]);
  // console.log(schedules);
  return (
    <div>
      <ToastContainer />

      <Table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time From</th>
            <th>Time To</th>
            <th>Booked</th>
            <th>Delete</th>
          </tr>{" "}
        </thead>
        {schedules &&
          schedules.map((schedule, index) => {
            return (
              <tbody>
                <tr>
                  <td>{schedule.date.split("T")[0]}</td>
                  <td>{schedule.timefrom}</td>
                  <td>{schedule.timeto}</td>
                  <td className={schedule.booked == true ? "green" : "red"}>{schedule.booked.toString()=="true"?"true":"false"}</td>
                  {/* *********delete schedule************* */}
                  <td
                    onClick={() => {
                      axios
                        .put(
                          `http://localhost:5000/schedule/delete/${schedule.schedule_id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((result) => {
                          dispatch(updateSchedules(schedule.schedule_id));
                          notifyErr();
                        })
                        .catch((err) => {
                          console.log(err);
                          
                        });
                    }}
                  >
                    ❌
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
      <br/>
      <button className="schedule-button"
        onClick={() => {
          axios
            .post(
              `http://localhost:5000/schedule/`,
              { timeFrom: timeFrom, timeTo: timeTo, date: data },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((result) => {
              console.log(result.data);
              dispatch(addSchedules(result.data.result));
              notifySucc();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Add New Schedule
      </button>
      <br/>
      <div className="Form">
        <form>
          <label> Date </label>
          <input
            type="date"
            placeholder="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <label> TimeFrom </label>
          <input
            type="time"
            placeholder="timeFrom"
            onChange={(e) => setTimeFrom(e.target.value)}
          ></input>
          <br />
          <label> Time To </label>
          <input
            type="time"
            placeholder="timeTo"
            onChange={(e) => {
              setTimeTo(e.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Schedule;
