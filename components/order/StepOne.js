/* eslint-disable no-lone-blocks */
import {
  Box,
  Button,
  ButtonGroup,
  CardActions,
  Container,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeItem,
  subtractQuantity,
} from "../../store/actions/storeActions";
import { options } from "../../store/data/menus";
import { roundTo2DecimalPoint } from "../../utils/helpers";
import { Card } from "../controls";
import Float from "./float";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    display: "wrap",
    "&::placeholder": {
      color: "Black",
      fontStyle: "italic",
      fontSize: "1.2em",
      [theme.breakpoints.down("md")]: {
        fontSize: 10,
      },
    },
  },
  drawerIcon: {
    height: "30px",
    width: "30px",
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
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    alignItems: "center",
  },

  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },

  submitButtonGroup: {
    zIndex: -1,
    position: "absolute",
    fontSize: "1.5em",
    [theme.breakpoints.down("md")]: {
      fontSize: "1em",
    },
    backgroundColor: theme.palette.primary.main,
    color: "#000",
    margin: theme.spacing(2),
    padding: theme.spacing(1),
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
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#f3b33d",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
    submitButtonGroup: {
      textTransform: "uppercase",
      color: "#ffffff",
      fontSize: "1em",
      [theme.breakpoints.down("md")]: {
        fontSize: ".8em",
      },
      backgroundColor: theme.palette.secondary.main,

      margin: theme.spacing(1),
    },
  },
  fab: {
    position: "fixed",
    zIndex: 2,
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2),
  },
}));

export default function OrderForm(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [searchList, setSearchList] = useState([]);
  const addedItems = useSelector((state) => state.storeItems.addedItems);
  const [loading, setLoading] = useState(false);

  const total = useSelector((state) => state.storeItems.total);

  const { values, setValues, OrderedFoodItems, handleNext } = props;

  let products = [];

  useEffect(() => {
    Object.entries(options).map((menu) =>
      menu[1].forEach((item) => {
        products.push(item);
      })
    );

    let x = [...products];

    x = x.filter((y) => {
      return y.desc.toLowerCase().includes(searchKey.toLocaleLowerCase());
    });

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
    console.log(id);
    setLoading(true);
    dispatch(addToCart(id));
    setLoading(false);
  };

  let existedItem = (id) => {
    return OrderedFoodItems.find((item) => item.id === id);
  };

  useEffect(() => {
    let gTotal =
      values.orderDetails &&
      values.orderDetails.reduce((tempTotal, item) => {
        return tempTotal + item.quantity * item.price;
      }, 0);
    setValues({
      ...values,
      grandTotal: roundTo2DecimalPoint(gTotal),
    });
  }, [values.orderDetails, OrderedFoodItems, addedItems]);

  //-----------removed
  console.log("Step One");
  console.log(values);
  //-----------------

  return (
    <>
      <section className={classes.root}>
        <Container className={classes.container} spacing={1}>
          {values.orderDetails && values.orderDetails.length ? (
            <Float
              gTotal={total}
              handleNext={handleNext}
              orderDetails={values.orderDetails}
              label="Next"
            />
          ) : null}

          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <TextField
                style={{ width: "80%" }}
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
                  <Card
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    price={item.price.toString()}
                    name={item.name}
                    desc={item.desc}
                    url={item.url}
                    varient="h3"
                  >
                    {existedItem && existedItem(item.id) ? (
                      <Box
                        display="flex"
                        style={{ justifyContent: "center" }}
                        p={2}
                        bgcolor="primary.main"
                      >
                        {loading ? (
                          <CircularProgress color="secondary" size={50} />
                        ) : (
                          <ButtonGroup>
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              onClick={(e) => addItem(item.id)}
                            >
                              <AddIcon />
                            </Button>
                            <Button size="small" disabled>
                              {existedItem(item.id).quantity}
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              onClick={(e) => subtractItem(item.id)}
                            >
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
                        style={{ justifyContent: "center" }}
                        p={2}
                        bgcolor="primary.main"
                      >
                        <CardActions disableSpacing>
                          <Button
                            className={classes.button}
                            onClick={(e) => addItem(item.id)}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography variant="h3">ADD TO CART</Typography>
                          </Button>
                        </CardActions>
                      </Box>
                    )}
                  </Card>
                ))
              ) : (
                <Box
                  display="flex"
                  style={{ justifyContent: "center" }}
                  marginTop={4}
                  p={1}
                  bgcolor="primary.main"
                >
                  <Card key={1111} title="No Item Available" id={1111} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}
