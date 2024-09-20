import React from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeTemplate;
