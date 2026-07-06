import React, { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Gauge, Calendar, Fuel, HelpCircle, RefreshCcw, LayoutGrid, List, Scale, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareList, setCompareList] = useState<Vehicle[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (vehicle: Vehicle, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compareList.some(x => x.id === vehicle.id)) {
      setCompareList(compareList.filter(x => x.id !== vehicle.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare a maximum of 3 vehicles at a time.");
        return;
      }
      setCompareList([...compareList, vehicle]);
    }
  };

  const parseNaturalLanguage = (query: string) => {
    const q = query.toLowerCase();
    
    // Check Makes (longest first)
    const sortedMakes = [...makes].sort((a, b) => b.length - a.length);
    const matchedMake = sortedMakes.find(m => q.includes(m.toLowerCase()));
    if (matchedMake) {
      setSelectedMake(matchedMake);
      setSelectedModel('');
    }
    
    // Check Transmissions
    const matchedTrans = transmissions.find(t => q.includes(t.toLowerCase()));
    if (matchedTrans) {
      setSelectedTransmission(matchedTrans);
    }
    
    // Check Fuel Types (longest first)
    const sortedFuels = [...fuels].sort((a, b) => b.length - a.length);
    const matchedFuel = sortedFuels.find(f => q.includes(f.toLowerCase()));
    if (matchedFuel) {
      setSelectedFuel(matchedFuel);
    } else if (q.includes('hybrid')) {
      // Fallback: find first hybrid option
      const hybridOption = fuels.find(f => f.toLowerCase().includes('hybrid'));
      if (hybridOption) setSelectedFuel(hybridOption);
    }
    
    // Check Body Styles
    const matchedBody = bodyStyles.find(b => q.includes(b.toLowerCase()));
    if (matchedBody) {
      setSelectedBodyStyle(matchedBody);
    }
    
    // Check Budgets
    if (q.includes('300')) {
      setBudgetLimit('300');
    } else if (q.includes('500')) {
      setBudgetLimit('500');
    } else if (q.includes('800')) {
      setBudgetLimit('800');
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    parseNaturalLanguage(val);
    setCurrentPage(1);
  };

  const activePills = useMemo(() => {
    const pills = [];
    if (selectedMake) pills.push({ name: `Make: ${selectedMake}`, clear: () => { setSelectedMake(''); setSelectedModel(''); } });
    if (selectedModel) pills.push({ name: `Model: ${selectedModel}`, clear: () => setSelectedModel('') });
    if (selectedFuel) pills.push({ name: `Fuel: ${selectedFuel}`, clear: () => setSelectedFuel('') });
    if (selectedTransmission) pills.push({ name: `Trans: ${selectedTransmission}`, clear: () => setSelectedTransmission('') });
    if (selectedBodyStyle) pills.push({ name: `Style: ${selectedBodyStyle}`, clear: () => setSelectedBodyStyle('') });
    if (budgetLimit) pills.push({ name: `Max Budget: £${budgetLimit}/mo`, clear: () => setBudgetLimit('') });
    return pills;
  }, [selectedMake, selectedModel, selectedFuel, selectedTransmission, selectedBodyStyle, budgetLimit]);

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

  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFiltersOpen]);

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

  // Scroll back to the top when pagination page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
        // Search query (matches title, subtitle, spec, description with active keyword stripping)
        if (searchQuery) {
          let cleanQuery = searchQuery.toLowerCase();
          
          if (selectedMake) {
            cleanQuery = cleanQuery.replace(selectedMake.toLowerCase(), '');
          }
          if (selectedModel) {
            cleanQuery = cleanQuery.replace(selectedModel.toLowerCase(), '');
          }
          if (selectedTransmission) {
            cleanQuery = cleanQuery.replace(selectedTransmission.toLowerCase(), '');
          }
          if (selectedFuel) {
            cleanQuery = cleanQuery.replace(selectedFuel.toLowerCase(), '');
            cleanQuery = cleanQuery.replace('hybrid', '');
            cleanQuery = cleanQuery.replace('electric', '');
          }
          if (selectedBodyStyle) {
            cleanQuery = cleanQuery.replace(selectedBodyStyle.toLowerCase(), '');
          }
          
          // Remove budget keyword mappings
          cleanQuery = cleanQuery.replace('under', '').replace('over', '').replace('budget', '').replace('max', '').replace('limit', '').replace('monthly', '').replace('£', '');
          cleanQuery = cleanQuery.replace('300', '').replace('500', '').replace('800', '');
          
          // Tokenize remaining query
          const tokens = cleanQuery.split(/[\s,.-]+/).map(t => t.trim()).filter(t => t.length > 1);
          
          if (tokens.length > 0) {
            const match = tokens.every(token => {
              return vehicle.title.toLowerCase().includes(token) ||
                     vehicle.subtitle.toLowerCase().includes(token) ||
                     vehicle.make.toLowerCase().includes(token) ||
                     vehicle.model.toLowerCase().includes(token) ||
                     vehicle.colour.toLowerCase().includes(token) ||
                     (vehicle.description && vehicle.description.toLowerCase().includes(token));
            });
            if (!match) return false;
          }
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
      <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center pt-24">
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
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Our Vehicle Showroom</h1>
          <p className="text-textMuted text-lg">
            Explore our curated inventory of {vehicles.length} premium pre-owned vehicles. Guaranteed quality with a full 60-point inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-border space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <h3 className="font-semibold text-text text-lg flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-primary" /> Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-textMuted hover:text-primary flex items-center gap-1 transition-colors"
                >
                  <RefreshCcw size={12} /> Clear All
                </button>
              </div>

              {/* Text Search */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Search Keyword</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type search, e.g. automatic white SUV under 500..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                </div>
              </div>

              {/* Make Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Make</label>
                <select
                  value={selectedMake}
                  onChange={(e) => handleMakeChange(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all"
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
                  <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => handleFilterChange(setSelectedModel, e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all"
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
                <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Monthly Budget</label>
                <select
                  value={budgetLimit}
                  onChange={(e) => handleFilterChange(setBudgetLimit, e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Budget</option>
                  <option value="300">Up to £300/mo</option>
                  <option value="500">Up to £500/mo</option>
                  <option value="800">Up to £800/mo</option>
                </select>
              </div>

              {/* Fuel Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Fuel Type</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => handleFilterChange(setSelectedFuel, e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Fuel</option>
                  {fuels.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Transmission</label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => handleFilterChange(setSelectedTransmission, e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Transmission</option>
                  {transmissions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Body Style Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Body Style</label>
                <select
                  value={selectedBodyStyle}
                  onChange={(e) => handleFilterChange(setSelectedBodyStyle, e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Any Body Style</option>
                  {bodyStyles.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Side Trust Banner */}
            <div className="glass-panel rounded-2xl p-6 border border-border bg-gradient-to-br from-primary/5 to-transparent">
              <h4 className="font-semibold text-text mb-2">Total Peace of Mind</h4>
              <p className="text-textMuted text-xs leading-relaxed">
                All vehicles at {DEALERSHIP_DETAILS.shortName} receive a rigorous 60-point safety check, 12 months MOT, and a professional valet before delivery.
              </p>
            </div>
          </aside>

          {/* Vehicle Grid & Sorting */}
          <main className="lg:col-span-3 space-y-8">
            {/* Top Bar (Results count + Sorting + Mobile Filter button) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface border border-border px-6 py-4 rounded-2xl">
              <div>
                <p className="text-sm text-textMuted">
                  Showing <span className="text-text font-bold">{filteredVehicles.length}</span> matching vehicles
                </p>
              </div>

              <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-surfaceHighlight hover:bg-surfaceHighlight/80 border border-border px-4 py-2 rounded-xl text-sm font-medium text-text transition-colors"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                {/* Layout Switcher */}
                <div className="hidden sm:flex items-center border border-border rounded-xl overflow-hidden bg-surface">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-textMuted hover:text-text'}`}
                    title="Grid View"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-primary text-white' : 'text-textMuted hover:text-text'}`}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={16} className="text-textMuted" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-all"
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="year-desc">Year: Newest First</option>
                    <option value="mileage-asc">Mileage: Lowest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filter Pills */}
            {activePills.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center pt-2">
                <span className="text-xs text-textMuted font-semibold">Active filters:</span>
                {activePills.map((pill, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-surfaceHighlight border border-border px-3 py-1 rounded-full text-xs font-medium text-text">
                    <span>{pill.name}</span>
                    <button onClick={pill.clear} className="text-textMuted hover:text-red-500 transition-colors">
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button onClick={clearFilters} className="text-xs text-primary hover:underline font-semibold ml-1">
                  Reset
                </button>
              </div>
            )}

            {/* Results Grid */}
            {filteredVehicles.length === 0 ? (
              <div className="glass-panel rounded-2xl p-16 text-center border border-border space-y-4">
                <HelpCircle size={48} className="text-textMuted mx-auto" />
                <h3 className="text-xl font-bold text-text">No Matching Vehicles Found</h3>
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
              <div className={viewMode === 'list' ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                {paginatedVehicles.map((vehicle) => {
                  const hasImage = vehicle.images && vehicle.images.length > 0;
                  const displayImage = hasImage
                    ? vehicle.images[0]
                    : 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop';

                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className={`group bg-surface rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 shadow hover:shadow-glow flex ${viewMode === 'list' ? 'md:flex-row flex-col md:h-64' : 'flex-col h-full'} cursor-pointer relative`}
                    >
                      {/* Compare Checkbox Overlay */}
                      <div 
                        className="absolute top-3 left-3 z-30 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <label className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-bold text-white cursor-pointer hover:bg-black/80 transition-colors select-none">
                          <input
                            type="checkbox"
                            checked={compareList.some(x => x.id === vehicle.id)}
                            onChange={(e) => toggleCompare(vehicle, e as any)}
                            className="w-3.5 h-3.5 accent-primary cursor-pointer"
                          />
                          Compare
                        </label>
                      </div>

                      {/* Image Frame */}
                      <div className={`relative bg-black flex items-center justify-center overflow-hidden ${viewMode === 'list' ? 'md:w-72 md:h-full shrink-0 w-full h-48' : 'h-48 sm:h-52 w-full'}`}>
                        <img
                          src={displayImage}
                          alt={vehicle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-xs font-semibold text-white">
                          {vehicle.year}
                        </div>
                        {vehicle.price < 10000 && (
                          <div className="absolute top-3 right-3 bg-green-500/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-semibold text-white">
                            Great Value
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-85 pointer-events-none" />
                      </div>

                      {/* Content Frame */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-1">
                            <h3 className="text-lg font-bold text-text leading-tight group-hover:text-primary transition-colors">
                              {vehicle.make}
                            </h3>
                            <span className="text-lg font-extrabold text-text shrink-0">
                              £{vehicle.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-textMuted line-clamp-1 mb-4">{vehicle.model} - {vehicle.subtitle}</p>

                          {/* Quick Specs Grid */}
                          <div className={`grid gap-2 mb-4 ${viewMode === 'list' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
                            <div className="flex items-center gap-2 bg-surfaceHighlight/50 border border-border p-2 rounded-xl text-xs text-text">
                              <Gauge size={13} className="text-textMuted" />
                              <span className="truncate">{vehicle.mileage}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-surfaceHighlight/50 border border-border p-2 rounded-xl text-xs text-text">
                              <Fuel size={13} className="text-textMuted" />
                              <span className="truncate">{vehicle.fuel}</span>
                            </div>
                            <div className={`flex items-center gap-2 bg-surfaceHighlight/50 border border-border p-2 rounded-xl text-xs text-text ${viewMode === 'list' ? '' : 'col-span-2'}`}>
                              <Calendar size={13} className="text-textMuted" />
                              <span className="truncate">{vehicle.transmission}</span>
                            </div>
                          </div>
                        </div>

                        {/* Cost & Action Panel */}
                        <div className="border-t border-border pt-4 mt-auto">
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <p className="text-[10px] text-textMuted leading-none mb-1">Finance estimated</p>
                              <p className="text-sm font-bold text-primary">
                                {vehicle.monthly} <span className="text-[10px] font-normal text-textMuted">/mo</span>
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-text/95 group-hover:underline decoration-primary underline-offset-4 flex items-center gap-1">
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
                  className="bg-surface border border-border hover:bg-surfaceHighlight text-text disabled:opacity-30 disabled:hover:bg-surface p-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="text-sm text-textMuted">
                  Page <span className="text-text font-bold">{currentPage}</span> of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="bg-surface border border-border hover:bg-surfaceHighlight text-text disabled:opacity-30 disabled:hover:bg-surface p-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Compare Drawer Overlay */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-border shadow-2xl py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-sm font-semibold text-text">
                Compare Deck ({compareList.length} of 3 selected)
              </span>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {compareList.map(v => (
                <div key={v.id} className="flex items-center gap-2 bg-surfaceHighlight border border-border px-3 py-1.5 rounded-xl text-xs font-medium text-text">
                  <span className="truncate max-w-[120px]">{v.title}</span>
                  <button 
                    onClick={(e) => toggleCompare(v, e as any)}
                    className="text-textMuted hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareList([])}
                className="text-xs font-semibold text-textMuted hover:text-text px-4 py-2"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                disabled={compareList.length < 2}
                className="bg-primary hover:bg-primaryHover disabled:opacity-40 disabled:hover:bg-primary text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-glow transition-all cursor-pointer"
              >
                Compare Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare side-by-side Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompareModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-surface border border-border/80 shadow-2xl rounded-3xl overflow-hidden p-4 sm:p-6 md:p-10 max-h-[90vh] flex flex-col z-10"
            >
              <button 
                onClick={() => setShowCompareModal(false)}
                className="absolute top-6 right-6 text-textMuted hover:text-text transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-text flex items-center gap-2">
                  <Scale className="text-primary" /> Compare Vehicles
                </h3>
                <p className="text-textMuted text-sm">Side-by-side technical specification comparison.</p>
              </div>

              <div className="overflow-x-auto flex-grow pb-4">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 font-semibold text-textMuted text-xs uppercase tracking-wider w-1/4">Specification</th>
                      {compareList.map(v => (
                        <th key={v.id} className="py-3 px-4 w-1/4">
                          <div className="text-sm font-bold text-text">{v.title}</div>
                          <div className="text-xs text-primary font-extrabold">£{v.price.toLocaleString()}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-sm">
                    <tr>
                      <td className="py-3 px-4 font-medium text-textMuted text-xs uppercase tracking-wider">Year</td>
                      {compareList.map(v => (
                        <td key={v.id} className="py-3 px-4 text-text font-semibold">{v.year}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-textMuted text-xs uppercase tracking-wider">Mileage</td>
                      {compareList.map(v => (
                        <td key={v.id} className="py-3 px-4 text-text font-semibold">{v.mileage}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-textMuted text-xs uppercase tracking-wider">Fuel Type</td>
                      {compareList.map(v => (
                        <td key={v.id} className="py-3 px-4 text-text font-semibold">{v.fuel}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-textMuted text-xs uppercase tracking-wider">Transmission</td>
                      {compareList.map(v => (
                        <td key={v.id} className="py-3 px-4 text-text font-semibold">{v.transmission}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-textMuted text-xs uppercase tracking-wider">Body Style</td>
                      {compareList.map(v => (
                        <td key={v.id} className="py-3 px-4 text-text font-semibold">{v.bodyStyle}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-textMuted text-xs uppercase tracking-wider">Engine Size</td>
                      {compareList.map(v => (
                        <td key={v.id} className="py-3 px-4 text-text font-semibold">{v.engineSize}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-textMuted text-xs uppercase tracking-wider">Previous Owners</td>
                      {compareList.map(v => (
                        <td key={v.id} className="py-3 px-4 text-text font-semibold">{v.owners}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-textMuted text-xs uppercase tracking-wider">Monthly Est.</td>
                      {compareList.map(v => (
                        <td key={v.id} className="py-3 px-4 text-text font-semibold">{v.monthly}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Filters Drawer Overlay */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setIsMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-80 max-w-full bg-background border-l border-border p-6 overflow-y-auto flex flex-col justify-between h-full z-10 animate-slide-in ml-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-border mb-6">
                <h3 className="font-bold text-text text-lg flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-primary" /> Filters
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-sm font-semibold text-textMuted hover:text-text"
                >
                  Close
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-textMuted uppercase">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Audi, Diesel..."
                      value={searchQuery}
                      onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-text"
                    />
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                  </div>
                </div>

                {/* Make */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-textMuted uppercase">Make</label>
                  <select
                    value={selectedMake}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text"
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
                    <label className="text-xs font-semibold text-textMuted uppercase">Model</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => handleFilterChange(setSelectedModel, e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text"
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
                  <label className="text-xs font-semibold text-textMuted uppercase">Monthly Budget</label>
                  <select
                    value={budgetLimit}
                    onChange={(e) => handleFilterChange(setBudgetLimit, e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text"
                  >
                    <option value="">Any Budget</option>
                    <option value="300">Up to £300/mo</option>
                    <option value="500">Up to £500/mo</option>
                    <option value="800">Up to £800/mo</option>
                  </select>
                </div>

                {/* Fuel */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-textMuted uppercase">Fuel Type</label>
                  <select
                    value={selectedFuel}
                    onChange={(e) => handleFilterChange(setSelectedFuel, e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text"
                  >
                    <option value="">Any Fuel</option>
                    {fuels.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Transmission */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-textMuted uppercase">Transmission</label>
                  <select
                    value={selectedTransmission}
                    onChange={(e) => handleFilterChange(setSelectedTransmission, e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text"
                  >
                    <option value="">Any Transmission</option>
                    {transmissions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Body Style */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-textMuted uppercase">Body Style</label>
                  <select
                    value={selectedBodyStyle}
                    onChange={(e) => handleFilterChange(setSelectedBodyStyle, e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text"
                  >
                    <option value="">Any Body Style</option>
                    {bodyStyles.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex gap-4 mt-8">
              <button
                onClick={() => {
                  clearFilters();
                  setIsMobileFiltersOpen(false);
                }}
                className="flex-1 bg-surfaceHighlight hover:bg-surfaceHighlight/80 text-text py-3 rounded-xl text-sm font-medium transition-colors border border-border"
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
