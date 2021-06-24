/* eslint-disable jsx-a11y/anchor-is-valid */
// 404.js
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import Breadcrumb from "../components/common/Breadcrumb";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
});

class FourOhFour extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Container className={classes.root} component="section">
          <Breadcrumb title="404 Not Found" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <section className="error-area ptb-60">
              <div className="container">
                <div className="error-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 20,
                    }}
                  >
                    <Image
                      src="/images/404.png"
                      alt="Picture of the author"
                      width={100}
                      height={100}
                    />
                  </div>

                  <h3>{this.props.statusCode} Page Not Found</h3>
                  <p>
                    The page you are looking for might have been removed had its
                    name changed or is temporarily unavailable.
                  </p>

                  <Link href="/">
                    <a className="btn btn-light">Go to Home</a>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(FourOhFour);
