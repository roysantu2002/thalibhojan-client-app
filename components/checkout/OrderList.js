import React, { useState, useEffect } from "react";
import Table from "../layout/Table";
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";
import { roundTo2DecimalPoint } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Link from "../Link";

const useStyles = makeStyles({
  // table: {
  //   maxWidth: 100,
  // },
  rcorners1: {
    borderRadius: "2px",
  },
});

export default function OrderList(props) {
  const { addedItems } = props;

  console.log(addedItems);

  let gTotal = addedItems.reduce((tempTotal, item) => {
    return tempTotal + item.quantity * item.price;
  }, 0);

  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.rcorners1}>
      <Box display="flex" style={{justifyContent:"center"}}>
        <Typography variant="h4">Total Thalis {addedItems.length}</Typography>|
        <Typography variant="h4">
          Grant Total {"\u20B9 " + roundTo2DecimalPoint(gTotal)}
        </Typography>
      </Box>
      <Box display="flex" style={{justifyContent:"center"}} bgcolor="primary.main">
        <Link href="/checkout">
          {" "}
          <Typography variant="button">checkout</Typography>
        </Link>
      </Box>
    </TableContainer>
  );
}
