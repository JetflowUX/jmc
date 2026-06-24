import React, { useState, useEffect } from 'react';
import { BadgeCheck, Calculator, Car, ChevronRight, Gauge, HelpCircle, Loader2, Sparkles } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  title: string;
  price: number;
  monthly: string;
  images: string[];
}

interface PartExchangePageProps {
  vehicleId?: string;
  initialReg?: string;
  initialMileage?: string;
  onNavigateToVehicle: (id: string) => void;
  onNavigateToShowroom: () => void;
}

export function PartExchangePage({ 
  vehicleId, 
  initialReg = '', 
  initialMileage = '', 
  onNavigateToVehicle, 
  onNavigateToShowroom 
}: PartExchangePageProps) {
  const [targetVehicle, setTargetVehicle] = useState<Vehicle | null>(null);
  
  // Form State
  const [regNumber, setRegNumber] = useState(initialReg);
  const [mileage, setMileage] = useState(initialMileage);
  const [condition, setCondition] = useState('good');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Processing State
  const [appraising, setAppraising] = useState(false);
  const [appraisalStep, setAppraisalStep] = useState(0);
  const [valuationResult, setValuationResult] = useState<{
    make: string;
    model: string;
    low: number;
    high: number;
    recommended: number;
  } | null>(null);
  const [handoverBooked, setHandoverBooked] = useState(false);

  // Sync parameters
  useEffect(() => {
    if (initialReg) setRegNumber(initialReg);
    if (initialMileage) setMileage(initialMileage);
  }, [initialReg, initialMileage]);

  // Load target vehicle details if exists
  useEffect(() => {
    if (vehicleId) {
      fetch('/mock-data/inventory.json')
        .then((res) => res.json())
        .then((data: Vehicle[]) => {
          const found = data.find((v) => v.id === vehicleId);
          if (found) setTargetVehicle(found);
        })
        .catch((err) => console.error(err));
    }
  }, [vehicleId]);

  const appraisalStepsText = [
    'Verifying registration plate in DVLA records...',
    'Analyzing current UK market data for similar models...',
    'Applying adjustments for condition and mileage...',
    'Finalizing valuation quote...'
  ];

  const handleAppraise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber || !mileage || !name || !email || !phone) return;

    setAppraising(true);
    setAppraisalStep(0);

    // Progress through loading steps
    const interval = setInterval(() => {
      setAppraisalStep((s) => {
        if (s >= appraisalStepsText.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            // Generate mock valuation results
            // Base value decreases with higher mileage
            const mileageNum = parseInt(mileage.replace(/[^\d]/g, ''), 10) || 40000;
            let baseValue = 18000 - (mileageNum * 0.15); // mock formula
            if (baseValue < 800) baseValue = 1200; // minimum floor

            // Condition multipliers
            let multiplier = 1.0;
            if (condition === 'excellent') multiplier = 1.12;
            if (condition === 'fair') multiplier = 0.85;
            if (condition === 'poor') multiplier = 0.65;

            const val = baseValue * multiplier;
            const low = Math.round((val * 0.93) / 50) * 50;
            const high = Math.round((val * 1.05) / 50) * 50;
            const recommended = Math.round(val / 50) * 50;

            // Guess make/model from registration (mock)
            let guessMake = 'Volkswagen';
            let guessModel = 'Golf';
            if (regNumber.toUpperCase().startsWith('A')) {
              guessMake = 'Audi';
              guessModel = 'A3';
            } else if (regNumber.toUpperCase().startsWith('B')) {
              guessMake = 'BMW';
              guessModel = '3 Series';
            } else if (regNumber.toUpperCase().startsWith('F')) {
              guessMake = 'Ford';
              guessModel = 'Fiesta';
            }

            setValuationResult({
              make: guessMake,
              model: guessModel,
              low,
              high,
              recommended
            });
            setAppraising(false);
          }, 800);
          return s;
        }
        return s + 1;
      });
    }, 1000);
  };

  const resetValuation = () => {
    setValuationResult(null);
    setRegNumber('');
    setMileage('');
    setName('');
    setEmail('');
    setPhone('');
    setCondition('good');
    setHandoverBooked(false);
  };

  return (
    <div className="min-h-screen bg-background text-text pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <button
            onClick={onNavigateToShowroom}
            className="text-textMuted hover:text-primary transition-colors text-sm font-medium"
          >
            ← Back to Showroom
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-text mb-4">Part Exchange Valuation</h1>
          <p className="text-textMuted text-lg max-w-2xl mx-auto">
            Get an instant, fair market estimate for your current car. Offset it directly against any vehicle in our showroom.
          </p>
        </div>

        {/* Valuation Loading State */}
        {appraising && (
          <div className="glass-panel rounded-3xl p-12 text-center border border-border space-y-6">
            <Loader2 size={48} className="text-primary animate-spin mx-auto" />
            <h3 className="text-xl font-bold text-text">Appraising Your Vehicle...</h3>
            <p className="text-textMuted text-sm max-w-sm mx-auto animate-pulse">
              {appraisalStepsText[appraisalStep]}
            </p>
            <div className="w-full max-w-xs bg-surfaceHighlight h-1 rounded-full mx-auto overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-1000"
                style={{ width: `${((appraisalStep + 1) / appraisalStepsText.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Valuation Success Result */}
        {!appraising && valuationResult && (
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-8 border border-border text-center space-y-6 relative overflow-hidden">
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              <div className="w-16 h-16 bg-primary/10 border border-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                <Sparkles size={30} />
              </div>

              <div>
                <span className="text-xs text-textMuted uppercase font-bold tracking-wider">Instant Trade-in Valuation</span>
                <h3 className="text-2xl font-bold text-text mt-1">
                  Your {valuationResult.make} {valuationResult.model}
                </h3>
                <p className="text-sm text-textMuted mt-1">Registration: <span className="text-text font-bold">{regNumber.toUpperCase()}</span></p>
              </div>

              {/* Price bracket */}
              <div className="max-w-md mx-auto bg-surfaceHighlight/50 border border-border rounded-2xl p-6 space-y-2">
                <span className="text-xs text-textMuted uppercase font-medium block">Estimated Trade-in Value</span>
                <span className="text-4xl md:text-5xl font-black text-primary">
                  £{valuationResult.recommended.toLocaleString()}
                </span>
                <p className="text-xs text-textMuted pt-2">
                  Market range: £{valuationResult.low.toLocaleString()} - £{valuationResult.high.toLocaleString()}
                </p>
              </div>

              {/* Offset calculation if buying target vehicle */}
              {targetVehicle && (
                <div className="max-w-md mx-auto bg-primary/10 border border-primary/20 rounded-2xl p-6 text-left space-y-4">
                  <h4 className="font-bold text-text text-sm flex items-center gap-2">
                    <Car size={16} className="text-primary" /> Offset Comparison
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-textMuted">Selected Vehicle Cash Price</span>
                      <span className="text-text font-semibold">£{targetVehicle.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textMuted">Less Part-Exchange Allowance</span>
                      <span className="text-green-600 font-semibold">-£{valuationResult.recommended.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2.5 font-bold text-sm">
                      <span className="text-text">Net Balance to Pay</span>
                      <span className="text-primary">£{Math.max(targetVehicle.price - valuationResult.recommended, 0).toLocaleString()}</span>
                    </div>
                  </div>
                  {targetVehicle.price - valuationResult.recommended > 0 && (
                    <button
                      onClick={() => onNavigateToVehicle(targetVehicle.id)}
                      className="w-full bg-primary hover:bg-primaryHover text-white py-2 rounded-xl text-xs font-bold transition-all text-center block"
                    >
                      Back to Vehicle & Quote Finance Difference
                    </button>
                  )}
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetValuation}
                  className="border border-border text-text hover:bg-surfaceHighlight/50 px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Value Another Car
                </button>
                <button
                  onClick={() => setHandoverBooked(true)}
                  className="bg-primary hover:bg-primaryHover text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all shadow-glow cursor-pointer"
                >
                  Book Showroom Handover
                </button>
              </div>

              <p className="text-[10px] text-textMuted max-w-sm mx-auto leading-relaxed pt-4">
                *Online valuations are representative guides based on mileage and condition inputs. Final allowances are subject to visual inspections and physical diagnostics at JMC Motors Heywood site.
              </p>
            </div>
          </div>
        )}

        {/* Input Valuation Form */}
        {!appraising && !valuationResult && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8 border border-border space-y-6">
              <h3 className="text-xl font-bold text-text flex items-center gap-2">
                <Calculator size={20} className="text-primary" /> Appraisal Details
              </h3>

              <form onSubmit={handleAppraise} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Registration Plate</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FP69EXT"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text uppercase focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold tracking-widest placeholder:normal-case placeholder:font-normal placeholder:tracking-normal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Current Mileage</label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        placeholder="e.g. 35000"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl pl-4 pr-12 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-textMuted">miles</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-textMuted font-semibold uppercase block">Vehicle Condition</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'excellent', title: 'Excellent', subtitle: 'Showroom look' },
                      { id: 'good', title: 'Good', subtitle: 'Minor wear' },
                      { id: 'fair', title: 'Fair', subtitle: 'Some scratches' },
                      { id: 'poor', title: 'Poor', subtitle: 'Needs work' }
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setCondition(cond.id)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${condition === cond.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface hover:bg-surfaceHighlight text-text'}`}
                      >
                        <span className="text-xs font-bold">{cond.title}</span>
                        <span className="text-[10px] text-textMuted mt-1 leading-tight">{cond.subtitle}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6 mt-6 space-y-4">
                  <h4 className="text-text font-semibold text-sm">Your Contact Information</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-textMuted font-semibold uppercase">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-textMuted font-semibold uppercase">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 07800 000000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primaryHover text-white py-4 rounded-xl font-bold transition-all mt-6 shadow-glow cursor-pointer"
                >
                  Get Appraisal Valuation
                </button>
              </form>
            </div>

            {/* Sticky Info Column */}
            <div className="space-y-6">
              {/* Selected Target Vehicle details */}
              {targetVehicle && (
                <div className="glass-panel rounded-3xl p-6 border border-border space-y-4">
                  <h4 className="font-bold text-text text-sm">Trading-in For</h4>
                  <div className="flex gap-4 items-center">
                    <img src={targetVehicle.images[0]} className="w-16 h-12 object-cover rounded-lg" alt="Target car" />
                    <div>
                      <h5 className="font-bold text-text text-sm">{targetVehicle.title}</h5>
                      <span className="text-xs font-bold text-primary">£{targetVehicle.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateToVehicle(targetVehicle.id)}
                    className="w-full text-center text-xs font-semibold text-textMuted hover:text-primary transition-colors underline decoration-text/30 underline-offset-4"
                  >
                    View Details Page
                  </button>
                </div>
              )}

              {/* Core promises card */}
              <div className="glass-panel rounded-3xl p-6 border border-border space-y-4">
                <h4 className="font-bold text-text text-sm">Valuation Guarantees</h4>
                <div className="space-y-3.5 text-xs text-textMuted">
                  <div className="flex items-start gap-2.5">
                    <BadgeCheck size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>Calculated using up-to-the-minute trade data.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <BadgeCheck size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>No obligation lookup. Entirely free of cost.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <BadgeCheck size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>Allowance locked for 7 days once appraised.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* HANDOVER SUCCESS MODAL */}
      {handoverBooked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in">
          <div onClick={() => {
            setHandoverBooked(false);
            resetValuation();
          }} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          
          <div className="relative bg-surface border border-border rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 overflow-hidden shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <BadgeCheck size={32} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-text">Valuation Locked!</h3>
              <p className="text-textMuted text-sm">
                Your appraisal booking request has been successfully registered for your <span className="text-text font-bold">{valuationResult?.make} {valuationResult?.model}</span> ({regNumber.toUpperCase()}).
              </p>
            </div>

            <div className="bg-surfaceHighlight border border-border rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-textMuted">Estimated Allowance</span>
                <span className="text-primary font-bold">£{valuationResult?.recommended.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textMuted">Contact Phone</span>
                <span className="text-text font-semibold">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textMuted">Contact Email</span>
                <span className="text-text font-semibold">{email}</span>
              </div>
            </div>

            <p className="text-[11px] text-textMuted leading-relaxed">
              Our branch manager will contact you on <span className="text-text font-bold">{phone}</span> within 1 hour to schedule your physical appraisal and finalize the trade-in valuation at our Heywood showroom.
            </p>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setHandoverBooked(false);
                  resetValuation();
                }}
                className="w-1/2 border border-border text-text py-3 rounded-xl font-bold transition-all text-xs cursor-pointer hover:bg-surfaceHighlight"
              >
                Close & Restart
              </button>
              <button
                onClick={() => {
                  setHandoverBooked(false);
                  onNavigateToShowroom();
                }}
                className="w-1/2 bg-primary hover:bg-primaryHover text-white py-3 rounded-xl font-bold transition-all text-xs shadow-glow cursor-pointer"
              >
                Go to Showroom
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
