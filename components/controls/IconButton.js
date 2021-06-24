import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
    },
  },
  customButton: {
    color: "white",
    marginTop: theme.spacing(4),
    // minHeight: "50px",
    borderRadius: 0,
    // padding: "8px 16px",
    textTransform: "none",
  },
}));

export default function IconButton(props) {
  const { children, color, variant, onClick, className, startIcon, ...other } =
    props;
  const classes = useStyles();

  return (
    <MuiButton
      className={classes.customButton + " " + (className || "")}
      variant={variant || "contained"}
      color={color || "default"}
      startIcon={startIcon}
      onClick={onClick}
      {...other}
    >
      {children}
    </MuiButton>
  );
}
