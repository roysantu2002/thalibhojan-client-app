import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "next/router";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Logo from "../components/logo/Logo";
import theme from "../constants/theme";
import { DESTROY_SESSION } from "../store/actions/action-types/action-names";
import { signIn } from "../store/actions/authActions";
import useStyles from "../styles/signin";

const WRONG_CREDENTIALS = "auth/wrong-password";
const NOT_FOUND = "auth/user-not-found";
const LOGIN_BLOCKED = "auth/too-many-requests";

const printErrorMessage = (error) => {
  switch (error.code) {
    case WRONG_CREDENTIALS:
      return "Wrong credentials";
    case NOT_FOUND:
      return "User does not exist";
    case LOGIN_BLOCKED:
      return "User blocked. Restore password or try again later";
    default:
      return "Something went wrong. Try again";
  }
};

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  authenticationError: "",
  hideContent: true,
  buttonState: false,
};

class signin extends React.Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = initialState;
    console.log(this.props.firebase);

    // props.auth.uid
    //   ? this.props.router.push("/")
    //   : (this.state = { hideContent: false });
  }

  // componentWillUpdate(nextProps) {
  //   isLoaded(this.props.auth) && !isEmpty(this.props.auth)
  //     ? Router.push("/")
  //     : (this.State = { hideContent: false });
  // }

  // componentDidMount() {
  //   this.isMounted = true;
  //   isLoaded(this.props.auth) && !isEmpty(this.props.auth)
  //     ? Router.push("/")
  //     : (this.State = { hideContent: false });
  // }
  componentDidUpdate() {
    console.log(this.props.firebase);
    // this.props.auth.uid
    //   ? this.props.router.push("/")
    //   : (this.setState({ hideContent: false }));
  }

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
    let valid;
    this.setState({ buttonState: false });
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
            passwordError: "Max 15, uppercase, numeric and a special character",
          });
        } else {
          this.setState({
            passwordError: "",
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

  /* Handle form submit */
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      this.signInUser();
    }
  };

  /* Sign in the user using firebase authentication system */
  signInUser = async () => {
    const userStatus = {
      email: this.state.email,
      password: this.state.password,
    };
    await this.props.signIn(userStatus);
    // .then()
    // .catch()
    this.setState({ buttonState: false });
    this.setState({ email: "" });
    this.setState({ password: "" });
  };

  /* Render sign in form */
  render(props) {
    // const classes = useStyles();
    // const router = useRouter()

    const { loginError, classes, loading } = this.props;
    let errorMessage = "";
    errorMessage = loginError ? printErrorMessage(loginError) : null;
    if (errorMessage) {
      toast.error(errorMessage);
      this.props.clear();
    }

    if (this.props.auth.uid) {
      this.props.firebase.profile.role === "ROLE_SELLER"
        ? this.props.router.push("/sellerdashboard")
        : this.props.router.push("/");
    }

    // if (
    //   this.props.auth.uid &&
    //   this.props.firebase.profile.role === "ROLE_SELLER"
    // ) {
    //   this.props.router.push({
    //     pathname: "/sellerdashboard",
    //     query: { uid: this.props.auth.uid },
    //   });

    // }

    return (
      <>
        {/* // <Container component="main" maxWidth="md" style={{justifyContent:"center"}}> */}
        <CssBaseline />
        <Grid container spacing={2} justify="center" className={classes.root}>
          <Grid
            item
            md={5}
            sm={6}
            xs={12}
            style={{
              borderRadius: 1,
              margin: 8,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Paper className={classes.paper} elevation={2}>
              <Box letterSpacing={2} m={2}>
                <Logo />

                <Typography variant="h2" gutterBottom align="center">
                  LOGIN
                </Typography>
              </Box>

              <form className={classes.form} noValidate>
                <TextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  helperText={this.state.emailError}
                  autoFocus
                  value={this.state.email || ""}
                  onChange={this.handleChange}
                />

                <TextField
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={this.state.passwordError}
                  value={this.state.password || ""}
                  onChange={this.handleChange}
                />

                {loading ? (
                  <Box
                    display="flex"
                    style={{ justifyContent: "center" }}
                    marginTop={4}
                    letterSpacing={2}
                  >
                    <Button
                      type="submit"
                      size="large"
                      className={classes.custombutton}
                      variant="contained"
                      disabled={loading}
                      onClick={this.handleSubmit}
                    >
                      LOGIN
                      {loading ? <CircularProgress size={30} /> : ""}
                    </Button>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    style={{ justifyContent: "center" }}
                    marginTop={4}
                    letterSpacing={2}
                  >
                    <Button
                      type="submit"
                      size="large"
                      disabled={!this.state.buttonState}
                      className={classes.custombutton}
                      onClick={this.handleSubmit}
                    >
                      LOGIN
                    </Button>
                  </Box>
                )}

                <Grid container>
                  <Grid item xs={6}>
                    <Link
                      href="/forgotpassword"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="h3">Forgot password? </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Link href="/signup" style={{ textDecoration: "none" }}>
                      <Typography variant="h3"> Create account? </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    loginError: state.auth.loginError,
    auth: state.firebase.auth,
    firebase: state.firebase,
    loading: state.ui.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (userStatus) => dispatch(signIn(userStatus)),
  clear: () => dispatch({ type: DESTROY_SESSION }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(withRouter(signin)));
