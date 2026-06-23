import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Showroom } from './pages/Showroom';
import { VehicleDetail } from './pages/VehicleDetail';
import { PartExchangePage } from './pages/PartExchangePage';
import { SubServicesPages } from './pages/SubServicesPages';

type Route = 
  | 'home'
  | 'showroom'
  | 'vehicle-detail'
  | 'part-exchange'
  | 'warranty'
  | 'servicing'
  | 'team'
  | 'finance';

export function App() {
  const [route, setRoute] = useState<Route>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  
  // Search parameters passed from Homepage Smart Search to Showroom
  const [searchParams, setSearchParams] = useState({
    searchQuery: '',
    make: '',
    model: '',
    fuel: '',
    transmission: '',
    bodyStyle: '',
    budget: ''
  });

  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash;
      
      // Reset scroll to top on every route change
      window.scrollTo(0, 0);

      if (hash.startsWith('#/vehicle/')) {
        const id = hash.replace('#/vehicle/', '');
        setSelectedVehicleId(id);
        setRoute('vehicle-detail');
      } else if (hash.startsWith('#/part-exchange/')) {
        const id = hash.replace('#/part-exchange/', '');
        setSelectedVehicleId(id);
        setRoute('part-exchange');
      } else if (hash === '#/part-exchange') {
        setSelectedVehicleId('');
        setRoute('part-exchange');
      } else if (hash.startsWith('#/showroom')) {
        // Parse parameters from hash e.g. #/showroom?make=Audi
        const queryStr = hash.split('?')[1] || '';
        const params = new URLSearchParams(queryStr);
        const makeParam = params.get('make') || '';
        const fuelParam = params.get('fuel') || '';
        const transmissionParam = params.get('transmission') || '';
        const bodyStyleParam = params.get('bodyStyle') || '';
        const budgetParam = params.get('budget') || '';
        
        setSearchParams({
          searchQuery: '',
          make: makeParam,
          model: '',
          fuel: fuelParam,
          transmission: transmissionParam,
          bodyStyle: bodyStyleParam,
          budget: budgetParam
        });
        setRoute('showroom');
      } else if (hash === '#/warranty') {
        setRoute('warranty');
      } else if (hash === '#/servicing') {
        setRoute('servicing');
      } else if (hash === '#/team') {
        setRoute('team');
      } else if (hash === '#/finance') {
        setRoute('finance');
      } else {
        // Fallback for homepage and simple anchor links (e.g. #contact, #showroom slider)
        setRoute('home');
      }
    };

    // Initial parse
    parseHashRoute();

    window.addEventListener('hashchange', parseHashRoute);
    return () => window.removeEventListener('hashchange', parseHashRoute);
  }, []);

  // Handler for searches initiated from Homepage
  const handleHomeSearch = (params: typeof searchParams) => {
    setSearchParams(params);
    window.location.hash = '#/showroom';
  };

  const handleSelectVehicle = (id: string) => {
    window.location.hash = `#/vehicle/${id}`;
  };

  const handleNavigateToPartExchange = (vehicleId: string) => {
    window.location.hash = `#/part-exchange/${vehicleId}`;
  };

  const handleNavigateToShowroom = () => {
    // Reset search params on direct showroom visits
    setSearchParams({
      searchQuery: '',
      make: '',
      model: '',
      fuel: '',
      transmission: '',
      bodyStyle: '',
      budget: ''
    });
    window.location.hash = '#/showroom';
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow">
        {route === 'home' && (
          <Home 
            onSearch={handleHomeSearch} 
            onSelectVehicle={handleSelectVehicle}
          />
        )}
        
        {route === 'showroom' && (
          <Showroom
            initialSearchQuery={searchParams.searchQuery}
            initialMake={searchParams.make}
            initialModel={searchParams.model}
            initialFuel={searchParams.fuel}
            initialTransmission={searchParams.transmission}
            initialBodyStyle={searchParams.bodyStyle}
            initialBudget={searchParams.budget}
            onSelectVehicle={handleSelectVehicle}
          />
        )}

        {route === 'vehicle-detail' && (
          <VehicleDetail
            vehicleId={selectedVehicleId}
            onBack={() => window.location.hash = '#/showroom'}
            onNavigateToPartExchange={handleNavigateToPartExchange}
          />
        )}

        {route === 'part-exchange' && (
          <PartExchangePage
            vehicleId={selectedVehicleId}
            onNavigateToVehicle={handleSelectVehicle}
            onNavigateToShowroom={handleNavigateToShowroom}
          />
        )}

        {route === 'warranty' && (
          <SubServicesPages type="warranty" onNavigateToShowroom={handleNavigateToShowroom} />
        )}

        {route === 'servicing' && (
          <SubServicesPages type="servicing" onNavigateToShowroom={handleNavigateToShowroom} />
        )}

        {route === 'team' && (
          <SubServicesPages type="team" onNavigateToShowroom={handleNavigateToShowroom} />
        )}

        {route === 'finance' && (
          <SubServicesPages type="finance-info" onNavigateToShowroom={handleNavigateToShowroom} />
        )}
      </main>

      <Footer />
    </div>
  );
}