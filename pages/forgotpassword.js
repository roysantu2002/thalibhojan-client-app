import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../components/logo/Logo";
import MuiSnackbar from "../components/snackbar/MuiSnackbar";
import theme from "../constants/theme";
import { useForm } from "../hooks/useForm";
import { resetPassword } from "../store/actions/authActions";
import {
  clearSnackbar,
  showSuccessSnackbar,
} from "../store/actions/snackbarActions";
import useStyles from "../styles/loginPage";

const getFreshModelObject = () => ({
  email: "",
});

function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [buttonState, setbuttonState] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  const { values, handleInputChange, errors, setErrors, resetForm } = useForm(
    getFreshModelObject,
    true
  );

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => ({
      showPasswordValue: !prevState.showPasswordValue,
    }));
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    console.log(fieldValues);
    if ("email" in fieldValues)
      temp.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");

    // if (temp.email === "") {
    //   setbuttonState(false);
    // } else {
    //   setbuttonState(true);
    // }
  };

  console.log(values);

  /* Handle Sign Up form submit */
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(validate());
    if (validate()) {
      dispatch(resetPassword(values.email));
      resetValidate();
    }
  };

  const resetError = useSelector((state) => state.auth.resetError);

  const resetValidate = () => {
    console.log(`reset password error ${resetError}`);

    if (resetError && resetError.length) {
      dispatch(showSuccessSnackbar(resetError));
      resetForm();
      setTimeout(() => {
        dispatch(clearSnackbar());
      }, 3000);
    } else {
      dispatch(showSuccessSnackbar("Please check your email!"));
      resetForm();
      setTimeout(() => {
        dispatch(clearSnackbar());
      }, 3000);
      Router.push("/");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ justifyContent: "center" }}
    >
      <CssBaseline />
      <Grid container spacing={2} justify="center" className={classes.root}>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            borderRadius: 2,
            margin: 4,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Paper className={classes.paper} elevation={2}>
            <Logo />

            <div
              className={classes.div}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "25px",
              }}
            >
              <Typography variant="h2" gutterBottom align="center">
                Reset password?
              </Typography>
            </div>
            {/* <ToastContainer position="top-center" autoClose={2000} /> */}
            <form className={classes.form} noValidate>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                error={errors.email && errors.email.length !== 0}
                helperText={errors.email}
                value={values.email || ""}
                autoFocus
                onChange={handleInputChange}
                InputProps={{
                  maxLength: 40,
                }}
              />
              <Box letterSpacing={2}>
                <Button
                  type="submit"
                  size="large"
                  className={classes.custombutton}
                  variant="contained"
                  // disabled={buttonState}
                  onClick={handleSubmit}
                >
                  Send reset link
                </Button>
              </Box>
            </form>
          </Paper>
          <MuiSnackbar transition="fade" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withStyles(useStyles, { withTheme: true })(ForgotPassword);
