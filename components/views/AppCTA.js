import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getInquiry } from "../../api/getDataApi";
import {
  clearSnackbar,
  showSuccessSnackbar,
} from "../../store/actions/snackbarActions";
import MuiSnackbar from "../snackbar/MuiSnackbar";
const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(12),
    display: "flex",
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    padding: theme.spacing(8, 3),
    border: "4px solid #890011",
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "100%",
  },
  imagesWrapper: {
    position: "relative",
  },

  image: {
    position: "absolute",
    top: -50,
    left: -28,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: 400,
    maxHeight: 400,
    border: "4px solid #890011",
  },
});

function ProductCTA(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  // const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const onChange = (event) => {
    // console.log(crypto.randomBytes(20).toString('hex'))
    // let inquiryList = [];
    let valid;
    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );

        if (!valid) {
          setEmailHelper("Invalid email");
        } else {
          setEmailHelper("");
          getInquiry(event.target.value).then((querySnapshot) => {
            if (querySnapshot) {
              const keyQueryString = querySnapshot.split(",");
              if (keyQueryString[0] === "NA") {
                setEmailHelper("");
                setEmail("");
                dispatch(showSuccessSnackbar("Thank you!"));
                setTimeout(() => {
                  dispatch(clearSnackbar());
                }, 3000);
              } else {
                setEmailHelper(querySnapshot);
                dispatch(showSuccessSnackbar(querySnapshot));
                setTimeout(() => {
                  dispatch(clearSnackbar());
                }, 3000);
              }

              keyQueryString[1].length > 10
                ? setToken(keyQueryString[1])
                : setToken("");
            }
          });
        }
        break;
      default:
        break;
    }
  };

  const buttonContents = (
    <React.Fragment>
      Keep Me Updated!!
      <img
        src="/assets/send.svg"
        alt="paper airplane"
        style={{ marginLeft: "1em" }}
      />
    </React.Fragment>
  );

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <form className={classes.cardContent}>
              <Typography variant="h3" component="h2" gutterBottom>
                Can we help you?
              </Typography>
              <Typography variant="h4">
                We always prepare best Thali Meals
              </Typography>
              <TextField
                className={classes.textField}
                placeholder="Your email"
                error={emailHelper.length !== 0}
                helperText={emailHelper}
                id="email"
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            {/* <div className={classes.imageDots} /> */}
            <img
              src="/images/appHero.png"
              alt="thalibhojan"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      </Grid>
      <MuiSnackbar transition="fade" />
    </Container>
  );
}

ProductCTA.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCTA);
