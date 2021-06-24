import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import AppHeroLayout from "./AppHeroLayout";

const backgroundImage = "/images/bannerThree.png";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    // flexGrow: 1,
    padding: theme.spacing(1),
    height: "80%",
    textAlign: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },

  button: {
    padding: theme.spacing(1, 4),
    fontSize: theme.typography.pxToRem(13),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 5),
    },
  },

  h1: {
    marginTop: theme.spacing(15),
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),

    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(3),
  },
});

function ProductHero(props) {
  const { classes, search, onInputChange } = props;

  return (
    <AppHeroLayout>
      {/* <Controls.Button>
        <Typography variant="subtitle1">
          <Box letterSpacing={4}>ORDER NOW</Box>
        </Typography>
      </Controls.Button>  */}
      {/* <TextField
        label="I'm Loving To Crack"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={search}
        onChange={onInputChange}
      /> */}

      {/* <Controls.Button
        className={classes.button}
        color="primary"
        variant="outlined"
        href="/"
      >
        <Typography variant="subtitle1">
          <Box letterSpacing={4}>ORDER NOW</Box>
        </Typography>
      </Controls.Button> */}
    </AppHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
