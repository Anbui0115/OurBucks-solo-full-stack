import { getPurchasesAction } from "./session"

// Types
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const CLEAR_REVIEWS = 'reviews/CLEAR_REVIEW';

// Action Creators
const getReviewsAction = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const clearReviewAction = () => {
    return {
        type: CLEAR_REVIEWS
    }
}


// Thunks
export const getReviews = (item_id) => async dispatch => {
    const res = await fetch(`/api/reviews/item/${item_id}`);

    if (res.ok) {
        const reviews = await res.json();
        const data = await dispatch(getReviewsAction(reviews.reviews));
        console.log("data",data);
        return reviews;
    }
    else {
        console.log(res.text());
    }
};

export const createReview = (item_id, star_rating, review_details) => async dispatch => {
    const res = await fetch(`/api/reviews/item/${item_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({star_rating, review_details})
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(createReviewAction(review.review));
        return review;
    }
    else {
        console.log(res.text());
    }
};

export const editReview = (review_id, star_rating, review_details) => async dispatch => {
    const res = await fetch(`/api/reviews/${review_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({star_rating, review_details})
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(editReviewAction(review.review));
        return review;
    }
    else {
        console.log(res.text());
    }
};

export const deleteReview = (reviewId) => async dispatch => {
    console.log('reviewID', reviewId);
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        dispatch(deleteReviewAction(reviewId));
    }
    else {
        console.log(res.text());
    }
}

const initialState = {}

// Reducer
export default function reviewsReducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_REVIEWS:
            console.log("action.reviews",action.reviews);
            action.reviews.forEach(review => newState[review.id] = review)
            return newState;
        case CREATE_REVIEW:
            newState[action.review.id] = action.review
            return newState;
        case EDIT_REVIEW:
            newState[action.review.id] = action.review
            return newState;
        case DELETE_REVIEW:
            delete newState[action.reviewId]
            return newState;
        // case CLEAR_REVIEWS:
        //     return {}
        default:
            return state;
    }
}
