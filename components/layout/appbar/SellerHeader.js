import { AppBar, Tab } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import useStyles from "./appBarStyle";
import Link from "../../Link";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const SellerHeader = (props) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

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
      name: "contact us",
      link: "/contact",
      activeIndex: 3,
    },
  ];

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        indicatorColor="secondary"
        value={props.value}
        onChange={handleChange}
      >
        {sellerRoutes.map((route, activeIndex) => (
          <Tab
            className={classes.tab}
            key={`${route}${activeIndex}`}
            component={Link}
            href={route.link}
            label={route.name}
            aria-owns={route.ariaowns}
            aria-haspopup={route.ariahaspopup}
            {...a11yProps(route.activeIndex)}
          />
        ))}
      </Tabs>
    </>
  );

  return (
    <React.Fragment>
      <AppBar
        style={{ margin: 0 }}
        position="sticky"
        className={classes.appbar}
      >
        <Toolbar disableGutters={false} margin="-10">
          {tabs}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default React.memo(SellerHeader);
