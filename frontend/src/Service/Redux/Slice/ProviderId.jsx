import { createSlice } from "@reduxjs/toolkit";

export const providerIdSlice = createSlice({
  name: "providerId",
  initialState: {
    providerId: [],
  },
  reducers: {
    setProviderId: (state, action) => {
      state.providerId = action.payload;
    },
  },
});

export const { setProviderId } = providerIdSlice.actions;

export default providerIdSlice.reducer;