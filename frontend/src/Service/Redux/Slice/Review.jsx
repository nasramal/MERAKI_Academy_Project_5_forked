import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: [],
  },
  reducers: {
    setReview: (state, action) => {
      state.note = action.payload;
    },
    addReview: (state, action) => {
        state.review = state.review.map((elem, i) => {
            if (elem.users_id == action.payload.users_id) {
              return elem.review.push(action.payload.review);
  
    }
  })
}
  }})
export const { setReview, addReview, } = reviewSlice.actions;

export default reviewSlice.reducer;
