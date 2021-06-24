import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Avatar, Box } from "@material-ui/core/";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../components/modal/Popup";
import { signOut } from "../../store/actions/authActions";
import { getInitials } from "../../utils/helpers";
import Link from "../Link";
import Profile from "./Profile";
import useStyles from "./styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    // zIndex: 2,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformorigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.secondary.dark,
      },
    },
  },
}))(MenuItem);

const Account = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  const router = useRouter();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState("Account");

  const openInPopup = () => {
    setOpenPopup(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    dispatch(signOut());
    router.push("/");
  };

  return (
    <>
      {auth.uid && auth.uid.length ? (
        <>
          <IconButton
            aria-label={auth && auth.displayName ? auth.displayName : "Guest"}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="primary"
          >
            <Box display="flex" style={{ justifyContent: "center" }}>
              <Box p={1}>
                <Avatar className={classes.avtar}>
                  {getInitials(
                    auth && auth.displayName ? auth.displayName : "Guest"
                  )}
                </Avatar>

                <div style={{ display: "flex", justifyContent: "row" }}>
                  {" "}
                  <Typography variant="subtitle2"> Welcome, </Typography>{" "}
                  <Typography color="textPrimary" variant="h4">
                    &nbsp;{" "}
                    {auth && auth.displayName ? auth.displayName : "Guest"}
                  </Typography>
                </div>
                <Typography color="textPrimary">
                  {profile && profile.email ? profile.email : ""}{" "}
                </Typography>
              </Box>
            </Box>
          </IconButton>

          <StyledMenu
            disableScrollLock={true}
            variant="menu"
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Account"
                onClick={() => {
                  openInPopup();
                  setTitle(title);
                }}
              />
            </StyledMenuItem>
            <Link href="/orders">
              <StyledMenuItem>
                <ListItemIcon>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </StyledMenuItem>
            </Link>

            <StyledMenuItem
              onClick={() => {
                handleSignout();
              }}
            >
              <ListItemIcon>
                <AiOutlineLogout fontSize="small" />
                {/* </Button> */}
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </StyledMenuItem>
          </StyledMenu>

          <Popup
            title={title}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <Profile setOpenPopup={setOpenPopup} />
          </Popup>
        </>
      ) : null}
    </>
  );
};

export default Account;
