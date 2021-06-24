import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Cart() {
  const classes = useStyles();
  let addedItems = useSelector((state) => state.storeItems.addedItems);
  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        <Badge
          color="secondary"
          badgeContent={
            addedItems && addedItems.length ? addedItems.length : "0"
          }
        >
          <ShoppingCartIcon color="secondary" />{" "}
        </Badge>
      </Fab>
    </div>
  );
}
