import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setReview, addReview, deleteReview } from "../../Service/Redux/Slice/Review";
import "./Review.css";
import Swal from "sweetalert2";


const Reviews = () => {
  const [rev, setRev] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { providerId, token, users, reviewId} = useSelector((state) => ({
    providerId: state.providerId.providerId,
    token: state.auth.token,
    users: state.auth.userId,
    reviewId: state.reviewId.reviewId
  }));

  const getReviewByProviderId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/review/${providerId.users_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setReview(response.data.result));
      setRev(response.data.result);
    } catch (error) {
      setMessage("Error getting reviews. Please try again.");
    }
  };

  const createReviewByUserId = async () => {
    try {
        const newReview = {
            comment: comment,
            users_id: users,
            review_id: Date.now(),
        };
        setRev([...rev, newReview]);
        setComment("");

        const response = await axios.post(
            `http://localhost:5000/review/${providerId.users_id}`,
            {
                comment: comment,
                users: users,
                providers_id: providerId.users_id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank you for sharing your experience",
            showConfirmButton: false,
            timer: 2500
        });

        dispatch(addReview(response.data.result));
    } catch (error) {
        console.log(error);
        setMessage("Error adding review. Please try again.");
    }
};

  const deletereviewByUserId = async (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `http://localhost:5000/review/${providerId.users_id}`,
            {
              users: users,
              providers_id: providerId.users_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(deleteReview(response.data.result));
  
          const updatedReviews = rev.filter(
            (review) => review.review_id !== reviewId
          );
  
          setRev(updatedReviews);
          Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          setMessage("Error deleting review. Please try again.");
        }
      }
    });
  };

  useEffect(() => {
    getReviewByProviderId();
  }, [providerId, token,reviewId]);

  return (
    <>
      <div className="container">
        <br />
        {rev.map((review,index)=>{
        
          return (
<div key={index} className="review">
            <div>{review.comment}</div>
            {review.users_id == users && (
              <button onClick={() => 
                
                deletereviewByUserId(review.review_id)}>Delete</button>
            )}
          </div>
          )
        })}
       
        {message && <div>{message}</div>}
      </div>
      <div  className="add-review-container">
        <br />
        <textarea
          className="commentBox"
          placeholder="Add your review ..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="newReview"
          onClick={() => {
            createReviewByUserId(); 
          }}
        >
          Add Review
        </button>
      </div>
    </>
  );
};

export default Reviews;