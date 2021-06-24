import React, { useState, useEffect } from "react";

// import { createAPIEndpoint, ENDPIONTS } from "../../api";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  InputBase,
  IconButton,
  makeStyles,
  ListItemSecondaryAction,
  Typography,
  Button,
} from "@material-ui/core";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useSelector, useDispatch } from "react-redux";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { Card } from "../controls";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Box, CardActions, Grid, ButtonGroup } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import InfoIcon from "@material-ui/icons/Info";
import { Select } from "../controls";
import AddToCart from "../common/AddToCart";
import Container from "@material-ui/core/Container";
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "../Link";
import {
  removeItem,
  addQuantityWithNumber,
  addToCart,
  subtractQuantity,
} from "../../store/actions/storeActions";
import { roundTo2DecimalPoint } from "../../utils/helpers";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import CircularProgress from "@material-ui/core/CircularProgress";

const tPortions = [
  { id: "none", title: "Portion" },
  { id: "5", title: "5 Portion" },
  { id: "8", title: "8 Portion" },
];
const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  displayPaper: {
    margin: theme.spacing(4),
    marginLeft: "auto",
  },
  options: {
    marginLeft: "auto",
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(2),
    flex: 1,
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 350,
    overflow: "auto",
    backgroundColor: "#000000",
    color: "White",
    border: 1,
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.primary.dark,
    },
    "& li:hover .MuiButtonBase-root": {
      display: "block",
      color: "#000",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
    },
  },
  listTxt: {
    [theme.breakpoints.down("sm")]: {
      fontSize: ".2em",
      display: "inline",
    },
  },
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    display: "flex",
    overflow: "hidden",
  },
  gridList: {
    width: "auto",
    height: "auto",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  customButton: {
    margin: theme.spacing(1),
    borderRadius: 15,
    width: 200,
    textTransform: "none",
    fontSize: ".8rem",
    color: "white",
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function SearchFoodItems(props) {
  const { values, setValues } = props;
  console.log(values);
  const dispatch = useDispatch();
  // let orderedFoodItems = values.orderDetails;

  const { addThali, OrderedFoodItems, handleInputChange, errors } = props;

  console.log(OrderedFoodItems);
  const [foodItems, setFoodItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  // const catalog = useSelector((state) => state.storeItems.catalog);
  const options = useSelector((state) => state.storeItems.options);
  let products = [];
  // useEffect(() => {
  //     createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll()
  //         .then(res => {
  //             setFoodItems(res.data);
  //             setSearchList(res.data);
  //         })
  //         .catch(err => console.log(err))

  // }, [])

  // const updateQuantity = (id, value) => {
  //   dispatch(addQuantityWithNumber(id, value));
  //   // console.log(values);
  //   // let x = { ...values };
  //   // let foodItem = x.orderDetails[id];
  //   // if (foodItem.quantity + value > 0) {
  //   //   foodItem.quantity += value;
  //   //   if (foodItem.quantity > 10) {
  //   //     foodItem.quantity = 10;
  //   //   }
  //   //   setValues({ ...x });
  //   // }
  // };
  useEffect(() => {
    // for(var i = 0; i < catalog.thalis.length; i++)
    // {
    //     var product = catalog.thalis[i];
    //     products.push(product)
    // }

    Object.entries(options).map((menu) =>
      menu[1].forEach((item) => {
        products.push(item);
      })
    );
    // setSearchList(products);
    let x = [...products];

    x = x.filter((y) => {
      return y.desc.toLowerCase().includes(searchKey.toLocaleLowerCase());
      // y.desc.toLowerCase().includes(searchKey.toLocaleLowerCase()) &&
      // OrderedFoodItems.every((item) => item.id !== y.id)
    });

    console.log(x);
    setSearchList(x);
  }, [searchKey]);

  const removeFoodItem = (id) => {
    setLoading(true);
    dispatch(removeItem(id));
    setLoading(false);
  };

  const subtractItem = (id) => {
    setLoading(true);
    dispatch(subtractQuantity(id));
    setLoading(false);
  };
  const addItem = (id) => {
    console.log(id)
    setLoading(true);
    dispatch(addToCart(id));
    setLoading(false);
  };

  let existedItem = (id) => {
    // console.log(OrderedFoodItems.find((item) => item.id === id));
    // return OrderedFoodItems.find((item) => item.id === id);
    return OrderedFoodItems.find((item) => item.id === id);
  };

  return (
    <section className={classes.root}>
      <Container className={classes.container} spacing={1}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <TextField
                style={{ width: "50%" }}
                placeholder="Search for thali"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {searchList && searchList.length ? (
                searchList.map((item) => (
<>
                  {/* <ListItem key={ Math.random().toString(36).substr(2, 9) } onClick={(e) => addThali(item)} >
                  <ListItemAvatar>
                    <Avatar src={item.url} alt={item.name} >
                    </Avatar>
                  </ListItemAvatar> 
                  <ListItemText />
                  <Typography className="listTxt">{item.name}</Typography>
                  <ListItemSecondaryAction>
                    <IconButton onClick={(e) => addThali(item)}>
                      <PlusOneIcon />
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem> */}

                  <Card
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    price={item.price}
                    name={item.name}
                    desc={item.desc}
                    url={item.url}
                  >
                    {existedItem && existedItem(item.id) ? (
                      <Box
                        display="flex"
                        style={{justifyContent:"center"}}
                        p={2}
                        bgcolor="primary.main"
                      >
                        {loading ? (
                          <CircularProgress color="secondary" size={50} />
                        ) : (
                          <ButtonGroup>
                            <Button onClick={(e) => addItem(item.id)}>
                              <AddIcon />
                            </Button>
                            <Button disabled>
                              {existedItem(item.id).quantity}
                            </Button>
                            <Button onClick={(e) => subtractItem(item.id)}>
                              <RemoveIcon />
                            </Button>

                            <Button onClick={(e) => removeFoodItem(item.id)}>
                              <DeleteIcon color="secondary" />
                            </Button>
                          </ButtonGroup>
                        )}
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        style={{justifyContent:"center"}}
                        p={2}
                        bgcolor="primary.main"
                      >
                        <CardActions disableSpacing>
                          <Button
                            className={classes.button}
                            onClick={(e) => addItem(item.id)}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography variant="button">
                              ADD TO CART
                            </Typography>
                          </Button>
                          {/* <AddToCart data={item}></AddToCart> */}
                        </CardActions>
                      </Box>
                    )}
                  </Card>
                  </>
                ))
              ) : (
                <Box
                  display="flex"
                  style={{justifyContent:"center"}}
                  marginTop={4}
                  p={1}
                  bgcolor="primary.main"
                >
                  <Card key={1111} title="No Item Available" id={1111} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
