/* eslint-disable no-lone-blocks */
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import LocationOn from "@material-ui/icons/LocationOn";
import MyLocation from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import axios from "axios";
import { getDistance } from "geolib";
import { GoogleApiWrapper } from "google-maps-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api.js";
import Popup from "../../components/modal/Popup";
import {
  clearSnackbar,
  showSuccessSnackbar,
} from "../../store/actions/snackbarActions";
import { doProfileUpdate } from "../../store/actions/userActions";
import {
  find_duplicate_in_array,
  roundTo2DecimalPoint,
} from "../../utils/helpers";
import { DatePicker, Input, Select } from "../controls";
import Form from "../layout/Form";
import Profile from "../layout/Profile";
import MuiSnackbar from "../snackbar/MuiSnackbar";

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

const lunchTime = [
  { id: "none", title: "Select" },
  { id: "none", title: "Select" },
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
      fontSize: "1em",
      [theme.breakpoints.down("md")]: {
        fontSize: ".9em",
      },
    },
  },
  box: {
    backgroundColor: theme.palette.primary.main,
  },
  submitButtonGroup: {
    fontSize: "1em",
    [theme.breakpoints.down("md")]: {
      fontSize: "1em",
    },
    backgroundColor: theme.palette.primary.main,

    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  subtitle2: {
    ...theme.mixins.subtitle2,
    [theme.breakpoints.down("md")]: {
      fontSize: "8.em",
    },
  },

  drawerIcon: {
    height: "30px",
    width: "30px",
    color: theme.palette.success.dark,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,

    width: "95%",
  },
  results: {
    position: "fixed",
    bottom: -5,
    left: "20%",
    zIndex: 999,

    height: "15%",
    backgroundColor: theme.palette.success,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    padding: 10,
    height: "45px",
    width: "45px",
    color: theme.palette.success.dark,
  },
  rootHome: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: "95%",
  },
  rootItems: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#edebeb",
  },
}));

export function StepTwo(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    OrderedFoodItems,
    handlePrev,
    handleNext,
    activeStep,
    steps,
    recordForEdit,
  } = props;

  const classes = useStyles();
  const [orderId, setOrderId] = useState(0);

  const [distance, setDistance] = useState("");
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [buttonState, setbuttonState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.location);
  const firebase = useSelector((state) => state.firebase);
  const ourLocation = location && location[0];
  const [loc, setLoc] = useState(false);
  const [title, setTitle] = useState("Account");

  const [address, setAddress] = useState(firebase.profile.address || "");

  unavailableDates.push(moment(new Date()).format("YYYY-MM-DD"));

  let currentAddress =
    firebase.profile.address && firebase.profile.address
      ? `${firebase.profile.address}, ${firebase.profile.pin}`
      : "Set Delivery Details...";

  const getUserAddressBy = (lat, long) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GEOCODE_KEY}`
      )
      .then((result) => {
        console.log(result.data.results[0].formatted_address);

        handleSelect(result.data.results[0].formatted_address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrowserLocation = (e) => {
    console.log("Clicked");
    setAddress("");
    navigator.geolocation.getCurrentPosition(
      function (position) {
        getUserAddressBy(position.coords.latitude, position.coords.longitude);
      },
      function (error) {
        alert("The Locator was denied, Please add your address manually");
      }
    );
  };

  const handleSelect = (address) => {
    setAddress(address);
    currentAddress = address;
    handleEditLoc();
    let zip_code = "";
    values.address =
      firebase.profile.address && firebase.profile.address
        ? firebase.profile.address
        : address;
    geocodeByAddress(address)
      .then((results) => {
        zip_code = results[0].address_components.find(
          (addr) => addr.types[0] === "postal_code"
        ).short_name;
        values.pin =
          firebase.profile.pin && firebase.profile.pin
            ? firebase.profile.address
            : zip_code;
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        if (getDistance(ourLocation, latLng, 1) / 1000 < 8) {
          const distance = (
            getDistance(ourLocation, latLng, 1) / 1000
          ).toString();
          setbuttonState(false);
          const update = {
            address: address,
            pin: zip_code,
            distance: distance,
          };
          setDistance(distance);
          dispatch(doProfileUpdate(firebase.auth.uid, update));
        } else {
          dispatch(showSuccessSnackbar("We are unable to deliver!", "error"));
          setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
          setbuttonState(true);
          resetForm();
        }
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    console.log(firebase.auth);
    if (
      firebase.profile.address.length < 2 ||
      firebase.profile.mobile.length < 2 ||
      firebase.profile.email.length < 2
    ) {
      setOpenPopup(true);
    }

    currentAddress && currentAddress
      ? setbuttonState(false)
      : setbuttonState(true);
    api
      .thaliOrder()
      .getThaliOrders(firebase.auth.uid)
      .then((res) => res.data)
      .then((response) => {
        var allDates = response.map(function (e) {
          return e.deliveryDate;
        });

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
  }, [address, loc, firebase.profile.address]);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.price;
    }, 0);
    setValues({
      ...values,
      grandTotal: roundTo2DecimalPoint(gTotal),
    });
  }, [JSON.stringify(values.orderDetails)]);

  const validateForm = () => {
    let temp = {};
    values.distance =
      firebase.profile.distance && firebase.profile.distance.length
        ? firebase.profile.distance
        : distance;

    temp.address = values.address.length !== 0 ? "" : "Set Delivery Details";

    temp.paymentMethod = values.paymentMethod !== "none" ? "" : "Payment!.";
    temp.deliveryTime = values.deliveryTime !== "none" ? "" : "Time-slot!";
    temp.orderDetails =
      values.orderDetails.length !== 0 ? "" : "Please add items.";
    temp.orderOption = values.orderOption !== "none" ? "" : "Option!";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleEditLoc = () => {
    setLoc(!loc);
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (firebase && firebase.auth.uid) {
      values.uid = firebase.auth.uid;
      values.customerId = firebase.profile.customerId;
      values.customerName =
        firebase.profile.fname + " " + firebase.profile.lname;
      values.email = firebase.profile.email;
      values.mobile = firebase.profile.mobile;
      values.address =
        firebase.profile.address && firebase.profile.address
          ? currentAddress
          : address;
      values.pin =
        firebase.profile.pin && firebase.profile.pin
          ? firebase.profile.pin
          : values.pin;
    }
    setValues(values);

    values.deliveryDate = moment(values.deliveryDate).format("YYYY-MM-DD");
    if (validateForm()) {
      handleNext();
    } else {
      dispatch(showSuccessSnackbar("Set Delivery Details", "error"));
      setTimeout(() => {
        dispatch(clearSnackbar());
      }, 3000);
    }
  };

  const searchOptions = {
    componentRestrictions: { country: "IN" },
  };

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

                  <span>{currentAddress}</span>
                </Box>
                <Box marginLeft={2} marginRight={1} m={1}>
                  {loc ? (
                    <Paper component="form" className={classes.rootHome}>
                      <LocationOn
                        color="secondary"
                        className={classes.iconButton}
                      />
                      <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                        searchOptions={searchOptions}
                        name="Address"
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <>
                            <InputBase
                              style={{ width: "95%" }}
                              label={"Enter delivery address"}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                              {...getInputProps({
                                placeholder: "Enter delivery address",
                              })}
                              className={classes.input}
                              inputProps={{
                                "aria-label":
                                  "search google maps for delivery address",
                              }}
                            />

                            <div className={classes.results}>
                              {loading ? <div>Getting Results...</div> : null}
                              {suggestions.map((suggestion) => {
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: "#41b6e6",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#ffffff",
                                      cursor: "pointer",
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </PlacesAutocomplete>
                      <SearchIcon className={classes.iconButton} />
                      <Divider
                        className={classes.divider}
                        orientation="vertical"
                      />
                      <IconButton
                        color="primary"
                        className={classes.iconButton}
                        aria-label="directions"
                        onClick={(e) => getBrowserLocation(e)}
                      >
                        <MyLocation />
                      </IconButton>
                    </Paper>
                  ) : null}
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
                <Input
                  disabled
                  label="Customer Number"
                  name="customerNumber"
                  value={
                    firebase.profile && firebase.profile.customerId
                      ? firebase.profile.customerId.toUpperCase()
                      : ""
                  }
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
                  options={pMethods}
                  error={errors.paymentMethod}
                />
                <Input
                  disabled
                  label="Grand Total"
                  name="gTotal"
                  value={values.grandTotal}
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
                  {loading ? (
                    <CircularProgress color="secondary" size={50} />
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      className={classes.submitButtonGroup}
                      onClick={submitOrder}
                      disabled={buttonState}
                    >
                      Next
                    </Button>
                  )}
                  {activeStep > 0 ? (
                    <Button
                      className={classes.submitButtonGroup}
                      onClick={handlePrev}
                      variant="outlined"
                      size="large"
                    >
                      {" "}
                      Back
                    </Button>
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </div>
        </Form>
        <MuiSnackbar />
        <Popup
          title={"Account"}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Profile setOpenPopup={setOpenPopup} />
        </Popup>
      </Grid>
    </Grid>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GEOCODE_KEY,
})(StepTwo);
