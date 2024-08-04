import React from "react";
import Hero from "./Hero";
import Categorie from "./Categorie";
import Villes from "./Villes";
import NextEvent from "./NextEvent";
import Collaborer from "./Collaborer";

function Home() {
  return (
    <div className=" min-h-screen">
      <Hero />
      <Categorie />
      <Villes />
      <NextEvent />
      <Collaborer />
    </div>
  );
}

export default Home;
