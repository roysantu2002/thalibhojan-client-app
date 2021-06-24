import {
  FETCH_ALL,
  CREATE_BOOKING,
  API_ERROR,
  UPDATE_BOOKING,
} from "../actions/action-types/action-names";

const initialState = {
  posts: [],
  error: "",
  booking: ""
};

export default function bookingReducer(posts = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL:
      return {
        ...posts,
        posts: payload,
      };

    case API_ERROR:
      return {
        ...posts,
        error: payload,
      };

    case CREATE_BOOKING:
      return {
        posts: [...posts.posts, payload],
      };

    case UPDATE_BOOKING:
      return {
        booking: posts.posts.map((post) => (post._id === payload._id ? payload: post)),
        
      };
    default:
      return posts;
  }
}
