import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Box, Typography } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import makeStyles from "@material-ui/core/styles/makeStyles";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import SummaryExpansion from "./FilterExpansion";
import { ButtonGroup } from "@material-ui/core";
import { changeOrderStatus, changePaymentStatus } from "../../store/actions/orderActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "20px 0px 10px 260px",
    display: "inline-block",
    marginRight: "40%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  buttonCancel: {
    backgroundColor: "#cf0700",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      backgroundColor: "#5a5c5a",
      color: "white",
    },
  },
  buttonAccept: {
    backgroundColor: "#118a27",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

const OrderCard = (props) => {
  const { order, role, auth, clickedButtonHandler } = props;

  const classes = useStyles();
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();

  const handleCancel = () => {
    const body = {
      status: "Cancelled",
    };
    dispatch(changeOrderStatus(auth.uid, order._id, body));
    // clickedButtonHandler("all");
  };

  const handleAccept = () => {
    const body = {
      status: "Accepted",
    };
    dispatch(changeOrderStatus(auth.uid, order._id, body));
    // clickedButtonHandler("all");
  };

  const handleDelivery = () => {
    const body = {
      status: "Out For Delivery",
    };
    dispatch(changeOrderStatus(auth.uid, order._id, body));
    // clickedButtonHandler("all");
  };

  const handleCompleted = () => {
    const body = {
      status: "Completed",
    };
    dispatch(changeOrderStatus(auth.uid, order._id, body));
    // clickedButtonHandler("all");
  };

  const handlePayment = (order, status) => {
    console.log(order)
    const body = {
      updatedBy: auth.uid,
      customerId: order.user.customerId,
      orderNumber: order.orderNumber,
      orderStatus: order.status,
      status: status,
      paymentId: "Cash",
      paymentMethod: "Cash",
    };
    console.log(body)
    dispatch(changePaymentStatus(auth.uid, order.orderNumber, body));
    // // clickedButtonHandler("all");
  };

  return (
    <Paper
      style={{
        backgroundColor: "#faf7f7",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        margin: 10
      }}
      elevation={4}
    >
      <div style={{ marginLeft: 20 }}>
        <Typography gutterBottom variant="h3" >
          OrderId - #{order.orderNumber}
        </Typography>
        <Typography gutterBottom variant="h4" >
          {`Ordered By - ${order.user.customerId}, +91 ${order.user.mobile}`}
        </Typography>

        <div style={{ margin: "10px 20px 10px 0px" }}>
          <SummaryExpansion condition="Orders" items={order.orderDetails} />
        </div>
        <Typography gutterBottom variant="body1">
          Ordered - {dayjs(order.createdAt).fromNow()}
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FiberManualRecordIcon
            disabled
            className={
              order.status === "Cancelled" ? classes.red : classes.green
            }
          />
          <Typography gutterBottom>
            Order {order.status}
          </Typography>
        </div>

        <div
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            justify: "center",
          }}
        >
          {role === "ROLE_USER" && order.status === "Placed" && (
            <Button
              className={classes.buttonCancel}
              onClick={handleCancel}
              disabled={order.status !== "Placed"}
            >
              Cancel Order
            </Button>
          )}
          {role === "ROLE_SELLER" && order.status === "Placed" && (
            <>
              <div style={{ display: "inline-block" }}>
                {order.pMethod === "Cash" && (
                  <div style={{ margin: "10px 20px 10px 0px" }}>
                    <SummaryExpansion
                      condition="Payments"
                      order={order}
                      handlePayment={handlePayment}
                    />
                  </div>
                )}

                <Button className={classes.buttonCancel} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className={classes.buttonAccept} onClick={handleAccept}>
                  Accept
                </Button>
              </div>
            </>
          )}

          {role === "ROLE_SELLER" && order.status === "Accepted" && (
            <Button className={classes.buttonAccept} onClick={handleDelivery}>
              Out For Delivery
            </Button>
          )}
          {role === "ROLE_SELLER" && order.status === "Out For Delivery" && (
            <Button className={classes.buttonAccept} onClick={handleCompleted}>
              Order Completed
            </Button>
          )}
        </div>
        <br />
      </div>
    </Paper>
  );
};

export default OrderCard;
