import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = ({ providerId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [showComment, setShowComment] = useState("");

  const createReviewByUserId = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/review/${4}`,
        { comment }
      );
      if (response.data.success) {
        getReviewByProviderId();
        setComment("");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating review:", error);
      setMessage("Error creating review. Please try again.");
    }
  };

  const getReviewByProviderId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/review/${4}`
      );
      if (response.data.success) {
        setReviews(response.data.result);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error getting reviews:", error);
      setMessage("Error getting reviews. Please try again.");
    }
  };

  const deleteReviewByUserId = async (reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/review/${reviewId}`
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
  }, [providerId]);


  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <div>{review.comment}</div>
          {!review.reviews && (
            <button
              className="ShowBtn"
              onClick={() => setShowComment(review.id)}
            >
              Show comment
            </button>
          )}
          <div>
            {review.reviews?.map((comment) => (
              <p className="comment" key={comment.id}>
                {comment.comment}
              </p>
            ))}
          </div>
          {showComment === review.id && (
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
          {review.user_id === userId && (
            <>
              <button
                className="delete"
                onClick={() => deleteReviewByUserId(review.id)}
              >
                X
              </button>
            </>
          )}
        </div>
      ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Reviews;