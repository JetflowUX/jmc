import React from 'react';
import { Hero } from '../components/Hero';
import { SmartSearch } from '../components/SmartSearch';
import { FeaturedVehicles } from '../components/FeaturedVehicles';
import { WhyBuy } from '../components/WhyBuy';
import { Reviews } from '../components/Reviews';
import { FinanceJourney } from '../components/FinanceJourney';
import { PartExchange } from '../components/PartExchange';
import { About } from '../components/About';
import { Contact } from '../components/Contact';

interface HomeProps {
  onSearch: (params: {
    searchQuery: string;
    make: string;
    model: string;
    fuel: string;
    transmission: string;
    bodyStyle: string;
    budget: string;
  }) => void;
  onSelectVehicle: (id: string) => void;
}

export function Home({ onSearch, onSelectVehicle }: HomeProps) {
  return (
    <div className="w-full">
      <Hero />
      <SmartSearch onSearch={onSearch} />
      <FeaturedVehicles onSelectVehicle={onSelectVehicle} />
      <WhyBuy />
      <Reviews />
      <FinanceJourney />
      <PartExchange />
      <About />
      <Contact />
    </div>
  );
}