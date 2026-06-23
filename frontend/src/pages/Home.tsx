import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SmartSearch } from '../components/SmartSearch';
import { FeaturedVehicles } from '../components/FeaturedVehicles';
import { WhyBuy } from '../components/WhyBuy';
import { Reviews } from '../components/Reviews';
import { FinanceJourney } from '../components/FinanceJourney';
import { PartExchange } from '../components/PartExchange';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
export function Home() {
  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SmartSearch />
        <FeaturedVehicles />
        <WhyBuy />
        <Reviews />
        <FinanceJourney />
        <PartExchange />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>);

}