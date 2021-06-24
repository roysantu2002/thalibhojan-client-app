import { location } from "../data/location";
import { GET_OUR_LOCATION } from "../actions/action-types/action-names";
import {
  UPDATE_ADDESS,
  UPDATE_DATE,
  UPDATE_TIME,
} from "../actions/action-types/action-names";

const initialState = {
  location: location,
  address: "",
  landmark: "",
  distance: "",
  completeAddress: "",
  pin: "",
  bookingDate: "",
  bookingTime: "",
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_ADDESS:
      return {
        ...state,
        address: [action.address],
        landmark: [action.landmark],
        distance: [action.distance],
        completeAddress: [action.completeAddress],
        pin: [action.pin],
      };
    case UPDATE_DATE:
      return {
        ...state,
        bookingDate: [action.bookDate],
      };
    case UPDATE_TIME:
      return {
        ...state,
        bookingTime: [action.bookTime],
      };

    default:
      return state;
  }
};
export default reducer;
