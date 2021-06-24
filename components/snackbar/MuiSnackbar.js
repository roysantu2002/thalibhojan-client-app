import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { clearSnackbar } from "../../store/actions/snackbarActions";
import { Icon } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  content: {
    flexWrap: "inherit",
    [theme.breakpoints.up("md")]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
  },
  contentMessage: {
    fontFamily: "Muli",
    fontSize: "1.5rem",
    display: "flex",
    alignitems: "center",
  },
  contentAction: {
    paddingLeft: theme.spacing(2),
  },
  info: {
    flexShrink: 0,
    marginRight: theme.spacing(2),
  },
  close: {
    padding: theme.spacing(1),
  },
});

function MuiSnackbar(props) {
  const dispatch = useDispatch();
  const { classes, message, color, setOpen, open, ...other } = props;

  // const color="#c99043"
  const { successSnackbarMessage, successSnackbarOpen, severity } = useSelector(
    state => state.ui
  );

  console.log(severity)

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      open={successSnackbarOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
    <Alert onClose={handleClose} severity={severity}>
        {successSnackbarMessage}
      </Alert>
    </Snackbar>
  );
}

Snackbar.propTypes = {
  // classes: PropTypes.object.isRequired,
  SnackbarContentProps: PropTypes.object,
};

export default withStyles(styles)(MuiSnackbar);
