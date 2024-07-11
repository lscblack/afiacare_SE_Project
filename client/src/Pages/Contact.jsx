import React from 'react'
import Header from '../Components/Header'
import ContactHero from '../Components/ContactHero'
import Team from '../Components/Team'
import ContactItem from '../Components/ContactItem'
import Footer from '../Components/Footer'

function Contact() {
  return (
    <div>
      <Header />
      <div>
        <ContactHero />
      </div>
      <div>
       <ContactItem />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Contact
