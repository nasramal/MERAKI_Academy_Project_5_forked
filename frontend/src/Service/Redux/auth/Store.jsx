import { configureStore } from "@reduxjs/toolkit";
// import the reducer
import authReducer from "../Slice/Auth";
import usersReducer from "../Slice/Users";
import schedules from "../Slice/Schedules";
import appointment from "../Slice/Appointment";
import provider from "../Slice/Provider";
import note from "../Slice/Note";

export default configureStore({
  reducer: {
    // add the reducers to the store

    auth : authReducer,
    users: usersReducer,
    appointment:appointment,
    provider:provider,
    schedules:schedules
   

  },
});
