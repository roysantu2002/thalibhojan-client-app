import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  ...theme.spreadThis,
}));

export default function SimpleExpansionPanel(props) {
  const classes = useStyles();
  let items;
  let totalPrice = 0;

  const {order, handlePayment} = props;
  if (props.condition === "Orders") {
    items = props.items;
    items.forEach((item) => {
      // console.log(item)
      totalPrice = totalPrice + item.quantity * item.price;
    });
  }

  if (props.condition === "Payments") {
  }



  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.backgroundColorChange}
        >
          <Typography className={classes.heading}>
            {props.condition === "Orders" && "Order Summary"}
          </Typography>

          <Typography className={classes.heading}>
            {props.condition === "Payments" && "Capture Payment"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
          {props.condition === "Orders" && (
            <>
              {items.map((item) => {
                return (
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    key={item._id}
                  >
                    <div className={classes.spaceTypo}>
                      <span>{item.title}</span>
                      <span>
                        {"\u20B9 "}
                        {item.price} x {item.quantity}
                      </span>
                    </div>
                    <br />
                  </Typography>
                );
              })}
              <Typography variant="h5" className={classes.heading}>
                Total Amount - {totalPrice}
              </Typography>
            </>
          )}

          {props.condition === "Payments" && (
            <>
            {/* <Typography>{orderNumber}</Typography> */}
              <Button name="received" onClick={(e)=> handlePayment(order, "received")}>Received</Button>
              <Button color="secondary" onClick={(e)=> handlePayment(order, "not paid")} variant="outlined">
                Not Received
              </Button>
              <Button onClick={(e)=> handlePayment(order, "failed")}>Failed</Button>
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
