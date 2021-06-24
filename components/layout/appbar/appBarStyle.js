import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

        toobarMargin: {
          // ...theme.mixins.toolbar,
          marginBottom: "3em",
          [theme.breakpoints.down("md")]: {
            marginBottom: "1em",
          },
          [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em",
          },
        },
        wrapper: {
          flexDirection: "row",
          textDecoration: "none",
        },
        tabContainer: {
          marginLeft: "auto",
          flexDirection: "row",
        },
        tab: {
          textDecoration: "none",
          opacity: 0.9,
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
            outline: "none",
            textDecoration: "none",
          },
        },
      
        menuItem: {
          ...theme.typography.tab,
          opacity: 0.7,
          "&:hover": {
            opacity: 1,
          },
        },
      
        appbar: {
          backgroundColor: theme.palette.primary,
          // border: 1,
          // margin: 1,
          zIndex: theme.zIndex.modal - 1,
        },
        drawerIcon: {
          color: theme.palette.common.primary,
          height: "40px",
          width: "40px",
          flexDirection: "row",
          marginRight: 10,
        },
        activeButton: {
          color: theme.palette.secondary.dark,
        },
        spaceTypo: {
          marginRight: theme.spacing(2),
          display: "flex",
          justifyContent: "space-between",
        },
      }));


export default useStyles;
