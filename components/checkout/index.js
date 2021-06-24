import React from "react";
import OrderForm from "./OrderForm";
import { useForm } from "../../hooks/useForm";
import { Grid, makeStyles, Box } from "@material-ui/core";
import { generateOrderNumber } from "../../utils/helpers";
import SearchFoodItems from "./SearchFoodItems";
import OrderedFoodItems from "./OrderedFoodItems";
import Container from "@material-ui/core/Container";
import moment from "moment";
import { getWithExpiry } from "../../utils/helpers";
import { useSelector } from "react-redux";

const orderNumber = generateOrderNumber(100);

const getFreshModelObject = () => ({
  uid: "",
  customerId: "",
  customerName: "",
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
  gTotal: 0,
  pMethod: "none",
  tPortion: "none",
  deletedOrderItemIds: "",
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(12),
    display: "flex",
  },
}));

export default function Order() {
  const firebase = useSelector((state) => state.firebase);
  const classes = useStyles();
  const addedItems = useSelector((state) => state.storeItems.addedItems);
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(getFreshModelObject);

  console.log(addedItems);
  values.orderDetails = addedItems;
  values.customerId =
    firebase.profile.customerId && firebase.profile.customerId
      ? firebase.profile.customerId
      : "";

  return (
    <section className={classes.root}>
      <Container className={classes.container} spacing={1}>
        <OrderForm
          {...{
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetForm,
            OrderedFoodItems: values.orderDetails,
          }}
        />
      </Container>
    </section>
  );
}
