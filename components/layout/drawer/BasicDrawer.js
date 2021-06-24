import {
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { AppBar, Avatar, Drawer } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Logo from "../../logo/Logo";
import useStyles from "./drawer";

const basicRoutes = [
  {
    name: "Home",
    link: "/",
    activeIndex: 0,
  },
  {
    name: "Register",
    link: "/register",

    activeIndex: 2,
  },
  {
    name: "Contact Us",
    link: "/contact",
    activeIndex: 2,
  },
];

const BasicDrawer = (props) => {
  const classes = useStyles();

  const { setOpenDrawer, ElevationScroll, openDrawer } = props;

  const basicContent = (
    <>
      <Box m={1} p={1}>
        <IconButton
          aria-label={"Guest"}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          disabled
          color="primary"
        >
          <Box display="flex" style={{ justifyContent: "center" }}>
            <Box p={1}>
              <Avatar className={classes.avtar}>G</Avatar>

              <div style={{ display: "flex", justifyContent: "row" }}>
                {" "}
                <Typography variant="subtitle2"> Welcome, </Typography>{" "}
                <Typography color="textPrimary" variant="h4">
                  &nbsp; {"Guest"}
                </Typography>
              </div>
            </Box>
          </Box>
        </IconButton>

        <Divider />
        <List component="nav">
          <ListItem
            component={Link}
            href="/"
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <Link href="/signin">
              <Typography variant="h6">SIGN IN</Typography>
            </Link>
          </ListItem>
        </List>

        <Divider />
        <Box display="flex" bgcolor="White">
          <List>
            {basicRoutes.map((item) => (
              <ListItem
                button
                component={Link}
                color="primary"
                key={item.activeIndex}
                onClick={() => {
                  setOpenDrawer(false);
                }}
                href={item.link}
              >
                <Typography variant="h6">{item.name}</Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
        <List>
          <ListItem
            key="0"
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <Link href="/feedback">
              <Typography variant="h6">FEEDBACK</Typography>
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
  );

  const basicrDrawer = (
    <>
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false}>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
              {basicContent}
            </Drawer>

            <IconButton
              className={classes.drawerIconContainer}
              color="secondary"
              disableRipple
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <MenuIcon className={classes.drawerIcon} />
            </IconButton>
            <Logo />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
  return basicrDrawer;
};

export default withStyles(useStyles, { withTheme: true })(BasicDrawer);
