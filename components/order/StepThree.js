/* eslint-disable no-lone-blocks */
import {
  Button,
  CardContent,
  Divider,
  Grid,
  Hidden,
  makeStyles,
} from "@material-ui/core";
// import { getThaliOrders } from "../../api/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api.js";
import Page404 from "../../pages/Page404";
import {
  clearSnackbar,
  showSuccessSnackbar,
} from "../../store/actions/snackbarActions";
import {
  addQuantityWithNumber,
  resetCart,
} from "../../store/actions/storeActions";
import { removeState, roundTo2DecimalPoint } from "../../utils/helpers";
import CartItem from "../common/CartItem";
import MuiSnackbar from "../snackbar/MuiSnackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
  },
  card: {
    margin: theme.spacing(1),

    minWidth: 100,
  },
  rcorners1: {
    borderRadius: "2px",
  },

  cell: {
    fontSize: "0.8em",
  },
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#f3b33d",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  box: {
    backgroundColor: theme.palette.primary.main,
  },
  submitButtonGroup: {
    textTransform: "uppercase",
    color: "#ffffff",
    fontSize: "1em",
    [theme.breakpoints.down("md")]: {
      fontSize: ".8em",
    },
    margin: theme.spacing(1),
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
  spaceTypo: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    margin: theme.spacing(1),

    textAlign: "center",
    overflow: "auto",
    alignContent: "center",
  },
  divider: {
    background: theme.palette.secondary.main,
    height: 5,
  },

  fab: {
    right: "5%",
    left: "5%",
    display: "flex",
    justifyContent: "space-between",
    position: "fixed",
    bottom: "100px",
    padding: "5px",
    zIndex: 9999,
    backgroundColor: "#ffffff",
  },
  hidden: {
    backgroundColor: "#ffffff",
  },
}));

export default function StepThree(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [httpStatusCode, setHttpStatusCode] = React.useState();
  let total = useSelector((state) => state.storeItems.total);
  const {
    handlePrev,
    handleNext,
    activeStep,
    steps,
    values,
    setValues,
    resetForm,
    subtractItem,
    removeFoodItem,
    addItem,
    addedItems,
    setActiveStep,
  } = props;

  useEffect(() => {
    if (addedItems.length === 0) {
      setActiveStep(0);
      dispatch(resetCart());
      removeState();
    }
  }, [addedItems]);

  let gst = roundTo2DecimalPoint(total * 0.05);
  let delivery = roundTo2DecimalPoint(total * 0.025);
  let grandTotal = roundTo2DecimalPoint(total) + gst + delivery;

  //-----------removed
  console.log("Step Three");
  console.log(values.uid);
  //-----------------

  const multiPly = (price, qty) => {
    return parseInt(price * qty);
  };
  // const removeFoodItem = (id) => {
  //   setLoading(true);
  //   dispatch(removeItem(id));
  //   setLoading(false);
  // };

  const updateQuantity = (id, value) => {
    setLoading(true);
    dispatch(addQuantityWithNumber(id, value));
    setLoading(false);
  };

  const submitOrder = (e) => {
    console.log(values);
    e.preventDefault();

    if (values.paymentMethod === "Cash") {
      values.paymentStatus = "Not Paid";
    }

    api
      .thaliOrder()
      .createThaliOrder(values.uid, values)
      .then((res) => {
        dispatch(showSuccessSnackbar(`Your Order# ${values.orderNumber}`));
        resetForm();
        setValues(values);
        setTimeout(() => {
          dispatch(clearSnackbar());
        }, 3000);
        handleNext();
        // const body = {
        //   updatedBy: values.uid,
        //   customerId: values.customerId,
        //   orderNumber: values.orderNumber,
        //   orderStatus: values.status,
        //   status: values.status,
        //   paymentId: "",
        //   paymentMethod: values.paymentMethod,
        // };

        // dispatch(changePaymentStatus(auth.uid, order.orderNumber, body));
      })
      .catch((e) => {
        console.log(e);
        dispatch(showSuccessSnackbar("Something Went Wrong", "error"));
        setTimeout(() => {
          dispatch(clearSnackbar());
        }, 3000);
      });
  };

  if (httpStatusCode === 404) {
    return <Page404 />;
  }

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item xs={12} md={6}>
        {values.orderDetails.map((item) => (
          <CartItem
            {...item}
            key={item.id}
            removeFoodItem={removeFoodItem}
            addItem={addItem}
            subtractItem={subtractItem}
          />
        ))}
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <CardContent style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              Delivery to: {values.address}
            </Typography>
          </CardContent>

          <Divider />

          <div className={classes.spaceTypo}>
            <Typography
              variant="h3"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              Bill Details
            </Typography>
          </div>
          <div className={classes.spaceTypo}>
            <Typography
              variant="h3"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              Subtotal
            </Typography>

            <Typography
              variant="h3"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              {"\u20B9 " + roundTo2DecimalPoint(total)}
            </Typography>
          </div>
          <div className={classes.spaceTypo}>
            <Typography
              variant="h3"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              Delivery & Handling Charges
            </Typography>

            <Typography
              variant="h3"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              {"\u20B9 " + roundTo2DecimalPoint(total * 0.025)}
            </Typography>
          </div>
          <div className={classes.spaceTypo}>
            <Typography
              variant="h3"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              GST
            </Typography>

            <Typography
              variant="h3"
              gutterBottom
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              {"\u20B9 " + roundTo2DecimalPoint(total * 0.05)}
            </Typography>
          </div>
          <Divider className={classes.divider} />

          <div className={classes.spaceTypo}>
            <Typography
              style={{
                display: "flex",
                justifyContent: "flex-start",
                fontFamily: "GothamBook",
                fontSize: "1.5rem",
              }}
            >
              Total
            </Typography>

            <Typography
              style={{
                display: "flex",
                justifyContent: "flex-start",
                fontFamily: "GothamBook",
                fontSize: "1.5rem",
              }}
            >
              {"\u20B9 " + roundTo2DecimalPoint(grandTotal)}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <Hidden mdDown>
            <div className={classes.spaceTypo}>
              {loading ? (
                <CircularProgress color="secondary" size={50} />
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.submitButtonGroup}
                  onClick={submitOrder}
                >
                  {activeStep === steps.length - 1 ? "PLACE ORDER" : "Next"}
                </Button>
              )}
              {activeStep > 0 ? (
                <Button
                  className={classes.submitButtonGroup}
                  color="secondary"
                  onClick={handlePrev}
                  variant="contained"
                  size="large"
                >
                  Back
                </Button>
              ) : null}
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.fab}>
              {loading ? (
                <CircularProgress color="secondary" size={50} />
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.submitButtonGroup}
                  onClick={submitOrder}
                >
                  {activeStep === steps.length - 1 ? "PLACE ORDER" : "Next"}
                </Button>
              )}
              {activeStep > 0 ? (
                <Button
                  className={classes.submitButtonGroup}
                  onClick={handlePrev}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Back
                </Button>
              ) : null}
            </div>
          </Hidden>
        </Paper>
      </Grid>

      <MuiSnackbar />
    </Grid>
  );
}
