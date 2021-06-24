import React from "react";
import {useDispatch} from "react-redux";
import {
  List,
  ListItemText,
  Paper,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  ButtonGroup,
  Button,
  makeStyles,
  Badge,
} from "@material-ui/core";
import clsx from "clsx";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { roundTo2DecimalPoint } from "../../utils/helpers";
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Toolbar, Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import { Card } from "../controls";
import Backdrop from "@material-ui/core/Backdrop";
import { removeItem, addQuantityWithNumber } from '../../store/actions/storeActions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
    backgroundColor: theme.palette.secondary.dark,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.spacing(0.2),
    margin: theme.spacing(0.2),
    "& .MuiButtonBase-root ": {},
    "& button:nth-child(2)": {
      color: "White",
      backgroundColor: theme.palette.secondary.light
    },
  },

  totalPerItem: {
    fontWeight: "bolder",
    fontSize: ".9em",
    margin: "0px 2px",
  },


  gridList: {
    width: "100%",
    height: "100%",
    flexWrap: "nowrap",
    transform: "translateZ(0)",
   
  },

  titleBar: {
    position: "absolute",

    fontWeight: "bold",
    color: "#FE3939",
  },
  title: {
    color: "#FE3939",
  },

}));

export default function OrderedFoodItems(props) {
  const { values, setValues, OrderedFoodItems } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  let orderedFoodItems = values.orderDetails;

  const removeFoodItem = (index, id) => {
    dispatch(removeItem(id))
 
    let x = { ...values };
    x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
    if (id !== 0) x.deletedOrderItemIds += id + ",";
    setValues({ ...x });
  };

  const updateQuantity = (id, value) => {
    dispatch(addQuantityWithNumber(id, value))

  };

  return (
    <>
      <Badge
        badgeContent={OrderedFoodItems.length ? OrderedFoodItems.length : "0"}
        color="primary"
      >
        <Avatar>
          <AddShoppingCartIcon />
        </Avatar>
      </Badge>

      {orderedFoodItems.length === 0 ? (
        <Card
          key={111}
          id={111}
          price=""
          name={"Your Cart is empty"}
          url="/images/empty-cart.png"
        />
      ) : (
        OrderedFoodItems.map((item, id) => (
          <Card
            key={item.id}
            id={item.id}
            price={item.price}
            name={item.name}
            url={item.url}
            desc={item.desc + item.id}
          >
            <ButtonGroup className={classes.buttonGroup}>
              <Button onClick={(e) => updateQuantity(item.id, -1)}>
                <RemoveIcon />
              </Button>
              <Button disabled>{item.quantity}</Button>
              <Button onClick={(e) => updateQuantity(item.id, 1)}>
                <AddIcon />
              </Button>
            </ButtonGroup>
            <Box
              marginLeft="auto"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button onClick={(e) => removeFoodItem(id, item.id)}>
                <DeleteIcon color="secondary"/>
              </Button>
              <Button>
                <span className={classes.totalPerItem}>
                  {"\u20B9 " + roundTo2DecimalPoint(item.quantity * item.price)}
                </span>
              </Button>
            </Box>
         
          </Card>
        ))
      )}
    </>
  );
}
