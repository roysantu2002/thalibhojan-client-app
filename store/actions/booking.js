import * as api from "../../api/index.js";

import {
  FETCH_ALL,
  CREATE_BOOKING,
  API_ERROR,
  UPDATE_BOOKING,
} from "../actions/action-types/action-names";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};

export const createBooking = (booking) => async (dispatch) => {
  try {
    const { data } = await api.createBooking(booking);

    dispatch({ type: CREATE_BOOKING, payload: data });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error.message });
  }
};

export const updateBooking = (id, booking) => async (dispatch) => {
  console.log(booking);
  try {
    const { data } = await api.updateBooking(id, booking);

    dispatch({ type: UPDATE_BOOKING, payload: data });
  } catch (error) {
    dispatch({ type: API_ERROR, payload: error });
  }
};
