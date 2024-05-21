import "./Review.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, setReview } from "../../Service/Redux/Slice/Review"
import axios from "axios";

const Reviews = ({ providerId, userId }) => {

  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  // const [showComment, setShowComment] = useState("");


const dispatch = useDispatch()
const {token,review} = useSelector((state)=>({
  token: state.auth.token,
  review: state.auth.review,
}))

const getReviewByProviderId = async (provider_id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/review/${provider_id}`
    );
    if (response.data.success) {
      dispatch(setReview(result.data.result));
 

    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error getting reviews:", error);
    setMessage("Error getting reviews. Please try again.");
  }
};



  const createReviewByUserId = async (provider_id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/review/${provider_id}`,

    {comment},
   ) .then((result) => {
      dispatch(addReview(result.data.result));
    })
} catch (error) {
  console.log(error);
}
};



  
  const deleteReviewByUserId = async ( review_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/review/${ review_id}`
      );
      if (response.data.success) {
        getReviewByProviderId();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      setMessage("Error deleting review. Please try again.");
    }
  };

  useEffect(() => {
    getReviewByProviderId();
  }, []); 
  return (
    <>
      {review?.map((review,i) => (
        <div key={i} className="review">
          <div>{review.comment}</div>
          {!review && (
            <button
              className="ShowBtn"
              onClick={() => {
                getReviewByProviderId(review.id)
                setComment(review.review_id)}}
            >
              Show comment
            </button>
          )}
          <div>
            {review?.map((comment,i) => (
              <p className="comment" key={i}>
                {comment.comment}
              </p>
            ))}
          </div>
          {showComment == review.review_id && (
            <div>
              <textarea
                className="commentBox"
                placeholder="Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="commentBtn" onClick={createReviewByUserId}>
                Add comment
              </button>
            </div>
          )}
            <>
              <button
                className="delete"
                onClick={() => deleteReviewByUserId(review.review_id)}
              >
                Delete
              </button>
            </>
       
        </div>
      ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Reviews;