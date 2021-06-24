/* eslint-disable jsx-a11y/anchor-is-valid */

import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React, { Component } from "react";
import { connect } from "react-redux";
import { showSuccessSnackbar } from "../../store/actions/snackbarActions";
import TextField from "../../UI/Input/TextField";
import MuiSnackbar from "../../UI/MuiSnackbar";
import Typography from "../../UI/Typography";
import { getInquiry } from "../api/getDataApi";
import Controls from "../Controls/Controls";
import Logo from "../logo/Logo";

const useStyles = (theme) => ({
  dialogWrapper: {
    padding: theme.spacing(1),
    position: "absolute",
    top: theme.spacing(8),
    zIndex: 10000,
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: "flex",
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: "flex",
    justifyContent: "center",

    padding: theme.spacing(3, 3),
  },
  cardContent: {
    maxWidth: 250,
    justifyContent: "center",
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  imageDots: {
    position: "absolute",
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: "100%",
    background: "url('/images/appHero.jpg')",
  },
});

const initialState = {
  email: "",
  emailHelper: "",
  token: "",
  open: false,
};

class AddsModal extends Component {
  _isMounted = false;
  state = {
    initialState,
  };

  componentDidMount() {
    this.setState({
      open: true,
    });
  }

  closeModal = (e) => {
    this._isMounted = true;
    e.preventDefault();
    this.setState({
      open: false,
    });
  };

  //   setOpenPopup = (e) => {
  //     this.closeModal(e);
  //   };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let { open } = this.state;
    const { classes } = this.props;

    // const dispatch = useDispatch();

    const onChange = (event) => {
      // console.log(crypto.randomBytes(20).toString('hex'))
      // let inquiryList = [];
      let valid;
      switch (event.target.id) {
        case "email":
          this.setState({
            email: event.target.value,
          });
          valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
            event.target.value
          );

          if (!valid) {
            this.setState({
              emailHelper: "Invalid email",
            });
          } else {
            this.setState({
              emailHelper: "",
            });
            getInquiry(event.target.value).then((querySnapshot) => {
              if (querySnapshot) {
                const keyQueryString = querySnapshot.split(",");
                if (keyQueryString[0] === "NA") {
                  this.setState({
                    emailHelper: "",
                  });

                  this.setState({
                    email: "",
                  });

                  this.props.showSuccessSnackbar("Thank you!");
                  this.setState({
                    open: false,
                  });
                  // setOpen(true);
                } else {
                  this.setState({
                    emailHelper: querySnapshot,
                  });
                }

                keyQueryString[1].length > 10
                  ? this.setState({
                      token: keyQueryString[1],
                    })
                  : this.setState({
                      token: "",
                    });
              }
            });
          }
          break;
        default:
          break;
      }
    };
    return (
      <Dialog
        open={open}
        maxWidth="sm"
        classes={{ paper: classes.dialogWrapper }}
      >
        <div style={{ display: "flex" }}>
          <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
            Welcome!!
          </Typography>
          <Controls.ActionButton onClick={this.closeModal}>
            <CloseIcon />
          </Controls.ActionButton>
        </div>
        <div className={classes.card}>
          <form className={classes.cardContent}>
            <Logo />
            <Typography variant="h5">Best PartySnacks!!</Typography>
            <TextField
              className={classes.textField}
              placeholder="Your email"
              error={
                this.state.emailHelper && this.state.emailHelper.length !== 0
              }
              helperText={this.state.emailHelper}
              id="email"
              value={this.state.email}
              onChange={onChange}
            />
          </form>
        </div>

        <MuiSnackbar />
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showSuccessSnackbar: (message) => dispatch(showSuccessSnackbar(message)),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(AddsModal));

// export default withStyles(useStyles, { withTheme: true })(AddsModal);
