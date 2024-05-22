import "./Notes.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addNote, setNote, updateNote } from "../../Service/Redux/Slice/Note";

export default function ProviderInfo() {
  const [showInput, setShowInput] = useState(false);
  const [users_id, setUserId] = useState("");
  const [note1, setNoteCreate] = useState("");
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
        dispatch(setNote(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInfo();
  }, [note]);
console.log(note);
  return (
    <div className="container">
      {note &&
        note.map((note, index) => {
          return (
            <div id="cards">
              <div id="infos">
                <p id="names">{note.users_id}</p>
                <p id="activitys"> </p>
                <p id="s">
                  <p>{note.notes}</p>
                  <p className="stats-texts">
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
                  id="btns"
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
                        console.log(result.data.result);
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
      <br></br>
      
      <p
        id="btns"
        onClick={() => {
          setShowInput(true);
        }}
      >
        Create Note
      </p>
      {showInput && (
        <div>
          <input
            type="text"
            placeholder="user_id"
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
          <br />
          <input
            type="texts"
            placeholder="Note"
            onChange={(e) => {
              setNoteCreate(e.target.value);
            }}
          />
          <button
            id="btns"
            onClick={()=>{axios
              .post(
                `http://localhost:5000/notes/newNotes`,
                { users_id: users_id, notes: note1 },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((result) => {
                dispatch(addNote(result.data.result));
              })
              .catch((err) => {
                console.log(err);
              })}}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
