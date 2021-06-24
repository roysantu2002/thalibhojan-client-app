import React from "react";
import { useSelector } from "react-redux";
import Order from "../components/order";
import Register from "../components/register/phoneregistration";

function PlaceOrder(props) {
  const auth = useSelector((state) => state.firebase.auth);
  return auth.uid ? <Order /> : <Register />;
}

export default PlaceOrder;
