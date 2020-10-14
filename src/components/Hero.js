import React from "react";

// import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero">
    {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
    <h1 className="mb-4">HeartByte</h1>
    <p className="lead">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Donec dictum laoreet placerat. Aenean vestibulum urna eu tempor ornare. 
      Praesent bibendum purus at fermentum euismod. Integer id varius lectus. 
      Ut eget gravida mauris. 
      In consectetur lectus lacus, nec eleifend augue egestas sit amet. {" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://tddc88-company-website.herokuapp.com/"
      >
        About us
      </a>
    </p>
  </div>
);

export default Hero;