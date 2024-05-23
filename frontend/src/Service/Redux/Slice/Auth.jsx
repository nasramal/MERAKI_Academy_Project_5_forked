import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({

  name: "auth",
  initialState: {

    token: null || localStorage.getItem("token"),
    userId: null || localStorage.getItem("userId"),
    role_id: null || localStorage.getItem("role_id"),
    specialty:null || localStorage.getItem("specialty"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },

    reducers: {
      setLogin: (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("token", state.token)
      },

      setUserId: (state, action) => {
        state.userId = action.payload;
        localStorage.setItem("userId", action.payload)
      },

      setRoleId: (state, action) => {
        state.role_id = action.payload;
        localStorage.setItem("role_id", action.payload)

      },
      setSpecialty: (state, action) => {
        state.userId = action.payload;
        localStorage.setItem("specialty", action.payload)
      },
      setLogout: (state, action) => {
        state.token = null;
        state.userId = null;
        state.role_id = null;
        state.isLoggedIn = false;
        localStorage.clear();

      }
    }
  
})


export const { setLogin, setUserId, setRoleId, setLogout ,setSpecialty} = authSlice.actions;


export default authSlice.reducer;