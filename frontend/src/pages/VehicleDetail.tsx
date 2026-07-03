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

  // Stepped Reservation States
  const [reserveStep, setReserveStep] = useState(1);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  // Confetti Canvas Effect hook
  useEffect(() => {
    if (reserveStep !== 4) return;
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateSize = () => {
      canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 500;
      canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : 500;
    };
    updateSize();
    
    const particles: any[] = [];
    const colors = ['#E35205', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }
    
    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
        
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
        
        if (p.y > canvas.height) {
          particles[idx] = {
            x: Math.random() * canvas.width,
            y: -20,
            r: p.r,
            d: p.d,
            color: p.color,
            tilt: p.tilt,
            tiltAngleIncremental: p.tiltAngleIncremental,
            tiltAngle: 0
          };
        }
      });
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [reserveStep]);

  // Performance Spec Level Bars helper
  const performanceMetrics = useMemo(() => {
    if (!vehicle) return [];
    
    // Horsepower metric
    let bhp = 120;
    const makeLower = vehicle.make.toLowerCase();
    const isSporty = ['mercedes', 'bmw', 'lexus', 'land rover', 'maserati', 'audi'].some(b => makeLower.includes(b));
    if (vehicle.engineSize.includes('4.4') || vehicle.engineSize.includes('4.0') || vehicle.price > 40000) {
      bhp = 530;
    } else if (vehicle.engineSize.includes('3.0') || vehicle.engineSize.includes('2.5') || vehicle.price > 25000) {
      bhp = 340;
    } else if (vehicle.engineSize.includes('2.0') || vehicle.price > 18000) {
      bhp = 190;
    }
    
    // Efficiency metric (mpg / relative fuel score)
    let efficiency = 45; 
    const fuelLower = vehicle.fuel.toLowerCase();
    if (fuelLower.includes('electric')) {
      efficiency = 120; 
    } else if (fuelLower.includes('hybrid')) {
      efficiency = 65;
    } else if (fuelLower.includes('diesel')) {
      efficiency = 52;
    }
    
    // Handling & Sportiness
    let handling = 60;
    if (isSporty) handling = 85;
    const styleLower = vehicle.bodyStyle.toLowerCase();
    if (styleLower.includes('convertible') || styleLower.includes('coupe')) {
      handling = 92;
    }
    
    // Space & Practicality
    let practicality = 70;
    if (styleLower.includes('suv') || styleLower.includes('estate')) {
      practicality = 95;
    } else if (styleLower.includes('convertible') || styleLower.includes('coupe')) {
      practicality = 45;
    }

    return [
      { name: "Power Output (BHP)", value: bhp, max: 600, suffix: " BHP" },
      { name: "Efficiency (MPG)", value: efficiency, max: 150, suffix: " mpg" },
      { name: "Handling Dynamics", value: handling, max: 100, suffix: "%" },
      { name: "Space & Practicality", value: practicality, max: 100, suffix: "%" }
    ];
  }, [vehicle]);

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

  useEffect(() => {
    const isModalOpen = showEnquiryModal || showReserveModal;
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showEnquiryModal, showReserveModal]);

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

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone) return;
    setModalSuccess(true);
    setTimeout(() => {
      setModalSuccess(false);
      setShowEnquiryModal(false);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 2500);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone || !cardNumber || !cardExpiry || !cardCvv) return;
    setModalSuccess(true);
    setReserveStep(4);
  };

  const closeReserveModal = () => {
    setShowReserveModal(false);
    setReserveStep(1);
    setModalSuccess(false);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center pt-24">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-textMuted">Loading Vehicle Details...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center pt-24">
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
            className="flex items-center gap-2 text-textMuted hover:text-text transition-colors text-sm font-medium"
          >
            <ChevronLeft size={18} /> Back to Showroom
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-sm font-medium transition-all ${isFavorited ? 'border-red-500/30 bg-red-500/10 text-red-500' : 'border-border bg-surfaceHighlight hover:bg-surfaceHighlight/80 text-text'}`}
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
              <h1 className="text-3xl md:text-5xl font-bold text-text mt-3 leading-tight">{vehicle.title}</h1>
              <p className="text-textMuted text-lg mt-1">{vehicle.subtitle}</p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <span className="text-sm text-textMuted block mb-1">Cash Price</span>
              <span className="text-3xl md:text-4xl font-extrabold text-text">£{vehicle.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content (Gallery, Specs, Description) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Interactive Image Gallery */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-border bg-black">
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
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-medium text-white">
                  {activeImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnails strip */}
              {galleryImages.length > 1 && (
                <div className="p-4 bg-surfaceHighlight/50 border-t border-border flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800">
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
              <div className="glass-panel p-3 sm:p-5 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                <Gauge size={22} className="text-primary mb-2" />
                <span className="text-xs text-textMuted">Mileage</span>
                <span className="text-sm sm:text-base font-bold text-text mt-0.5 truncate max-w-full">{vehicle.mileage}</span>
              </div>
              <div className="glass-panel p-3 sm:p-5 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                <Fuel size={22} className="text-primary mb-2" />
                <span className="text-xs text-textMuted">Fuel Type</span>
                <span className="text-sm sm:text-base font-bold text-text mt-0.5 truncate max-w-full">{vehicle.fuel}</span>
              </div>
              <div className="glass-panel p-3 sm:p-5 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                <Calendar size={22} className="text-primary mb-2" />
                <span className="text-xs text-textMuted">Transmission</span>
                <span className="text-sm sm:text-base font-bold text-text mt-0.5 truncate max-w-full">{vehicle.transmission}</span>
              </div>
              <div className="glass-panel p-3 sm:p-5 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                <ShieldCheck size={22} className="text-primary mb-2" />
                <span className="text-xs text-textMuted">Body Style</span>
                <span className="text-sm sm:text-base font-bold text-text mt-0.5 truncate max-w-full">{vehicle.bodyStyle}</span>
              </div>
            </div>

            {/* Description Text */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-border space-y-4">
              <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                <Sparkles size={20} className="text-primary" /> Vehicle Overview
              </h2>
              <div className="text-textMuted leading-relaxed text-sm space-y-4 whitespace-pre-line">
                {vehicle.description || 'No descriptive overview provided for this vehicle. Please make an enquiry for additional details.'}
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-border space-y-6">
              <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                <Sparkles size={20} className="text-primary" /> Performance Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {performanceMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-textMuted">{metric.name}</span>
                      <span className="text-text">{metric.value}{metric.suffix}</span>
                    </div>
                    <div className="h-2 bg-surfaceHighlight rounded-full overflow-hidden border border-border">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
                        style={{ width: `${(metric.value / metric.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Specifications Grid */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-border space-y-6">
              <h2 className="text-2xl font-bold text-text">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(vehicle.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center py-2.5 border-b border-border text-sm">
                    <span className="text-textMuted font-medium">{key}</span>
                    <span className="text-text font-semibold text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Calculators & CTAs) */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Pricing & CTA Panel */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-border space-y-6">
              <div>
                <span className="text-xs text-textMuted">Buy this car for</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-text">£{vehicle.price.toLocaleString()}</span>
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
                  className="w-full bg-surfaceHighlight hover:bg-surfaceHighlight/80 text-text border border-border py-4 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Make an Enquiry
                </button>
                <button
                  onClick={() => onNavigateToPartExchange(vehicle.id)}
                  className="w-full bg-transparent hover:bg-surfaceHighlight text-textMuted hover:text-text border border-dashed border-border py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                >
                  Part Exchange Valuation
                </button>
              </div>

              {/* Quick Trust Checklist */}
              <div className="border-t border-border pt-5 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-text">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>Fully HPI Inspected & Checked</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-text">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>60 Point Safety Check Pre-Delivery</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-text">
                  <CheckCircle2 size={15} className="text-primary shrink-0" />
                  <span>Includes Minimum 12 Month MOT</span>
                </div>
              </div>
            </div>

            {/* Interactive Finance Calculator */}
            {financeCalculations && (
              <div className="glass-panel rounded-3xl p-6 border border-border space-y-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="font-bold text-text text-lg flex items-center gap-2">
                    <Calculator size={18} className="text-primary" /> Finance Calculator
                  </h3>
                  <span className="text-[10px] text-textMuted bg-surfaceHighlight border border-border px-2 py-0.5 rounded">
                    Representative Example
                  </span>
                </div>

                {/* HP / PCP Selection Tabs */}
                <div className="grid grid-cols-2 gap-1 bg-surfaceHighlight p-1 rounded-xl border border-border">
                  <button
                    onClick={() => setFinanceType('pcp')}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${financeType === 'pcp' ? 'bg-primary text-white shadow' : 'text-textMuted hover:text-text'}`}
                  >
                    PCP (Personal Contract)
                  </button>
                  <button
                    onClick={() => setFinanceType('hp')}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${financeType === 'hp' ? 'bg-primary text-white shadow' : 'text-textMuted hover:text-text'}`}
                  >
                    HP (Hire Purchase)
                  </button>
                </div>

                {/* Deposit Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-textMuted font-semibold uppercase">Deposit</span>
                    <span className="text-text font-bold">£{deposit.toLocaleString()}</span>
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
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${term === t ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surfaceHighlight/50 hover:bg-surfaceHighlight text-text'}`}
                      >
                        {t} mths
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Calculations Summary Table */}
                <div className="bg-surfaceHighlight/50 border border-border rounded-2xl p-4 space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Cash Price</span>
                    <span className="text-text font-semibold">£{vehicle.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Deposit</span>
                    <span className="text-text font-semibold">-£{deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Amount of Credit</span>
                    <span className="text-text font-semibold">£{financeCalculations.amountToFinance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Interest Rate (Fixed)</span>
                    <span className="text-text font-semibold">5.14% p.a.</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Representative APR</span>
                    <span className="text-text font-semibold">9.9% APR</span>
                  </div>
                  {financeType === 'pcp' && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-textMuted">Optional Final Payment (Balloon)</span>
                      <span className="text-text font-semibold">£{financeCalculations.balloon.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Total Interest</span>
                    <span className="text-text font-semibold">£{financeCalculations.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-border pt-3">
                    <span className="text-textMuted">Total Amount Payable</span>
                    <span className="text-text font-bold">£{financeCalculations.totalPayable.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-border pt-4 mt-2 text-center">
                    <span className="text-[10px] text-textMuted uppercase font-semibold block mb-1">Your Monthly Payment</span>
                    <span className="text-3xl font-extrabold text-text">£{financeCalculations.monthlyPayment}</span>
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
          
          <div className="relative bg-surface border border-border rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 overflow-hidden shadow-2xl animate-fade-in">
            {modalSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text">Enquiry Submitted!</h3>
                <p className="text-textMuted text-sm max-w-sm mx-auto">
                  Thank you for your enquiry on the {vehicle.title}. Our sales team at {DEALERSHIP_DETAILS.shortName} will contact you shortly on {formPhone} or {formEmail}.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-text">Request Information</h3>
                  <p className="text-textMuted text-xs mt-1">Make an enquiry for: <span className="text-text font-bold">{vehicle.title}</span></p>
                </div>

                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
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
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
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
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
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
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all resize-none"
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

      {/* Stepped Reserve Modal */}
      {showReserveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div onClick={closeReserveModal} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          
          <div className="relative bg-surface border border-border rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 overflow-hidden shadow-2xl animate-fade-in flex flex-col max-h-[90vh]">
            
            {/* Step Indicators Header */}
            {reserveStep < 4 && (
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      reserveStep === stepNum 
                        ? 'bg-primary text-white scale-110 shadow-glow' 
                        : reserveStep > stepNum 
                          ? 'bg-green-500 text-white' 
                          : 'bg-surfaceHighlight text-textMuted border border-border'
                    }`}>
                      {reserveStep > stepNum ? '✓' : stepNum}
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider hidden sm:inline ${
                      reserveStep === stepNum ? 'text-primary' : 'text-textMuted'
                    }`}>
                      {stepNum === 1 ? 'Benefits' : stepNum === 2 ? 'Contact' : 'Payment'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Stepper Wizard Content Container */}
            <div className="overflow-y-auto flex-grow pr-1">
              {/* STEP 1: BENEFITS */}
              {reserveStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-text">Reserve: {vehicle.title}</h3>
                    <p className="text-xs text-textMuted mt-1">Place a £99 fully refundable holding deposit to lock in this price.</p>
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex gap-3 bg-surfaceHighlight/50 border border-border p-3 rounded-2xl">
                      <ShieldCheck className="text-primary shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-text">100% Refundable Guarantee</h4>
                        <p className="text-[10px] text-textMuted mt-0.5">Cancel at any time for any reason, and receive your deposit back immediately.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 bg-surfaceHighlight/50 border border-border p-3 rounded-2xl">
                      <BadgeCheck className="text-primary shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-text">3-Day Showroom Lock</h4>
                        <p className="text-[10px] text-textMuted mt-0.5">We take the car off the market completely, so no one else can purchase it.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 bg-surfaceHighlight/50 border border-border p-3 rounded-2xl">
                      <CheckCircle2 className="text-primary shrink-0 w-5 h-5 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-text">Pre-Delivery Safety Check</h4>
                        <p className="text-[10px] text-textMuted mt-0.5">Prior to handover, the vehicle completes our 60-point inspection.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setReserveStep(2)}
                    className="w-full bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-bold transition-all mt-4 cursor-pointer text-sm"
                  >
                    Start Reservation Process
                  </button>
                </div>
              )}

              {/* STEP 2: CONTACT DETAILS */}
              {reserveStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-text">Your Information</h3>
                    <p className="text-xs text-textMuted mt-1">Provide contact info for booking appointment.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
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
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setReserveStep(1)}
                      className="w-1/3 bg-transparent border border-border hover:bg-surfaceHighlight text-text py-3.5 rounded-xl font-semibold transition-all cursor-pointer text-xs"
                    >
                      Back
                    </button>
                    <button
                      disabled={!formName || !formEmail || !formPhone}
                      onClick={() => setReserveStep(3)}
                      className="w-2/3 bg-primary hover:bg-primaryHover disabled:opacity-40 disabled:hover:bg-primary text-white py-3.5 rounded-xl font-bold transition-all cursor-pointer text-xs"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CREDIT CARD DECK PAYMENT */}
              {reserveStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-text">Deposit Details</h3>
                    <p className="text-xs text-textMuted mt-1">Pay £99 refundable reservation holding deposit securely.</p>
                  </div>

                  {/* 3D-effect Flipping Credit Card Visual */}
                  <div className="flex justify-center py-4" style={{ perspective: 1000 }}>
                    <div 
                      className="relative w-full max-w-[320px] aspect-[80/44] rounded-2xl text-white shadow-2xl transition-transform duration-700 select-none bg-gradient-to-br from-gray-900 to-black border border-white/10"
                      style={{ 
                        transformStyle: 'preserve-3d', 
                        transform: isCvvFocused ? 'rotateY(180deg)' : 'rotateY(0deg)' 
                      }}
                    >
                      {/* CARD FRONT */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold tracking-widest text-primary/80 uppercase">JMC RESERVATION DECK</span>
                          <div className="w-10 h-7 bg-white/10 rounded flex items-center justify-center">
                            <span className="text-[8px] font-extrabold italic">VISA</span>
                          </div>
                        </div>
                        
                        <div className="text-lg font-mono tracking-widest py-2">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <div>
                            <div className="text-[7px] text-gray-400 uppercase font-semibold">Cardholder</div>
                            <div className="font-semibold uppercase tracking-wider truncate max-w-[170px]">
                              {cardName || formName || 'YOUR FULL NAME'}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[7px] text-gray-400 uppercase font-semibold">Expires</div>
                            <div className="font-semibold">{cardExpiry || 'MM/YY'}</div>
                          </div>
                        </div>
                      </div>

                      {/* CARD BACK */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col justify-between py-5" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div className="w-full h-8 bg-black"></div>
                        <div className="px-5 flex items-center gap-3">
                          <div className="w-2/3 h-7 bg-white/20 rounded flex items-center px-2">
                            <span className="text-[8px] italic text-gray-300">JMC Motors Secure Signature strip</span>
                          </div>
                          <div className="w-1/3 h-7 bg-white text-black font-mono font-bold flex items-center justify-center rounded">
                            {cardCvv || '•••'}
                          </div>
                        </div>
                        <div className="px-5 text-right text-[6px] text-gray-500">
                          This mock card check represents sandbox 3D secure payment gateway authorization.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Fields Form */}
                  <form onSubmit={handleReserveSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Card Number</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                          const matches = v.match(/\d{4,16}/g);
                          const match = matches && matches[0] || '';
                          const parts = [];
                          for (let i = 0, len = match.length; i < len; i += 4) {
                            parts.push(match.substring(i, i + 4));
                          }
                          setCardNumber(parts.length > 0 ? parts.join(' ') : v);
                        }}
                        placeholder="4111 2222 3333 4444"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-textMuted font-semibold uppercase">Expiry Date</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
                            if (v.length > 2) {
                              v = v.substring(0,2) + '/' + v.substring(2, 4);
                            }
                            setCardExpiry(v);
                          }}
                          placeholder="MM/YY"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-textMuted font-semibold uppercase">CVV Code</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/gi, ''))}
                          onFocus={() => setIsCvvFocused(true)}
                          onBlur={() => setIsCvvFocused(false)}
                          placeholder="•••"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setReserveStep(2)}
                        className="w-1/3 bg-transparent border border-border hover:bg-surfaceHighlight text-text py-3.5 rounded-xl font-semibold transition-all cursor-pointer text-xs"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!cardName || cardNumber.length < 16 || cardExpiry.length < 5 || cardCvv.length < 3}
                        className="w-2/3 bg-green-500 hover:bg-green-600 disabled:opacity-40 disabled:hover:bg-green-500 text-white py-3.5 rounded-xl font-bold transition-all cursor-pointer text-xs shadow-glow"
                      >
                        Pay £99 Holding Deposit
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 4: SUCCESS WITH CONFETTI CANVAS */}
              {reserveStep === 4 && (
                <div className="py-10 text-center space-y-6 relative min-h-[300px] flex flex-col justify-center items-center">
                  <canvas id="confetti-canvas" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
                  
                  <div className="relative z-10 w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  
                  <div className="relative z-10 space-y-2">
                    <h3 className="text-2xl font-bold text-text">Holding Deposit Paid!</h3>
                    <p className="text-textMuted text-xs max-w-sm mx-auto leading-relaxed">
                      Congratulations! We have reserved the <span className="text-text font-bold">{vehicle.title}</span> under your name.
                    </p>
                    <p className="text-textMuted text-xs max-w-sm mx-auto leading-relaxed">
                      A confirmation email detailing the 3-day showroom lock has been dispatched to <span className="text-text font-bold">{formEmail}</span>. Our representative will contact you on <span className="text-text font-bold">{formPhone}</span> shortly.
                    </p>
                  </div>

                  <button
                    onClick={closeReserveModal}
                    className="relative z-10 w-full bg-primary hover:bg-primaryHover text-white py-3 rounded-xl font-bold transition-all text-xs cursor-pointer mt-4"
                  >
                    Finish & Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
