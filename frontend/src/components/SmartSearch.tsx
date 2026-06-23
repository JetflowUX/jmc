import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
export function SmartSearch() {
  return (
    <section className="relative z-30 -mt-24 max-w-7xl mx-auto px-6 md:px-12 mb-24">
      <div className="glass-panel rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-1">
              Smart Vehicle Search
            </h2>
            <p className="text-textMuted text-sm">
              Find your perfect match from our premium selection
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary font-medium text-sm">
              142 Vehicles Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Make
            </label>
            <select className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option>Any Make</option>
              <option>Audi</option>
              <option>BMW</option>
              <option>Mercedes-Benz</option>
              <option>Porsche</option>
              <option>Land Rover</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Model
            </label>
            <select className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option>Any Model</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Monthly Budget
            </label>
            <select className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option>Any Budget</option>
              <option>Up to £300/mo</option>
              <option>Up to £500/mo</option>
              <option>Up to £800/mo</option>
              <option>£800+/mo</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Body Type
            </label>
            <select className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option>Any Type</option>
              <option>SUV</option>
              <option>Saloon</option>
              <option>Coupe</option>
              <option>Estate</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Fuel
            </label>
            <select className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option>Any Fuel</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Transmission
            </label>
            <select className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option>Any</option>
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
          <button className="text-textMuted hover:text-white text-sm flex items-center gap-2 transition-colors">
            <SlidersHorizontal size={16} />
            More Filters
          </button>
          <button className="w-full sm:w-auto bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-glow">
            <Search size={18} />
            Show 142 Vehicles
          </button>
        </div>
      </div>
    </section>);

}