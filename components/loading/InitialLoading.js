import React from "react";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import FadeIn from "react-fade-in";

export default function InitialLoading() {
  return (
    <Grid
      container
      direction="column"
      alignitems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Grid container direction="column" alignItems="center" justify="center">
          <FadeIn>
            <Image
              src="/images/logo.png"
              alt="Picture of the author"
              width="300"
              height="150"
            />
          </FadeIn>
        </Grid>
      </Grid>
    </Grid>
  );
}
