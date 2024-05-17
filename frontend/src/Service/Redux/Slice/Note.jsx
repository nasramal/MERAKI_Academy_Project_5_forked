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
      state.note = state.note.map((elem) => {
        if (elem.notes_id === action.payload.noteId) {
          return { ...elem, notes: action.payload.note };
        }
        return elem;
      });
    },
    addNote: (state, action) => {
        state.note = state.note.map((elem, i) => {
            if (elem.notes_id == action.payload.notes_id) {
              return elem.note.push(action.payload.note);
  
    }
  })
}
  }})
export const { setNote, updateNote, addNote } = noteSlice.actions;

export default noteSlice.reducer;
