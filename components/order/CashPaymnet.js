import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import MuiSnackbar from "../snackbar/MuiSnackbar";
import { Grid, Typography, Box, Divider, Paper } from "@material-ui/core";
import Link from "../Link";
import { useRouter } from "next/router";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  grid: {
    maxWidth: 400,
    minWidth: 350,
    [theme.breakpoints.down("md")]: {
      maxWidth: 290,
      minWidth: 280,
    },
    marginTop: 30,
    margin: 4,
  },
  paper: {
    padding: theme.spacing(2),
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
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    padding: theme.spacing(1),
  },
});

const CashPaymnet = (props) => {
  const { classes } = props;
  const { values } = props;

  return (
    <>
      <Grid container spacing={3} justify="center" className={classes.root}>
        <Paper className={classes.paper}>
          <Grid item xs={12} className={classes.grid}>
            <div className={classes.details}>
              <Typography variant="h3"> Pay in Cash</Typography>
              <Divider />

              <div className={classes.spaceTypo}>
                <Typography>Order Number</Typography>
                <Typography variant="button"> {values.orderNumber}</Typography>
              </div>
              <div className={classes.spaceTypo}>
                <Typography>Total Pay</Typography>
                <Typography variant="button">
                  {" "}
                  {"\u20B9 " + values.grandTotal}
                </Typography>
              </div>
              <Divider />
              <div className={classes.spaceTypo}>
                <Typography>Call Us</Typography>
                <Typography variant="button">
                  {" "}
                  {process.env.REACT_APP_CONTACT}
                </Typography>
              </div>
              <div className={classes.spaceTypo}>
                <Typography>Bank Name</Typography>
                <Typography variant="button">
                  {" "}
                  {process.env.REACT_APP_BANK}
                </Typography>
              </div>
              <div className={classes.spaceTypo}>
                <Typography>#Account Number</Typography>
                <Typography variant="button">
                  {" "}
                  {process.env.REACT_APP_ACCOUNT}
                </Typography>
              </div>
              <div className={classes.spaceTypo}>
                <Typography>IFSC</Typography>
                <Typography variant="button">
                  {process.env.REACT_APP_IFSC}
                </Typography>
              </div>
            </div>

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
            <MuiSnackbar />
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default withStyles(useStyles, { withTheme: true })(CashPaymnet);
