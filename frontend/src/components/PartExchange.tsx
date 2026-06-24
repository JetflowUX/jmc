import React from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
export function PartExchange() {
  return (
    <section className="py-24 relative overflow-hidden" id="part-exchange">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop"
          alt="Part Exchange"
          className="w-full h-full object-cover opacity-20" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-text mb-6">
              Upgrade Your Drive
            </h2>
            <p className="text-textMuted text-lg mb-8">
              Get an instant, competitive valuation for your current vehicle.
              Use it as a deposit towards your next premium car with JMC Motors.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-text/80">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Guaranteed competitive valuations
              </li>
              <li className="flex items-center gap-3 text-text/80">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Settle outstanding finance
              </li>
              <li className="flex items-center gap-3 text-text/80">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Seamless transition to your new car
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8 md:p-10 rounded-3xl relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <Calculator className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text">
                  Instant Valuation
                </h3>
                <p className="text-sm text-textMuted">
                  Enter your registration to begin
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">
                  Vehicle Registration
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ENTER REG"
                    className="w-full bg-yellow-400/90 text-black text-center font-bold text-2xl tracking-widest rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary uppercase placeholder:text-black/30" />
                  
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-blue-700 rounded-l-xl flex flex-col items-center justify-center">
                    <span className="text-[8px] text-white font-bold">GB</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">
                  Current Mileage
                </label>
                <input
                  type="text"
                  placeholder="e.g. 45,000"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-4 text-text focus:outline-none focus:border-primary transition-colors" />
                
              </div>

              <button className="w-full bg-primary hover:bg-primaryHover text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-glow group">
                Get Valuation
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform" />
                
              </button>

              <p className="text-xs text-center text-textMuted mt-4">
                By continuing, you agree to our terms and conditions. Valuations
                are subject to physical inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}