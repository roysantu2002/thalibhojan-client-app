import Router from "next/router";
import {
  AUTH_INFO_SUCCESS,
  GET_SIGNIN_REQUEST,
  GET_SIGNIN_SUCCESS,
  GET_SIGNIN_ERROR,
  GET_SIGNOUT_REQUEST,
  GET_SIGNOUT_ERROR,
  GET_SIGNOUT_SUCCESS,
  GET_SIGNUP_REQUEST,
  GET_SIGNUP_ERROR,
  SHOW_CURRENT_USER_REQUEST,
  SHOW_CURRENT_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  LOADING_UI,
  SIGNUP_SUCCESS,
  CLEAR_ERRORS,
} from "../actions/action-types/action-names";

import { addUser } from "../actions/userActions";

export const authInfoSuccess = (user) => ({
  type: AUTH_INFO_SUCCESS,
  payload: user,
});
export const loginRequest = () => ({ type: GET_SIGNIN_REQUEST });
export const loginSuccess = () => ({ type: GET_SIGNIN_SUCCESS });

export const loginError = (e) => ({ type: GET_SIGNIN_ERROR, payload: e });

export const signupRequest = () => ({ type: GET_SIGNUP_REQUEST });

export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });

export const signupError = (e) => ({ type: GET_SIGNUP_ERROR, payload: e });

export const logoutRequest = () => ({ type: GET_SIGNOUT_REQUEST });
export const logoutSuccess = () => ({ type: GET_SIGNOUT_SUCCESS });
export const logoutError = (e) => ({ type: GET_SIGNOUT_ERROR, payload: e });

export const resetSuccess = (res) => ({ type: RESET_PASSWORD, payload: res });
export const resetError = (e) => ({ type: RESET_PASSWORD_ERROR, payload: e });

export const showCurrentUserRequest = () => ({
  type: SHOW_CURRENT_USER_REQUEST,
});
export const showCurrentUserSuccess = (user) => ({
  type: SHOW_CURRENT_USER_SUCCESS,
  payload: user,
});

//signIn with cred
export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: LOADING_UI });
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      // .then(() => dispatch(loginSuccess()))
      .then(() => {
        dispatch({
          type: SIGNUP_SUCCESS,
        });
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch((e) => {
        dispatch({ type: CLEAR_ERRORS });
        dispatch(loginError(e));
        throw e;
      });
  };
};

//SIGNUP
export const signUp = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const { email, password, fname, lname } = credentials;
    const fullName = `${fname} ${lname}`;

    dispatch({ type: LOADING_UI });
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const displayName = res.user.email.split("@")[0];
        res.user.updateProfile({ displayName: displayName });
        dispatch({
          type: SIGNUP_SUCCESS,
        });
        dispatch({ type: CLEAR_ERRORS });
        dispatch(addUser(credentials, res.user.uid));
      })

      .then(() => Router.push("/"))
      .catch((err) => {
        dispatch({ type: CLEAR_ERRORS });
        dispatch(signupError(err));
        throw err;
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(logoutRequest());
    const firebase = getFirebase();
    return (
      firebase
        .auth()
        .signOut()
        .then(() => dispatch(logoutSuccess()))
        .then(() => dispatch(showCurrentUserSuccess(null)))
        .catch((e) => {
          dispatch(logoutError(e));
          throw e;
        })
    );
  };
};

export const resetPassword = (Email) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(Email);
    const firebase = getFirebase();
    return (
      firebase
        .auth()
        .sendPasswordResetEmail(Email)
        .then((res) => {
          dispatch(resetSuccess(res));
        })
        .catch((e) => {
          dispatch(resetError(e.code));
        })
    );
  };
};
