import React from "react";
import { useDispatch } from "react-redux";

//m-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  ButtonGroup,
  Button,
  CardMedia,
  Paper,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Icons
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

// import {
//   addToCart,
//   deleteCartItem,
//   removeCartItem,
// } from "../redux/actions/dataActions";
import MyButton from "./MyButton";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 250,
    maxHeight: 100,
  },
  media: {
    // this is the`className` passed to `CardMedia` later
    height: 100, // as an example I am modifying width and height
    width: "33%",
    marginLeft: "33%",
  },

  root: {
    display: "flex",
    margin: theme.spacing(2)
  },
  details: {
    display: "flex",
    flexDirection: "space-between",
    width: "100%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
  },
  itemTotal: {
    ...theme.mixins.gutters(),
    maxWidth: "70",
    display: "flex",
    // justifyContent: "wrap",
    marginLeft: "70%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "2%",
      marginRight: "2%",
    },
    marginTop: "10px",
  },

  imgCover: {
    height: 100,
    width: 120,
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
      height: 70,
      width: 80,
    },
    margin: theme.spacing(2),
    borderRadius: 16,
  },
}));

export default function CartItem(props) {
  const classes = useStyles();
  const {
    quantity,
    title,
    price,
    desc,
    url,
    id,
    removeFoodItem,
    addItem,
    subtractItem,
  } = props;
  // const imageUrlSplit = url.split("\\");
  // const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}/${imageUrlSplit[1]}`;

  const dispatch = useDispatch();

  // const handleAddItem = () => {
  //   const itemData = {
  //     itemId: _id,
  //   };
  //   dispatch(addToCart(itemData));
  // };

  // const handleDeleteItem = () => {
  //   const itemData = {
  //     itemId: _id,
  //   };
  //   dispatch(deleteCartItem(itemData));
  // };

  // const handleRemoveItem = () => {
  //   dispatch(removeCartItem(_id));
  // };

  return (
    // <Grid item xs={12}>
    //   <Grid container justify="center" spacing={2}>
    //   <Grid item xs={12} >

    // <Grid item xs={12}>
      <Card className={classes.root}>
        <img src={url} className={classes.imgCover} alt={desc} />

        <Grid item xs={8}>
          <CardContent>
            <Typography variant="subtitle2">{desc}</Typography>
            {/* <span> &nbsp; {"\u20B9"}  {price * quantity}</span> */}
            <Typography variant="subtitle2">
              &nbsp; {"\u20B9"} {price} x {quantity}
            </Typography>

            <Typography variant="subtitle2">
              &nbsp; {"\u20B9"} {price * quantity}
            </Typography>

            <ButtonGroup  className={classes.itemTotal}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={(e) => addItem(id)}
              >
                <AddIcon />
              </Button>
              <Button size="small" onClick={(e) => removeFoodItem(id)}>
                <DeleteIcon />
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={(e) => subtractItem(id)}
              >
                <RemoveIcon />
              </Button>
            </ButtonGroup>
          </CardContent>
        </Grid>
      </Card>
    // </Grid>
  );
}
