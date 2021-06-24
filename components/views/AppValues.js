import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    display: "flex",
    overflow: "wrap",
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    marginTop: "1em",
    marginBottom: "2em",
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(6, 8),
    },
  },
  image: {
    height: 100,
    width: 100,
    fontSize: "2em",
    color: theme.palette.primary.pDark,
    [theme.breakpoints.down("md")]: {
      height: 60,
      width: 60,
      fontSize: "1.5em",
    },
  },
  title: {
    marginBottom: theme.spacing(14),
  },

  ico: {
    fontSize: 50,
    color: theme.palette.primary.pDark,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h2"
          marked="center"
          align="center"
          className={classes.title}
        >
          Homely Restaurent
        </Typography>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={3} md={3}>
              <div className={classes.item}>
                <img
                  src="/images/flow/D.png"
                  className={classes.image}
                  alt="decide"
                ></img>

                <Box display="flex" style={{ justifyContent: "center" }} p={1}>
                  <Typography variant="h6" className={classes.custom}>
                    {"Decide"}
                  </Typography>
                </Box>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div className={classes.item}>
                <img
                  src="/images/flow/O.png"
                  className={classes.image}
                  alt="order"
                ></img>
                <Box display="flex" style={{ justifyContent: "center" }} p={1}>
                  <Typography variant="h6" className={classes.custom}>
                    {"Order"}
                  </Typography>
                </Box>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div className={classes.item}>
                <img
                  src="/images/flow/P.png"
                  className={classes.image}
                  alt="pay"
                ></img>

                <Box display="flex" style={{ justifyContent: "center" }} p={1}>
                  <Typography variant="h6" className={classes.custom}>
                    {"Pay"}
                  </Typography>
                </Box>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div className={classes.item}>
                <img
                  src="/images/flow/E.png"
                  className={classes.image}
                  alt="Eat"
                ></img>
                <Box display="flex" style={{ justifyContent: "center" }} p={1}>
                  <Typography variant="h6" className={classes.custom}>
                    {"Eat"}
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
