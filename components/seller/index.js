import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";

import OrderForm from "./OrderForm";
import SearchFoodItems from "./SearchFoodItems";
import { useForm } from "../../hooks/useForm";
import { Grid, makeStyles, Box } from "@material-ui/core";
import { generateOrderNumber } from "../../utils/helpers";
// import SearchFoodItems from "./SearchFoodItems";
// import OrderedFoodItems from "./OrderedFoodItems";
import Container from "@material-ui/core/Container";
import moment from "moment";
import { getWithExpiry } from "../../utils/helpers";
import {
  removeItem,
  addQuantityWithNumber,
  addToCart,
  subtractQuantity,
} from "../../store/actions/storeActions";
import { useDispatch } from "react-redux";

const orderNumber = generateOrderNumber(100);

const getFreshModelObject = () => ({
  uid: "",
  orderNumber: orderNumber,
  email: "",
  mobile: "",
  address: "",
  deliveryDate: moment(new Date()).add(1, "d").format("YYYY-MM-DD"),
  deliveryTime: "none",
  orderOption: "none",
  pin: "",
  distance: "",
  orderDetails: [],
  customerId: "none",
  grandTotal: 0,
  paymentMethod: "none",
  paymentStatus: "Not Paid",
  paymentId: "TB111",
  status: "Placed",
 
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(12),
    display: "flex",
  },
}));

const Seller = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useSelector((state) => state.firebase);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const addedItems = useSelector((state) => state.storeItems.addedItems);
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(getFreshModelObject);

  values.orderDetails = addedItems;

  if (!auth.uid && !firebase.profile.role === "ROLE_SELLER") {
    this.props.router.push({
      pathname: "/",
    });
  }

  const removeFoodItem = (id) => {
    setLoading(true);
    dispatch(removeItem(id));
    setLoading(false);
  };

  const subtractItem = (id) => {
    setLoading(true);
    dispatch(subtractQuantity(id));
    setLoading(false);
  };
  const addItem = (id) => {
    console.log(id);
    setLoading(true);
    dispatch(addToCart(id));
    setLoading(false);
  };

  return (
    <>
      <OrderForm
        {...{
          values,
          setValues,
          errors,
          setErrors,
          handleInputChange,
          resetForm,
          OrderedFoodItems: addedItems,
          removeFoodItem,
          subtractItem, 
          addItem

        }}
      />

      <SearchFoodItems
        {...{
          OrderedFoodItems: addedItems,
          values,
          setValues,
          errors,
          setErrors,
          handleInputChange,
          resetForm,
        }}
      />
    </>
  );
};

export default Seller;
