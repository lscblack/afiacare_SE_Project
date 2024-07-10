import { useState } from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Card from "../Components/Card";
import About from "../Components/About";
import Mission from "../Components/Mission";
import HowItWorks from "../Components/HowItWorks";
function Home() {
  return (
    <>
      <div>
        {/* thi */}
       
        <Header/>
        <div>
        <Hero />
        </div>
        <div>
        <About />
        </div>
        <div>
        <Card />
        </div>
        <div>
        <Mission />
        </div>
        <div>
        <HowItWorks/>
        </div>
       
      </div>
    </>
  );
}

export default Home;