/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import Form from "../layout/Form";

import { Input, Select, DatePicker } from "../controls";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReorderIcon from "@material-ui/icons/Reorder";
import ReplayIcon from "@material-ui/icons/Replay";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import MuiSnackbar from "../snackbar/MuiSnackbar";
import { useDispatch, useSelector } from "react-redux";
import {
  showSuccessSnackbar,
  clearSnackbar,
} from "../../store/actions/snackbarActions";

import { fetchDocumentFromCollectionByFieldName } from "../../store/actions//userActions";

import { getDistance } from "geolib";
import { roundTo2DecimalPoint, createTimeSlots } from "../../utils/helpers";
import Box from "@material-ui/core/Box";
// import { createThaliOrder, getThaliOrders } from "../../api";
import moment from "moment";
import Link from "../Link";
import { resetCart } from "../../store/actions/storeActions";
import { doProfileUpdate } from "../../store/actions/userActions";
import {
  removeState,
  find_duplicate_in_array,
  getUniqueAfterMerge,
} from "../../utils/helpers";
import Container from "@material-ui/core/Container";
import { InlineDatePicker } from "material-ui-pickers";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import api from "../../api/api.js";

import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyLocation from "@material-ui/icons/MyLocation";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import LocationOn from "@material-ui/icons/LocationOn";
import {
  Grid,
  InputAdornment,
  makeStyles,
  ButtonGroup,
  Divider,
  IconButton,
  Paper,
  Button,
} from "@material-ui/core";

// import CartItem from "./CartItem";
import CartItem from "../common/CartItem";

var unavailableDates = [];

const paymentMethods = [
  { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const orderOptions = [
  { id: "none", title: "Select" },
  { id: "Delivery", title: "Delivery" },
  { id: "Takeaway", title: "Takeaway" },
];

const lunchTime = [
  { id: "none", title: "Select" },
  { id: "none", title: "Select" },
];

const customersList = [{ id: "none", title: "Select" }];

const deliveryTime = [
  { id: "none", title: "Select" },
  { id: "9-11am", title: "9-11am" },
  { id: "11-1pm", title: "11-1pm" },
  { id: "1-3pm", title: "1-3pm" },
  { id: "6-8pm", title: "6-8pm" },
  { id: "8-10pm", title: "8-10pm" },
];

var availDeliveryTime = [];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    alignItems: "center",
  },
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#f3b33d",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  submitButtonGroup: {
    zIndex: -1,
    position: "absolute",
    fontSize: "1.5em",
    [theme.breakpoints.down("md")]: {
      fontSize: "1em",
    },
    backgroundColor: theme.palette.primary.main,
    color: "#000",
    margin: theme.spacing(2),
    padding: theme.spacing(1),

    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  input: {
    display: "wrap",
    "&::placeholder": {
      color: "Black",
      fontStyle: "italic",
      fontSize: "1.2em",
      [theme.breakpoints.down("md")]: {
        fontSize: 10,
      },
    },
  },
  drawerIcon: {
    height: "30px",
    width: "30px",
  },
}));

export default function OrderForm(props) {
  const classes = useStyles();
  const [orderId, setOrderId] = useState(0);
  const [address, setAddress] = useState("");
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [buttonState, setbuttonState] = useState(true);
  const router = useRouter();

  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.location);
  const firebase = useSelector((state) => state.firebase);
  const customers = useSelector((state) => state.user.customers);
  let total = useSelector((state) => state.storeItems.total);
  const ourLocation = location && location[0];
  const [loc, setLoc] = useState(false);
  let currentAddress = "";

  const [distance, setDistance] = useState("");
  const [loading, setLoading] = useState(false);



  unavailableDates.push(moment(new Date()).format("YYYY-MM-DD"));

  console.log(customers);

  // let currentAddress =
  //   firebase.profile.address && firebase.profile.address
  //     ? `${firebase.profile.address}, ${firebase.profile.pin}`
  //     : "Search for address...";

  // const timeAvailable = createTimeSlots(moment().format("HH A"));

  // unavailableDates.push(moment(new Date()).add(1, "d").format("YYYY-MM-DD"));

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    OrderedFoodItems,
    removeFoodItem,
    subtractItem,
    addItem,
  } = props;

  useEffect(() => {
    if (
      OrderedFoodItems.length >= process.env.REACT_APP_ORDER_QTY ||
      roundTo2DecimalPoint(total) >= process.env.REACT_APP_ORDER_AMT
    ) {
      setbuttonState(false);
    } else {
      setbuttonState(true);
    }
  }, [OrderedFoodItems, total]);

  // useEffect(() => {
  //   currentAddress && currentAddress
  //     ? setbuttonState(false)
  //     : setbuttonState(true);
  //   api.getThaliOrders()
  //     .then((res) => res.data)
  //     .then((response) => {
  //       //available dates
  //       var allDates = response.map(function (e) {
  //         return e.deliveryDate;
  //       });
  //       //available times
  //       var allTimes = response.map(function (a) {
  //         return a.deliveryTime;
  //       });

  //       var filterDates = find_duplicate_in_array(allDates);
  //       filterDates.filter((date) => {
  //         if (!unavailableDates.includes(date)) {
  //           unavailableDates.push(date);
  //         }
  //         return unavailableDates;
  //       });
  //       console.log(unavailableDates);
  //       var filteredTimes = find_duplicate_in_array(allTimes);

  //       deliveryTime.filter((e) => {
  //         if (!filteredTimes.includes(e.id) && !availDeliveryTime.includes(e)) {
  //           availDeliveryTime.push(e);
  //         }
  //         return e;
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }, [address]);

  useEffect(() => {
    dispatch(fetchDocumentFromCollectionByFieldName("users", "customerId"));
  }, []);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.price;
    }, 0);
    setValues({
      ...values,
      grandTotal: roundTo2DecimalPoint(gTotal),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  let newCustomersList;

  // customers.filter(function (value) {

  newCustomersList = customers.filter(function (value) {
    if (firebase.profile.customerId) {
      return (
        value.customerId.toUpperCase() !==
        firebase.profile.customerId.toUpperCase()
      );
    }
  });

  console.log(newCustomersList);
  newCustomersList &&
    newCustomersList.map((customer) => {
      const customerId = customer.customerId;

      if (!JSON.stringify(customersList).includes(customerId.toUpperCase())) {
        customersList.push({
          id: customerId.toUpperCase(),
          title: customerId.toUpperCase(),
        });
      }
      /* Important code */

      // customersList.filter((x) => x.customerId.toUpperCase() !== firebase.profile.customerId.toUpperCase());

      // for (var i = customersList.length - 1; i >= 0; i--) {
      //   if (customersList[i] === firebase.profile.customerId) customersList.splice(i, 1);
      // }

      // Object.values(customersList).forEach(value => {
      // console.log(value['id'])
      // });

      // for (let [key] of Object.entries(customersList)) {
      //   console.log(key)

      //   //     if (!key.includes(customer)) {
      //   // customersList.push({ id: customer, title: customer });
      // }

      // for(let key of Object.keys(customersList)){
      //   console.log(key)
      // }

      // if (!customersList.hasOwnProperty({id: customer})) {
      //   customersList.push({ id: customer, title: customer });
      // }
      // newCustomersList = [...new Set(customersList.map(moment => moment.title))];
    });

  console.log(newCustomersList);

  // useEffect(() => {
  //   let gTotal = values.orderDetails.reduce((tempTotal, item) => {
  //     return tempTotal + item.quantity * item.price;
  //   }, 0);
  //   setValues({
  //     ...values,
  //     gTotal: roundTo2DecimalPoint(gTotal),
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(values.orderDetails)]);

  const validValues = () => {
    return Object.values(values).every((x) => x !== "");
  };

  const validateForm = () => {
    let temp = {};
    // temp.deliveryDate = moment(values.deliveryDate).format("YYYY-MM-DD").isSame((moment(new Date()).add(1, "d").format("YYYY-MM-DD"), 'day'))  ? "" : "This field is required.";
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.price;
    }, 0);

    // values.gTotal =
    //   values.gTotal.length === 0 && values.orderDetails.length > 1 ? gTotal : 0;

    temp.paymentMethod =
      values.paymentMethod !== "none" ? "" : "Select Payment method.";
    temp.deliveryTime =
      values.deliveryTime !== "none" ? "" : "Select Time-slot";
    temp.orderDetails =
      values.orderDetails.length !== 0 ? "" : "Please add items.";
    temp.customerId = values.customerId !== "none" ? "" : "Select Customer";
    temp.orderOption =
      values.orderOption !== "none" ? "" : "Select Order Delivery option";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleEditLoc = () => {
    setLoc(!loc);
  };

  const handleCustomer = (e) => {
    console.log(e.target.value);

    values.customerId = e.target.value;

    const result = customers.filter(
      (customer) => customer.customerId.toUpperCase() === e.target.value
    );
    // values.customerId = e.target.value;
    // console.log(result[0]);

    values.address =
      result[0].address && result[0].address
        ? result[0].address + result[0].pin
        : "No delivery address";
    values.uid = result[0].uid && result[0].uid;
    values.customerId = result[0].customerId && result[0].customerId;
    values.customerName =
      result[0].fname && `${result[0].fname} ' ' ${result[0].lname}`;
    values.email = result[0].email && result[0].email;
    values.mobile = result[0].mobile && result[0].mobile;
    values.distance = result[0].distance && result[0].distance;
    values.pin = result[0].pin && result[0].pin;
    setAddress(values.address);
  };

  // console.log(loc);
  const submitOrder = (e) => {
    setLoading(true)
    e.preventDefault();
    // console.log(values)
    // console.log(validValues());
    if (firebase && firebase.auth.uid) {
      values.sellerUid = firebase.auth.uid;
      values.sellerId = firebase.profile.customerId;
      values.sellerName = firebase.auth.displayName;
      values.sellerEmail = firebase.auth.email;
      values.sellerMobile = firebase.profile.mobile;
    }
    values.deliveryDate = moment(values.deliveryDate).format("YYYY-MM-DD");
    if (validateForm() && validValues()) {
      OrderedFoodItems && OrderedFoodItems.length
        ? setbuttonState(true)
        : setbuttonState(false);
      api
        .thaliOrder()
        .createThaliOrder(firebase.auth.uid, values)
        .then((res) => {
          console.log(res);
          dispatch(
            showSuccessSnackbar(`Your Order# ${values.orderNumber}`, "success")
          );
          setLoading(false)
          resetForm();
          dispatch(resetCart());
          removeState();
          setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
          // router.push("/orders");
        })
        .catch((e) => {
          dispatch(showSuccessSnackbar("Something Went Wrong", "error"));
          resetForm();
          setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
          setLoading(false)
        });
    } else {
      dispatch(
        showSuccessSnackbar("Please validate customer details", "error")
      );
      setTimeout(() => {
        dispatch(clearSnackbar());
      }, 3000);
      setLoading(false)
    }
  };
  // Limit the suggestions to show only cities in the US
  const searchOptions = {
    // types: ["cities"],
    // terms: [
    //   { offset: 0, value: "West Bengal" },
    // ],
    componentRestrictions: { country: "IN" },
  };
  //  const options = {
  //   location: new google.maps.LatLng(-34, 151),
  //   radius: 2000,
  //   types: ['address']
  // }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Form onSubmit={submitOrder}>
          <div className={classes.root}>
            <Grid container>
              <Grid item xs={12}>
                {" "}
                <Box
                  display="flex"
                  style={{ justifyContent: "center" }}
                  p={2}
                  m={2}
                >
                  <EditLocationIcon
                    onClick={handleEditLoc}
                    className={classes.drawerIcon}
                  />

                  <span>{address}</span>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Input
                  disabled
                  label="Order Number"
                  name="orderNumber"
                  value={values.orderNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className={classes.adornmentText}
                        position="start"
                      >
                        #
                      </InputAdornment>
                    ),
                  }}
                />
                <DatePicker
                  label="Decide Date"
                  name="deliveryDate"
                  value={values.deliveryDate}
                  shouldDisableDate={unavailableDates}
                  disablePast
                  onChange={handleInputChange}
                />
                <Select
                  label="Option"
                  name="orderOption"
                  value={values.orderOption}
                  onChange={handleInputChange}
                  options={orderOptions}
                  error={errors.orderOption}
                />
                <Select
                  label="Customer"
                  name="customerId"
                  value={values.customerId}
                  onChange={(e) => handleCustomer(e)}
                  options={customersList}
                  error={errors.customerId}
                />
              </Grid>

              <Grid item xs={6}>
                <Select
                  label="Time"
                  name="deliveryTime"
                  value={values.deliveryTime}
                  onChange={handleInputChange}
                  options={
                    availDeliveryTime && availDeliveryTime.length
                      ? availDeliveryTime
                      : deliveryTime
                  }
                  error={errors.deliveryTime}
                />
                <Select
                  label="Payment Mode"
                  name="paymentMethod"
                  value={values.paymentMethod}
                  onChange={handleInputChange}
                  options={paymentMethods}
                  error={errors.paymentMethod}
                />
                <Input
                  disabled
                  label="Grand Total"
                  name="grandTotal"
                  value={values.grandTotal || 0}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className={classes.adornmentText}
                        position="start"
                      >
                        {"\u20B9"}
                      </InputAdornment>
                    ),
                  }}
                />
                <Input
                  label="Special Note"
                  name="sNote"
                  value={values.sNote}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className={classes.adornmentText}
                        position="start"
                      >
                        <SpeakerNotesIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <Box
                  display="flex"
                  style={{ justifyContent: "center" }}
                  p={1}
                  m={1}
                  className={classes.box}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={submitOrder}
                    disabled={loading}
                  >
                    <Typography>SUBMIT</Typography>
                    {loading ? <CircularProgress size={30} /> : null}
                  </Button>
                </Box>
              </Grid>
              {OrderedFoodItems && OrderedFoodItems.length ? (
                <Grid xs={12}>
                  {OrderedFoodItems.map((item) => (
                    <CartItem
                      {...item}
                      key={item.id}
                      removeFoodItem={removeFoodItem}
                      addItem={addItem}
                      subtractItem={subtractItem}
                    />
                  ))}
                </Grid>
              ) : null}
            </Grid>
          </div>
        </Form>
        <MuiSnackbar />
      </Grid>
    </Grid>
  );
}
