import React, { Component } from "react";
import Image from "next/image";
import Link from "../Link";

class Logo extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          marginTop: 10

        }}
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Thalibhojan Logo"
            width="130"
            height="60"
          />
        </Link>
        
      </div>
    );
  }
}

export default Logo;
