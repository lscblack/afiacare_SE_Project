import { useState } from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Card from "../Components/Card";
import About from "../Components/About";
import Mission from "../Components/Mission";
import HowItWorks from "../Components/HowItWorks";
import WhyChooseUs from "../Components/WhyChooseUs";
import GetInvolved from "../Components/GetInvolved";
import FAQ from "../Components/FAQ.jsx";
import ClientSlider from "../Components/ClientSlider.jsx";
import TrustedBySlider from "../Components/TrustedBy.jsx";
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
       <div>
        <WhyChooseUs />
       </div>
       <div>
        <GetInvolved />
       </div>
       <div>
        <FAQ />
       </div>
       <div>
        <ClientSlider />
       </div>
       <div>
        <TrustedBySlider />
       </div>
      </div>
    </>
  );
}

export default Home;