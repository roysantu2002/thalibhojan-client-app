import { createWrapper } from "next-redux-wrapper";
import { getFirebase } from "react-redux-firebase";
import { applyMiddleware, compose, createStore } from "redux";
import { getFirestore, reduxFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import { firebase } from "../utils/firebase";
import { loadState } from "../utils/helpers";
import rootReducer from "./reducers";

const localState = loadState();

console.log(localState);

export const newStore = () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
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
