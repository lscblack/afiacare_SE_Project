import { useEffect } from "react";
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
import Footer from "../Components/Footer.jsx";

function Home() {
  return (
    <>
      <div>
        <Header />
        <div > {/* Corrected this line */}
          <Hero />
        </div>
        <div > {/* Add AOS to other sections as needed */}
          <About />
        </div>
        <div>
          <Card />
        </div>
        <div>
          <Mission />
        </div>
        <div>
          <HowItWorks />
        </div>
        <div >
          <WhyChooseUs />
        </div>
        <div >
          <GetInvolved />
        </div>
        <div >
          <FAQ />
        </div>
        <div >
          <ClientSlider />
        </div>
        <div >
          <TrustedBySlider />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
