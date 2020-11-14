import React from "react";

import { NavBar, Hero, HomeContent, Footer } from "../components";

const Home = () => {


  

  return (
    <>
      <NavBar />
        <div className="container flex-grow-1">
          <Hero />
          <hr />
          <HomeContent />
        </div>
      <Footer />
    </>
  );
}; 

export default Home;