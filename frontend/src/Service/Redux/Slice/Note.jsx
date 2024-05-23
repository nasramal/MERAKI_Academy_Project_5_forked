import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: [],
  },
  reducers: {
    setNote: (state, action) => {
      state.note = action.payload;
    },
    updateNote: (state, action) => {
      console.log(action.payload);
      state.note = state.note.map((elem) => {
        if (elem.notes_id === action.payload.notes_id) {
          return { ...elem, notes: action.payload.notes };
        }

        return elem;
      });
    },
    addNote: (state, action) => {
      state.note = state.note.map((elem, i) => {
        if (elem.provider_id == action.payload.provider_id) {
          return elem.note.push(action.payload);
        }
      });
    },
  },
});
export const { setNote, updateNote, addNote } = noteSlice.actions;

export default noteSlice.reducer;
