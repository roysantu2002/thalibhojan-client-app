import Head from "next/head";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";
// import globalStyles from '../../constants/global'

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Thalibhojan - Best Known Thali Meals</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Thalibhojan - the best know Thali Meals Provider in Kolkata"
        />
        <meta
          name="og:title"
          property="og:title"
          content="Thalibhojan - Thali Meals"
        ></meta>
        <meta name="twitter:card" content="Thalibhojan - Thali Meals"></meta>
        <link rel="canonical" href="https://thalibhojan.com/"></link>
      </Head>

      {children}
      {/* <style jsx global>
        {globalStyles}
      </style> */}
      <ToastContainer transition={Slide} limit={3} />
    </React.Fragment>
  );
};
export default Layout;
