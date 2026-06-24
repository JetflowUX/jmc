import React, { useState } from 'react';
import { Truck, CheckCircle2, ArrowLeft, ShieldCheck, MapPin, Calculator, Send } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

interface DeliveryPageProps {
  onNavigateToShowroom: () => void;
}

export function DeliveryPage({ onNavigateToShowroom }: DeliveryPageProps) {
  // Distance calculator state
  const [distance, setDistance] = useState<string>('');
  const [calculatedFee, setCalculatedFee] = useState<number | null>(null);
  
  // Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    targetCar: '',
    notes: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculateDeliveryFee = (e: React.FormEvent) => {
    e.preventDefault();
    const miles = parseFloat(distance);
    if (isNaN(miles) || miles < 0) return;

    if (miles <= 15) {
      setCalculatedFee(0); // Free delivery within 15 miles of OL10 4RF
    } else {
      // Base fee of £50 + £1.50 per mile over 15 miles
      const fee = 50 + (miles - 15) * 1.50;
      setCalculatedFee(Math.round(fee));
    }
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        postcode: '',
        targetCar: '',
        notes: ''
      });
      setDistance('');
      setCalculatedFee(null);
    }, 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-text pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={onNavigateToShowroom}
            className="text-textMuted hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Showroom
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Truck size={12} /> JMC Delivery
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-text tracking-tight">Nationwide Home Delivery</h1>
          <p className="text-textMuted text-lg">
            From our showroom floor straight to your door. We provide premium, safe vehicle transport options across the UK mainland.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sourcing Info Panel */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel rounded-3xl p-8 border border-border space-y-6">
              <h2 className="text-2xl font-bold text-text">How Our Delivery Service Works</h2>
              <p className="text-textMuted text-sm leading-relaxed">
                Whether you live just down the road or on the other side of the country, JMC Motors makes buying a car from home easy and stress-free. We coordinate the entire process in-house.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <h4 className="text-text font-semibold text-sm">Flexible Transport Options</h4>
                  <p className="text-textMuted text-xs leading-relaxed">
                    Vehicles are transported using professional trailers or driven by fully insured JMC delivery drivers.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="text-text font-semibold text-sm">Insured & Checked</h4>
                  <p className="text-textMuted text-xs leading-relaxed">
                    Every delivered vehicle undergoes a final multi-point preparation check and is fully covered by carrier insurance.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-text">Part-Exchange Collection</h3>
                <p className="text-textMuted text-sm leading-relaxed">
                  Trading in your old vehicle? We can collect your part-exchange car directly when we drop off your new one. We pay off any outstanding Loan or Hire Purchase (HP) agreements on the spot, bank-transferring any positive equity directly to your account.
                </p>
              </div>
            </div>

            {/* Cost Calculator Card */}
            <div className="glass-panel rounded-3xl p-8 border border-border space-y-6">
              <h3 className="text-xl font-bold text-text flex items-center gap-2">
                <Calculator size={20} className="text-primary" /> Delivery Cost Estimator
              </h3>
              <p className="text-textMuted text-xs">
                Enter the approximate driving distance in miles from our Heywood showroom (OL10 4RF) to your address to estimate delivery fees.
              </p>

              <form onSubmit={calculateDeliveryFee} className="flex gap-4 items-end">
                <div className="space-y-1 flex-grow">
                  <label className="text-[10px] text-textMuted font-bold uppercase tracking-wider">Distance (Miles)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="e.g. 45"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-bold text-sm transition-all h-[46px] cursor-pointer"
                >
                  Estimate Fee
                </button>
              </form>

              {calculatedFee !== null && (
                <div className="bg-surfaceHighlight/40 border border-border rounded-2xl p-5 text-center space-y-2 animate-fade-in">
                  <span className="text-xs text-textMuted block font-semibold uppercase tracking-wider">Estimated Delivery Cost</span>
                  <div className="text-3xl font-extrabold text-text">
                    {calculatedFee === 0 ? 'FREE' : `£${calculatedFee}`}
                  </div>
                  <p className="text-[11px] text-textMuted leading-relaxed">
                    {calculatedFee === 0 
                      ? 'Complimentary local delivery within 15 miles of our Heywood showroom!' 
                      : 'Fee includes full insurance cover and multi-point vehicle handover checks.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sourcing Form Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-border">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text">Quote Request Logged</h3>
                <p className="text-textMuted text-xs max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="text-text font-medium">{formData.name}</span>. We have logged your delivery request for postcode <span className="text-text font-medium">{formData.postcode.toUpperCase()}</span>. We will verify carrier schedules and phone you at <span className="text-text font-medium">{formData.phone}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-text">Request Delivery Quote</h3>
                  <p className="text-textMuted text-xs mt-1">Get an exact quotation for transport schedules to your postcode.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="07800 000000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Delivery Postcode</label>
                      <input
                        type="text"
                        name="postcode"
                        required
                        placeholder="e.g. M1 1AA"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all uppercase font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Car of Interest</label>
                      <input
                        type="text"
                        name="targetCar"
                        placeholder="e.g. Audi A3"
                        value={formData.targetCar}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Additional Delivery Instructions</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Let us know if you have a trade-in to collect, specific delivery dates, or access constraints..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all text-xs"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-bold transition-all mt-4 shadow-glow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={16} /> Request Quote
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
