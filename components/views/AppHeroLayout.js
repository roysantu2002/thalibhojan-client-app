import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import Carousel from "react-elastic-carousel";
import Link from "../Link";

const imageDesktop = "/images/main-banner.png";
const imgMobile = "/images/main-banner-sm.png";

const styles = (theme) => ({
  root: {
    height: "90vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${imageDesktop})`,
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url(${imgMobile})`,
    },
  },
  rootcontent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    padding: "40px",
    [theme.breakpoints.down("md")]: {
      backgroundPosition: "center center",
    },
  },
  media: {
    marginTop: theme.spacing(1),
    height: 381,
  },
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignitems: "center",
    zIndex: -2,
  },

  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4),
  },
});

function AppHeroLayout(props) {
  const itemsDesktop = [
    "../images/desktop/main-banner-01.png",
    "../images/desktop/main-banner-02.png",
    "../images/desktop/main-banner-03.png",
    "../images/desktop/main-banner-04.png",
  ];
  const itemsMobile = [
    "../images/mobile/banner-01.png",
    "../images/mobile/banner-02.png",
    "../images/mobile/banner-03.png",
    "../images/mobile/banner-04.png",
  ];

  const items = window.innerWidth >= 650 ? itemsDesktop : itemsMobile;

  console.log(window.innerWidth);
  return (
    <Carousel>
      {items.map((item) => (
        <Link href="book">
          <div>
            <img src={item} alt="test"></img>
          </div>
        </Link>
      ))}
    </Carousel>
  );
}

AppHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeroLayout);
