import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  showSuccessSnackbar,
  clearSnackbar,
} from "../../store/actions/snackbarActions";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, Grid } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MyLocation from "@material-ui/icons/MyLocation";
import LocationOn from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { getDistance } from "geolib";
import { doProfileUpdate } from "../../store/actions/userActions";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  rootHome: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 260,
  },
  rootItems: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#edebeb",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    position: "relative",
  },
  results: {
    position: "absolute",
    bottom: -166,
    left: "26%",
    zIndex: 999,
    width: 760,
    height: "15%",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const location = useSelector((state) => state.location.location);
  const ourLocation = location && location[0];
  const dispatch = useDispatch();

  const firebase = useSelector((state) => state.firebase);
  const [loc, setLoc] = useState(false);

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

  const searchOptions = {
    componentRestrictions: { country: "IN" },
  };
  const handleEditLoc = () => {
    setLoc(!loc);
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
    <div style={{ maxWidth: "inherit" }}>
      <Box display="flex" style={{justifyContent:"center"}} p={2} m={3}>
        <EditLocationIcon
          onClick={handleEditLoc}
          className={classes.drawerIcon}
        />

        <span>{currentAddress}</span>
      </Box>

      {loc ? (
        <Box component="div" overflow="visible" maxWidth="xs">
          <LocationOn color="secondary" className={classes.iconButton} />
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
              <Box component="div" overflow="visible">
                <TextField
                  {...getInputProps({
                    placeholder: "Enter delivery address",
                  })}
                  className={classes.input}
                  inputProps={{
                    "aria-label": "search google maps for delivery address",
                  }}
                  label={"Enter delivery address"}
                  // InputProps={{
                  //   classes: { input: classes.input },
                  // }}
                  // {...getInputProps({
                  //   placeholder: "Enter delivery address",
                  // })}
                  // className={classes.input}
                  // inputProps={{
                  //   "aria-label": "search google maps for delivery address",
                  // }}
                />
                {/* <div className="autocomplete-dropdown-container"> */}
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
                          // className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </Box>
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
        </Box>
      ) : null}
    </div>
  );
}
