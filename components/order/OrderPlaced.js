import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Form from "../layout/Form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  showSuccessSnackbar,
  clearSnackbar,
} from "../../store/actions/snackbarActions";
import MuiSnackbar from "../snackbar/MuiSnackbar";
import {
  Grid,
  Typography,
  Box,
  Divider,
  Paper,
  Button,
  Card,
} from "@material-ui/core";
import moment from "moment";
import { removeState } from "../../utils/helpers";
import { resetCart } from "../../store/actions/storeActions";
import api from "../../api/api.js";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Link from "../Link";
import {
  changeOrderStatus,
  changePaymentStatus,
} from "../../store/actions/orderActions";
import { IconButton } from "../controls";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { serverStatus, getAllOrders } from "../../store/actions/orderActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from "../common/Cart";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  grid: {
    maxWidth: 400,
    [theme.breakpoints.down("md")]: {
      maxWidth: 280,
    },
    marginTop: 30,
    margin: 4,
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: "center",
  },
  order: {
    color: theme.palette.success.dark,
    fontWeight: "bolder",
    fontSize: "1em",
  },
  orderDetails: {
    color: "#000000",
    fontWeight: "bolder",
    fontSize: "1.2em",
  },
  v1: {
    borderLeft: "6px solid green",
    height: "50px",
    right: 50,
  },
  submitButtonGroup: {
    fontSize: "1em",
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("md")]: {
      fontSize: ".8em",
    },
    // backgroundColor: theme.palette.primary.main,

    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary,
    },
  },
  divider: {
    background: theme.palette.primary.dark,
  },
  orderImg: {
    maxHight: 80,
    maxWidth: 80,
    [theme.breakpoints.down("md")]: {
      fontSize: "1em",
      maxHight: 50,
      maxWidth: 50,
    },
  },
  details: {
    display: "flex",
    flexDirection: "space-between",
    width: "100%",
    margin: theme.spacing(2),
  },
  card: {
    margin: theme.spacing(2),
    paddingTop: 10,
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    fontFamily: "GothamBook",
    fontSize: "1.5rem",
  },
});

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
    console.log("done");
  });
}

const OrderPlaced = (props) => {
  const { classes } = props;
  const { values, setActiveStep } = props;
  let total = useSelector((state) => state.storeItems.total);
  const firebase = useSelector((state) => state.firebase);
  const loading = useSelector((state) => state.orderReducer.loading);

  const [success, setSuccess] = useState(false);
  const [dataset, setDataset] = useState([]);
  const [razorPaymentId, setRazorPaymentId] = useState("");
  // let paymentId = ""
  const dispatch = useDispatch();
  let data = "";
  const __DEV__ = document.domain === "localhost";

  useEffect(() => {
    if (total !== 0) {
      dispatch(serverStatus());
    }
  }, []);

  async function razopPayment() {
    console.log(values);

    // setSuccess(true);

    const API_URL = `http://localhost:5000/razorpay/`;
    const createOrderUrl = `${API_URL}createOrder`;

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      dispatch(showSuccessSnackbar("Are you online!!!", "error"));
      return;
    }
    const requestOptions = {
      grandTotal: values.grandTotal,
      orderNumber: values.orderNumber,
    };

    // const data = await fetch("http://localhost:5000/razorpay", {requestOptions}).then((t) => t.json());

    data = await axios
      .post(createOrderUrl, requestOptions, {
        headers: {
          authorization: `Basic ${values.uid}`,
        },
      })
      .then((t) => t.data);

    // console.log(data);

    // data && data.length > 1 ? setDataset({ data }) : setDataset([]);
    let paymentId = "";
    const options = {
      key: __DEV__ ? "rzp_test_OX0BNda5zA5FjT" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      name: data.customerName,
      description: "Thank you : Thalibhojan",
      image: "http://localhost:5000/logo.png",

      handler: async (response) => {
        // try {
        console.log(response.razorpay_payment_id);
        // setDataset(JSON.parse(response));
        paymentId = response.razorpay_payment_id;

        setRazorPaymentId(paymentId);
        try {
          const url = `${API_URL}verifyOrder/${paymentId}`;

          const options = {
            headers: {
              authorization: `Basic ${values.uid}`,
            },
          };

          axios.get(url, options).then(
            (response) => {
              console.log(response);
              const body = {
                updatedBy: values.uid,
                customerId: values.customerId,
                orderNumber: values.orderNumber,
                orderStatus: values.status,
                paymentId: paymentId,
                paymentMethod: "Razorpay",
              };
              dispatch(
                changePaymentStatus(values.uid, values.orderNumber, body)
              );
              dispatch(resetCart());
              removeState();
              paymentId && paymentId.length
                ? setSuccess(true)
                : setSuccess(false);

              const successObj = JSON.parse(response.data);
              console.log(
                "App -> razorPayPaymentHandler -> captured",
                successObj
              );
            },
            (error) => {
              console.log(error);
            }
          );

          api
            .thaliOrder()
            .updatePaymentStatus(values.uid, values.orderNumber, paymentId);
        } catch (e) {
          console.log(e);
          dispatch(showSuccessSnackbar("Something Went Wrong", "error"));
        }
      },
      prefill: {
        name: values.customerName,
        email: values.email,
        phone_number: values.mobile,
      },
      theme: {
        color: "#c69200",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // }
  }

  ///----------uncomment all

  //Total Information

  const columns = [{ field: "total", headerName: "TOTAL", width: 130 }];

  const rows = [
    { id: 1, name: "Promo & Discount" },
    { id: 2, lastName: "Lannister", firstName: "Cersei" },
    { id: 3, lastName: "Lannister", firstName: "Jaime" },
    { id: 4, lastName: "Stark", firstName: "Arya" },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys" },
  ];

  const successGrid = (
    <Grid
      container
      spacing={3}
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <Button
            disableRipple
            className={classes.logoContainer}
            component={Link}
            href="/"
          >
            <img
              src="/images/order/confirmation.png"
              className={classes.orderImg}
              alt="payment"
            ></img>
          </Button>

          <Divider />

          <Grid item>
            <Typography variant="button">
              {" "}
              <b>Thank you.</b>
            </Typography>
          </Grid>
          <Typography className={classes.order}>
            {" "}
            Your order has been received successfully
          </Typography>
          <div
            style={{
              borderTop: "3px solid #fec20e ",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></div>
          <Grid item>
            <p>
              Your{" "}
              <Typography variant="button">
                {" "}
                order no. #{values.orderNumber}{" "}
              </Typography>{" "}
              is currently being processed. You will receive an order
              confirmation email shortly with the order details.
            </p>
            <p>
              <Typography variant="button"> NOTE. </Typography> if there was any
              payment issues, we will revert back accordingly.
            </p>
          </Grid>

          <Grid item>
            <Divider />
            <Link href="/orders">
              <Box
                display="flex"
                style={{ justifyContent: "center" }}
                p={2}
                bgcolor="primary.main"
              >
                <Typography variant="button">TRACK ORDER</Typography>
              </Box>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );

  const notSuccess = (
    <Grid
      container
      spacing={3}
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item xs={12} md={6} sm={7}>
        <Paper className={classes.paper}>
          <Box
            p={2}
            m={2}
            boxShadow={2}
            bgcolor="background.paper"
            style={{ marginTop: 10 }}
          >
            <Typography className={classes.header}>
              {" "}
              Your Order has been initiated.
            </Typography>

            <div className={classes.spaceTypo}>
              <Typography variant="h3">Delivery date: &nbsp;</Typography>
              <Typography variant="h4">{values.deliveryDate}</Typography>
            </div>
          </Box>
          <Divider />
          <Box
            p={2}
            m={2}
            boxShadow={2}
            bgcolor="background.paper"
            style={{ marginTop: 10 }}
          >
            <Typography className={classes.header}>Delivery Address</Typography>
            <div className={classes.spaceTypo}>
              <RadioButtonCheckedIcon />{" "}
              {firebase.profile && firebase.profile.address}
            </div>
          </Box>

          <Divider />
          <Box
            p={2}
            m={2}
            boxShadow={2}
            bgcolor="background.paper"
            style={{ marginTop: 10 }}
          >
            <Typography className={classes.header}>Contact Details</Typography>
            {firebase.profile.displayName && firebase.profile.displayName ? (
              <div className={classes.spaceTypo}>
                <Typography variant="h3">Name </Typography>{" "}
                <Typography variant="h3">
                  {firebase.profile.displayName && firebase.profile.displayName}{" "}
                </Typography>
              </div>
            ) : null}

            {firebase.profile.email && firebase.profile.email ? (
              <div className={classes.spaceTypo}>
                <Typography variant="h3">Email </Typography>{" "}
                <Typography variant="h3">
                  {firebase.profile.email && firebase.profile.email}{" "}
                </Typography>
              </div>
            ) : null}
            <div className={classes.spaceTypo}>
              <Typography variant="h3">Contact </Typography>{" "}
              <Typography variant="h3">
                {firebase.profile && firebase.profile.mobile}
              </Typography>
            </div>
          </Box>

          <Box
            p={2}
            m={2}
            boxShadow={2}
            bgcolor="background.paper"
            style={{ marginTop: 10 }}
          >
            <Typography className={classes.header}>Temporary Order</Typography>

            <Typography variant="h2">
              {" "}
              #Order &nbsp; {values.orderNumber}{" "}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={7}>
        <Paper className={classes.paper}>
          {loading ? (
            <div className={classes.spaceTypo}>
              <Button variant="contained" color="secondary" disabled>
                WAIT &nbsp;
                <CircularProgress />{" "}
              </Button>
              <Button variant="outlined" onClick={() => setActiveStep(2)}>
                <Cart />
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => razopPayment()}
            >
              PROCEED TO PAYMENT
            </Button>
          )}
        </Paper>
      </Grid>
      <MuiSnackbar />
    </Grid>
  );

  return <>{success ? <> {successGrid}</> : <>{notSuccess}</>}</>;
};

export default withStyles(useStyles, { withTheme: true })(OrderPlaced);
