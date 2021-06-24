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
import { Input, Select, Button, DatePicker } from "../controls";
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
import { getDistance } from "geolib";
import { roundTo2DecimalPoint, createTimeSlots } from "../../utils/helpers";
import Box from "@material-ui/core/Box";
import { createThaliOrder, getThaliOrders } from "../../api";
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
import { Router } from "next/router";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import EditLocationIcon from "@material-ui/icons/EditLocation";

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

  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.location);
  const firebase = useSelector((state) => state.firebase);
  const ourLocation = location && location[0];
  const [loc, setLoc] = useState(false);

  unavailableDates.push(moment(new Date()).format("YYYY-MM-DD"));

  let currentAddress =
    firebase.profile.address && firebase.profile.address
      ? `${firebase.profile.address}, ${firebase.profile.pin}`
      : "Search for address...";

 

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    OrderedFoodItems,
  } = props;


  const openListOfOrders = () => {
    setOrderListVisibility(true);
  };
  const handleChange = (address) => {
    setAddress(address);
    values.address = address;
  };

  const handleSelect = (address) => {
    setAddress(address);
    currentAddress = address
    handleEditLoc()
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
          values.distance = (
            getDistance(ourLocation, latLng, 1) / 1000
          ).toString();
          setbuttonState(false);
          const update = {
            address: address,
            pin: zip_code,
          };
          dispatch(doProfileUpdate(firebase.auth.uid, update));
        } else {
          dispatch(showSuccessSnackbar("We are unable to deliver!"));
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
    currentAddress && currentAddress
      ? setbuttonState(false)
      : setbuttonState(true);
    getThaliOrders()
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
  }, [address]);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.price;
    }, 0);
    setValues({
      ...values,
      gTotal: roundTo2DecimalPoint(gTotal),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values.orderDetails)]);

  const validateForm = () => {
    let temp = {};
  
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.price;
    }, 0);



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

  const handleEditLoc = () => {
    setLoc(!loc);
  };

  console.log(loc);
  const submitOrder = (e) => {
    e.preventDefault();
    if (firebase && firebase.auth.uid) {
      values.uid = firebase.auth.uid;
      values.customerId = firebase.profile.customerId;
      values.customerName = firebase.auth.displayName;
      values.email = firebase.auth.email;
      values.mobile = firebase.profile.mobile;
    }
    values.deliveryDate = moment(values.deliveryDate).format("YYYY-MM-DD");
    if (validateForm()) {
      OrderedFoodItems && OrderedFoodItems.length
        ? setbuttonState(true)
        : setbuttonState(false);
      createThaliOrder(values)
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
  // Limit the suggestions to show only cities in the US
  const searchOptions = {
 
    componentRestrictions: { country: "IN" },
  };


  return (
    <section className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Form onSubmit={submitOrder}>
            <div className={classes.root}>
              <Grid container>
                <Grid item xs={12}>
                  {" "}
                  <Box display="flex" style={{justifyContent:"center"}} p={1} m={2}>
                    <Box>
                    <EditLocationIcon onClick={handleEditLoc} className={classes.drawerIcon}/></Box>
                    <Box p={2}>
                    <Typography variant="h4"> {currentAddress}</Typography></Box>
                  </Box>
                  <Box marginLeft={2} marginRight={2}>
                  {loc ? (
                    <PlacesAutocomplete
                      value={values.address}
                      onChange={handleChange}
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
                          <TextField
                            style={{ width: "95%", fontSize: 40 }}
                            label={"Address"}
                            InputProps={{
                              classes: { input: classes.input },
                            }}
                            value={values.address}
                            {...getInputProps({
                              placeholder: "Search for address",
                              className: "location-search-input",
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                        
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
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
                  ) : null}
                  </Box>
                </Grid>
              

                <Grid item xs={6}>
                
                </Grid>
              
              </Grid>
            </div>
          </Form>
          <MuiSnackbar />
        </Grid>
      </Grid>
    </section>
  );
}
