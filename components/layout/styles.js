import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
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
          maxWidth: "9em",
          marginLeft: "-.5em",
        },
        [theme.breakpoints.down("xs")]: {
          maxWidth: "8em",
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
        marginLeft: "0",
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
      drawerIcon: {
        height: "20px",
        width: "20px",
      },
      drawer: {
        backgroundColor: "White",
        width: drawerWidth,
    
        [theme.breakpoints.down("sm")]: {
          width: "auto",
          height: "auto",
          flexShrink: 10,
        },
        [theme.breakpoints.down("md")]: {
          width: 250,
          height: 500,
          flexShrink: 0,
        },
      },
      drawerItem: {
        ...theme.typography.tab,
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
        backgroundColor: theme.palette.common.white,
        zIndex: theme.zIndex.modal - 1,
      },
      customButton: {
        margin: theme.spacing(2),
        borderRadius: 50,
        width: 110,
        textTransform: "uppercase",
        fontSize: "1rem",
        color: "white",
        backgroundColor: theme.palette.secondary.dark,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      accountIcon: {
        height: "40px",
        width: "40px",
        flexDirection: "row",
        marginRight: 10,
      },
      accountRoot: {
        padding: theme.spacing(3, 2),
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      },
      avtar: {
        fontSize : ".9em",
        color: "#ffffff",
        backgroundColor: theme.palette.secondary.dark,
        margin: "auto"
      },
    
}));
