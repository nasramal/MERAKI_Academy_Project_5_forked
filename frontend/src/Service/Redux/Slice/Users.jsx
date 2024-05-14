import {createSlice} from "@reduxjs/toolkit"
export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
    },
    reducers: {
      setUsers: (state, action) => {
        state.users = action.payload;
      },
      
      
      setHistory: (state, action) => {
        state.users = state.users.map((elem, i) => {
          if (elem.history_id == action.payload.history_id) {
            elem.history = action.payload.history;
          }
          return elem;
        });
      },
      updateHistory: (state, action) => {
        state.users = state.users.map((elem, i) => {
          if (elem.history_id == action.payload.history_id) {
            elem = action.payload.history;
          }
          return elem;
        });
      },
      addHistory: (state, action) => {
        state.users = state.users.map((elem, i) => {
          if (elem.history_id == action.payload.history_id) {
            return elem.history.push(action.payload.history);
          }
        });
      },
    },
  });
  export const {setUsers,setHistory,addHistory,updateHistory} = usersSlice.actions
  export default usersSlice.reducer;