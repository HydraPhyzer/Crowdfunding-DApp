import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Body from "./Components/Body";


const App = () => {

  return (
    <section className="flex flex-col justify-between h-[100vh]">
      <section className="h-[10%] m-2">
        <Header />
      </section>
      <section className="h-[100%] m-2">
        <Body />
      </section>
      <section className="h-[10%] m-2">
        <Footer />
      </section>
    </section>
  );
};

export default App;
