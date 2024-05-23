import { createSlice } from "@reduxjs/toolkit";

export const providerIdSlice = createSlice({
  name: "providerId",
  initialState: {
    providerId: [] || localStorage.getItem("providerIdSlice"),
  },
  reducers: {
    setProviderId: (state, action) => {
      state.providerId = action.payload;
      localStorage.setItem("providerIdSlice", action.payload);
    },
  },
});

export const { setProviderId } = providerIdSlice.actions;

export default providerIdSlice.reducer;
