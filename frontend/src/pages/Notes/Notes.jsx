import "./Notes.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { addNote, setNote, updateNote } from "../../Service/Redux/Slice/Note";

export default function ProviderInfo() {
  // const [information, setInformation] = useState(null);
  const [NewNote, setNewNote] = useState("");
  const dispatch = useDispatch();
  const { token, note } = useSelector((state) => ({
    token: state.auth.token,
    note: state.note.note,
  }));

  const getInfo = () => {
    axios
      .get(`http://localhost:5000/notes/provider`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(setNote(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  console.log(note);

  return (
    <div>
      {note &&
        note.map((note, index) => {
          return (
            <div id="card">
              <div id="info">
                <p id="name">{note.users_id}</p>
                <p id="activity"> </p>
                <p id="">
                  <p>{note.notes}</p>
                  <p className="stats-text">
                    <p>{note.provider_id}</p>
                  </p>
                  <input
                    type="text"
                    placeholder="Edit Note"
                    onChange={(e) => {
                      setNewNote(e.target.value);
                    }}
                  />
                </p>
                <p
                  id="btn"
                  onClick={() => {
                    axios
                      .put(
                        `http://localhost:5000/notes/providers/${note.users_id}`,
                        { notes: NewNote, notes_id: note.notes_id },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((result) => {
                        console.log(result.data);
                        dispatch(updateNote(result.data.result));
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Edit Note
                </p>
              </div>
            </div>
          );
        })}

      {/* ***************Create Note For User********************** */}
      <button onClick={() => {}}>Create Note</button>
    </div>
  );
}
