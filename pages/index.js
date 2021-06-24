import dynamic from "next/dynamic";
import React from "react";
import AppCTA from "../components/views/AppCTA";
import AppValues from "../components/views/AppValues";
import Banner from "../components/views/Banner";

const Menus = dynamic(() => import("../components/views/Menus"));

export default function Home() {
  return (
    <>
      <Banner />
      <AppValues />
      <Menus />
      <AppCTA />
    </>
  );
}
