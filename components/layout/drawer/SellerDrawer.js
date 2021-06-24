import {
  Badge,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { AppBar, Drawer } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import Logo from "../../logo/Logo";
import Account from "../Account";
import useStyles from "./drawer";

const sellerRoutes = [
  {
    name: "Home",
    link: "/",
    activeIndex: 0,
  },
  {
    name: "Dashboard",
    link: "/sellerdashboard",
    activeIndex: 1,
  },

  {
    name: "Orders",
    link: "/orders",
    activeIndex: 2,
  },
  {
    name: "Contact Us",
    link: "/contactus",
    activeIndex: 3,
  },
];

const SellerDrawer = (props) => {
  const classes = useStyles();

  const {
    auth,
    profile,
    router,
    setOpenDrawer,
    handleSignout,
    ElevationScroll,
    openDrawer,
    storeItems,
    total,
  } = props;

  const sellerContent = (
    <>
      <Box m={1} p={1}>
        <Account auth={auth} profile={profile} router={router} />

        <Divider />
        <Box display="flex" bgcolor="White">
          <List component="nav">
            {sellerRoutes.map((item) => (
              <ListItem
                key={item.name}
                component={Link}
                href={item.link}
                onClick={() => {
                  setOpenDrawer(false);
                }}
              >
                <Typography variant="h6">{item.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Typography align="center" variant="body2"></Typography>
        <Box display="flex" style={{ justifyContent: "center" }} m={1} p={1}>
          <Button
            color="primary"
            component="a"
            onClick={() => {
              handleSignout();
            }}
            variant="contained"
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
    </>
  );

  const sellerDrawer = (
    <>
      {openDrawer ? (
        <ElevationScroll>
          <AppBar
            style={{ margin: 0 }}
            position="sticky"
            className={classes.appbar}
          >
            <Toolbar disableGutters={false}>
              <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                {sellerContent}
              </Drawer>

              <IconButton
                className={classes.drawerIconContainer}
                color="secondary"
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
              >
                <MenuIcon className={classes.drawerIcon} />
              </IconButton>
              <Logo />

              <Box mx="auto"></Box>
              <Box mx="auto"></Box>
              {storeItems.addedItems && storeItems.addedItems.length ? (
                <div style={{ margin: 0 }}>
                  <Badge
                    color="primary"
                    badgeContent={
                      storeItems.addedItems && storeItems.addedItems.length
                    }
                  >
                    <ShoppingCartIcon color="primary" />
                  </Badge>
                  <Typography>{"\u20B9 " + total}</Typography>
                </div>
              ) : null}
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      ) : (
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false}>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
              {sellerContent}
            </Drawer>

            <IconButton
              className={classes.drawerIconContainer}
              color="secondary"
              onClick={() => setOpenDrawer(!openDrawer)}
              disableRipple
            >
              <MenuIcon className={classes.drawerIcon} />
            </IconButton>
            <Logo />
          </Toolbar>
        </AppBar>
      )}
    </>
  );

  return sellerDrawer;
};

export default withStyles(useStyles, { withTheme: true })(SellerDrawer);
