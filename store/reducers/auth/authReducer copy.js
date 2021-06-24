// import { toast } from "react-toastify";

import {
  AUTH_INFO_SUCCESS,
  
  GET_SIGNIN_REQUEST,
  GET_SIGNIN_SUCCESS,
  GET_SIGNIN_ERROR,

  GET_SIGNOUT_REQUEST,
  GET_SIGNOUT_ERROR,
  GET_SIGNOUT_SUCCESS,

  GET_SIGNUP_REQUEST,
  GET_SIGNUP_SUCCESS,
  GET_SIGNUP_ERROR,
} from "../../actions/action-types/action-names";

const initialState = {
  isAuthenticated: false,

  loginInProgress: false,
  loginError: null,

  signupInProgress: false,
  signupError: null,

  logoutInProgress: false,
  logoutError: null
};

// const DefaultState = {
//   authMsg: "",
// };

const authReducer = (state = initialState, action) => {

  const { type, payload } = action;
  switch (type) {

    case AUTH_INFO_SUCCESS:
      return {
          ...state,
          isAuthenticated: !!payload
      };
   
    //signin
    case GET_SIGNIN_ERROR:
      return {
        ...state,
        authMsg: "Unable to login",
      };
    case GET_SIGNIN_SUCCESS:
      return {
        ...state,
        authMsg: "Welcome back..",
      };

    //signout
    case GET_SIGNOUT_ERROR:
      return {
        ...state,
        authMsg: "Signout Failed",
      };
    case GET_SIGNOUT_SUCCESS:
      return {
        ...state,
        authMsg: "Come back again ...",
      };
    //signup

    case GET_SIGNUP_ERROR:
      return {
        ...state,
        authMsg: "Try again...",
      };
    case GET_SIGNUP_SUCCESS:
      return {
        ...state,
        authMsg: "Welcome ...",
      };

    default:
      return state;
  }
};

export default authReducer;
