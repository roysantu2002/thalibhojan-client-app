/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import Form from "../layout/Form";
import {
  Grid,
  InputAdornment,
  makeStyles,
  ButtonGroup,
  Button as MuiButton,
} from "@material-ui/core";
import { Input, Select, DatePicker } from "../controls";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReplayIcon from "@material-ui/icons/Replay";

import MuiSnackbar from "../snackbar/MuiSnackbar";
import { useDispatch, useSelector } from "react-redux";
import {
  showSuccessSnackbar,
  clearSnackbar,
} from "../../store/actions/snackbarActions";
import { roundTo2DecimalPoint } from "../../utils/helpers";
import Box from "@material-ui/core/Box";
import api from "../../api/api.js";
import moment from "moment";
import { resetCart } from "../../store/actions/storeActions";
import { removeState, find_duplicate_in_array } from "../../utils/helpers";

var unavailableDates = [];

const pMethods = [
  { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const orderOptions = [
  { id: "none", title: "Select" },
  { id: "Delivery", title: "Delivery" },
  { id: "Takeaway", title: "Takeaway" },
];

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
        fontSize: "1em",
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
  const dispatch = useDispatch();
  const firebase = useSelector((state) => state.firebase);

  unavailableDates.push(moment(new Date()).format("YYYY-MM-DD"));

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    props;

  console.log(values.orderDetails);

  useEffect(() => {
    api
      .getThaliOrders()
      .then((res) => res.data)
      .then((response) => {
        //available dates
        var allDates = response.map(function (e) {
          return e.deliveryDate;
        });
        //available times
        var allTimes = response.map(function (a) {
          return a.deliveryTime;
        });

        var filterDates = find_duplicate_in_array(allDates);
        filterDates.filter((date) => {
          if (!unavailableDates.includes(date)) {
            unavailableDates.push(date);
          }
          return unavailableDates;
        });
        console.log(unavailableDates);
        var filteredTimes = find_duplicate_in_array(allTimes);

        deliveryTime.filter((e) => {
          if (!filteredTimes.includes(e.id) && !availDeliveryTime.includes(e)) {
            availDeliveryTime.push(e);
          }
          return e;
        });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.price;
    }, 0);
    setValues({
      ...values,
      gTotal: roundTo2DecimalPoint(gTotal),
    });
  }, []);

  const validateForm = () => {
    let temp = {};

    temp.pMethod = values.pMethod !== "none" ? "" : "Select Payment method.";
    temp.deliveryTime =
      values.deliveryTime !== "none" ? "" : "Select Time-slot";
    temp.orderDetails =
      values.orderDetails.length !== 0 ? "" : "Please add items.";
    temp.orderOption =
      values.orderOption !== "none" ? "" : "Select Order Delivery option";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  console.log(values);

  const submitOrder = (e) => {
    e.preventDefault();
    if (firebase && firebase.auth.uid) {
      values.uid = firebase.auth.uid;
      values.customerName = firebase.auth.displayName;
      values.email = firebase.auth.email;
      values.mobile = firebase.profile.mobile;
    }
    values.deliveryDate = moment(values.deliveryDate).format("YYYY-MM-DD");
    if (validateForm()) {
      api
        .createThaliOrder(values)
        .then((res) => {
          dispatch(showSuccessSnackbar(`Your Order# ${values.orderNumber}`));
          resetForm();
          dispatch(resetCart());
          removeState();
          setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
        })
        .catch((e) => {
          dispatch(showSuccessSnackbar("Something Went Wrong"));
          resetForm();
          setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
        });
    }
  };

  return (
    <section className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Form onSubmit={submitOrder}>
            <Grid container>
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
              <Input
                disabled
                label="Customer Number"
                name="customerNumber"
                color="secondary"
                value={values.customerId.toUpperCase()}
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
            </Grid>

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
              name="pMethod"
              value={values.pMethod}
              onChange={handleInputChange}
              options={pMethods}
              error={errors.pMethod}
            />
            <Input
              disabled
              label="Grand Total"
              name="gTotal"
              value={values.gTotal}
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

            <Grid xs={12}>
              <Box
                display="flex"
                style={{ justifyContent: "center" }}
                p={1}
                m={2}
              >
                <ButtonGroup aria-label="outlined primary button group">
                  <MuiButton
                    className={classes.submitButtonGroup}
                    size="small"
                    endIcon={<RestaurantMenuIcon />}
                    type="submit"
                  >
                    Place Order
                  </MuiButton>

                  <MuiButton
                    className={classes.submitButtonGroup}
                    size="small"
                    onClick={resetForm}
                    startIcon={<ReplayIcon />}
                  />
                </ButtonGroup>
              </Box>
            </Grid>
          </Form>
          <MuiSnackbar />
        </Grid>
      </Grid>
    </section>
  );
}
