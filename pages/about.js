import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    display: "flex",
    overflow: "hidden",
  },
  media: {
    maxHeight: 300,
    width: "80%",
    objectFit: "cover",
  },
});

function About(props) {
  const { classes } = this.props;
  return (
    <section className={classes.root}>
      <Container className={classes.container} spacing={2}>
        <Grid
          container
          spacing={0}
          className={classes.root}
          alignitems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={6}>
            <Typography variant="h6">
              Thali Bhojan... Authentic Healthy Meals{" "}
            </Typography>
            <img
              src="/images/5-portion.png"
              alt="5 portion thali"
              className={classes.media}
            ></img>
            <p>
              Our sincere goal is to make your homely dining experience
              unforgettable, safe but healthy.{" "}
            </p>
            <p>
              {" "}
              We commit to giving you centuries-old cuisine and family recipes.{" "}
            </p>
            <p>
              {" "}
              As a start-up company specially for thali meals, our sole goal is
              to provide you with fresh food, new flavours, and a variety of
              robust flavours, so your homely dine experience stays memorable.
            </p>
          </Grid>
          <Grid item xs={6}>
            <p>
              Thalibhojan is growing in the beautiful, vibrant city of Kolkata.
              We serve the most authentic, traditional Indian thali meals,
              providing high standards in service and quality.
            </p>
            <img
              src="/images/8-portion.png"
              alt="5 portion thali"
              className={classes.media}
            ></img>
            <Typography variant="h6">Would you like to try?</Typography>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default withStyles(styles)(About);
