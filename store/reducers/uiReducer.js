import {
  SNACKBAR_SUCCESS,
  SNACKBAR_CLEAR,
  SNACKBAR_FAILURE,
  LOADING_UI,
  SIGNUP_SUCCESS,
  SET_ERRORS,
  CLEAR_ERRORS,
  SERVER_ERROR,
  SERVER_STATUS,
} from "../actions/action-types/action-names";

const initialState = {
  loading: false,
  serverError: false,
  errors: null,
  signUpSuccess: false,

};

// reducers/uiReducer.js
const uiReducer = (state = initialState, action) => {

  switch (action.type) {
    case SNACKBAR_SUCCESS:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.payload.message,
        severity: action.payload.severity
      };

    case SNACKBAR_FAILURE:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.payload.message,
        severity: action.payload.severity
      };

    case SNACKBAR_CLEAR:
      return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false,
      };

    case LOADING_UI:
      return {
        ...state,
        loading: true,
        serverError: false,
        signUpSuccess: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: true,
      };

    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        serverError: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
        errorsSeller: null,
      };

    case SERVER_ERROR:
      return {
        ...state,
        loading: false,
        serverError: true,
        errors: null,
      };

    case SERVER_STATUS:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default uiReducer;
