import React, { useState } from 'react';
import { BadgeCheck, Calendar, Clock, Heart, ShieldAlert, ShieldCheck, Sparkles, Wrench, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

interface SubServicesPagesProps {
  type: 'warranty' | 'servicing' | 'team' | 'finance-info';
  onNavigateToShowroom: () => void;
}

export function SubServicesPages({ type, onNavigateToShowroom }: SubServicesPagesProps) {
  // Servicing Form State
  const [regNumber, setRegNumber] = useState('');
  const [serviceType, setServiceType] = useState('full-service');
  const [preferredDate, setPreferredDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber || !preferredDate || !name || !email || !phone) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setRegNumber('');
      setPreferredDate('');
      setName('');
      setEmail('');
      setPhone('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-text pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={onNavigateToShowroom}
            className="text-textMuted hover:text-white transition-colors text-sm font-medium"
          >
            ← Back to Showroom
          </button>
        </div>

        {/* 1. WARRANTY VIEW */}
        {type === 'warranty' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                JMC Care Warranty
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Drive Away with Complete Peace of Mind</h1>
              <p className="text-textMuted text-lg">
                We are proud of the quality of our vehicles, which is why every car we sell comes with a comprehensive warranty. Extensions available up to 36 months.
              </p>
            </div>

            {/* Warranty Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bronze - Standard */}
              <div className="glass-panel rounded-3xl p-8 border border-white/5 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Bronze Cover</h3>
                  <span className="text-xs font-semibold text-textMuted block">INCLUDED WITH ALL VEHICLES</span>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Our standard bronze package covering major mechanical parts (Engine, Gearbox, Differential) for 3 Months / 3,000 miles.
                  </p>
                </div>
                <div className="space-y-4 border-t border-white/5 pt-6 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Engine & Cylinder Block components</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Manual & Automatic Gearboxes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>HPI & Mileage Authentication Guard</span>
                  </div>
                </div>
              </div>

              {/* Silver - Extended (Popular) */}
              <div className="glass-panel rounded-3xl p-8 border-2 border-primary/40 bg-gradient-to-b from-primary/5 to-transparent flex flex-col justify-between space-y-8 relative">
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
                  Popular
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/20 border border-primary/30 text-primary rounded-2xl flex items-center justify-center">
                    <BadgeCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Silver Cover</h3>
                  <span className="text-xs font-semibold text-primary block">15 TO 24 MONTH EXTENSION</span>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Covers all major mechanical & electrical components. Provides breakdown assistance and claims coverage up to £1,000.
                  </p>
                </div>
                <div className="space-y-4 border-t border-white/5 pt-6 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Full Mechanical & Electrical parts cover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Clutch, Braking, Fuel Systems & Electrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>12 Months Nationwide Breakdown Assist</span>
                  </div>
                </div>
              </div>

              {/* Gold - Comprehensive Premium */}
              <div className="glass-panel rounded-3xl p-8 border border-white/5 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-2xl flex items-center justify-center">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Gold Cover</h3>
                  <span className="text-xs font-semibold text-yellow-500 block">36 MONTH COMPREHENSIVE</span>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Our ultimate tier. Matches original manufacturer warranty, covering wear and tear, vehicle systems, and multimedia parts.
                  </p>
                </div>
                <div className="space-y-4 border-t border-white/5 pt-6 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Manufacturer-level wear & tear inclusions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Multimedia, SAT-NAV, Sensors & Air Con</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Unlimited claim limits (up to car purchase value)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8 border border-white/5 bg-surfaceHighlight/30 text-center max-w-3xl mx-auto space-y-4">
              <h4 className="font-bold text-white text-lg">Have questions about our warranty policies?</h4>
              <p className="text-textMuted text-sm leading-relaxed">
                Contact our customer care manager Dave at the showroom. We work directly with top UK automotive warranty partners (like RAC and Click Dealer) to deliver claims processing nationwide.
              </p>
              <div className="pt-2 flex justify-center gap-6">
                <a href={`tel:${DEALERSHIP_DETAILS.phone}`} className="text-primary font-bold hover:underline flex items-center gap-1.5 text-sm">
                  <Phone size={14} /> {DEALERSHIP_DETAILS.phone}
                </a>
                <a href={`mailto:${DEALERSHIP_DETAILS.email}`} className="text-primary font-bold hover:underline flex items-center gap-1.5 text-sm">
                  <Mail size={14} /> {DEALERSHIP_DETAILS.email}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 2. SERVICING & REPAIRS BOOKING */}
        {type === 'servicing' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start animate-fade-in">
            {/* Form */}
            <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8 border border-white/5 space-y-6">
              <div>
                <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                  Workshop Booking
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">Schedule Servicing & Repairs</h1>
                <p className="text-textMuted text-sm mt-1">
                  Keep your vehicle in prime condition. Book a slot at our Heywood service center.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Workshop Slot Requested!</h3>
                  <p className="text-textMuted text-sm max-w-sm mx-auto">
                    Thanks, {name}. We have logged your request for the {preferredDate}. Our service representative will call you at {phone} to confirm the vehicle check-in time.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Registration Plate</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. FP69EXT"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white uppercase focus:outline-none focus:border-primary transition-all font-bold tracking-widest"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-textMuted font-semibold uppercase">Service Type</label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="full-service">Full Service & Safety check (£149)</option>
                        <option value="oil-service">Minor Oil & Filter Change (£89)</option>
                        <option value="mot-test">12 Month MOT Certificate (£45)</option>
                        <option value="repair-diagnostic">Repair Inspection & Diagnostics</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-textMuted font-semibold uppercase">Preferred Booking Date</label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="border-t border-white/5 pt-6 mt-6 space-y-4">
                    <h4 className="text-white font-semibold text-sm">Your Information</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs text-textMuted font-semibold uppercase">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
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
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-textMuted font-semibold uppercase">Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="07800 000000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primaryHover text-white py-4 rounded-xl font-bold transition-all mt-6 shadow-glow cursor-pointer"
                  >
                    Request Booking Slot
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Clock size={16} className="text-primary" /> Service Center Hours
                </h4>
                <ul className="space-y-2 text-xs text-textMuted">
                  <li className="flex justify-between">
                    <span>Mon - Fri</span>
                    <span className="text-white font-medium">08:30 - 17:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white font-medium">09:00 - 14:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-white font-medium">Closed</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Wrench size={16} className="text-primary" /> Diagnostics Guarantee
                </h4>
                <p className="text-xs text-textMuted leading-relaxed">
                  Our service workshop is fully equipped with manufacturer diagnostics equipment. All works are undertaken by Certified Automotive Specialists. Genuine OEM parts used.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. TEAM & PROMISE VIEW */}
        {type === 'team' && (
          <div className="space-y-16 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                JMC Motor Group
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Our Team & Customer Promise</h1>
              <p className="text-textMuted text-lg">
                We believe in making the car buying process straightforward, enjoyable, and stress-free. Meets the JMC team behind your first-class service.
              </p>
            </div>

            {/* Promises Grid */}
            <div className="glass-panel rounded-3xl p-8 border border-white/5 space-y-6">
              <h2 className="text-2xl font-bold text-white text-center mb-6">Why Buy From JMC Motors?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: '12 Months MOT', desc: 'All vehicles come with a valid, clean 12-month MOT certificate upon handover.' },
                  { title: 'Daily Price Checked', desc: 'Our vehicle prices are adjusted daily against UK market rates to ensure zero haggle, best deals.' },
                  { title: '60 Point Safety Check', desc: 'Every car receives a comprehensive mechanical and electric checklist prior to handover.' },
                  { title: 'Full HPI Clean', desc: 'Guaranteed HPI gold reports verifying no outstanding finance, writes-offs, or theft tags.' },
                  { title: 'Flexible Finance', desc: 'Approved credit broker matching bespoke PCP and HP finance rates tailored to your deposit budget.' },
                  { title: 'Warranties Up to 3 Years', desc: 'Extendable mechanical/electrical warranty plans offering nationwide breakdown repair assist.' }
                ].map((p, idx) => (
                  <div key={idx} className="bg-surfaceHighlight/40 border border-white/5 p-5 rounded-2xl space-y-2">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary" /> {p.title}
                    </h3>
                    <p className="text-textMuted text-xs leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Profiles */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">Meet the Dealership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Will', role: 'Dealership Owner & Buying Manager', desc: 'Oversees inventory acquisition, vetting, and JMC Motors bespoke hand-overs.', email: 'will@jmcmotors.co.uk' },
                  { name: 'Dave', role: 'Sales & Finance Specialist', desc: 'Coordinates PCP and HP finance applications, insurance clearances, and sales enquiries.', email: 'dave@jmcmotors.co.uk' },
                  { name: 'John', role: 'Chief Workshop Diagnostic Specialist', desc: 'Manages the 60-point pre-delivery inspections and workshop diagnostic checks.', email: 'workshop@jmcmotors.co.uk' }
                ].map((member, idx) => (
                  <div key={idx} className="glass-panel rounded-3xl p-6 border border-white/5 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/20 border border-primary/30 text-primary rounded-full flex items-center justify-center mx-auto">
                      <User size={30} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      <span className="text-xs text-primary font-medium">{member.role}</span>
                    </div>
                    <p className="text-textMuted text-xs leading-relaxed">{member.desc}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-textMuted hover:text-white transition-colors block border border-white/10 bg-surfaceHighlight/50 hover:bg-white/10 py-2 rounded-xl"
                    >
                      Contact {member.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. FINANCE INFO PAGE */}
        {type === 'finance-info' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                Finance Solutions
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Flexible Car Finance Options</h1>
              <p className="text-textMuted text-lg">
                At JMC Motors, we work with a panel of leading UK credit lenders to secure competitive PCP and HP rates tailored to your budget.
              </p>
            </div>

            {/* PCP vs HP Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* PCP Card */}
              <div className="glass-panel rounded-3xl p-8 border border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Personal Contract Purchase (PCP)</h3>
                  <span className="bg-primary/20 border border-primary/30 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                    Lower Monthly Costs
                  </span>
                </div>
                <p className="text-textMuted text-sm leading-relaxed">
                  PCP is the most popular way to finance a used car. You pay a lower monthly payment because a significant part of the car's value is deferred until the final payment (balloon payment).
                </p>
                <div className="space-y-3 pt-4 border-t border-white/5 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Lower monthly repayments compared to HP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Option to buy, return, or part-exchange at term end</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>Adjust deposit and term to fit your needs</span>
                  </div>
                </div>
              </div>

              {/* HP Card */}
              <div className="glass-panel rounded-3xl p-8 border border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Hire Purchase (HP)</h3>
                  <span className="bg-primary/20 border border-primary/30 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                    Full Ownership
                  </span>
                </div>
                <p className="text-textMuted text-sm leading-relaxed">
                  HP is a simple, straightforward finance path. You pay a deposit and pay off the remaining balance in equal monthly instalments. Once the final payment is made, you own the car.
                </p>
                <div className="space-y-3 pt-4 border-t border-white/5 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>No optional final balloon payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>No annual mileage restrictions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span>100% yours once all monthly instalments end</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8 border border-white/5 bg-gradient-to-r from-primary/10 to-transparent flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="font-bold text-white text-lg">Ready to find your car?</h4>
                <p className="text-textMuted text-sm mt-1 max-w-xl">
                  Use our showroom's smart filters to find your model and calculate specific PCP or HP quotes instantly on the vehicle details page.
                </p>
              </div>
              <button
                onClick={onNavigateToShowroom}
                className="bg-primary hover:bg-primaryHover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-glow shrink-0 cursor-pointer"
              >
                Go to Showroom
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
