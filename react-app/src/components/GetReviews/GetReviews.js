import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import styles from "./GetReviews.module.css";
import {
  getReviews,
  deleteReview,
  editReview,
  createReview,
} from "../../store/reviews";

export default function GetReviews({ item_id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [editReviewID, setEditReviewID] = useState(0);
  const [starRating, setStarRating] = useState(5);
  const [errors, setErrors] = useState([]);

  const reviewsObj = useSelector((state) => state.reviews);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getReviews(item_id));
  }, [dispatch]);

  useEffect(() => {
    let errors = [];
    if (starRating > 5) {
      setStarRating(5);
      errors.push("Star ratings need to be less than 5.");
      setErrors(errors);
    } else if (starRating < 1) {
      setStarRating(1);
      errors.push("Star ratings need to be more than 1.");
      setErrors(errors);
    }
  }, [starRating]);

  useEffect(() => {
    const filteredReviews = Object.values(reviewsObj).filter(
      (review) => review.item_id == item_id
    );
    setReviews(filteredReviews);
  }, [reviewsObj]);

  if (!reviews) return null;

  function handleRemove(e, review_id) {
    e.preventDefault();
    console.log("review_id", review_id);
    dispatch(deleteReview(review_id)).catch(async (res) => {});
  }

  function enableEdit(e, review_id, star_rating, review_details) {
    e.preventDefault();

    setComment(review_details);
    setEditReviewID(review_id);
    setStarRating(star_rating);
  }

  function addComment(e, review_details) {
    e.preventDefault();

    dispatch(createReview(item_id, "5", review_details));
    setComment("");
  }

  function editComment(e, review_details) {
    e.preventDefault();

    dispatch(editReview(editReviewID, starRating, review_details));
    setComment("");
    setEditReviewID(0);
    setStarRating(5);
  }

  return (
    <>
      <div className={styles.review_outer_container}>
        <div className={styles.review_container}>
          <div>

          </div>
          {reviews.map((review) => (
            <div className={styles.each_review}>
              <div className={styles.rating}>&#9733; {review.star_rating}</div>
              <div className={styles.review_details}>{review.review_details}</div>

              {sessionUser && (
                <div>
                  <button
                    onClick={(e) =>
                      enableEdit(
                        e,
                        review.id,
                        review.star_rating,
                        review.review_details
                      )
                    }
                    disabled={
                      review.user_id != sessionUser.id ||
                      editReviewID == review.id
                    }
                    hidden={review.user_id != sessionUser.id}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, review.id)}
                    disabled={
                      review.user_id != sessionUser.id ||
                      editReviewID == review.id
                    }
                    hidden={review.user_id != sessionUser.id}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <div>
            {editReviewID != 0 && sessionUser && (
              <form onSubmit={(e) => editComment(e, comment)}>
                <input
                  type="number"
                  value={starRating}
                  onChange={(e) => setStarRating(e.target.value)}
                ></input>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button type="submit">Edit Review</button>
              </form>
            )}
            {editReviewID == 0 && sessionUser && (
              <form onSubmit={(e) => addComment(e, comment)}>
                <input
                  type="number"
                  value={starRating}
                  onChange={(e) => setStarRating(e.target.value)}
                ></input>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button type="submit">Add Review</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
