import React from "react";

import Navbar from "./Navbar";
import "./styles/Layout.css";

function Layout(props) {
  const children = props.children;

  return (
    <section>
      <Navbar />
      {props.children}
    </section>
  );
}

export default Layout;
