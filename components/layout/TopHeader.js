import { IconButton } from "@material-ui/core";
import { AppBar, makeStyles } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import Index from "../../components/layout/drawer";
import BasicAppbar from "../layout/appbar/BasicAppbar";
import Logo from "../logo/Logo";
const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "12em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "8em",
      marginLeft: "-.5em",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "7em",
    },
  },
  appbar: {
    [theme.breakpoints.down("md")]: {
      width: "xs",
    },
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.modal - 1,
  },
}));

const TopHeader = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

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

  const sampleHeader = (
    <>
      {" "}
      <ElevationScroll>
        <AppBar
          style={{ margin: 0 }}
          position="sticky"
          className={classes.appbar}
        >
          <Toolbar disableGutters={false}>
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
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );

  const appBarShow = openDrawer ? (
    <Index openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
  ) : (
    sampleHeader
  );

  return <>{matches ? appBarShow : <BasicAppbar />}</>;
};
export default TopHeader;
