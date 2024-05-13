import { configureStore } from "@reduxjs/toolkit"; 
// import the reducer
import auth from "../Slice/Auth";

export default configureStore({
  reducer: {
    // add the reducers to the store
    auth : auth,
   
  },
});