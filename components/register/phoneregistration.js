import { Box, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Router, { withRouter } from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import theme from "../../constants/theme";
import { DESTROY_SESSION } from "../../store/actions/action-types/action-names";
import { signUp } from "../../store/actions/authActions";
import { serverStatus } from "../../store/actions/orderActions";
import { showSuccessSnackbar } from "../../store/actions/snackbarActions";
import { addUser } from "../../store/actions/userActions";
import useStyles from "../../styles/signin";
import { firebase } from "../../utils/firebase";
import { generateCustomerId } from "../../utils/helpers";
import Logo from "../logo/Logo";

class MobileRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      phoneError: "",
      otp: "",
      isOtpVisible: false,
      IsOtpError: false,
      otpConfirmation: null,
      infoMessage: "",
      buttonState: true,
      submitButton: true,
      loading: false,
    };
  }

  /* Basic validation on form */
  validateForm = () => {
    const phoneError = this.state.phoneError;

    // if (this.state.phone.length !== 10) {
    //   this.setState({ phoneError: "Please validate phone number" });
    // }

    if (phoneError === "") {
      return true;
    } else {
      return false;
    }
  };

  /* Enable typing in text boxes */
  handleChange = (event) => {
    let valid;
    if (event.target.name === "otp") {
      const re = /^[0-9\b]+$/;
      if (re.test(event.target.value) && event.target.value.length === 6) {
        this.setState({ buttonState: false });
      } else {
        this.setState({ buttonState: true });
      }
    }

    if (event.target.name === "phone") {
      const re = /^[0-9\b]+$/;
      if (re.test(event.target.value) && event.target.value.length === 10) {
        this.setState({ submitButton: false });
      } else {
        this.setState({ submitButton: true });
      }
    }
    this.setState({
      [event.target.name]: event.target.value,
    });

    switch (event.target.name) {
      case "phone":
        function uniqueDigit(str) {
          var a = 0;
          for (var i = 0; i < 10; i++) {
            new RegExp(i, "g").test(str) && a++;
          }
          return a;
        }
        valid = /^[3-9]\d\d*$/.test(event.target.value);

        // console.log(validOne);
        if (!event.target.value) {
          this.setState({ otp: "Otp cannot be empty" });
          this.setState({ buttonState: true });
        }
        if (!event.target.value) {
          this.setState({ phoneError: "Phone cannot be empty" });
        }
        if (
          event.target.value.length !== 10 ||
          !valid ||
          uniqueDigit(event.target.value) < 4
        ) {
          this.setState({ phoneError: "Invalid mobile number !!" });
        } else {
          this.setState({
            phoneError: "",
          });
          this.validateForm()
            ? this.setState({ submitButton: false })
            : this.setState({ buttonState: true });
        }
        break;

      default:
        break;
    }
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  /* Handle Sign Up form submit */
  handleSubmit = (event) => {
    event.preventDefault();
    this.setUpRecaptcha();
    const phoneError = this.state.phoneError;
    if (phoneError !== "") {
      return false;
    }
    const isValid = this.validateForm();
    if (isValid) {
      this.setState({
        phoneError: "",
      });
      this.handleSignUp(this);
    }
  };

  /* Generate and solve invisible recaptcha and send OTP to phone number*/
  handleSignUp = async () => {
    this.setState({ loading: true });
    this.setUpRecaptcha();
    // var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    let phoneNumber = "+91" + this.state.phone;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        this.props.showSuccessSnackbar("OTP Sent", "success");
        this.setState({ isOtpVisible: true });
        this.setState({ loading: false });
      })

      .catch((error) => {
        this.setState({ loading: false });
        this.setState({ isOtpVisible: false });
        this.props.showSuccessSnackbar("Please try again later", "error");
      });
  };

  onSubmitOtp = (e) => {
    // this.props.showSuccessSnackbar("Welcome", "error");
    this.setState({ loading: true });
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    console.log(optConfirm);
    optConfirm
      .confirm(otpInput)
      .then((result) => {
        console.log(result.user.uid);
        const uid = result.user.uid.toString();
        const user = {
          uid: uid,
          custid: generateCustomerId("PH"),
          email: "",
          fname: "Guest",
          lname: "Guest",
          address: "",
          admin: false,
          role: "ROLE_USER",
          phone: this.state.phone,
          pic: "",
          pin: "",
        };
        this.setState({ loading: false });
        this.props.addUser(user, uid);
        setTimeout(() => {
          this.props.clear();
        }, 3000);
        Router.push("/");
      })
      .catch((error) => {
        this.props.showSuccessSnackbar("Try again later!", "error");
        this.setState({ loading: false });
      });
  };

  /* Handle OTP input */
  handleOtpChange = (otpValue) => this.setState({ otpValue });

  render() {
    const { classes, signupError, isAuthenticated, loading } = this.props;

    const buttonContents = (
      <React.Fragment>
        Sign Up
        <img
          src="/images/send.svg"
          alt="paper airplane"
          style={{ marginLeft: "1em" }}
        />
      </React.Fragment>
    );

    return this.state.isOtpVisible ? (
      <Container component="main" style={{ justifyContent: "center" }}>
        <Grid container spacing={2} justify="center" className={classes.root}>
          <Grid
            item
            xs={12}
            md={7}
            style={{
              borderRadius: 2,
              margin: 8,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Paper className={classes.paper} elevation={2}>
              <form
                className={classes.form}
                onSubmit={this.handleSubmit}
                noValidate
              >
                <Box
                  style={{
                    width: "90%",
                    margin: "auto",
                  }}
                >
                  <TextField
                    style={{
                      width: "100%",
                      margin: "auto",
                      justifyContent: "center",
                    }}
                    inputProps={{
                      maxLength: 6,
                    }}
                    required
                    value={this.state.otp || ""}
                    name="otp"
                    label="OTP"
                    type="phone"
                    id="otp"
                    error={this.state.IsOtpError && this.state.IsOtpError !== 0}
                    helperText={this.state.IsOtpError}
                    onChange={this.handleChange}
                  />
                </Box>

                <div className={classes.buttonGroup}>
                  <Button
                    size="large"
                    id="sign-up-button"
                    variant="contained"
                    color="primary"
                    className={classes.custombutton}
                    onClick={this.onSubmitOtp}
                    disabled={this.state.buttonState}
                  >
                    <Typography variant="h4">CONFORM OTP</Typography>
                    {this.state.loading ? (
                      <CircularProgress color="secondary" size={40} />
                    ) : null}
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    ) : (
      <Container component="main" style={{ justifyContent: "center" }}>
        <CssBaseline />
        <Grid container spacing={2} justify="center" className={classes.root}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            md={7}
            style={{
              borderRadius: 2,
              margin: 8,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Paper className={classes.paper} elevation={2}>
              <Box letterSpacing={2}>
                <Logo />
                <Typography
                  color="secondary.dark"
                  variant="h3"
                  gutterBottom
                  align="center"
                >
                  Phone Registration
                </Typography>
              </Box>

              <form
                className={classes.form}
                onSubmit={this.handleSubmit}
                noValidate
              >
                <div id="recaptcha-container"></div>

                <Grid item xs={12}>
                  <TextField
                    style={{
                      width: "100%",
                      marginTop: 10,
                      marginRight: 10,
                    }}
                    required
                    value={this.state.phone || ""}
                    name="phone"
                    label="Mobile number"
                    type="phone"
                    id="phone"
                    error={this.state.phoneError && this.state.phoneError !== 0}
                    helperText={this.state.phoneError}
                    onChange={this.handleChange}
                  />
                </Grid>

                <Box component="span" m={1} p={2}></Box>

                <Box
                  display="flex"
                  style={{ justifyContent: "center" }}
                  marginTop={4}
                >
                  <Button
                    size="large"
                    id="sign-up-button"
                    variant="contained"
                    className={classes.custombutton}
                    onClick={this.handleSubmit}
                    disabled={this.state.submitButton}
                  >
                    <Typography variant="h4">SIGN UP</Typography>
                    {this.state.loading ? (
                      <CircularProgress color="secondary" size={40} />
                    ) : null}
                  </Button>
                </Box>
                {this.state.infoMessage}
                <Grid item xs={12}>
                  <div display="flex" justifyContent="space-between">
                    <Link href="/register">
                      <Typography
                        variant="h4"
                        color={theme.palette.primary.main}
                      >
                        {" "}
                        Already registered?
                      </Typography>
                    </Link>
                  </div>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

MobileRegistration.propTypes = {};

const mapStateToProps = (state) => {
  return {
    signupError: state.auth.signupError,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (user, uid) => dispatch(addUser(user, uid)),
  signUp: (userCred) => dispatch(signUp(userCred)),
  clear: () => dispatch({ type: DESTROY_SESSION }),
  serverStatus: () => dispatch(serverStatus),
  showSuccessSnackbar: (msg, error) =>
    dispatch(showSuccessSnackbar(msg, error)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(withRouter(MobileRegistration)));

// withStyles(useStyles, { withTheme: true })(MobileRegistration);
