import { createStyles, makeStyles } from "@material-ui/core";
import theme from "../constants/theme";

// const useStyles = makeStyles(theme => createStyles({

const style = () =>
  createStyles({
    container: {
      zIndex: "2",
      position: "relative",
      color: "#FF00FF",
      paddingBottom: "20px",
    },
    logoContainer: {
      // padding: 2,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    root: {
      ...theme.mixins.gutters(),
      minWidth: 300,
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      display: "flex",
    },
    paper: {
      ...theme.mixins.gutters(),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      margin: "auto",
      padding: theme.spacing(10),
      flexDirection: "column",
      justifyContent: "center",
    },

    avatar: {
      marginTop: theme.spacing(4),
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      "& > *": {
        width: "100%", // Fix IE 11 issue.
        height: "300",

        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
      },
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    photoContainer: {
      Zindex: -20,
    },
    main: {
      marginTop: 20,
      padding: 10,
    },
    teacher: {
      marginTop: 20,
    },
    custombutton: {
      background: theme.palette.primary.main,
      borderRadius: 3,
      border: 0,
      color: "white",

      width: "100%",
      padding: "1 30px",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    div: {
      "& .MuiFormControl-root": {
        padding: 1,
        paddingTop: 8,
        paddingBottom: 8,
      },
      "& .MuiGrid-root": {
        padding: 1,
        paddingTop: 2,
        paddingBottom: 1,
      },
    },
    divider: {
      color: "#495057",
      marginTop: "30px",
      marginBottom: "0px",
      textAlign: "center",
    },
    logo: {
      maxWidth: "10em",
      // marginLeft: "2px",
      [theme.breakpoints.down("md")]: {
        maxWidth: "9em",
        // marginLeft: "-.5em",
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "8em",
      },
      margin: ".5em",
    },
    signupImage: {
      // backgroundImage:`url(${selectedPicture})`,
      // backgroundImage:
      //   "url(https://source.unsplash.com/random?cakes?pizza?burger?donut)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    buttonGroup: {
      boxSizing: "inherit",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(0.2),
      // margin: theme.spacing(4),
      "& .MuiButtonBase-root ": {},
      "& button:nth-child(2)": {
        color: "White",
        backgroundColor: theme.palette.secondary.light,
      },
    },
    spaceTypo: {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
    },

    linkText: { textdecoration: "none" },
  });

// const GlobalStyles = () => {
//   useStyles();

//   return null;
// };

export default style;
