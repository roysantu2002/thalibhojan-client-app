import React from "react";
import { useDispatch } from "react-redux";

//m-ui
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, ButtonGroup, Button } from "@material-ui/core";
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
  root: {
    display: "flex",
    margin: 4,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
  },
  itemTotal: {
    marginLeft: "65%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "5%",
      marginRight: "1%",
    },
    marginTop: "10px",
  },
  imgCover: { height: 184, width: 184 },
}));

export default function CartItem(props) {
  const classes = useStyles();
  const { quantity, title, price, desc, url, id, removeFoodItem, addItem, subtractItem} = props;
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
    <>
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.root} variant="outlined">
            <div className={classes.imgCover}>
              <img src={url} height="184" width="180" alt="Item" />
            </div>

            <div className={classes.details}>
              <CardContent>
                <Typography component="h5" variant="h5">
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" noWrap>
                  {desc}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {"\u20B9"} &nbsp; {price} x {quantity}
                </Typography>
                <div className={classes.buttons}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {"\u20B9"} &nbsp; {price * quantity}
                  </Typography>
                </div>

                <div className={classes.itemTotal}>
                  <ButtonGroup>
                    <Button onClick={(e) => addItem(id)}>
                      <AddIcon />
                    </Button>
                  
                    <Button onClick={(e) => subtractItem(id)}>
                      <RemoveIcon />
                    </Button>

                    <Button onClick={(e) => removeFoodItem(id)}>
                      <DeleteIcon color="secondary" />
                    </Button>
                  </ButtonGroup>
                  {/* <MyButton tip="Remove Item">
                    <RemoveIcon style={{ color: "#f44336" }} />
                  </MyButton>
                  <MyButton tip="Add Item">
                    <AddIcon style={{ color: "green" }} />
                  </MyButton>
                  <MyButton tip="Delete Item">
                    <DeleteIcon style={{ color: "#f44336" }} />
                  </MyButton> */}
                  {/*              
                    </div>
                    <div className={classes.buttons}> */}
                  {/* <Typography
                    variant="body1"
                    color="textPrimary"
                    className={classes.itemTotal}
                  >
                    {"\u20B9"} &nbsp; {price * quantity}
                  </Typography> */}
                </div>
              </CardContent>
            </div>
          </Card>
          <br />
        </Grid>
      </Grid>
    </>
  );
}
