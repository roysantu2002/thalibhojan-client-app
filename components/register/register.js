import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, Divider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import useStyles from "../../styles/signin";
import theme from "../../constants/theme";
import { firebase } from "../../utils/firebase";
import { generateCustomerId } from "../../utils/helpers";
import {
  showSuccessSnackbar,
  clearSnackbar,
} from "../../store/actions/snackbarActions";
import MuiSnackbar from "../snackbar/MuiSnackbar";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PhoneRegistration from "./PhoneRegistration";
import { IconButton } from "../controls";
import { useRouter } from "next/router";
// import { addUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import Logo from "../logo/Logo";

import { FcGoogle } from "react-icons/fc";

import dynamic from "next/dynamic";

const addUser = dynamic(() =>
  import("../../store/actions/userActions").then((mod) => mod.addUser)
);

function Registration(props) {
  const { classes, setGuest, guest } = props;
  const [buttonState, setbuttonState] = useState(false);
  const auth = useSelector((state) => state.firebase.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  console.log(auth.uid);

  //Facebook login
  const handleFBLOgin = () => {
    console.log(firebase.auth);
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        const fname = result.user.displayName
          ? result.user.displayName.split(" ")[0]
          : "PH";
        const lname = result.user.displayName
          ? result.user.displayName.split(" ")[1]
          : "PH";
        const fl = fname.charAt(0) + lname.charAt(0);
        const custId = generateCustomerId(fl);

        console.log(result.user);
        console.log(result.user.uid);
        const user = {
          uid: result.user.uid,
          custid: custId,
          email: result.user.email,
          fname: fname,
          lname: lname,
          address: "",
          admin: false,
          role: "ROLE_USER",
          phone: "",
          pic: "",
          pin: "",
        };
        console.log(user);
        dispatch(addUser(user, result.user.uid));
        dispatch(showSuccessSnackbar("Welcome"));
        setTimeout(() => {
          dispatch(clearSnackbar());
        }, 3000);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSuccessSnackbar("Are you online!!!", "error"));
        dispatch(showSuccessSnackbar("Please try again later", "error"));
      });
  };

  //Google login
  const handleGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const fname = res.user.displayName
          ? res.user.displayName.split(" ")[0]
          : "PH";
        const lname = res.user.displayName
          ? res.user.displayName.split(" ")[1]
          : "PH";
        const fl = fname.charAt(0) + lname.charAt(0);
        const custId = generateCustomerId(fl);

        console.log(res.user.uid);
        const user = {
          uid: res.user.uid,
          custid: custId,
          email: res.user.email,
          fname: fname,
          lname: lname,
          address: "",
          admin: false,
          role: "ROLE_USER",
          phone: "",
          pic: "",
          pin: "",
        };

        console.log(user);
        dispatch(addUser(user, res.user.uid));
        dispatch(showSuccessSnackbar("Welcome"));
        setTimeout(() => {
          dispatch(clearSnackbar());
        }, 3000);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSuccessSnackbar("Please try again later"));
      });
  };

  const handleButtonState = (e) => {
    setbuttonState(true);
    console.log("Click");
  };
  const handleGuest = (e) => {
    setGuest(true);
    if (!guest) localStorage.removeItem("location");
    localStorage.removeItem("guest");
    localStorage.setItem("location", "");
    localStorage.setItem("guest", "YES");
  };

  useEffect(() => {
    auth.uid && router.push("/");
  }, []);

  return (
    <Container component="main" style={{ justifyContent: "center" }}>
      <CssBaseline />
      <Grid container spacing={2} justify="center">
        <CssBaseline />

        {!buttonState ? (
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} elevation={4}>
              <div className={classes.buttonGroup}>
                <Logo />

                <Divider className={classes.divider} />

                {/* <Link href="/signin" passHref width="100%"> */}
                <IconButton
                  style={{
                    backgroundColor: theme.palette.primary.dark,
                  }}
                  variant="outlined"
                  href="/signin"
                  startIcon={<EmailIcon />}
                >
                  Sign in with email
                </IconButton>
                {/* </Link> */}
                <IconButton
                  onClick={handleGoogle}
                  variant="outlined"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                  startIcon={<FcGoogle />}
                >
                  Sign in with Google
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    handleButtonState(e);
                  }}
                  variant="outlined"
                  style={{
                    backgroundColor: theme.palette.success.main,
                  }}
                  startIcon={<PhoneIcon />}
                >
                  Sign in with phone
                </IconButton>

                <IconButton
                  onClick={() => handleFBLOgin()}
                  variant="outlined"
                  style={{
                    backgroundColor: "#3b5998",
                  }}
                  startIcon={<FacebookIcon />}
                >
                  Sign in with facebook
                </IconButton>

                <IconButton
                  onClick={(e) => {
                    handleGuest(e);
                  }}
                  variant="outlined"
                  style={{
                    backgroundColor: theme.palette.secondary.dark,
                  }}
                  startIcon={<PermIdentityIcon />}
                >
                  Continue as guest
                </IconButton>
              </div>
            </Paper>
          </Grid>
        ) : (
          <PhoneRegistration />
        )}
      </Grid>
      <MuiSnackbar />
    </Container>
  );
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Registration);
