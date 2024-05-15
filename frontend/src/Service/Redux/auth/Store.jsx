import { configureStore } from "@reduxjs/toolkit"; 
// import the reducer
import auth from "../Slice/Auth";
import users from "../Slice/Users";
import schedules from "../Slice/Schedules";
import appointment from "../Slice/Appointment";
import provider from "../Slice/Provider"



export default configureStore({
  reducer: {
    // add the reducers to the store
    auth : auth,
    users: users,
    appointment:appointment,
    provider:provider,
    schedules:schedules
   
  },
});