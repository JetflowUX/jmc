import React from 'react';
import { CheckCircle2 } from 'lucide-react';
export function About() {
  return (
    <section className="py-24 bg-surface" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop"
                alt="Showroom"
                className="rounded-2xl w-full h-48 md:h-64 object-cover" />
              
              <img
                src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop"
                alt="Vehicle Preparation"
                className="rounded-2xl w-full h-48 md:h-64 object-cover mt-4 md:mt-8" />
              
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel p-4 sm:p-6 rounded-2xl z-20 text-center w-36 sm:w-48">
              <span className="block text-2xl sm:text-4xl font-bold text-text mb-1">
                15+
              </span>
              <span className="text-xs sm:text-sm text-textMuted">
                Years of Excellence
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-text mb-6">
              The JMC Standard
            </h2>
            <p className="text-textMuted text-lg mb-6 leading-relaxed">
              Founded on the principles of trust, transparency, and an
              unwavering commitment to quality, JMC Motors has established
              itself as the UK's premier independent luxury vehicle specialist.
            </p>
            <p className="text-textMuted text-lg mb-8 leading-relaxed">
              We don't just sell cars; we curate a collection of the finest
              pre-owned vehicles. Every car that enters our showroom undergoes a
              meticulous preparation process to ensure it meets our exacting
              standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
              'Unrivaled Customer Service',
              'Meticulous Vehicle Prep',
              'Transparent History Checks',
              'Expert Knowledge'].
              map((item, index) =>
              <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-primary shrink-0" />
                  <span className="text-text/90 font-medium">{item}</span>
                </div>
              )}
            </div>

            <button className="border border-border text-text hover:bg-surfaceHighlight/50 px-8 py-4 rounded-full font-medium transition-all">
              Discover Our Story
            </button>
          </div>
        </div>
      </div>
    </section>);

}