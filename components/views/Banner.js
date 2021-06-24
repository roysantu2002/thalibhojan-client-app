import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import theme from "../../constants/theme";
import Link from "../Link";

const styles = (theme) => ({
  root: {
    display: "flex",
    marginTop: "1%",
    backgroundImage: `url(${"/images/desktop/main-banner-01.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "auto",
  },

  gridList: {
    flexWrap: "nowrap",

    transform: "translateZ(0)",
  },
  control: {
    padding: theme.spacing(1),
  },
});

const Banner = (props) => {
  const { classes } = props;
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const itemsDesktop = [
    "/images/desktop/main-banner-01.png",
    "/images/desktop/main-banner-02.png",
    "/images/desktop/main-banner-03.png",
    "/images/desktop/main-banner-04.png",
  ];

  const itemsMobile = [
    "/images/mobile/banner-01.png",
    "/images/mobile/banner-02.png",
    "/images/mobile/banner-03.png",
    "/images/mobile/banner-04.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <div style={{ margin: "auto", textAlign: "center" }}>
          {matches ? (
            <Slider {...settings}>
              {itemsMobile.map((item) => {
                return (
                  <Link
                    key="item"
                    href="/placeorder"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    <Image src={item} alt={item} width="300" height="150" />
                  </Link>
                );
              })}
            </Slider>
          ) : (
            <Slider {...settings}>
              {itemsDesktop.map((item) => {
                return (
                  <Link
                    key="item"
                    href="/placeorder"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    <Image src={item} alt={item} width="1000" height="381" />
                  </Link>
                );
              })}
            </Slider>
          )}
        </div>
      </Container>
    </section>
  );
};
export default withStyles(styles)(Banner);
