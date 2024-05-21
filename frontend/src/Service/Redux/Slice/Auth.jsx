import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({

  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null ,
    userId: localStorage.getItem("userId") || null,
    role_id: localStorage.getItem("role_id") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },

    reducers: {
      setLogin: (state, action) => {
        //  console.log(action.payload);
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

      setLogout: (state, action) => {
        state.token = null;
        state.userId = null;
        state.role_id = null;
        state.isLoggedIn = false;
        localStorage.clear();

      }
    }
  
})


export const { setLogin, setUserId, setRoleId, setLogout } = authSlice.actions;


export default authSlice.reducer;