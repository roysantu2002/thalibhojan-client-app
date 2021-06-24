import api from "../../api/api.js";
import {
  FETCH_ORDERS,
  LOADING_DATA,
  EDIT_STATUS,
  SET_ORDERS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ALL_ORDERS
} from "./action-types/action-names";

export const changeOrderStatus = (uid, _id, orderStatus) => (dispatch) => {
  api
    .thaliOrder()
    .postOrderStatus(uid, _id, orderStatus)
    .then((res) => {
      dispatch({
        type: EDIT_STATUS,
        payload: res.data.updatedOrder,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const socketStatusUpdate = (order) => (dispatch) => {
  dispatch({
    type: EDIT_STATUS,
    payload: order,
  });
};

export const getAllOrders = (uid, filter) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.log(uid);
  api
    .thaliOrder()
    .getThaliOrders(uid, filter)
    .then((res) => {
     console.log(res)
      dispatch({
        type: SET_ALL_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
      dispatch({ type: LOADING_DATA });
    });
};


export const getOrders = (uid) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  api
    .thaliOrder()
    .getOrders(uid)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const serverStatus = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  api
    .thaliOrder()
    .home()
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: LOADING_DATA });
    });
};

export const changePaymentStatus = (uid, orderNumber, orderStatus) => (dispatch) => {
  api
    .thaliOrder()
    .paymentStatus(uid, orderNumber, orderStatus)
    .then((res) => {
      dispatch({
        type: EDIT_STATUS,
        payload: res.data.updatedOrder,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
