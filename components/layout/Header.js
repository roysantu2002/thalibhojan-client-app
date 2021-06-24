import { AppBar, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "../Link";
import useStyles from "./appbar/appBarStyle";
import SellerHeader from "./appbar/SellerHeader";
import UserHeader from "./appbar/UserHeader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Header = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useSelector((state) => state.firebase);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState(false);

  const appBarShow = auth.uid ? (
    firebase.profile.role === "ROLE_SELLER" ? (
      <SellerHeader setValue={setValue} value={value} />
    ) : (
      <UserHeader setValue={setValue} value={value} />
    )
  ) : (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar>
        <div className={classes.tabContainer}>
          <div className={classes.spaceTypo}>
            <Link href="/">
              <Button className={classes.spaceTypo} variant="outlined">
                Home
              </Button>
            </Link>
            <Link href="/signin">
              <Button className={classes.spaceTypo} variant="outlined">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className={classes.spaceTypo} variant="outlined">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );

  return matches ? null : appBarShow;
};

export default Header;
