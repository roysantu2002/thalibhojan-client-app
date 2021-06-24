import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  ORDER_PLACED,
  ORDER_ACCEPTED,
  ORDER_CANCELLED,
  ORDER_OUT_FOR_DELIVERY,
} from "../../constants/constant";
import { VscSmiley } from "react-icons/vsc";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  spaceTypo: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

const OrderDetails = (props) => {
  const classes = useStyles();
  const { orders } = props;

  const placedCount = () => {
    let placedCount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status.toString().toLowerCase() === ORDER_PLACED)
        placedCount++;
    }
    return placedCount;
  };

  const acceptedCount = () => {
    let acceptedCount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status.toString().toLowerCase() === ORDER_ACCEPTED)
        acceptedCount++;
    }
    return acceptedCount;
  };
  const cancelledCount = () => {
    let cancelledCount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status.toString().toLowerCase() === ORDER_CANCELLED)
        cancelledCount++;
    }
    return cancelledCount;
  };

  const otForDeliveryCount = () => {
    let otForDeliveryCount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status.toString().toLowerCase() === ORDER_OUT_FOR_DELIVERY)
        otForDeliveryCount++;
    }
    return otForDeliveryCount;
  };

  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        style={{
          padding: 10,
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {orders && orders.length ? (
          <>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography component="div" variant="body1">
                  <Box bgcolor="primary.main" p={2} border={2}>
                    <Typography variant="h2" color="secondary.main">
                      Today's Order{" "}
                    </Typography>

                    <Typography variant="h2" color="secondary.main">
                      [{orders.length}]
                    </Typography>
                  </Box>

                  <Box p={1}></Box>

                  <Box bgcolor="success.main" p={2} border={2}>
                    <Typography variant="h2" color="secondary.main">
                      {ORDER_PLACED.toUpperCase()}{" "}
                    </Typography>

                    <Typography variant="h2" color="secondary.main">
                      [{placedCount()}]
                    </Typography>
                  </Box>
                </Typography>
              </Paper>
            </Grid>

            {/* Accepted and Cancelled */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography component="div" variant="body1">
                  <Box bgcolor="primary.main" p={2} border={2}>
                    <Typography variant="h2" color="secondary.main">
                      {ORDER_ACCEPTED.toUpperCase()}{" "}
                    </Typography>

                    <Typography variant="h2" color="secondary.main">
                      [{acceptedCount()}]
                    </Typography>
                  </Box>

                  <Box p={1}></Box>

                  <Box bgcolor="error.main" p={2} border={2}>
                    <Typography variant="button" style={{ color: "#ffffff" }}>
                      {ORDER_CANCELLED}
                    </Typography>

                    <Typography variant="h2" style={{ color: "#ffffff" }}>
                      [{cancelledCount()}]
                    </Typography>
                  </Box>
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={7}>
              <Paper className={classes.paper}>
                <Typography component="div" variant="body1">
                  <Box
                    bgcolor="primary.light"
                    p={2}
                    alignItems="stretch"
                    border={2}
                  >
                    <Typography variant="h2" color="secondary.main">
                      {ORDER_OUT_FOR_DELIVERY.toUpperCase()}{" "}
                    </Typography>
                  </Box>

                  <Box
                    bgcolor="primary.main"
                    p={2}
                    alignItems="stretch"
                    border={2}
                  >
                    <Typography variant="h2" color="secondary.main">
                      [{otForDeliveryCount()}]
                    </Typography>
                  </Box>
                </Typography>
              </Paper>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <VscSmiley size="50px" color="primary" />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
