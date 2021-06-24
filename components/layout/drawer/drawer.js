import { createStyles } from "@material-ui/core";
import theme from "../../../constants/theme";

const drawerWidth = 240;

const style = () =>
  createStyles({
    toobarMargin: {
      ...theme.mixins.toolbar,
      [theme.breakpoints.down("md")]: {
        marginBottom: "1em",
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: "1.25em",
      },
    },
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
      margin: ".5em",
    },
    logoContainer: {
      padding: 2,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },

    tabContainer: {
      marginLeft: "auto",
    },
    tab: {
      ...theme.typography.tab,
    },
    menu: {
      borderRadius: "0px",
    },
    menuItem: {
      ...theme.typography.tab,
      opacity: 0.7,
      "&:hover": {
        opacity: 1,
      },
    },
    circle: {
      borderRadius: "25px",
    },
    drawerIconContainer: {
      color: theme.palette.primary.dark,

      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    drawerIcon: {
      margin: 3,

      height: "20px",
      width: "20px",
    },
    drawer: {
      backgroundColor: "White",
      width: drawerWidth,

      [theme.breakpoints.down("sm")]: {
        width: drawerWidth,
        height: "auto",
        flexShrink: 10,
      },
      [theme.breakpoints.down("md")]: {
        width: drawerWidth,
        height: 500,
        flexShrink: 0,
      },
    },
    drawerItem: {
      ...theme.typography.subtitle2,
      opacity: 0.7,
    },
    drawerItemSelected: {
      "& .MuiListItemText-root": {
        opacity: 1,
      },
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appbar: {
      [theme.breakpoints.down("md")]: {
        width: "xs",
      },
      backgroundColor: theme.palette.common.white,
      zIndex: theme.zIndex.modal - 1,
    },
    avtar: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.dark,
    },
    customButton: {
      textTransform: "uppercase!important;",
      fontSize: ".8rem",

      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  });

export default style;
