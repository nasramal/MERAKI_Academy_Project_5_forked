import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
      users: [] ,

  },
  reducers: {
      setUsers: (state, action) => {
          state.users = action.payload;
      },
      updateHistory: (state, action) => {
          state.users = state.users.map((user) =>
              user.users_id === action.payload.userId
                  ? { ...user, history: { medications: action.payload.medications, medicalHistory: action.payload.medicalHistory } }
                  : user
          );
      },
  },
});

export const { setUsers, updateHistory } = usersSlice.actions;
export default usersSlice.reducer;
