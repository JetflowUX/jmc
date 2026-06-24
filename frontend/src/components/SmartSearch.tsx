import React, { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  monthly: string;
  fuel: string;
  transmission: string;
  bodyStyle: string;
}

interface SmartSearchProps {
  onSearch: (params: {
    searchQuery: string;
    make: string;
    model: string;
    fuel: string;
    transmission: string;
    bodyStyle: string;
    budget: string;
  }) => void;
}

export function SmartSearch({ onSearch }: SmartSearchProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [budget, setBudget] = useState('');
  const [bodyStyle, setBodyStyle] = useState('');
  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');

  // Fetch inventory
  useEffect(() => {
    fetch('/mock-data/inventory.json')
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));
  }, []);

  // Compute unique dropdown options
  const makes = useMemo(() => Array.from(new Set(vehicles.map((v) => v.make))).sort(), [vehicles]);
  
  const models = useMemo(() => {
    if (!make) return [];
    return Array.from(new Set(vehicles.filter((v) => v.make === make).map((v) => v.model))).sort();
  }, [vehicles, make]);

  const bodyStyles = useMemo(() => Array.from(new Set(vehicles.map((v) => v.bodyStyle))).sort(), [vehicles]);
  const fuels = useMemo(() => Array.from(new Set(vehicles.map((v) => v.fuel))).sort(), [vehicles]);
  const transmissions = useMemo(() => Array.from(new Set(vehicles.map((v) => v.transmission))).sort(), [vehicles]);

  // Compute matching count dynamically
  const matchedCount = useMemo(() => {
    return vehicles.filter((v) => {
      if (make && v.make !== make) return false;
      if (model && v.model !== model) return false;
      if (fuel && v.fuel !== fuel) return false;
      if (transmission && v.transmission !== transmission) return false;
      if (bodyStyle && v.bodyStyle !== bodyStyle) return false;
      if (budget) {
        const monthlyCost = parseInt(v.monthly.replace(/[^\d]/g, ''), 10);
        if (!isNaN(monthlyCost)) {
          if (budget === '300' && monthlyCost > 300) return false;
          if (budget === '500' && monthlyCost > 500) return false;
          if (budget === '800' && monthlyCost > 800) return false;
        }
      }
      return true;
    }).length;
  }, [vehicles, make, model, fuel, transmission, bodyStyle, budget]);

  const handleSearchSubmit = () => {
    onSearch({
      searchQuery: '',
      make,
      model,
      fuel,
      transmission,
      bodyStyle,
      budget
    });
  };

  return (
    <section className="relative z-30 -mt-10 md:-mt-24 max-w-7xl mx-auto px-6 md:px-12 mb-24 animate-fade-in">
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-border">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-serif font-normal text-text mb-1">
              Smart Vehicle Search
            </h2>
            <p className="text-textMuted text-sm font-medium">
              Find your perfect match from our premium selection
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary font-bold text-sm">
              {vehicles.length} Vehicles Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {/* Make Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Make
            </label>
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel(''); // reset model
              }}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="">Any Make</option>
              {makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Model Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!make}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors appearance-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="">Any Model</option>
              {models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Monthly Budget */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Monthly Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="">Any Budget</option>
              <option value="300">Up to £300/mo</option>
              <option value="500">Up to £500/mo</option>
              <option value="800">Up to £800/mo</option>
            </select>
          </div>

          {/* Body Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Body Type
            </label>
            <select
              value={bodyStyle}
              onChange={(e) => setBodyStyle(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="">Any Type</option>
              {bodyStyles.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Fuel */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Fuel
            </label>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="">Any Fuel</option>
              {fuels.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Transmission */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">
              Transmission
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="">Any</option>
              {transmissions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border">
          <button
            onClick={handleSearchSubmit}
            className="text-textMuted hover:text-primary text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={16} /> More Filters
          </button>
          
          <button
            onClick={handleSearchSubmit}
            className="w-full sm:w-auto bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-glow cursor-pointer"
          >
            <Search size={18} />
            Show {matchedCount} Vehicles
          </button>
        </div>
      </div>
    </section>
  );
}