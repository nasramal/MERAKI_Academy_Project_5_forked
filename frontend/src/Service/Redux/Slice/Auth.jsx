import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice({
name:"auth",
initialState:{
    token : null || localStorage.getItem("token"),
    userId : null || localStorage.getItem("userId"),
    isLoggedIn : localStorage.getItem("token")?true:false ,
},

reducers:{
setLogin :(state,action)=>{
  //  console.log(action.payload);
state.token = action.payload.token;
state.isLoggedIn = true;
localStorage.setItem("token",state.token)
},

setUserId :(state,action)=>{
    state.userId = action.payload;
localStorage.setItem("userId",state.userId)
},

setLogout :(state,action)=>{
state.token = null;
state.userId = null;
state.isLoggedIn = false;
localStorage.clear();
    
}
}
})


export const {setLogin, setUserId,setLogout } = authSlice.actions;

export default authSlice.reducer;