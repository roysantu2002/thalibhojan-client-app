import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import React, { useState } from "react";
import { FcFeedback } from "react-icons/fc";
// import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import api from "../api/api.js";
import { IconButton } from "../components/controls";
import Logo from "../components/logo/Logo";
import MuiSnackbar from "../components/snackbar/MuiSnackbar";
import theme from "../constants/theme";
import { useForm } from "../hooks/useForm";
import {
  clearSnackbar,
  showSuccessSnackbar,
} from "../store/actions/snackbarActions";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(6),
    marginBottom: 12,
    display: "flex",
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    padding: theme.spacing(8, 6),
    border: "4px solid #ED1C24",
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  // button: {
  //   width: "100%",
  // },
  imagesWrapper: {
    position: "relative",
  },
  imageDots: {
    position: "absolute",
    top: -40,
    left: -40,
    right: 0,
    bottom: 0,
    width: "100%",
    background: "url('/images/mobile/banner-01.png')",
  },
  image: {
    position: "absolute",
    top: "20%",
    left: -30,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: 500,
    maxHeight: 500,
    border: "4px solid #00AEEF",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",

    "& > *": {
      width: "100%", // Fix IE 11 issue.
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
    },
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
});

const initialFValues = () => ({
  full_name: "",
  email: "",
  mobile: "",
  order: "",
  address: "",
  feedback: "",
});

function Feedback(props) {
  const { classes } = props;

  const [buttonState, setbuttonState] = useState(true);
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("full_name" in fieldValues)
      temp.full_name =
        fieldValues.full_name.length > 6 ? "" : "Name is required.";

    if ("email" in fieldValues)
      temp.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid.";
    if ("feedback" in fieldValues)
      temp.feedback =
        fieldValues.feedback.length > 10 ? "" : "Please provide your feedback";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("order" in fieldValues)
      temp.order = fieldValues.order.length > 5 ? "" : "Order details !!!";
    if ("address" in fieldValues)
      temp.address =
        fieldValues.address.length > 20 ? "" : "Please provide your address";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, handleInputChange, errors, setErrors, resetForm } = useForm(
    initialFValues,
    true
  );

  /* Handle Sign Up form submit */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      api
        .thaliOrder()
        .createFeedback(values)
        .then((res) => {
          dispatch(showSuccessSnackbar("Thank you!", "success"));
          resetForm();
          // setbuttonState(true);
          setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
          Router.push("/");
        })
        .catch((e) => {
          dispatch(showSuccessSnackbar("Something Went Wrong", e));
          resetForm();
          // setbuttonState(true);
          setTimeout(() => {
            dispatch(clearSnackbar());
          }, 3000);
          Router.push("/");
        });
    }
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        style={{ justifyContent: "center" }}
      >
        <Grid container spacing={2} justify="center" className={classes.root}>
          <Grid item md={5} className={classes.imagesWrapper}>
            <Hidden smDown>
              <img
                src="/images/main-banner.png"
                alt="call to action"
                className={classes.image}
              />
            </Hidden>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              borderRadius: 2,
              margin: theme.spacing(3),
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Paper className={classes.paper} elevation={2}>
              <Logo />
              <Typography variant="h3" gutterBottom>
                Can we help you?
              </Typography>
              <Typography variant="h4">
                Your Valued Feedback helps Us!
              </Typography>

              <form className={classes.form}>
                <TextField
                  required
                  name="full_name"
                  error={errors.full_name && errors.full_name.length !== 0}
                  helperText={errors.full_name}
                  value={values.full_name || ""}
                  label="Full Name"
                  inputProps={{
                    maxLength: 40,
                  }}
                  autoFocus
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  name="email"
                  error={errors.email && errors.email.length !== 0}
                  helperText={errors.email}
                  value={values.email || ""}
                  label="Email"
                  inputProps={{
                    maxLength: 40,
                  }}
                  autoFocus
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  value={values.mobile || ""}
                  name="mobile"
                  error={errors.mobile && errors.email.length !== 0}
                  helperText={errors.mobile}
                  label="Mobile number"
                  inputProps={{
                    maxLength: 10,
                  }}
                  type="mobile"
                  id="mobile"
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  label="Order Details"
                  inputProps={{
                    maxLength: 50,
                  }}
                  name="order"
                  error={errors.order && errors.order.length !== 0}
                  helperText={errors.order}
                  autoFocus
                  value={values.order || ""}
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  inputProps={{
                    maxLength: 60,
                  }}
                  name="address"
                  label="address"
                  error={errors.address && errors.address.length !== 0}
                  helperText={errors.address}
                  autoFocus
                  value={values.address || ""}
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  label="Feedback"
                  name="feedback"
                  inputProps={{
                    maxLength: 100,
                  }}
                  autoFocus
                  value={values.feedback || ""}
                  error={errors.feedback && errors.feedback.length !== 0}
                  helperText={errors.feedback}
                  onChange={handleInputChange}
                />

                <IconButton
                  onClick={(e) => handleSubmit(e)}
                  style={{
                    backgroundColor: theme.palette.secondary.main,
                    padding: theme.spacing(2),
                    margin: 0,
                  }}
                  startIcon={<FcFeedback />}
                >
                  SEND FEEDBACK
                </IconButton>

                {/* 
                <Button
                  type="submit"
                  id="sign-up-button"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  SEND FEEDBACK
                </Button> */}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <MuiSnackbar />
    </>
  );
}
export default withStyles(styles)(Feedback);
