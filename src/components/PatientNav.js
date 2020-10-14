import { NavLink } from "react-router-dom";
import React from "react";

const PatientNav = () => (
  <div className="navbar-nav mr-auto">
    <NavLink
      to=""
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Mätvärden
    </NavLink>
    <NavLink
      to="/patient"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Översikt
    </NavLink>
    <NavLink
      to=""
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Läkemedelslista
    </NavLink>
    <NavLink
      to=""
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Kalender
    </NavLink>

    <NavLink
      to=""
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Symtomskattning
    </NavLink>
  </div>
);

export default PatientNav;