import React, { useEffect, useState } from 'react';
import HeroVideo from '../components/HeroVideo/HeroVideo';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import TrustBadges from '../components/TrustBadges/TrustBadges';
import VehicleCard from '../components/VehicleCard/VehicleCard';
import FinanceWizard from '../components/FinanceWizard/FinanceWizard';
import { fetchInventory } from '../services/api';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  price: number;
  image: string;
  specs?: Record<string, string>;
};

const HomePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory().then(setVehicles).catch(console.error);
  }, []);

  const handleFinance = (id: string) => setSelectedVehicle(id);
  const closeWizard = () => setSelectedVehicle(null);

  const trustBadges = [
    { label: 'HPI Checked' },
    { label: '60 Point Inspection' },
    { label: '12 Month MOT' },
    { label: 'FCA Regulated' },
  ];

  return (
    <div className="bg-darkBg min-h-screen text-white">
      <HeroVideo />
      <SearchPanel onChange={(f) => console.log('filters', f)} />
      <TrustBadges badges={trustBadges} />
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} onFinanceClick={handleFinance} />
        ))}
      </section>
      {selectedVehicle && (
        <FinanceWizard vehicleId={selectedVehicle} onClose={closeWizard} />
      )}
    </div>
  );
};

export default HomePage;
