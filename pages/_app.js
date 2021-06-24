import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import "react-toastify/dist/ReactToastify.css";
import { createFirestoreInstance } from "redux-firestore";
import AppFooter from "../components/layout/AppFooter";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import TopHeader from "../components/layout/TopHeader";
import InitialLoading from "../components/loading/InitialLoading";
import theme from "../constants/theme";
import { newStore } from "../store";
import { firebase, firestore } from "../utils/firebase";

const ReactReduxFirebaseProvider = dynamic(() =>
  import("react-redux-firebase").then((mod) => mod.ReactReduxFirebaseProvider)
);

function MyApp({ Component, pageProps }) {
  const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
    updateProfileOnLogin: false,
  };

  const store = newStore();
  const rrfProps = {
    firebase,
    firestore,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

  // store.subscribe(
  //   throttle(() => {
  //     saveState(store.getState().storeItems);
  //   }, 1000)
  // );

  function AuthIsLoaded({ children }) {
    const auth = useSelector((state) => state.firebase.auth);
    if (!isLoaded(auth)) return <InitialLoading />;

    var condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      if (!isLoaded(auth)) return <InitialLoading />;
      return children;
    } else {
      return <InitialLoading />;
    }
  }

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyles/> */}
        <CssBaseline />
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
              <AuthIsLoaded>
                <TopHeader />
                <Header />
                <Component {...pageProps} />
                <AppFooter />
              </AuthIsLoaded>
            </Container>
          </ReactReduxFirebaseProvider>
        </Provider>
      </ThemeProvider>
    </Layout>
  );
}

export default React.memo(MyApp);
