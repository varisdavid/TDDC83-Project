import React from "react";

import MainNav from "./MainNav";
import AuthNav from "./AuthNav";

import logo from "../assets/logo.svg"

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="mr-4">
            <img height="25" width="25" src={logo} alt="Logo" />
          </div>
          <MainNav />
          <AuthNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;