/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Link from "../../components/Link";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Button } from "../controls/index";
import { withStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { saveState, setWithExpiry } from "../../utils/helpers";

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(2),
    textDecoration: "none",
  },
  button: {
    
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ffffff',
    },
  },
  paper: {
    margin: "auto",
  },
});

const AddToCart = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { classes, data } = props;

  const addedItems = useSelector((state) => state.storeItems.addedItems);

  // useEffect(() => {
  //   console.log(addedItems.count)
  //   saveState('addedItems', addedItems);
  // }, [addedItems]);

  const handleAddToCart = (id) => {

    dispatch(addQuantityWithNumber(id, 1));

    // dispatch({
    //   type: "ADD_TO_CART",
    //   id,
    // });

    toast.success("Added to the cart", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    dispatch({ type: "DESTROY_SESSION" })

    // dispatch({
    //   type: "ADD_TO_LOCAL",
    //   name: "addedItems",
    // });
    // let localItems = JSON.parse(getWithExpiry("addedItems"));

    // if (localItems && localItems.length > 1 && addedItems.length > 1) {
    //   setWithExpiry(
    //     "addedItems",
    //     JSON.stringify(localItems.concat(addedItems)),
    //     howLong
    //   );
    // }
    // if (localItems && localItems.length === 0 && addedItems.length > 1) {
    //   setWithExpiry(
    //     "addedItems",
    //     JSON.stringify(localItems.concat(addedItems)),
    //     howLong
    //   );
    // }
    // if (localItems && localItems.length > 1 && addedItems.length === 0) {
    //   setWithExpiry(
    //     "addedItems",
    //     JSON.stringify(localItems.concat(addedItems)),
    //     howLong
    //   );
    // } else {
    //   setWithExpiry("addedItems", JSON.stringify(addedItems), howLong);
    // }

    // localAddedItems = localItems && localItems.length >=1  && addedItems.length >= 1 ? localAddedItems.concat(addedItems) : addedItems

    // addedItems && addedItems.length === localAddedItems
    //   ? setWithExpiry("addedItems", JSON.stringify(addedItems), howLong)
    //   : setWithExpiry("addedItems", JSON.stringify(localAddedItems), howLong);
    // setlocalAddedItems(localAddedItems);
  };

  return (
    <Button
    className={classes.button}
   
      onClick={(e) => {
        e.preventDefault();
        handleAddToCart(data.id);
      }}
      style={{ textDecoration: "none" }}
    >
      <Typography variant="button">ADD TO CART</Typography>
    </Button>

    // <Box display="flex" style={{justifyContent:"center"}} p={2} bgcolor="primary.main">
    //   <Button
    //     className={classes.button}
    //     onClick={(e) => {
    //       e.preventDefault();
    //       handleAddToCart(data.id);
    //     }}
    //   >
    //     <Typography variant="button">Add to Cart</Typography>
    //   </Button>
    // </Box>
  );
};

export default withStyles(styles)(AddToCart);
