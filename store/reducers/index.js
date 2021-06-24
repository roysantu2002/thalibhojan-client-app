import { combineReducers } from "redux";
import storeReducers from "./storeReducers";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./auth/authReducer";
import userReducer from "./auth/userReducer";
import bookingReducer from "./bookingReducer";
import locationReducer from "./locationReducer"
import uiReducer from "./uiReducer"
import orderReducer from "./orderRecuder"

const rootReducer = combineReducers({
  storeItems: storeReducers,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
  booking: bookingReducer,
  location: locationReducer,
  orderReducer: orderReducer
});
export default rootReducer;
