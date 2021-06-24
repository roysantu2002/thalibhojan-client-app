import { Button } from "@material-ui/core";
import { AppBar } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import Account from "../Account";
import useStyles from "./appBarStyle";

const BasicAppbar = (props) => {
  const classes = useStyles();

  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", zIndex: -1, margin: 0 }}
      >
        <Toolbar disableGutters={false}>
          <Button
            disableRipple
            className={classes.logoContainer}
            component={Link}
            href="/"
          >
            <img
              src="/images/logo.png"
              alt="logo"
              className={classes.logo}
              edge="end"
            ></img>
          </Button>

          <Box mx="auto" alignitems="right"></Box>
          <Box mx="auto" alignitems="right"></Box>

          <Box>
            <Account />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withStyles(useStyles, { withTheme: true })(BasicAppbar);
