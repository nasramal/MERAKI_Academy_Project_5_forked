import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
  },
  reducers: {
    setReview: (state, action) => {
      state.reviews = action.payload;
    },
    addReview: (state, action) => {
      const newReview = action.payload;
      state.reviews.push(newReview);
    },
    deleteReview: (state, action) => {
  
        state.reviews=state.reviews.filter((elem,i)=>{
         
          return elem.review_id!==action.payload
        })
      }
    },
  },
);

export const { setReview, addReview, deleteReview } = reviewSlice.actions;

export default reviewSlice.reducer;