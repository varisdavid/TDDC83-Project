import React from "react";

import logo from '../../assets/logo.svg'

const Footer = () => (
  <footer className="p-5 align-middle text-center h-40 bg-gray-300">
    <div className="mt-2">
      <img className="m-auto" height="25" width="25" src={logo} alt="Logo" />
    </div>
    <p>
      {" "}
      <a target="_blank" rel="noopener noreferrer" href="https://tddc88-company-website.herokuapp.com/">
        About Us
      </a>
    </p>
  </footer>
);

export default Footer;