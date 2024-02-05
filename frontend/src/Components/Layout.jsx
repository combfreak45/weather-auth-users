import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="h-screen ">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
