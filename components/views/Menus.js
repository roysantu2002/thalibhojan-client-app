import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Card } from "../controls";
import Link from "../Link";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    display: "flex",
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function Menus(props) {
  const { classes } = props;

  const mainMenu = useSelector((state) => state.storeItems.mainMenu);

  return (
    <section className={classes.root}>
      <Container className={classes.container} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h2" marked="center">
            Thali Meals
          </Typography>
        </Grid>
        <Box m={2}></Box>

        <Box m={2}></Box>
        <Grid item sm={12}>
          <Grid container justify="center" spacing={2}>
            {mainMenu.length &&
              mainMenu.map((data) => (
                <Card
                  key={data.id}
                  id={data.id}
                  url={data.url}
                  name={data.name}
                  title={data.title}
                  desc={data.desc}
                  varient="h6"
                >
                  <Box
                    display="flex"
                    style={{ justifyContent: "center" }}
                    p={2}
                  ></Box>
                  <Box
                    display="flex"
                    style={{ justifyContent: "center" }}
                    p={2}
                    bgcolor="primary.main"
                  >
                    <CardActions disableSpacing>
                      <Link href={data.href} style={{ textDecoration: "none" }}>
                        <Typography variant="button">{data.title}</Typography>
                      </Link>
                    </CardActions>
                  </Box>
                </Card>
              ))}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

Menus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(Menus));
