import { Container, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import React from "react";

function Copyright() {
  return (
    <React.Fragment>
      <Typography variant="subtitle2">
        {"© "}
        <Link color="inherit" href="https://thalibhojan.com">
          www.thalibhojan.com
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 2,
    display: "flex",
    margin: "auto",
    justifyContent: "center",
    padding: theme.spacing(2),
    // backgroundColor: theme.palette.secondary.dark,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",

    justifyContent: "center",
    zIndex: 5,
  },
  iconsWrapper: {
    height: 120,
    zIndex: 5,
  },
  icons: {
    display: "flex",
  },
  icon: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const OPTIONS = [
  {
    code: "preorder",
    name: "Placeorder",
  },
  {
    code: "monthly",
    name: "Monthly",
  },
  {
    code: "Weekly",
    name: "Weekly",
  },
];

export default function AppFooter() {
  const classes = useStyles();

  return (
    <section component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={2} md={4}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a href="https://www.facebook.com/thalibhojan">
                  <FacebookIcon className={classes.icon} />
                </a>
                <a href="https://www.instagram.com/thalibhojan/">
                  <InstagramIcon className={classes.icon} />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" marked="left" gutterBottom>
              ABOUT
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/about">
                  <Typography variant="subtitle2" marked="left" gutterBottom>
                    About Us
                  </Typography>
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Link href="/placeorder">
              <Typography variant="subtitle1" marked="left" gutterBottom>
                BOOKING
              </Typography>
            </Link>

            <TextField
              select
              SelectProps={{
                native: true,
              }}
              className={classes.language}
            >
              {OPTIONS.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" marked="left" gutterBottom>
              CONTACT US
            </Typography>

            <Link href="/feedback">
              <Typography variant="subtitle2" marked="left" gutterBottom>
                Feedback
              </Typography>
            </Link>
            <Link href="/contact">
              <Typography variant="subtitle2" marked="left" gutterBottom>
                Contact Us
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" marked="left" gutterBottom>
              Locate US
            </Typography>
            <LocationOnIcon />
            Thalibhojan Kitchen, #Next to SBI Akhansha Branch
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
