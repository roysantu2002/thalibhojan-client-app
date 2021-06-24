import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = (theme) => ({
  root: {
    minWidth: 300,
  },
  card: {
    minWidth: 300,
    padding: 8,
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.4)",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "auto",
      margin: "auto",
      marginTop: 8,
      marginBottom: 8,
    },
  },
  media: {
    height: "60%",
    paddingTop: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export const CardBase = (props) => {
  const { classes, id, url, name, title, price } = props;
  const data = { id, url, name, title, price };

  return (
    <Card key={id} className={classes.card} align="center">
      <CardMedia className={classes.media} image={`${url}`} />

      <CardContent className={classes.content}>
        <Typography variant="h3" gutterBottom>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(CardBase);
