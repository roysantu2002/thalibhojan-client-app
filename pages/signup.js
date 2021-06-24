import {
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
// import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Link from "../components/Link";
import Logo from "../components/logo/Logo";
import theme from "../constants/theme";
import { DESTROY_SESSION } from "../store/actions/action-types/action-names";
import { signUp } from "../store/actions/authActions";
import { serverStatus } from "../store/actions/orderActions";
import useStyles from "../styles/signin";
import { generateCustomerId } from "../utils/helpers";

const USER_TAKEN = "auth/email-already-in-use";

let selectedPicture;

const randomImage = () => {
  const images = [
    "images/8portion/8-portion-chicken.png",
    "images/8portion/8-portion-egg.png",
    "images/8portion/8-portion-fish.png",
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  selectedPicture = images[randomIndex];
};
randomImage();
const printErrorMessage = (error) => {
  console.log(error);
  switch (error.code) {
    case USER_TAKEN:
      return "User already exist";
    default:
      return "Something went wrong. Try again";
  }
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
  phoneError: "",
  infoMessage: "",
  loader: false,
  hideContent: true,
  alertMessage: "",
  createUserWithEmail: false,
  savetoDB: false,
  numInputs: 6,
  uid: "",
  buttonState: false,
  isLogginActive: true,
  showPasswordValue: true,
};

class signup extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.serverStatus();

    isLoaded(props.auth) && !isEmpty(props.auth)
      ? Router.push("/")
      : (this.state = { hideContent: false });
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   isLoaded(this.props.auth) && !isEmpty(this.props.auth)
  //     ? Router.push("/")
  //     : (this.State = { hideContent: false });
  // }

  /* Basic validation on form */
  validateForm = () => {
    const emailError = this.state.emailError;
    const passwordError = this.state.passwordError;

    if (emailError === "" && passwordError === "") {
      return true;
    } else {
      return false;
    }
  };

  /* Enable typing in text boxes */
  handleChange = (event) => {
    console.log(event.target.value);
    randomImage();
    let valid;
    let validfName, validlName;
    if (event.target.name !== "password") {
      this.setState({
        [event.target.name]: event.target.value.toLowerCase(),
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }

    switch (event.target.name) {
      case "firstName":
        validfName = /^[a-zA-Z]*$/.test(event.target.value);
        if (!validfName || event.target.value.length < 2) {
          this.setState({
            firstNameError: "First Name!!",
          });
        } else {
          this.setState({
            firstNameError: "",
          });
        }
        break;

      case "lastName":
        validlName = /^[a-zA-Z]*$/.test(event.target.value);
        if (!validlName || event.target.value.length < 2) {
          this.setState({
            lastNameError: "Last Name!!",
          });
        } else {
          this.setState({
            lastNameError: "",
          });
        }
        break;

      case "email":
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );
        if (!valid) {
          this.setState({
            emailError: "Invalid email",
          });
        } else {
          this.setState({
            emailError: "",
          });
        }
        break;
      case "password":
        valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(
          event.target.value
        );
        if (!valid) {
          this.setState({
            passwordError:
              "Password max 15, one uppercase, numeric and a special character",
          });
        } else {
          this.setState({
            passwordError: "",
          });
        }
        break;

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
          this.validateForm()
            ? this.setState({ buttonState: true })
            : this.setState({ buttonState: false });
        }

        break;
      default:
        break;
    }
  };

  handleClickShowPassword = () => {
    this.setState((prevState) => ({
      showPasswordValue: !prevState.showPasswordValue,
    }));
  };
  /* Handle Sign Up form submit */
  handleSubmit = (event) => {
    event.preventDefault();
    const phoneError = this.state.phoneError;
    if (phoneError !== "") {
      return false;
    }
    const isValid = this.validateForm();
    if (isValid) {
      this.setState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        phoneError: "",
      });
      this.handleSignUp(this);
    }
  };

  /* Generate and solve invisible recaptcha and send OTP to phone number*/
  handleSignUp = async () => {
    const fname = this.state.firstName;
    const lname = this.state.lastName;
    const fl = fname.charAt(0) + lname.charAt(0);
    const custId = generateCustomerId(fl);
    const userStatus = {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      custid: custId,
      fname: fname,
      lname: lname,
      phone: this.state.phone,
    };
    await this.props.signUp(userStatus);
  };

  /* Render sign up form */
  render() {
    console.log(this.props.auth);
    const { classes, signupError, isAuthenticated, loading } = this.props;
    let errorMessage = "";

    errorMessage = signupError ? printErrorMessage(signupError) : null;

    if (errorMessage) {
      toast.error(errorMessage);
      this.props.clear();
    }

    // console.log(this.props.state);

    // console.log(`cust id ${generateCustomerId("AB")}`);
    return (
      <Grid container spacing={2} justify="center" className={classes.root}>
        <Hidden mdDown>
          <Grid
            item
            xs={false}
            md={5}
            sm={false}
            style={{
              backgroundImage: `url(${selectedPicture})`,
              backgroundRepeat: "no-repeat",
              borderRadius: 20,
              margin: 8,
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginTop: 50,
              maxHeight: 250,
            }}
          >
            <Typography variant="h2">Most Healthy Meals</Typography>
          </Grid>
        </Hidden>

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
            <Box letterSpacing={2}>
              <Logo />
              <Typography variant="h2" gutterBottom align="center">
                REGISTER
              </Typography>
            </Box>

            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
            >
              <Grid item xs={12}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  style={{
                    width: "100%",
                    marginTop: 10,
                    marginRight: 10,
                  }}
                  helperText={this.state.firstNameError}
                  autoFocus
                  value={this.state.firstName || ""}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{
                    width: "100%",
                    marginTop: 10,
                    marginRight: 10,
                  }}
                  required
                  id="lastName"
                  label="Last Name"
                  value={this.state.lastName || ""}
                  name="lastName"
                  error={
                    this.state.lastNameError && this.state.lastNameError !== 0
                  }
                  helperText={this.state.lastNameError}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{
                    width: "100%",
                    marginTop: 10,
                    marginRight: 10,
                  }}
                  required
                  id="email"
                  label="Email"
                  value={this.state.email || ""}
                  name="email"
                  error={this.state.emailError && this.state.emailError !== 0}
                  helperText={this.state.emailError}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{
                    width: "100%",
                    marginTop: 10,
                    marginRight: 10,
                  }}
                  required
                  name="password"
                  label="Password"
                  error={
                    this.state.passwordError && this.state.passwordError !== 0
                  }
                  helperText={this.state.passwordError}
                  value={this.state.password || ""}
                  type={this.state.showPasswordValue ? "text" : "password"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPasswordValue ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>
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

              {loading ? (
                <Box
                  display="flex"
                  style={{ justifyContent: "center" }}
                  marginTop={4}
                >
                  <Button
                    type="submit"
                    size="large"
                    className={classes.custombutton}
                    variant="contained"
                    disabled={loading}
                    className={classes.custombutton}
                    onClick={this.handleSubmit}
                  >
                    SIGN UP
                    {loading ? <CircularProgress size={30} /> : null}
                  </Button>
                </Box>
              ) : (
                // <Box
                //   display="flex"
                //   style={{ justifyContent: "center" }}
                //   marginTop={4}
                //   letterSpacing={2}
                // >
                <Box letterSpacing={2}>
                  <Button
                    type="submit"
                    size="large"
                    className={classes.custombutton}
                    variant="contained"
                    disabled={!this.state.buttonState}
                    onClick={this.handleSubmit}
                  >
                    SIGN UP
                  </Button>
                </Box>
              )}
              {this.state.infoMessage}

              <Grid item xs={12}>
                <Box p={2} m={2}></Box>

                <Link href="/signin" style={{ textDecoration: "none" }}>
                  <Typography variant="h3">Have an account? Sign in</Typography>
                </Link>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signupError: state.auth.signupError,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.ui.loading,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (userCred) => dispatch(signUp(userCred)),
  clear: () => dispatch({ type: DESTROY_SESSION }),
  serverStatus: () => dispatch(serverStatus),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(signup));

// export default withStyles(useStyles, { withTheme: true })(Signup);
