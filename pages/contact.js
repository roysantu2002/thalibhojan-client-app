import { Box, Divider, Grid, useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Head from "next/head";
import React from "react";
import { FcFeedback } from "react-icons/fc";
import Logo from "../components/logo/Logo";
import useStyles from "../styles/loginPage";

function Contact(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <section className={classes.root}>
      <Head>
        <title key="title">Contact Us | thalibhojan</title>
        <meta
          name="description"
          key="description"
          content="Let us guide you through the custom software design and development process. Send us a message with any of your ideas or questions to get started!"
        />
        <meta
          property="og:url"
          key="og:url"
          content="https://thalibhojan.com/contact"
        />
        <link
          href="https://thalibhojan.com/contact"
          rel="canonical"
          key="canonical"
        />
      </Head>

      <Grid container spacing={2} justify="center" className={classes.root}>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            borderRadius: 2,
            margin: theme.spacing(3),
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Paper className={classes.paper} elevation={2}>
            <Logo />
            <Divider />

            <Grid item container style={{ marginTop: "2em" }}>
              <Grid item>
                <Typography variant="h2">Contact Us</Typography>
                <Typography
                  align={matchesMD ? "center" : undefined}
                  variant="button"
                  style={{ color: theme.palette.common.blue }}
                >
                  Everyone is valued.
                </Typography>
              </Grid>
            </Grid>

            <div className={classes.spaceTypo}>
              <PhoneIphoneIcon />
              <Typography variant="h3">(91) 90733-42333</Typography>
            </div>
            <div className={classes.spaceTypo}>
              <EmailIcon />

              <Typography variant="h4">
                <a
                  href="mailto:thalibhojan@gmail.com"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  thalibhojan@gmail.com
                </a>
              </Typography>
            </div>

            <Box
              display="flex"
              style={{
                justifyContent: "center",
                // backgroundColor: theme.palette.secondary.main,
              }}
              m={2}
              p={1}
            >
              {/* <FcFeedback /> &nbsp;
                <Link href="/feedback">
                  <Typography
                    variant="h4"
                    style={{ color: "#ffffff", textTransform: "none" }}
                  >
                    SEND FEEDBACK{" "}
                  </Typography>
                </Link> */}
              <Button
                color="secondary"
                variant="contained"
                href="/feedback"
                component={Link}
              >
                <FcFeedback /> &nbsp;
                <Typography
                  variant="h4"
                  style={{ color: "#ffffff", textTransform: "none" }}
                >
                  SEND FEEDBACK{" "}
                </Typography>
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* <Container className={classes.container} spacing={2}>
        <Grid
          container
          spacing={0}
          className={classes.root}
          alignitems="center"
          justify="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            // style={{
            //   marginBottom: matchesMD ? "5em" : 0,
            //   marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0,
            // }}
          >
            <Paper elevation={2} className={classes.card}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography
                      align={matchesMD ? "center" : undefined}
                      variant="h2"
                      style={{ lineHeight: 1 }}
                    >
                      Contact Us
                    </Typography>
                    <Typography
                      align={matchesMD ? "center" : undefined}
                      variant="button"
                      style={{ color: theme.palette.common.blue }}
                    >
                      We're waiting.
                    </Typography>
                  </Grid>
                  <Grid item container style={{ marginTop: "2em" }}>
                    <Grid item>
                      <PhoneIphoneIcon />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="button"
                        style={{
                          color: theme.palette.common.blue,
                          fontSize: "1rem",
                        }}
                      >
                        <a
                          href="tel:9073342333"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          (91) 90733-42333
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container style={{ marginBottom: "2em" }}>
                    <Grid item>
                      <EmailIcon />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="button"
                        style={{
                          color: theme.palette.common.blue,
                          fontSize: "1rem",
                        }}
                      >
                        <a
                          href="mailto:thalibhojan@gmail.com"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          thalibhojan@gmail.com
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container> */}
    </section>
  );
}

export default Contact;
// export default withStyles(useStyles)(Contact);
