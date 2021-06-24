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
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import theme from "../../../constants/theme";
import Logo from "../../logo/Logo";
import Account from "../Account";
import useStyles from "./drawer";

const userRoutes = [
  {
    name: "Home",
    link: "/",
    activeIndex: 0,
  },
  {
    name: "Menu",
    link: "/placeorder",
    activeIndex: 1,
  },
  {
    name: "Order",
    link: "/placeorder",
    activeIndex: 2,
  },

  {
    name: "Covid Special",
    link: "/covidspecial",
    activeIndex: 3,
  },
  {
    name: "Orders",
    link: "/orders",
    activeIndex: 4,
  },
  {
    name: "Contact Us",
    link: "/contactus",
    activeIndex: 5,
  },
];

const UserDrawer = (props) => {
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

  const userContent = (
    <>
      <Box m={1} p={1}>
        <Account auth={auth} profile={profile} router={router} />

        <Divider />
        <Box display="flex" bgcolor="White">
          <List>
            {userRoutes.map((item) => (
              <div key={item.activeIndex}>
                <ListItem>
                  <Button
                    onClick={() => {
                      setOpenDrawer(false);
                    }}
                    href={item.link}
                  >
                    <span className={classes.drawerItem}>{item.name}</span>
                  </Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>

        <Typography align="center" variant="body2"></Typography>
        <Box display="flex" style={{ justifyContent: "center" }} m={1} p={1}>
          <Button
            onClick={() => {
              handleSignout();
            }}
            variant="contained"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: "white",

              borderRadius: 0,
            }}
            className={classes.button}
            startIcon={<AiOutlineLogout />}
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
    </>
  );

  const userDrawer = (
    <>
      {" "}
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false}>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
              {userContent}
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
    </>
  );

  return userDrawer;
};

export default withStyles(useStyles, { withTheme: true })(UserDrawer);
