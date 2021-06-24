import React from "react";
import { Paper, IconButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Box } from "@material-ui/core";
import { Card as MuiCard } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Image from "next/image";

const StyledPaper = withStyles((theme) => ({
  root: {
    maxWidth: 250,
    height: "auto",
    position: "relative",
  },
}))(Paper);

const LimitedBackdrop = withStyles((theme) => ({
  root: {
    maxWidth: 250,
    height: "auto",
    opacity: 0.5,
    position: "absolute",
    zIndex: 1,
  },
}))(Backdrop);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: "auto",
  },
  outerDiv: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  rootOne: {
    margin: theme.spacing(2),
    width: 250,
    height: "auto",
    position: "relative",
  },
  backDrop: {
    minWidth: 185,
    minHeight: 180,
    backgroundColor: "primary",
    padding: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  title: {
    color: theme.palette.secondary.dark,
  },
  headerTitle: {
    color: theme.palette.secondary.dark,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export default function Card(props) {
  const { id, name, title, price, url, children, varient, desc } = props;
  const classes = useStyles();

  const priceDisplay = price && price.length ? "\u20B9 " + price : "";
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardOne = (
    <div className={classes.outerDiv}>
      <StyledPaper>
        <MuiCard className={classes.root} key={id}>
          <CardHeader
            variant="h3"
            title={title && title.length ? title : name}
            subheader={priceDisplay}
            classes={{
              subheader: classes.headerTitle,
            }}
            action={
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            }
          />
          <CardMedia title={title}>
            <Image
              src={url && url.length ? url : "/images/logo.png"}
              alt={title}
              width="300"
              height="150"
            />
          </CardMedia>

          <LimitedBackdrop
            open={expanded}
            onClick={(e) => handleExpandClick(!expanded)}
          >
            {/* <Box display="flex" style={{justifyContent:"center"}}> */}
            <Paper elevation={3} className={classes.backDrop}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  color="secondary"
                  onClick={(e) => handleExpandClick(!expanded)}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Box>

              <Typography variant="h3" color="secondary">
                {title}
              </Typography>
              <Typography>{desc}</Typography>
            </Paper>
            {/* </Box> */}
          </LimitedBackdrop>

          {children}
        </MuiCard>
      </StyledPaper>
    </div>
  );

  const cardTwo = (
    <MuiCard className={classes.rootOne} key={id}>
      <CardHeader
        // titleTypographyProps={{ variant: `${varient}` || "h4" }}
        title={title && title.length ? title : name}
      />
      <CardMedia
        className={classes.media}
        image={url && url.length ? url : "/images/logo.png"}
        title={title}
      />
    </MuiCard>
  );

  return desc && desc.length ? cardOne : cardTwo;
}
