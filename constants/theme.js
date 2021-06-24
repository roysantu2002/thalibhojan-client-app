import { createMuiTheme } from "@material-ui/core/styles";
import { green, grey, red } from "@material-ui/core/colors";

const pLight = "#fff453";
const pMain = "#fec20e";
const pDark = "#c69200";
const sLight = "#fa5e60";
const sDark = "#890011";
const sMain = "#c12736";
const dLight = "#ff8c50";
const dMain = "#f15a22";
const dDark = "#b72500";
const lGrey = "#101802";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: `${pLight}`,
      main: `${pMain}`,
      dark: `${pDark}`,
    },

    secondary: {
      light: `${sLight}`,
      main: `${sMain}`,
      dark: `${sDark}`,
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
    default: {
      light: `${dLight}`,
      main: `${dMain}`,
      dark: `${dDark}`,
    },
    body: {
      maxWidth: "lg",
    },
    warning: {
      main: "#ffc071",
      dark: "#c99043",
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      xLight: green[50],
      main: green[500],
      dark: green[700],
    },
  },
  //the object to be spread
  spreadThis: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10 auto 10 auto",
    },
    textField: {
      margin: 10,
    },
    textSearch: {
      margin: "0px 0px 10px 0px",
    },
    backgroundColorChange: {
      backgroundColor: "#e8ede1",
    },
    autoComplete: {
      margin: "6px 10px 2px 10px",
    },
    button: {
      marginTop: 20,
      marginBottom: 14,
      position: "relative",
    },
    label: {
      textAlign: "left",
      margin: "20px 10px 10px 10px",
    },
    labelError: {
      textAlign: "left",
      color: "#f44336",
      margin: "4px 10px 10px 10px",
    },
    customError: {
      color: "red",
      fontSize: "1.2rem",

      marginTop: 10,
    },
    customSuccess: {
      color: "#00B200",
      fontSize: "1.2rem",
      marginTop: 10,
    },
    small: {
      fontSize: "1.2rem",
    },
    progress: {
      position: "absolute",
    },
    uploadImages: {
      margin: 10,
      fontSize: "16px",
    },
  },

  typography: {
    typography: {
      fontFamily: [
        "Branch",
        "-apple-system",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    // fontSize: "0.5em",
    fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 700,
    // fontWeightBold: 800,

    overrides: {
      MuiTab: {
        wrapper: {
          flexDirection: "row",
        },
      },
    },

    tab: {
      fontFamily: "Branch",
      textTransform: "none",
      fontWeight: "fontWeightBold",
      // fontSize: "16px",
      marginLeft: 1,
      color: `${pLight}`,
      wrapper: {
        flexDirection: "row",
      },
    },

    footerlink: {
      // fontFamily: "Muli",
      textTransform: "none",
      fontWeight: 700,
      fontStyle: "italic",
      color: "white",
      fontSize: "1rem",
      minwidth: 10,
      marginLeft: "25px",
    },
    h1: {
      fontFamily: "branch",
      fontSize: "1.2rem",
      fontWeight: 900,
      color: `${pMain}`,
      textTransform: "uppercase",
      marginBottom: 10,
    },
    h2: {
      fontFamily: "GothamBook",
      fontSize: "1.2rem",
      fontWeight: 900,
      color: `${sDark}`,
      textTransform: "uppercase",
    },
    order: {
      fontFamily: "Roboto",
      fontSize: "1rem",
      fontWeight: 900,
      color: "#000000",
    },

    h4: {
      fontFamily: "GothamBook",
      fontSize: "1.1em",
      fontWeight: 500,
      color: `${lGrey}`,
    },
    h3: {
      fontFamily: ["Open Sans", "sans-serif", "GothamBook"].join(","),

      fontSize: "1.125rem",
      fontWeight: 500,
      color: `${lGrey}`,
    },
    subtitle1: {
      fontSize: ".9rem",
      fontWeight: 700,
      color: `${pDark}`,
      textTransform: "uppercase",
    },
    subtitle2: {
      fontFamily: "GothamBook",
      fontSize: ".7rem",
      fontWeight: 600,
      color: `${lGrey}`,
    },

    button: {
      fontSize: "1rem",
      color: "black",
      fontWeight: 700,
      textTransform: "uppercase",
    },

    slider: {
      fontFamily: "Branch",
      fontSize: "1.2rem",
      color: "black",
      fontWeight: 900,
      textTransform: "uppercase",
    },

    h5: {
      fontSize: ".75rem",
      color: `${pDark}`,
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: "GothamBook",
      margin: "0.3rem",
      color: `${lGrey}`,
      fontSize: ".8rem",
      textTransform: "uppercase",
    },
  },
});

theme.props = {
  // MuiContainer: {
  //   padding: "24 24"
  // },

  MuiButtonBase: {
    // The default props to change
    disableRipple: true, // No more ripple, on the whole application 💣!
  },
  MuiButton: {
    // `MuiButton` is the global class name for the <Button /> component

    disableElevation: true, // this prop disables the drop shadow on all Buttons
  },

  MuiInputLabel: {
    shrink: true,
  },
  "&.shrink": {
    backgroundColor: "grey",
  },

  MuiInput: {
    disableUnderline: true,
  },
};

theme.overrides = {
  MuiContainer: {
    root: {
      background: "#f6ffea", //#fffeea",
      padding: "0 0",
    },
  },
  MuiButton: {
    root: {
      // backgroundColor: theme.palette.primary.main,
      borderRadius: 7, // square corners
      textTransform: "uppercase",
    },
    // text: {

    //   background: 'linear-gradient(45deg, #fff453 30%, #c69200 90%)',
    //   borderRadius: 3,
    //   border: 0,
    //   // color: 'white',
    //   fontSize: '2rem',
    //   fontWeight: 900,
    //   height: 30,
    //   padding: '0 10px',
    //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // },
    // containedPrimary: {
    //   // fontWeight: 700,
    //   "&:hover": {
    //     // changes colors for hover state

    //     backgroundColor: theme.palette.primary,
    //     //   color: theme.palette.primary.dark,
    //   },
    // },

    containedSecondary: {
      fontWeight: 700, // makes text bold
    },
  },

  /* Button overrides not included to make this easier to read */

  MuiInputLabel: {
    root: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: 800,
      textTransform: "uppercase",
      color: theme.palette.primary.dark,
      fontSize: "1rem",
      [theme.breakpoints.down("md")]: {
        fontSize: ".9rem",
      },
    },
  },
  MuiSelect: {
    root: {
      borderRadius: 16,
    },
  },
  MuiInput: {
    root: {
      borderRadius: 7,
      // top: theme.spacing(1),
      width: "calc(100%)",
      height: "40px",
      border: `0.8px solid ${grey[500]}`,

      // outline: `0.7px solid transparent`,

      padding: theme.spacing(1),

      "&$focused": {
        borderRadius: 7,
        border: `0.9px solid ${grey[500]}`,
        // outline: `0.7px solid ${grey[500]}`,
        color: theme.palette.secondary.dark,
      },
    },

    // we don't need `focused: {}` with overrides
  },
};

export default theme;
