import React, { useState } from 'react';
import { CheckCircle2, Search, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

interface SourcingPageProps {
  onNavigateToShowroom: () => void;
}

export function SourcingPage({ onNavigateToShowroom }: SourcingPageProps) {
  // Sourcing Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    make: '',
    model: '',
    minYear: '',
    transmission: '',
    fuelType: '',
    maxMileage: '',
    budget: '',
    notes: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Call
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        make: '',
        model: '',
        minYear: '',
        transmission: '',
        fuelType: '',
        maxMileage: '',
        budget: '',
        notes: ''
      });
    }, 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
            <Sparkles size={12} /> Vehicle Finder
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-text tracking-tight">Vehicle Sourcing Service</h1>
          <p className="text-textMuted text-lg">
            Not found the right car in our current stock? Let our experienced team do the legwork and source your perfect vehicle through our trusted nationwide dealer network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Side Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel rounded-3xl p-8 border border-border space-y-6">
              <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                <Search size={22} className="text-primary" /> Let us do all the legwork
              </h2>
              <p className="text-textMuted text-sm leading-relaxed">
                JMC Motors have many years' experience within the used car motor trade. Over the years, we have built up a trusted network of dealers who we rely upon to source the best quality vehicles.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-border">
                {[
                  { title: 'Nationwide Vetting Network', desc: 'We only source from verified, dealer-only networks with complete histories.' },
                  { title: '60-Point Diagnostic Inspection', desc: 'Any sourced vehicle is subjected to our complete diagnostic checklist before handover.' },
                  { title: 'HPI Gold Checked', desc: 'No finance issues, write-offs, or mileage discrepancies guaranteed.' },
                  { title: 'Zero Sourcing Fees', desc: 'No extra finder premiums or hidden commissions added to the final price.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-text font-semibold text-sm">{item.title}</h4>
                      <p className="text-textMuted text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Widget */}
            <div className="glass-panel rounded-3xl p-6 border border-border text-center space-y-4">
              <h4 className="font-bold text-text text-sm">Want to speak to a sourcing specialist?</h4>
              <p className="text-textMuted text-xs">
                Call our Heywood showroom directly. Tell us what you are looking for over the phone.
              </p>
              <div className="pt-2 flex justify-center gap-6">
                <a href={`tel:${DEALERSHIP_DETAILS.phone}`} className="text-primary font-bold hover:underline text-sm">
                  {DEALERSHIP_DETAILS.phone}
                </a>
                <span className="text-border">|</span>
                <a href={`mailto:${DEALERSHIP_DETAILS.email}`} className="text-primary font-bold hover:underline text-sm">
                  {DEALERSHIP_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Sourcing Form Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 md:p-8 border border-border">
            {formSubmitted ? (
              <div className="py-20 text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-3xl font-bold text-text">Sourcing Request Sent!</h3>
                <p className="text-textMuted text-sm max-w-md mx-auto leading-relaxed">
                  Thanks, <span className="text-text font-medium">{formData.name}</span>. We've received your vehicle specification request. We will query our dealer channels and contact you at <span className="text-text font-medium">{formData.phone}</span> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-text">Vehicle Finder Request Form</h3>
                  <p className="text-textMuted text-xs mt-1">Please provide the exact specifications of the car you are looking for.</p>
                </div>

                <div className="space-y-4">
                  {/* Vehicle Spec Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Preferred Make</label>
                      <input
                        type="text"
                        name="make"
                        required
                        placeholder="e.g. Audi, Volkswagen"
                        value={formData.make}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Preferred Model</label>
                      <input
                        type="text"
                        name="model"
                        required
                        placeholder="e.g. A3, Golf"
                        value={formData.model}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Minimum Year</label>
                      <input
                        type="number"
                        name="minYear"
                        placeholder="e.g. 2018"
                        value={formData.minYear}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Transmission</label>
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="">Any Transmission</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Fuel Type</label>
                      <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="">Any Fuel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Maximum Mileage</label>
                      <input
                        type="text"
                        name="maxMileage"
                        placeholder="e.g. 50,000 miles"
                        value={formData.maxMileage}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Target Budget (£)</label>
                      <input
                        type="text"
                        name="budget"
                        required
                        placeholder="e.g. £15,000"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Additional Notes & Options</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="e.g. Heated seats, leather interior, specific color preference..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                    ></textarea>
                  </div>

                  <div className="border-t border-border pt-6 mt-6 space-y-4">
                    <h4 className="text-text font-semibold text-sm">Your Contact Details</h4>
                    <div className="space-y-3">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primaryHover text-white py-4 rounded-xl font-bold transition-all mt-6 shadow-glow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={16} /> Submit Sourcing Request
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
