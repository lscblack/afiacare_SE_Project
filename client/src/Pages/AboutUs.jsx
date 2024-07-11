import React from 'react'
import Header from '../Components/Header'
import WhoWeAre from '../Components/WhoWeAre'
import Mission from '../Components/Mission'
import Vision from '../Components/Vision'
import OurValues from '../Components/Values'
import Team from '../Components/Team'
import OurJourney from '../Components/OurJourney'
import WhyChooseUs from '../Components/WhyChooseUs'
import GetInvolved from '../Components/GetInvolved'
import Footer from '../Components/Footer'
function AboutUs() {
  return (
    <div>
      <Header />
      <div>
        <WhoWeAre />
      </div>
      <div>
        <Mission />
      </div>
      <div>
        <Vision />
      </div>
      <div>
        <OurValues />
      </div>
      <div>
        <Team />
      </div>
      <div>
        <OurJourney />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <GetInvolved />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default AboutUs
