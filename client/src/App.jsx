import { useState } from "react";
import "./App.css";
import ScrollAnimation from 'react-animate-on-scroll';
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Card from "./Components/Card";
import About from "./Components/About";
import Mission from "./Components/Mission";
function App() {
  return (
    <>
      <div>
        <Header/>
        <Hero />
        <About />
        <Card />
        <Mission />

      </div>
    </>
  );
}

export default App;
