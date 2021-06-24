import {
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  GET_CUSTOMERS_ERROR,
  GET_CUSTOMERS
} from "../../actions/action-types/action-names";

const DefaultState = {
  userMsg: "",
  customers: []
};

const userReducer = (state = DefaultState, action) => {
  switch (action.type) {
    //add user
    case ADD_USER_ERROR:
      return {
        ...state,
        userMsg: "Adding User Failed",
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        userMsg: "Adding User Success",
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        userMsg: "Updating profile",
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        userMsg: "Updating profile failed",
      };

      case GET_CUSTOMERS:
        console.log(action.payload)
        return {
          ...state,
          customers: action.payload,
        };


      case GET_CUSTOMERS_ERROR:
        return {
          ...state,
          msg: action.payload.err,
        };

    default:
      return state;
  }
};

export default userReducer;
