/* eslint-disable no-lone-blocks */
import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { roundTo2DecimalPoint } from "../../utils/helpers";
import {
  Box,
  Typography,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },

  cart: {
    height: 35,
    width: 35,
    margin: theme.spacing(1),
    color: theme.palette.secondary.dark,
  },

  fab: {
    right: "20%",
    left: "20%",
    [theme.breakpoints.down("md")]: {
      fontSize: "1em",

      right: "5%",
      left: "5%",
    },
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    bottom: "10px",
    padding: "5px",
    zIndex: 9999,
    backgroundColor: "#ffffff",
  },

  submitButtonGroup: {
    textTransform: "uppercase",
    color: "#ffffff",
    fontSize: "1em",
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2),
    backgroundColor: "#ffffff",
    right: "20%",
    left: "20%",
    [theme.breakpoints.down("md")]: {
      fontSize: "1em",
      right: "2%",
      left: "2%",
    },
    position: "fixed",
    bottom: "10px",

    zIndex: 9999,
  },
}));

export default function Float(props) {
  const { orderDetails, handleNext, gTotal } = props;
  const classes = useStyles();

  const oneButton = (
    <section className={classes.root}>
      <Container className={classes.container} spacing={1}>
        {/* <Box className={classes.fab}> */}
        <div className={classes.spaceTypo}>
          <Button
            onClick={handleNext}
            size="large"
            variant="contained"
            color="secondary"
          >
            PROCEED
          </Button>

          <Box>
            <Badge
              color="secondary"
              badgeContent={
                orderDetails && orderDetails.length ? orderDetails.length : "0"
              }
            >
              <ShoppingCartIcon className={classes.cart} />
            </Badge>
          </Box>

          <Box m={1}>
            <Typography color="secondary" variant="h2" style={{ textDecoration: 'underline' }}>
              &nbsp; {"\u20B9 " + gTotal}
            </Typography>
          </Box>
        </div>
        {/* </Box> */}
      </Container>
    </section>
  );

  const twoButton = (
    <section className={classes.root}>
      <Container className={classes.container} spacing={1}>
        <Box className={classes.fab}>
          <Button
            size="large"
            variant="outlined"
            className={classes.submitButtonGroup}
          >
            Add More Items ...
          </Button>
        </Box>
      </Container>
    </section>
  );

  return orderDetails &&
    (orderDetails.length >= process.env.REACT_APP_ORDER_QTY ||
      roundTo2DecimalPoint(gTotal) >= process.env.REACT_APP_ORDER_AMT)
    ? oneButton
    : twoButton;
}
