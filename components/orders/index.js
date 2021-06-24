import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Paper,
  Grid,
  Card,
  ButtonGroup,
  Button,
  Box
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import OrderCard from "./OrderCard";
import {
  getOrders,
  getAllOrders,
  socketStatusUpdate,
} from "../../store/actions/orderActions";
import dayjs from "dayjs";
import api from "../../api/api.js";
import relativeTime from "dayjs/plugin/relativeTime";
import moment from "moment";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import io from "socket.io-client";
import throttle from "lodash/throttle";
import ClearIcon from "@material-ui/icons/Clear";

import OrderDetails from "./OrderDetails";
const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing(3),
    // marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
  },
  paper: {
    ...theme.mixins.gutters(),
    marginTop: 8,
    padding: 2,
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  container: {
    height: "80px",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    // marginTop: theme.spacing(1),
    padding: theme.spacing(0.3),
    // fontSize: ".8em",
  },
  button: {
    // padding: theme.spacing(1),
    // [theme.breakpoints.down("md")]: {
    //   marginBottom: ".5em",
    // },
  },

  activeButton: {
    // padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    // [theme.breakpoints.down("md")]: {
    //   marginBottom: ".5em",
    //   color: "#ffffff",
    // },
  },
  text: {
    color: "#ffffff",
    fontSize: "0.7rem",
    [theme.breakpoints.down("md")]: {
      color: theme.palette.secondary.dark,
    },
  },
  normalText: {
    fontSize: "0.8rem",
  },
  buttongroup: {
    ...theme.mixins.gutters(),
    margin: theme.spacing(2),
    padding: theme.spacing(2),

    // backgroundColor: theme.palette.success.dark,
    // maxWidth: 250,
    // margin: "auto",
    // marginLeft: "auto",
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(2),
    // textTransform: "none"
  },
  spaceTypo: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Orders = (props) => {
  const classes = useStyles();

  // const { uid, role } = props;

  // console.log(role);

  const auth = useSelector((state) => state.firebase.auth);
  const role = useSelector((state) => state.firebase.profile.role);
  const loading = useSelector((state) => state.orderReducer.loading);
  const orders = useSelector((state) => state.orderReducer.orders);
  const [searchKey, setSearchKey] = useState("");
  // let allorders = useSelector((state) => state.orderReducer.sellerorders);

  let socket;
  // let uid = auth.uid;
  const router = useRouter();

  dayjs.extend(relativeTime);
  // const [loading, setLoading] = useState(false);
  // const [userOrders, setUserOrders] = useState([]);
  // const [sellerOrders, setSellerOrders] = useState([]);

  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState("today");

  const buttons = ["today", "history"];

  // const [orders, setOrders] = useState(false);
  // const role = firebase.profile.role;
  // const role = "ROLE_SELLER"

  const [searchList, setSearchList] = useState();

  // if (role === "ROLE_SELLER") {
  // dispatch(getAllOrders(uid));
  // }
  // if (role === "ROLE_USER") {
  //   dispatch(getOrders(uid));
  // }

  const [initialized, setInitialized] = useState(false);

  // const getData = async () => {
  //   if (role === "ROLE_SELLER") {
  //     dispatch(getAllOrders(uid));
  //   }
  //   if (role === "ROLE_USER") {
  //     dispatch(getOrders(uid));
  //   }
  //   setInitialized(true);
  // };

  useEffect(() => {
    console.log(searchKey);
    // orders && setSearchList(orders);
    let x = orders;
    x = x.filter((y) => {
      return y.orderNumber.includes(searchKey);
    });

    // x = x.filter((y) => {
    //   var given = moment(moment(y.createdAt).format("YYYY-MM-DD"));
    //   var current = moment().startOf("day");
    //   const recentOrders = moment.duration(given.diff(current)).asDays()
    //   console.log(recentOrders)
    //   if (Math.abs(recentOrders) <= 1) {
    //     return y;
    //   }
    // });
    setSearchList(x);
  }, [searchKey]);

  let filteredOrders = searchList && searchList.length ? searchList : orders;

  const clickedButtonHandler = (name) => {
    setActiveButton(name);
  };

  // const clickedButtonHandler = (name) => {
  //   setActiveButton(name);
  //   let x = orders;

  //   if (name === "today") {
  //     x = x.filter((y) => {
  //       var given = moment(moment(y.createdAt).format("YYYY-MM-DD"));
  //       var current = moment().startOf("day");
  //       //Difference in number of days
  //       const recentOrders = moment.duration(given.diff(current)).asDays();

  //       console.log(Math.abs(recentOrders));
  //       if (Math.abs(recentOrders) <= 1) {
  //         return y;
  //       }
  //       return y;
  //     });
  //     setSearchList(x);
  //   }
  //   if (name === "3days") {
  //     x = x.filter((y) => {
  //       var given = moment(moment(y.createdAt).format("YYYY-MM-DD"));
  //       var current = moment().startOf("day");
  //       //Difference in number of days
  //       const recentOrders = moment.duration(given.diff(current)).asDays();

  //       console.log(Math.abs(recentOrders));
  //       if (Math.abs(recentOrders) <= 4) {
  //         return y;
  //       }
  //     });
  //     setSearchList(x);
  //   }

  //   if (name === "7days") {
  //     x = x.filter((y) => {
  //       var given = moment(moment(y.createdAt).format("YYYY-MM-DD"));
  //       var current = moment().startOf("day");
  //       //Difference in number of days
  //       const recentOrders = moment.duration(given.diff(current)).asDays();

  //       console.log(Math.abs(recentOrders));
  //       if (Math.abs(recentOrders) <= 7) {
  //         return y;
  //       }
  //     });
  //     setSearchList(x);
  //   }
  //   if (name === "all") {
  //     setSearchList(orders);
  //   }
  //   // else{
  //   //   setOrderList(x)
  //   // }
  // };

  console.log(activeButton);

  useEffect(() => {
    if (role !== "") {
      dispatch(getAllOrders(auth.uid, { filter: activeButton }));
    }
  }, [role, activeButton, auth.uid, dispatch]);

  useEffect(() => {
    if (role !== "") {
      dispatch(getAllOrders(auth.uid, { filter: "today" }));
    }

    // dispatch(getAllOrders(auth.uid, { filter: activeButton }));
    const socket = io(process.env.REACT_APP_SERVER_URL);
    socket.emit("add-user", { userId: auth.uid });

    // if (role !== "") {
    //   dispatch(getAllOrders(auth.uid, { filter: activeButton }));
    //   // dispatch(getAllOrders(auth.uid));
    // }
    // if (role === "ROLE_USER") {
    //   dispatch(getOrders(uid));
    // }

    // props.getOrders(uid)
    // console.log(process.env.REACT_APP_SERVER_URL);

    socket.on("orders", (data) => {
      console.log(data);

      socket.on("orders", (data) => {
        if (data.action === "update") {
          dispatch(socketStatusUpdate(data.order));
        }

        if (data.action === "create") {
          dispatch(getAllOrders(auth.uid && auth.uid, { filter: "all" }));
          // dispatch(getAllOrders(auth.uid && auth.uid, { filter: activeButton }));
          // dispatch(getAllOrders(auth.uid, { filter: activeButton }));
        }
      });

      // if (role === "ROLE_SELLER") {
      //   dispatch(getAllOrders(uid));
      //   dispatch(getAllOrders(uid));
      // }
      // if (role === "ROLE_USER") {
      //   dispatch(getOrders(uid));
      //   dispatch(getOrders(uid));
      // }

      clickedButtonHandler("today");
    });
  }, []);

  console.log(orders);

  // console.log(allorders)
  // useEffect(() => {
  //   dispatch(getAllOrders(uid));
  //   dispatch(getOrders(uid));

  // }, [role, dispatch, uid]);

  // useEffect(() => {
  //   dispatch(getAllOrders(uid));
  //   dispatch(getOrders(uid));

  // if (role === "ROLE_SELLER") {
  //   dispatch(getAllOrders(uid));
  // }
  // if (role === "ROLE_USER") {
  //   dispatch(getOrders(uid));
  // }

  //   //   // if (role === "ROLE_SELLER")
  //   //   // dispatch(getOrders(uid));
  //   //   // dispatch(getAllOrders(uid));

  //   //   // try {
  //   //   //   const socket = openSocket(process.env.REACT_APP_SERVER_URL);
  //   //   //   socket.emit("add-user", { userId: uid });
  //   //   //   socket.on("orders", (data) => {
  //   //   //     console.log(data);
  //   //   //     if (data.action === "update") {
  //   //   //       dispatch(socketStatusUpdate(data.order));
  //   //   //     }

  //   //   //     if (firebase.profile.role === "ROLE_USER") {
  //   //   //       if (data.action === "create") {
  //   //   //         dispatch(getOrders(uid));
  //   //   //       } else {
  //   //   //         dispatch(getOrders(uid));
  //   //   //       }
  //   //   //     }
  //   //   //     if (firebase.profile.role === "ROLE_SELLER") {
  //   //   //       if (data.action === "create") {
  //   //   //         dispatch(getAllOrders(uid));
  //   //   //       } else {
  //   //   //         dispatch(getAllOrders(uid));
  //   //   //       }
  //   //   //     }
  //   //   //   });
  //   //   // } catch (e) {
  //   //   //   console.log(e);
  //   //   // }
  // }, [role, uid, orders, allorders, dispatch]);

  // console.log(orders);
  // let retrivedOrders = role === "ROLE_SELLER" ? sellerOrders : userOrders;

  // useEffect(() => {
  //   let x = orders;
  //   x = x.filter((y) => {
  //     return y.orderNumber.includes(searchKey);
  //   });
  //   setSearchList(x);
  // }, [searchKey]);

  // let filteredOrders = orders;

  // const onInputChange = (e) => {
  //   const toLowerCase = e.target.value;
  //   // console.log(toLowerCase)
  //   setSearchKey(toLowerCase);
  //   // console.log("In");
  //   if (searchKey.length > 0) {
  //     console.log(searchKey);
  //     const newMenu = orders.filter((item) => {
  //       return item.orderNumber.includes(searchKey);
  //     });
  //     setSearchList(newMenu);
  //     // filteredOrders = newMenu;
  //   }
  //   // else {
  //   //   setSearchList(orders);
  //   //   filteredOrders = orders;
  //   // }
  // };

  console.log(searchList);

  // console.log(filteredOrders);

  // console.log(retrivedOrders);
  // useEffect(() => {
  //   setLoading(true);
  //   api
  //     .thaliOrder()
  //     .getOrders(auth.uid)
  //     .then((res) => {
  //       console.log(res.data)
  //       setOrders(res.data);
  //       setLoading(false);
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(true);
  //     });
  // }, [auth.uid]);

  // const authPage = (
  //   <>
  //     <Grid container spacing={2} justify="center" className={classes.root}>
  //       <Grid item xs={12}>
  //         <Paper className={classes.paper} elevation={2}>
  //           <Typography variant="h5" className={classes.title}>
  //             Order History
  //           </Typography>

  //           <Grid item xs={12}>
  //             <Typography className={classes.title}>Filter Orders</Typography>
  //           </Grid>

  //           <ButtonGroup>
  //             {buttons.map((name) => (
  //               <Button
  //                 name={name}
  //                 className={
  //                   activeButton === name ? `${classes.activeButton}` : ""
  //                 }
  //                 onClick={() => clickedButtonHandler(name)}
  //               >
  //                 {name}
  //               </Button>
  //             ))}
  //             {/* <Button value="all" id="all" name="all">
  //               {" "}
  //               ALL
  //             </Button>
  //             <Button onClick={showRecent}> Recent</Button>
  //             <Button id="old" name="old">
  //               {" "}
  //               History
  //             </Button> */}
  //           </ButtonGroup>
  //           {/* {firebase.profile.role === "ROLE_SELLER" ? <SearchBar /> : null} */}

  //           <Grid item xs={12} sm={10}>
  //             {loading ? (
  //               <CircularProgress />
  //             ) : (
  //               <Grid container spacing={2}>
  //                 {orderList &&
  //                   orderList.map((order) => (
  //                     <Grid item xs={12} sm={4} key={order._id}>
  //                       <OrderCard
  //                         order={order}
  //                         role={firebase.profile.role}
  //                         auth={auth}
  //                         clickedButtonHandler={clickedButtonHandler}
  //                       />
  //                     </Grid>
  //                   ))}
  //               </Grid>
  //             )}
  //           </Grid>
  //         </Paper>
  //       </Grid>
  //     </Grid>

  //     {/* <Paper className={classes.paper}>
  //           <Grid item>
  //             <Typography
  //               variant="h2"
  //               marked="center"
  //               align="center"
  //               component="h2"
  //             >
  //               Order History
  //             </Typography>
  //           </Grid>
  //           <Grid item>
  //             {loading ? (
  //               <CircularProgress />
  //             ) : (
  //               <>
  //                 {orders &&
  //                   orders.map((order) => (
  //                     <Card style={{ display: "flex" }}>
  //                       <p>
  //                         <Typography variant="h4" color="primary">
  //                           {" "}
  //                           order number{" "}
  //                         </Typography>{" "}
  //                         <Typography> #{order.orderNumber}</Typography>
  //                       </p>
  //                     </Card>
  //                   ))}
  //               </>
  //             )}
  //           </Grid>
  //         </Paper>
  //       </Grid>
  //     </Grid> */}
  //   </>
  // );

  return auth.uid ? (
    <>
      <Grid container spacing={2} justify="center" className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={2}>

          <Typography component="div" variant="body1">
              <Box bgcolor="primary.main" p={2} border={2}>
                <Typography variant="h2" color="secondary.main">
                Order History
                  </Typography>
                  </Box>
                  </Typography>
         

            <Grid item xs={12}>
              <ButtonGroup
                size="small"
                class={classes.buttongroup}
                variant="contained"
                color="primary"
              >
                {buttons.map((name) => (
                  <Button
                    key={name}
                    name={name}
                    className={
                      activeButton === name
                        ? `${classes.activeButton}`
                        : `${classes.button}`
                    }
                    onClick={() => clickedButtonHandler(name)}
                  >
                    {activeButton === name ? (
                      <Typography variant="" className={classes.title}>
                        {" "}
                        {name}
                      </Typography>
                    ) : (
                      <Typography variant="" className={classes.normalText}>
                        {name}
                      </Typography>
                    )}
                  </Button>
                ))}
                {/* <Button value="all" id="all" name="all">
                {" "}
                ALL
              </Button>
              <Button onClick={showRecent}> Recent</Button>
              <Button id="old" name="old">
                {" "}
                History
              </Button> */}
              </ButtonGroup>
            </Grid>
            {role === "ROLE_SELLER" ? (
              <Grid item container>
                {loading ? (
                  <Grid item xs={12}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  <>
                    <SearchBar
                      searchKey={searchKey}
                      setSearchKey={setSearchKey}
                      classes={classes.spaceTypo}
                    >
                      {<ClearIcon onClick={(e) => setSearchKey("")} />}
                    </SearchBar>

                    {orders && orders ? <OrderDetails orders={orders} /> : null}

                    {/* <Grid item xs={12}> */}
                    {/* <Grid container spacing={2}> */}
                    {filteredOrders &&
                      filteredOrders.map((order) => (
                        <Grid item xs={12} sm={4} key={order._id}>
                          <OrderCard
                            order={order}
                            role={role}
                            auth={auth}
                            // clickedButtonHandler={clickedButtonHandler}
                          />
                        </Grid>
                      ))}
                    {/* </Grid> */}
                  </>
                )}
              </Grid>
            ) : (
              <Grid item container direction="row">
                <Grid item xs={12} sm={1} />
                <Grid item xs={12} sm={10}>
                  <Grid container spacing={2}>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Grid container spacing={2}>
                        <SearchBar
                          // value={searchKey}
                          searchKey={searchKey}
                          setSearchKey={setSearchKey}
                        >
                          {<ClearIcon onClick={(e) => setSearchKey("")} />}
                        </SearchBar>

                        {filteredOrders &&
                          filteredOrders.map((order) => (
                            <Grid item xs={12} sm={4} key={order._id}>
                              <OrderCard
                                order={order}
                                role={role}
                                auth={auth}
                                clickedButtonHandler={clickedButtonHandler}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* <Paper className={classes.paper}>
            <Grid item>
              <Typography
                variant="h2"
                marked="center"
                align="center"
                component="h2"
              >
                Order History
              </Typography>
            </Grid>
            <Grid item>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {orders &&
                    orders.map((order) => (
                      <Card style={{ display: "flex" }}>
                        <p>
                          <Typography variant="h4" color="primary">
                            {" "}
                            order number{" "}
                          </Typography>{" "}
                          <Typography> #{order.orderNumber}</Typography>
                        </p>
                      </Card>
                    ))}
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid> */}
    </>
  ) : (
    router.push("/signin")
    // { redirect: { destination: "/signin", permanent: false } }
  );
};

// export const GetServerSideProps = async ({

//   dispatch(get)
//   params,
//   res
// }) => {
//   try {
//     const { id } = params;
//     const result = await fetch(`http://localhost:3000/api/user/${id}`);
//     const data: Data = await result.json();

//     return {
//       props: { data }
//     };
//   } catch {
//     res.statusCode = 404;
//     return {
//       props: {}
//     };
//   }
// };

// Orders.getInitialProps({reduxStore}) {
//   const state = reduxStore.getState()
//   const auth = state.firebase.auth
//   console.log(auth)
//   if (auth.uid) {
//     return {
//       user : auth.uid
//     };
//   }
// };

// const mapStateToProps = (state) => ({
//   // orders: state.orderReducer.orders,
//   uid: state.firebase.auth.uid,
//   role: state.firebase.profile.role,
// });

// const mapDispatchToProps = (dispatch) => {
//   // console.log(uid);
//   return {
//     getOrders: (uid) => dispatch(getAllOrders(uid)),
//     // increment: () => dispatch(increment()),
//     // decrement: () => dispatch(decrement()),
//     // reset: () => dispatch(reset())
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Orders);

export default Orders;
