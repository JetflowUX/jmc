import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calculator, Calendar, Fuel, Gauge, ShieldCheck, BadgeCheck, CheckCircle2, Phone, Mail, HelpCircle, Heart, Star, Sparkles } from 'lucide-react';
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
  specs: Record<string, string>;
  images: string[];
  description: string;
  originalUrl?: string;
}

interface VehicleDetailProps {
  vehicleId: string;
  onBack: () => void;
  onNavigateToPartExchange: (vehicleId: string) => void;
}

export function VehicleDetail({ vehicleId, onBack, onNavigateToPartExchange }: VehicleDetailProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Modals
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  // Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');

  // Finance Calculator States
  const [financeType, setFinanceType] = useState<'pcp' | 'hp'>('pcp');
  const [deposit, setDeposit] = useState<number>(0);
  const [term, setTerm] = useState<number>(48);

  const interestRate = 0.099; // 9.9% APR Representative

  // Load Inventory & find vehicle
  useEffect(() => {
    setLoading(true);
    fetch('/mock-data/inventory.json')
      .then((res) => res.json())
      .then((data: Vehicle[]) => {
        const found = data.find((v) => v.id === vehicleId);
        if (found) {
          setVehicle(found);
          // Set default deposit to approx 10%
          setDeposit(Math.round(found.price * 0.1));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error finding vehicle:', err);
        setLoading(false);
      });
  }, [vehicleId]);

  // Finance calculations
  const financeCalculations = useMemo(() => {
    if (!vehicle) return null;
    const price = vehicle.price;
    const amountToFinance = Math.max(price - deposit, 0);

    const monthlyRate = interestRate / 12;
    let monthlyPayment = 0;
    let balloon = 0;
    let totalInterest = 0;
    let totalPayable = 0;

    if (amountToFinance > 0) {
      if (financeType === 'pcp') {
        // PCP: Assume balloon is 42% of vehicle price
        balloon = Math.round(price * 0.42);
        
        // Calculate monthly payment
        const tempPayment = ((amountToFinance - balloon) * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        monthlyPayment = tempPayment + (balloon * monthlyRate);
        
        totalPayable = (monthlyPayment * term) + deposit + balloon;
        totalInterest = totalPayable - price;
      } else {
        // HP: Pay full amount to finance over the term
        monthlyPayment = (amountToFinance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        
        totalPayable = (monthlyPayment * term) + deposit;
        totalInterest = totalPayable - price;
      }
    }

    return {
      amountToFinance,
      monthlyPayment: Math.round(monthlyPayment),
      balloon,
      totalInterest: Math.max(Math.round(totalInterest), 0),
      totalPayable: Math.round(totalPayable || price)
    };
  }, [vehicle, financeType, deposit, term]);

  const handleNextImage = () => {
    if (!vehicle) return;
    setActiveImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const handlePrevImage = () => {
    if (!vehicle) return;
    setActiveImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone) return;
    
    // Simulate submission API call
    setModalSuccess(true);
    setTimeout(() => {
      setModalSuccess(false);
      setShowEnquiryModal(false);
      setShowReserveModal(false);
      // Reset forms
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center pt-24">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-textMuted">Loading Vehicle Details...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center pt-24">
        <HelpCircle size={48} className="text-textMuted mb-4" />
        <h2 className="text-2xl font-bold mb-2">Vehicle Not Found</h2>
        <p className="text-textMuted mb-6">The requested vehicle details could not be loaded.</p>
        <button onClick={onBack} className="bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-full font-medium transition-colors">
          Go Back Showroom
        </button>
      </div>
    );
  }

  const galleryImages = vehicle.images.length > 0
    ? vehicle.images
    : ['https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop'];

  return (
    <div className="min-h-screen bg-background text-text pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb / Action header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-textMuted hover:text-white transition-colors text-sm font-medium"
          >
            <ChevronLeft size={18} /> Back to Showroom
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-sm font-medium transition-all ${isFavorited ? 'border-red-500/30 bg-red-500/10 text-red-500' : 'border-white/10 bg-surfaceHighlight hover:bg-white/10 text-white'}`}
            >
              <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
              {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
            </button>
          </div>
        </div>

        {/* Title Block */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                {vehicle.year} Model
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">{vehicle.title}</h1>
              <p className="text-textMuted text-lg mt-1">{vehicle.subtitle}</p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <span className="text-sm text-textMuted block mb-1">Cash Price</span>
              <span className="text-3xl md:text-4xl font-extrabold text-white">£{vehicle.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content (Gallery, Specs, Description) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Interactive Image Gallery */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 bg-black">
              {/* Main Image Frame */}
              <div className="relative h-[300px] sm:h-[450px] flex items-center justify-center bg-black group/gallery">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={`${vehicle.title} image`}
                  className="w-full h-full object-cover"
                />
                
                {/* Carousel Controls */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all opacity-0 group-hover/gallery:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all opacity-0 group-hover/gallery:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Counter Badge */}
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white">
                  {activeImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnails strip */}
              {galleryImages.length > 1 && (
                <div className="p-4 bg-surfaceHighlight/50 border-t border-white/5 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${idx === activeImageIndex ? 'border-primary scale-95 shadow-md' : 'border-transparent hover:opacity-80'}`}
                    >
                      <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Core Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Gauge size={22} className="text-primary mb-2" />
                <span className="text-xs text-textMuted">Mileage</span>
                <span className="text-base font-bold text-white mt-0.5">{vehicle.mileage}</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Fuel size={22} className="text-primary mb-2" />
                <span className="text-xs text-textMuted">Fuel Type</span>
                <span className="text-base font-bold text-white mt-0.5">{vehicle.fuel}</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Calendar size={22} className="text-primary mb-2" />
                <span className="text-xs text-textMuted">Transmission</span>
                <span className="text-base font-bold text-white mt-0.5">{vehicle.transmission}</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                <ShieldCheck size={22} className="text-primary mb-2" />
                <span className="text-xs text-textMuted">Body Style</span>
                <span className="text-base font-bold text-white mt-0.5">{vehicle.bodyStyle}</span>
              </div>
            </div>

            {/* Description Text */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles size={20} className="text-primary" /> Vehicle Overview
              </h2>
              <div className="text-textMuted leading-relaxed text-sm space-y-4 whitespace-pre-line">
                {vehicle.description || 'No descriptive overview provided for this vehicle. Please make an enquiry for additional details.'}
              </div>
            </div>

            {/* Full Specifications Grid */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
              <h2 className="text-2xl font-bold text-white">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(vehicle.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center py-2.5 border-b border-white/5 text-sm">
                    <span className="text-textMuted font-medium">{key}</span>
                    <span className="text-white font-semibold text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Calculators & CTAs) */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Pricing & CTA Panel */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
              <div>
                <span className="text-xs text-textMuted">Buy this car for</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white">£{vehicle.price.toLocaleString()}</span>
                </div>
                {financeCalculations && (
                  <div className="mt-3 bg-primary/10 border border-primary/20 p-3.5 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-textMuted block uppercase font-semibold">Estimated Finance</span>
                      <span className="text-lg font-bold text-primary">{financeType === 'pcp' ? 'PCP' : 'HP'} from {vehicle.monthly}/mo</span>
                    </div>
                    <span className="text-[10px] font-medium text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                      9.9% APR
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowReserveModal(true)}
                  className="w-full bg-primary hover:bg-primaryHover text-white py-4 rounded-xl font-bold transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  Reserve Online for £99
                </button>
                <button
                  onClick={() => setShowEnquiryModal(true)}
                  className="w-full bg-surfaceHighlight hover:bg-white/10 text-white border border-white/10 py-4 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Make an Enquiry
                </button>
                <button
                  onClick={() => onNavigateToPartExchange(vehicle.id)}
                  className="w-full bg-transparent hover:bg-white/5 text-textMuted hover:text-white border border-dashed border-white/15 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                >
                  Part Exchange Valuation
                </button>
              </div>

              {/* Quick Trust Checklist */}
              <div className="border-t border-white/5 pt-5 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>Fully HPI Inspected & Checked</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>60 Point Safety Check Pre-Delivery</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>Includes Minimum 12 Month MOT</span>
                </div>
              </div>
            </div>

            {/* Interactive Finance Calculator */}
            {financeCalculations && (
              <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Calculator size={18} className="text-primary" /> Finance Calculator
                  </h3>
                  <span className="text-[10px] text-textMuted bg-surfaceHighlight border border-white/5 px-2 py-0.5 rounded">
                    Representative Example
                  </span>
                </div>

                {/* HP / PCP Selection Tabs */}
                <div className="grid grid-cols-2 gap-1 bg-surfaceHighlight p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => setFinanceType('pcp')}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${financeType === 'pcp' ? 'bg-primary text-white shadow' : 'text-textMuted hover:text-white'}`}
                  >
                    PCP (Personal Contract)
                  </button>
                  <button
                    onClick={() => setFinanceType('hp')}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${financeType === 'hp' ? 'bg-primary text-white shadow' : 'text-textMuted hover:text-white'}`}
                  >
                    HP (Hire Purchase)
                  </button>
                </div>

                {/* Deposit Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-textMuted font-semibold uppercase">Deposit</span>
                    <span className="text-white font-bold">£{deposit.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.round(vehicle.price * 0.5)}
                    step={100}
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full h-1 bg-surfaceHighlight rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-textMuted">
                    <span>£0 (No Deposit)</span>
                    <span>Max Deposit (50%): £{Math.round(vehicle.price * 0.5).toLocaleString()}</span>
                  </div>
                </div>

                {/* Term Selector */}
                <div className="space-y-2">
                  <span className="text-xs text-textMuted font-semibold uppercase block">Finance Term (Months)</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[24, 36, 48, 60].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTerm(t)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${term === t ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-surfaceHighlight/50 hover:bg-white/10 text-white'}`}
                      >
                        {t} mths
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Calculations Summary Table */}
                <div className="bg-surfaceHighlight/50 border border-white/5 rounded-2xl p-4 space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Cash Price</span>
                    <span className="text-white font-semibold">£{vehicle.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Deposit</span>
                    <span className="text-white font-semibold">-£{deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Amount of Credit</span>
                    <span className="text-white font-semibold">£{financeCalculations.amountToFinance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Interest Rate (Fixed)</span>
                    <span className="text-white font-semibold">5.14% p.a.</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Representative APR</span>
                    <span className="text-white font-semibold">9.9% APR</span>
                  </div>
                  {financeType === 'pcp' && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-textMuted">Optional Final Payment (Balloon)</span>
                      <span className="text-white font-semibold">£{financeCalculations.balloon.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Total Interest</span>
                    <span className="text-white font-semibold">£{financeCalculations.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-white/10 pt-3">
                    <span className="text-textMuted">Total Amount Payable</span>
                    <span className="text-white font-bold">£{financeCalculations.totalPayable.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-white/10 pt-4 mt-2 text-center">
                    <span className="text-[10px] text-textMuted uppercase font-semibold block mb-1">Your Monthly Payment</span>
                    <span className="text-3xl font-extrabold text-white">£{financeCalculations.monthlyPayment}</span>
                    <span className="text-xs text-textMuted"> / month</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ENQUIRY MODAL */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div onClick={() => setShowEnquiryModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          
          <div className="relative bg-surface border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 overflow-hidden shadow-2xl animate-fade-in">
            {modalSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Enquiry Submitted!</h3>
                <p className="text-textMuted text-sm max-w-sm mx-auto">
                  Thank you for your enquiry on the {vehicle.title}. Our sales team at {DEALERSHIP_DETAILS.shortName} will contact you shortly on {formPhone} or {formEmail}.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Request Information</h3>
                  <p className="text-textMuted text-xs mt-1">Make an enquiry for: <span className="text-white font-bold">{vehicle.title}</span></p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="07800 000000"
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Message (Optional)</label>
                    <textarea
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={`I am interested in this ${vehicle.title}. Please provide more info.`}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-bold transition-all mt-4 cursor-pointer"
                  >
                    Submit Enquiry
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESERVE MODAL */}
      {showReserveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div onClick={() => setShowReserveModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          
          <div className="relative bg-surface border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 overflow-hidden shadow-2xl animate-fade-in">
            {modalSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Holding Deposit Paid!</h3>
                <p className="text-textMuted text-sm max-w-sm mx-auto">
                  Congratulations! We have reserved the {vehicle.title} under your name. A confirmation email has been sent to {formEmail}. Our agent will ring you on {formPhone} to coordinate delivery or viewing.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Reserve Vehicle</h3>
                  <p className="text-textMuted text-xs mt-1">
                    Place a 100% refundable holding deposit of <span className="text-white font-bold">£99</span> to secure this vehicle.
                  </p>
                </div>

                <div className="bg-surfaceHighlight border border-white/5 rounded-2xl p-4 flex gap-4 items-center">
                  <img src={galleryImages[0]} className="w-20 h-14 object-cover rounded-lg" alt="Thumbnail" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{vehicle.title}</h4>
                    <p className="text-xs text-textMuted">£{vehicle.price.toLocaleString()} • {vehicle.registration}</p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="07800 000000"
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Payment placeholder */}
                  <div className="bg-surfaceHighlight/50 border border-white/10 rounded-2xl p-4 space-y-3">
                    <span className="text-[10px] text-textMuted font-semibold uppercase block">Mock Card Payment Details</span>
                    <div className="bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-textMuted/70 flex items-center justify-between">
                      <span>4111 •••• •••• 1111</span>
                      <span className="text-xs">12 / 28</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold transition-all mt-4 cursor-pointer"
                  >
                    Pay £99 Holding Deposit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
