
import {
    SNACKBAR_SUCCESS,
    SNACKBAR_CLEAR,
    SNACKBAR_FAILURE
  } from "../actions/action-types/action-names";

  
// actions/snackbarActions.js
export const showSuccessSnackbar = (message, severity) => {

    return dispatch => {
      dispatch({ type: SNACKBAR_SUCCESS, payload: {message: message,  severity : severity} });
    };
  };
  
  // actions/snackbarActions.js
export const showFailureSnackbar = message => {
  return dispatch => {
    dispatch({ type: SNACKBAR_FAILURE, message });
  };
};

  export const clearSnackbar = () => {
    return dispatch => {
      dispatch({ type: SNACKBAR_CLEAR });
    };
  };
