import { createSlice } from "@reduxjs/toolkit";

export const schedulesSlice = createSlice({
  name: "schedules",
  initialState: {
    schedules: [],
  },
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },

    updateSchedules: (state, action) => {
      state.schedules = state.schedules.filter((elem, i) => {
        return elem.schedule_id !== action.payload;
      });
    },
    addSchedules: (state, action) => {
      console.log(action.payload);
      state.schedules = state.schedules.map((elem, i) => {
        if (elem.schedules_id === action.payload.schedules_id) {
          elem.schedules.push(action.payload.schedules);
        }
        return elem;
      });
    },
  },
});
export const { setSchedules, updateSchedules, addSchedules } =
  schedulesSlice.actions;
export default schedulesSlice.reducer;
