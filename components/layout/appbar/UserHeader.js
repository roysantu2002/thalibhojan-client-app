import { AppBar, Tab } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import React from "react";
import Link from "../../Link";
import useStyles from "./appBarStyle";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const UserHeader = (props) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const routes = [
    {
      name: "home",
      tag: "home",
      link: "/",
      activeIndex: 0,
    },
    {
      name: "delivery",
      tag: "delivery",
      link: "/placeorder",
      activeIndex: 1,
    },

    {
      name: "takeaway",
      tag: "takeaway",
      link: "/placeorder",
      activeIndex: 2,
    },
    {
      name: "contact us",
      tag: "contact",
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
        {routes.map((route, activeIndex) => (
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
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false} margin="-10">
            {tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};

export default UserHeader;
