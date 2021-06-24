import {
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  SERVER_ERROR,
  GET_CUSTOMERS_ERROR,
  GET_CUSTOMERS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
} from "../actions/action-types/action-names";
import api from "../../api/api.js";
import axios from "../../api/axios";

export const doProfileUpdate = (uid, profile) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: LOADING_UI });
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    firestore
      .collection("users")
      .doc(uid)
      .update(profile)
      .then(() => {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
        });

        dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATE_PROFILE_ERROR,
          err,
        });
        dispatch({ type: SET_ERRORS });
      });
  };
};

//getCustomer
export const fetchDocumentFromCollectionByFieldName = (
  collectionName,
  fieldName
) => {
  return (dispatch, getState, { getFirebase }) => {
    const data = [];
    const firebase = getFirebase();
    console.log(collectionName);
    const firestore = firebase.firestore();
    firestore
      .collection(collectionName)
      .get()
      .then((snapshot) => {
        if (snapshot != null) {
          snapshot.docs.forEach((user) => {
            // let customerId = user.data()["customerId"];
            data.push(user.data());
          });
        }
        console.log(data);
        dispatch({
          type: GET_CUSTOMERS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_CUSTOMERS_ERROR,
          payload: err,
        });
      });
  };
};

export const addUser = (authUser, uid) => {
  
  const user = {
    uid: uid,
    customerId: authUser.custid,
    email: authUser.email,
    fname: authUser.fname,
    lname: authUser.lname,
    address: "",
    admin: false,
    role: "ROLE_USER",
    mobile: authUser.phone,
    pic: "",
    pin: "",
    created: new Date(),
  };


  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firestore
      .collection("users")
      .where("uid", "==", uid)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (!snapshot.docs.length) {

          console.log(user)
          firestore
            .collection("users")
            .doc(uid)
            .set(user)
            .then(() => {
              dispatch({
                type: ADD_USER_SUCCESS,
              });
              api
                .thaliOrder()
                .createUser(user)
                .then(() => {
                  axios.defaults.headers.common["Authorization"] = uid;
                })
                .catch((err) => {
                  console.log(err)
                  dispatch({
                    type: SERVER_ERROR,
                  });
                });
            })
            .catch((err) => {
              console.log(err)
              dispatch({
                type: ADD_USER_ERROR,
                err,
              });
            });
        }else{
          console.log(snapshot)
        }
      
      });
  };
};
