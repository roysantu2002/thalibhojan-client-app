import { Box, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import MyLocation from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { getDistance } from "geolib";
import { GoogleApiWrapper } from "google-maps-react";
import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSnackbar,
  showSuccessSnackbar,
} from "../../store/actions/snackbarActions";
import { doProfileUpdate } from "../../store/actions/userActions";

const useStyles = makeStyles((theme) => ({
  rootHome: {
    marginBottom: 10,
    // margin: theme.spacing(2),
    // padding: "1px 1px",
    display: "flex",
    alignItems: "center",
    // marginRight: theme.spacing(1),
  },
  rootItems: {
    padding: "1px 1px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#edebeb",
  },
  // input: {
  //   // marginLeft: theme.spacing(1),
  //   flex: 1,
  //   position: "relative",
  // },
  results: {
    position: "static",
    bottom: 2,
    left: "26%",
    zIndex: 999,
    maxWidth: 300,
    height: "15%",
  },
  iconButton: {
    padding: 1,
  },
  divider: {
    height: 10,
    margin: 1,
  },
}));

export function CustomizedInputBase(props) {
  const { setOpenPopup } = props;
  const classes = useStyles();
  const location = useSelector((state) => state.location.location);
  const ourLocation = location && location[0];
  const dispatch = useDispatch();

  const firebase = useSelector((state) => state.firebase);
  const [loc, setLoc] = useState(false);
  // const loading = useSelector((state) => state.ui.loading);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState(firebase.profile.address || "");

  let currentAddress =
    firebase.profile.address && firebase.profile.address
      ? `${firebase.profile.address}, ${firebase.profile.pin}`
      : "Search for address...";

  const getUserAddressBy = (lat, long) => {
    const latlng = {
      lat: lat,
      lng: long,
    };
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GEOCODE_KEY}`
      )
      .then((result) => {
        console.log(result.data.results[0].formatted_address);
        // handleChange(result.data.results[0].formatted_address);
        handleSelect(result.data.results[0].formatted_address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrowserLocation = (e) => {
    try {
      setAddress("");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          getUserAddressBy(position.coords.latitude, position.coords.longitude);
        },
        function (error) {
          setLoading(true);
        }
      );
    } catch (error) {
      setLoading(true);
    }
  };

  const searchOptions = {
    componentRestrictions: { country: "IN" },
  };
  const handleEditLoc = () => {
    try {
      setLoc(!loc);
    } catch (e) {
      showSuccessSnackbar("Please try again later!", "error");
      setTimeout(() => {
        dispatch(clearSnackbar());
      }, 3000);
      setOpenPopup(false);
    }
  };

  const handleSelect = (address) => {
    setAddress(address);
    currentAddress = address;
    handleEditLoc();
    let zip_code = "";

    geocodeByAddress(address)
      .then((results) => {
        zip_code = results[0].address_components.find(
          (addr) => addr.types[0] === "postal_code"
        ).short_name;

        return getLatLng(results[0]);
      })
      .then((latLng) => {
        if (getDistance(ourLocation, latLng, 1) / 1000 < 8) {
          const distance = (
            getDistance(ourLocation, latLng, 1) / 1000
          ).toString();

          const update = {
            address: address,
            pin: zip_code,
            distance: distance,
          };

          dispatch(doProfileUpdate(firebase.auth.uid, update));
        } else {
          dispatch(showSuccessSnackbar("We are unable to deliver!"));
          setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
        }
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    // <Paper component="form" className={classes.rootHome}>
    <>
      {loading ? (
        <CircularProgress color="secondary" size={50} />
      ) : (
        <>
          <Box display="flex" style={{ justifyContent: "center" }} p={1} m={1}>
            <EditLocationIcon
              onClick={handleEditLoc}
              className={classes.drawerIcon}
            />

            <span>{currentAddress}</span>
          </Box>

          <Box marginLeft={2} marginRight={1} m={1}>
            {loc ? (
              <Paper component="form" className={classes.rootHome}>
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
                        style={{ width: "100%" }}
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
                            ? { backgroundColor: "#41b6e6", cursor: "pointer" }
                            : { backgroundColor: "#fff", cursor: "pointer" };

                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, { style })}
                            >
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </PlacesAutocomplete>
                <SearchIcon className={classes.iconButton} />
                <Divider className={classes.divider} orientation="vertical" />
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
        </>
      )}
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GEOCODE_KEY,
})(CustomizedInputBase);
