import React, { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Gauge, Calendar, Fuel, HelpCircle, RefreshCcw } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  title: string;
  subtitle: string;
  price: number;
  monthly: string;
  mileage: string;
  year: string;
  fuel: string;
  transmission: string;
  colour: string;
  bodyStyle: string;
  engineSize: string;
  owners: string;
  registration: string;
  images: string[];
  description: string;
  originalUrl?: string;
}

interface ShowroomProps {
  initialSearchQuery?: string;
  initialMake?: string;
  initialModel?: string;
  initialFuel?: string;
  initialTransmission?: string;
  initialBodyStyle?: string;
  initialBudget?: string;
  onSelectVehicle: (id: string) => void;
}

export function Showroom({
  initialSearchQuery = '',
  initialMake = '',
  initialModel = '',
  initialFuel = '',
  initialTransmission = '',
  initialBodyStyle = '',
  initialBudget = '',
  onSelectVehicle
}: ShowroomProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedMake, setSelectedMake] = useState(initialMake);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selectedFuel, setSelectedFuel] = useState(initialFuel);
  const [selectedTransmission, setSelectedTransmission] = useState(initialTransmission);
  const [selectedBodyStyle, setSelectedBodyStyle] = useState(initialBodyStyle);
  const [budgetLimit, setBudgetLimit] = useState(initialBudget); // "300", "500", "800", etc.
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const itemsPerPage = 9;

  // Load Inventory
  useEffect(() => {
    fetch('/mock-data/inventory.json')
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load inventory data:', err);
        setLoading(false);
      });
  }, []);

  // Sync initial props
  useEffect(() => {
    if (initialSearchQuery) setSearchQuery(initialSearchQuery);
    if (initialMake) {
      setSelectedMake(initialMake);
      setSelectedModel(initialModel);
    }
    if (initialFuel) setSelectedFuel(initialFuel);
    if (initialTransmission) setSelectedTransmission(initialTransmission);
    if (initialBodyStyle) setSelectedBodyStyle(initialBodyStyle);
    if (initialBudget) setBudgetLimit(initialBudget);
  }, [initialSearchQuery, initialMake, initialModel, initialFuel, initialTransmission, initialBodyStyle, initialBudget]);

  // Unique lists from inventory
  const makes = useMemo(() => Array.from(new Set(vehicles.map((v) => v.make))).sort(), [vehicles]);
  
  const modelsForSelectedMake = useMemo(() => {
    if (!selectedMake) return [];
    return Array.from(new Set(vehicles.filter((v) => v.make === selectedMake).map((v) => v.model))).sort();
  }, [vehicles, selectedMake]);

  const fuels = useMemo(() => Array.from(new Set(vehicles.map((v) => v.fuel))).sort(), [vehicles]);
  const transmissions = useMemo(() => Array.from(new Set(vehicles.map((v) => v.transmission))).sort(), [vehicles]);
  const bodyStyles = useMemo(() => Array.from(new Set(vehicles.map((v) => v.bodyStyle))).sort(), [vehicles]);

  // Reset page when filters change
  const handleFilterChange = (filterSetter: (val: string) => void, val: string) => {
    filterSetter(val);
    setCurrentPage(1);
  };

  const handleMakeChange = (makeVal: string) => {
    setSelectedMake(makeVal);
    setSelectedModel(''); // Reset model
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedFuel('');
    setSelectedTransmission('');
    setSelectedBodyStyle('');
    setBudgetLimit('');
    setSortBy('price-asc');
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((vehicle) => {
        // Search query (matches title, subtitle, spec, description)
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = vehicle.title.toLowerCase().includes(q);
          const matchSubtitle = vehicle.subtitle.toLowerCase().includes(q);
          const matchMake = vehicle.make.toLowerCase().includes(q);
          const matchModel = vehicle.model.toLowerCase().includes(q);
          if (!matchTitle && !matchSubtitle && !matchMake && !matchModel) return false;
        }

        // Dropdowns
        if (selectedMake && vehicle.make !== selectedMake) return false;
        if (selectedModel && vehicle.model !== selectedModel) return false;
        if (selectedFuel && vehicle.fuel !== selectedFuel) return false;
        if (selectedTransmission && vehicle.transmission !== selectedTransmission) return false;
        if (selectedBodyStyle && vehicle.bodyStyle !== selectedBodyStyle) return false;

        // Monthly Budget
        if (budgetLimit) {
          // Parse vehicle monthly e.g. "£234" -> 234
          const monthlyPayment = parseInt(vehicle.monthly.replace(/[^\d]/g, ''), 10);
          if (isNaN(monthlyPayment)) return true; // keep if no monthly spec

          if (budgetLimit === '300' && monthlyPayment > 300) return false;
          if (budgetLimit === '500' && monthlyPayment > 500) return false;
          if (budgetLimit === '800' && monthlyPayment > 800) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort logics
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        
        // Year sorting
        const yearA = parseInt(a.year, 10) || 0;
        const yearB = parseInt(b.year, 10) || 0;
        if (sortBy === 'year-desc') return yearB - yearA;

        // Mileage sorting
        const mileA = parseInt(a.mileage.replace(/[^\d]/g, ''), 10) || 0;
        const mileB = parseInt(b.mileage.replace(/[^\d]/g, ''), 10) || 0;
        if (sortBy === 'mileage-asc') return mileA - mileB;

        return 0;
      });
  }, [vehicles, searchQuery, selectedMake, selectedModel, selectedFuel, selectedTransmission, selectedBodyStyle, budgetLimit, sortBy]);

  // Paginated vehicles
  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVehicles, currentPage]);

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  // Return loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center pt-24">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-textMuted">Loading Showroom Inventory...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Vehicle Showroom</h1>
          <p className="text-textMuted text-lg">
            Explore our curated inventory of {vehicles.length} premium pre-owned vehicles. Guaranteed quality with a full 60-point inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-primary" /> Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-textMuted hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RefreshCcw size={12} /> Clear All
                </button>
              </div>

              {/* Text Search */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">Search Keyword</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Audi, A3, Petrol..."
                    value={searchQuery}
                    onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-all"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                </div>
              </div>

              {/* Make Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">Make</label>
                <select
                  value={selectedMake}
                  onChange={(e) => handleMakeChange(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Make</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Model Filter (enabled only if make is selected) */}
              {selectedMake && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => handleFilterChange(setSelectedModel, e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-all"
                  >
                    <option value="">Any Model</option>
                    {modelsForSelectedMake.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Budget Limit */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">Monthly Budget</label>
                <select
                  value={budgetLimit}
                  onChange={(e) => handleFilterChange(setBudgetLimit, e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Budget</option>
                  <option value="300">Up to £300/mo</option>
                  <option value="500">Up to £500/mo</option>
                  <option value="800">Up to £800/mo</option>
                </select>
              </div>

              {/* Fuel Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">Fuel Type</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => handleFilterChange(setSelectedFuel, e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Fuel</option>
                  {fuels.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">Transmission</label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => handleFilterChange(setSelectedTransmission, e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Transmission</option>
                  {transmissions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Body Style Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">Body Style</label>
                <select
                  value={selectedBodyStyle}
                  onChange={(e) => handleFilterChange(setSelectedBodyStyle, e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Body Style</option>
                  {bodyStyles.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Side Trust Banner */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
              <h4 className="font-semibold text-white mb-2">Total Peace of Mind</h4>
              <p className="text-textMuted text-xs leading-relaxed">
                All vehicles at {DEALERSHIP_DETAILS.shortName} receive a rigorous 60-point safety check, 12 months MOT, and a professional valet before delivery.
              </p>
            </div>
          </aside>

          {/* Vehicle Grid & Sorting */}
          <main className="lg:col-span-3 space-y-8">
            {/* Top Bar (Results count + Sorting + Mobile Filter button) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface/50 border border-white/5 px-6 py-4 rounded-2xl">
              <div>
                <p className="text-sm text-textMuted">
                  Showing <span className="text-white font-bold">{filteredVehicles.length}</span> matching vehicles
                </p>
              </div>

              <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-surfaceHighlight hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={16} className="text-textMuted" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surfaceHighlight border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-all"
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="year-desc">Year: Newest First</option>
                    <option value="mileage-asc">Mileage: Lowest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredVehicles.length === 0 ? (
              <div className="glass-panel rounded-2xl p-16 text-center border border-white/5 space-y-4">
                <HelpCircle size={48} className="text-textMuted mx-auto" />
                <h3 className="text-xl font-bold text-white">No Matching Vehicles Found</h3>
                <p className="text-textMuted max-w-md mx-auto">
                  We couldn't find any vehicles that match your exact query. Try loosening your filters or resetting the search.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary hover:bg-primaryHover text-white px-6 py-2.5 rounded-full font-medium transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedVehicles.map((vehicle) => {
                  const hasImage = vehicle.images && vehicle.images.length > 0;
                  const displayImage = hasImage
                    ? vehicle.images[0]
                    : 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop';

                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="group bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-glow flex flex-col justify-between h-full cursor-pointer"
                    >
                      {/* Image Frame */}
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-black flex items-center justify-center">
                        <img
                          src={displayImage}
                          alt={vehicle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-xs font-semibold text-white">
                          {vehicle.year}
                        </div>
                        {vehicle.price < 10000 && (
                          <div className="absolute top-3 right-3 bg-green-500/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-semibold text-white">
                            Great Value
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                      </div>

                      {/* Content Frame */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors">
                              {vehicle.make}
                            </h3>
                            <span className="text-lg font-extrabold text-white shrink-0">
                              £{vehicle.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-textMuted line-clamp-1 mb-4">{vehicle.model} - {vehicle.subtitle}</p>

                          {/* Quick Specs Grid */}
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center gap-2 bg-surfaceHighlight/50 border border-white/5 p-2 rounded-xl text-xs text-white/90">
                              <Gauge size={13} className="text-textMuted" />
                              <span className="truncate">{vehicle.mileage}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surfaceHighlight/50 border border-white/5 p-2 rounded-xl text-xs text-white/90">
                              <Fuel size={13} className="text-textMuted" />
                              <span className="truncate">{vehicle.fuel}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surfaceHighlight/50 border border-white/5 p-2 rounded-xl text-xs text-white/90 col-span-2">
                              <Calendar size={13} className="text-textMuted" />
                              <span className="truncate">{vehicle.transmission} • {vehicle.bodyStyle}</span>
                            </div>
                          </div>
                        </div>

                        {/* Cost & Action Panel */}
                        <div className="border-t border-white/5 pt-4 mt-auto">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <p className="text-[10px] text-textMuted leading-none mb-1">Finance estimated</p>
                              <p className="text-sm font-bold text-primary">
                                {vehicle.monthly} <span className="text-[10px] font-normal text-textMuted">/mo</span>
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-white/95 group-hover:underline decoration-primary underline-offset-4 flex items-center gap-1">
                              View Details <ChevronRight size={14} className="text-primary" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                  className="bg-surfaceHighlight border border-white/10 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-surfaceHighlight p-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="text-sm text-textMuted">
                  Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="bg-surfaceHighlight border border-white/10 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-surfaceHighlight p-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer Overlay */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setIsMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-80 max-w-full bg-background border-l border-white/10 p-6 overflow-y-auto flex flex-col justify-between h-full z-10 animate-slide-in ml-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-primary" /> Filters
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-sm font-semibold text-textMuted hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80 uppercase">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Audi, Diesel..."
                      value={searchQuery}
                      onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                      className="w-full bg-surface border border-white/15 rounded-xl pl-9 pr-4 py-2 text-sm text-white"
                    />
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                  </div>
                </div>

                {/* Make */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80 uppercase">Make</label>
                  <select
                    value={selectedMake}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="">Any Make</option>
                    {makes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                {selectedMake && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/80 uppercase">Model</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => handleFilterChange(setSelectedModel, e.target.value)}
                      className="w-full bg-surface border border-white/15 rounded-xl px-3 py-2 text-sm text-white"
                    >
                      <option value="">Any Model</option>
                      {modelsForSelectedMake.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80 uppercase">Monthly Budget</label>
                  <select
                    value={budgetLimit}
                    onChange={(e) => handleFilterChange(setBudgetLimit, e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="">Any Budget</option>
                    <option value="300">Up to £300/mo</option>
                    <option value="500">Up to £500/mo</option>
                    <option value="800">Up to £800/mo</option>
                  </select>
                </div>

                {/* Fuel */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80 uppercase">Fuel Type</label>
                  <select
                    value={selectedFuel}
                    onChange={(e) => handleFilterChange(setSelectedFuel, e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="">Any Fuel</option>
                    {fuels.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Transmission */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80 uppercase">Transmission</label>
                  <select
                    value={selectedTransmission}
                    onChange={(e) => handleFilterChange(setSelectedTransmission, e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="">Any Transmission</option>
                    {transmissions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Body Style */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/80 uppercase">Body Style</label>
                  <select
                    value={selectedBodyStyle}
                    onChange={(e) => handleFilterChange(setSelectedBodyStyle, e.target.value)}
                    className="w-full bg-surface border border-white/15 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="">Any Body Style</option>
                    {bodyStyles.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex gap-4 mt-8">
              <button
                onClick={() => {
                  clearFilters();
                  setIsMobileFiltersOpen(false);
                }}
                className="flex-1 bg-surfaceHighlight hover:bg-white/10 text-white py-3 rounded-xl text-sm font-medium transition-colors border border-white/10"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 bg-primary hover:bg-primaryHover text-white py-3 rounded-xl text-sm font-medium transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
