import {
  EDIT_STATUS,
  SET_ORDERS,
  LOADING_DATA,
  SERVER_STATUS,
  SET_ALL_ORDERS,
  CLEAR_ERRORS
} from "../actions/action-types/action-names";

const initialState = {
  orders: [],
  sellerorders: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EDIT_STATUS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? { ...action.payload } : order
        ),
      };
    case SET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

      case CLEAR_ERRORS:
        return {
          ...state,
          loading: false,
        };


    default:
      return state;
  }
}
