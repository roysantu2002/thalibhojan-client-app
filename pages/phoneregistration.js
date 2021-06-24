import { Box, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "next/router";
import React, { Component } from "react";
// import { signIn } from "../src/store/actions/authActions";
import { connect } from "react-redux";
import Logo from "../components/logo/Logo";
import theme from "../constants/theme";
import { DESTROY_SESSION } from "../store/actions/action-types/action-names";
import { signUp } from "../store/actions/authActions";
import { serverStatus } from "../store/actions/orderActions";
import { showSuccessSnackbar } from "../store/actions/snackbarActions";
import { addUser } from "../store/actions/userActions";
import useStyles from "../styles/signin";
import { firebase } from "../utils/firebase";
import { generateCustomerId } from "../utils/helpers";

const WRONG_CREDENTIALS = "auth/wrong-password";
const NOT_FOUND = "auth/user-not-found";
const LOGIN_BLOCKED = "auth/too-many-requests";

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
    };

    // props.auth.uid ? Router.push("/")
    //   : (this.state = { hideContent: false });
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     isLoaded(this.props.auth) && !isEmpty(this.props.auth)
  //       ? Router.push("/")
  //       : (this.State = { hideContent: false });
  //   }

  /* Basic validation on form */
  validateForm = () => {
    const phoneError = this.state.phoneError;

    if (phoneError === "") {
      return true;
    } else {
      return false;
    }
  };

  /* Enable typing in text boxes */
  handleChange = (event) => {
    console.log(event.target.name);
    let valid;
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
          //   this.validateForm()
          //     ? this.setState({ buttonState: true })
          //     : this.setState({ buttonState: false });
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
          //   this.handleSubmit();
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
    this.setUpRecaptcha();
    let phoneNumber = "+91" + this.state.phone;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
      })
      .then(() => {
        this.setState({ isOtpVisible: true });
        // const fname = this.state.phone;
        // const lname = this.state.phone;
        // const fl = fname.charAt(0) + lname.charAt(0);
        // const custId = generateCustomerId(fl);
        // const userStatus = {
        //   email: this.state.phone,
        //   password: this.state.password,
        //   custid: custId,
        //   fname: fname,
        //   lname: lname,
        //   phone: this.state.phone,
        // };
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onSubmitOtp = (e) => {
    this.props.showSuccessSnackbar("Welcome");
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then((result) => {
        console.log(result.user.uid);
        const uid = result.user.uid.toString();
        const user = {
          uid: uid,
          custid: generateCustomerId("PH"),
          email: "",
          fname: "PH",
          lname: "PH",
          address: "",
          admin: false,
          role: "ROLE_USER",
          phone: this.state.phone,
          pic: "",
          pin: "",
        };
        console.log(user);
        this.props.addUser(user, uid);
        setTimeout(() => {
          this.props.clear();
        }, 3000);
      })
      .catch((error) => {
        // this.props.showSuccessSnackbar(error);
        //   this.setState({IsOtpError: error})
        //   this.setState({infoMessage: error})
        console.log(error);
        // alert("Incorrect OTP");
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

    return (
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
                  color="primary"
                  variant="h3"
                  gutterBottom
                  align="center"
                >
                  Phone Registration
                </Typography>
              </Box>

              {this.state.isOtpVisible ? (
                <form
                  className={classes.form}
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        width: "100%",
                        marginTop: 10,
                        marginRight: 10,
                      }}
                      required
                      value={this.state.otp || ""}
                      name="otp"
                      label="OTP"
                      type="phone"
                      id="otp"
                      error={
                        this.state.IsOtpError && this.state.IsOtpError !== 0
                      }
                      helperText={this.state.IsOtpError}
                      onChange={this.handleChange}
                    />
                    <div className={classes.buttonGroup}>
                      <Button
                        id="sign-up-button"
                        variant="contained"
                        color="primary"
                        className={classes.custombutton}
                        onClick={this.onSubmitOtp}
                      >
                        CONFORM OTP
                      </Button>
                    </div>
                  </Grid>
                </form>
              ) : (
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
                      error={
                        this.state.phoneError && this.state.phoneError !== 0
                      }
                      helperText={this.state.phoneError}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Box
                    display="flex"
                    style={{ justifyContent: "center" }}
                    marginTop={4}
                  >
                    <Button
                      id="sign-up-button"
                      variant="contained"
                      color="primary"
                      className={classes.custombutton}
                      onClick={this.handleSubmit}
                    >
                      SIGN UP
                    </Button>
                  </Box>
                  {this.state.infoMessage}
                </form>
              )}

              <Grid item xs={12}>
                <div display="flex" justifyContent="space-between">
                  <Link href="/register">
                    <Typography variant="h4" color={theme.palette.primary.main}>
                      {" "}
                      Already registered?
                    </Typography>
                  </Link>
                </div>
              </Grid>
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
    loading: state.ui.loading,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (user, uid) => dispatch(addUser(user, uid)),
  signUp: (userCred) => dispatch(signUp(userCred)),
  clear: () => dispatch({ type: DESTROY_SESSION }),
  serverStatus: () => dispatch(serverStatus),
  showSuccessSnackbar: (msg) => dispatch(showSuccessSnackbar(msg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(withRouter(MobileRegistration)));

// withStyles(useStyles, { withTheme: true })(MobileRegistration);
