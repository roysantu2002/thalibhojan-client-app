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
  DESTROY_SESSION,
  SHOW_CURRENT_USER_REQUEST,
  SHOW_CURRENT_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
} from "../../actions/action-types/action-names";

const initialState = {
  isAuthenticated: false,

  loginInProgress: false,
  loginError: null,

  signupInProgress: false,
  signupError: null,

  logoutInProgress: false,
  logoutError: null,
  currentUser: null,

  resetError: null,
};

export default function authReducer(state = initialState, action = {}) {
  // console.log(`action : ${action.type}`);
  const { type, payload } = action;
  switch (type) {
    case AUTH_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticated: !!payload,
      };

    case GET_SIGNIN_REQUEST:
      return { ...state, loginInProgress: true, loginError: null };

    case GET_SIGNIN_ERROR:
      return { ...state, loginInProgress: false, loginError: payload };

    case GET_SIGNIN_SUCCESS:
      return { ...state, loginInProgress: false, isAuthenticated: true };

    case GET_SIGNUP_REQUEST:
      return { ...state, signupInProgress: true, signupError: null };
    case GET_SIGNUP_SUCCESS:
      return { ...state, signupInProgress: false, isAuthenticated: true };
    case GET_SIGNUP_ERROR:
      return { ...state, signupInProgress: false, signupError: payload };

    case GET_SIGNOUT_REQUEST:
      return { ...state, logoutInProgress: true, logoutError: null };
    case GET_SIGNOUT_SUCCESS:
      return { ...state, logoutInProgress: false, isAuthenticated: false };
    case GET_SIGNOUT_ERROR:
      return { ...state, logoutInProgress: false, logoutError: payload };

    case DESTROY_SESSION:
      return { state: undefined };

    case SHOW_CURRENT_USER_REQUEST:
      return state;
    case SHOW_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: payload };

    case RESET_PASSWORD:

      return { ...state, resetError: payload };

    case RESET_PASSWORD_ERROR:
      return { ...state, resetError: payload };

    default:
      return state;
  }
}
