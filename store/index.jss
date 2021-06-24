import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { firebase } from "../util/firebase";

const bindMiddleware = (applyMiddleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...applyMiddleware));
  }
  return applyMiddleware(...applyMiddleware);
};

export const newStore = () => {
  return createStore(
    rootReducer,

    compose(
      bindMiddleware(
        thunk.withExtraArgument({
          getFirebase,
          getFirestore,
        })
      ),
      reduxFirestore(firebase)
    )
  );
};
export const wrapper = createWrapper(newStore, { debug: true });
