import React, { Fragment } from "react";

import { NavBar, Hero, HomeContent, Footer } from "../components";

const Home = () => (
  <Fragment>
    <NavBar />
      <div className="container flex-grow-1">
        <Hero />
        <hr />
        <HomeContent />
      </div>
    <Footer />
  </Fragment>
);

export default Home;