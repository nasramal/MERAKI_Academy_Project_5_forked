import { createSlice } from "@reduxjs/toolkit";

export const reviewIdSlice = createSlice({
  name: "reviewId",
  initialState: {
    reviewId: [] || localStorage.getItem("reviewIdSlice"),
  },
  reducers: {
    setReviewId: (state, action) => {
      state.reviewId = action.payload;
      localStorage.setItem("reviewIdSlice", action.payload);
    },
  },
});

export const { setReviewId } = reviewIdSlice.actions;

export default reviewIdSlice.reducer;
