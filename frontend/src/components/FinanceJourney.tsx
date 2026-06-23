import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, FileSignature, Key } from 'lucide-react';
export function FinanceJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
  {
    icon: Car,
    title: 'Choose Your Vehicle',
    desc: 'Browse our premium selection and find the perfect car that matches your lifestyle and budget.'
  },
  {
    icon: FileSignature,
    title: 'Apply Online',
    desc: 'Complete our secure, 2-minute online finance application. Get an instant decision with no impact on your credit score.'
  },
  {
    icon: Key,
    title: 'Drive Away',
    desc: 'Sign your documents digitally and collect your new vehicle, or have it delivered directly to your door.'
  }];

  return (
    <section className="py-24 bg-surface relative" id="finance">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Seamless Finance Journey
            </h2>
            <p className="text-textMuted text-lg mb-12">
              We've partnered with leading lenders to offer competitive,
              flexible finance packages. Our transparent process puts you in
              control.
            </p>

            <div className="space-y-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-white/10" />

              {/* Active Line Progress */}
              <motion.div
                className="absolute left-7 top-7 w-0.5 bg-primary"
                initial={{
                  height: 0
                }}
                animate={{
                  height: `${activeStep / (steps.length - 1) * 100}%`
                }}
                transition={{
                  duration: 0.5
                }} />
              

              {steps.map((step, index) =>
              <div
                key={index}
                className={`relative flex gap-6 cursor-pointer group ${activeStep === index ? 'opacity-100' : 'opacity-50 hover:opacity-80 transition-opacity'}`}
                onClick={() => setActiveStep(index)}>
                
                  <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-300 ${activeStep === index ? 'bg-primary text-white shadow-glow' : 'bg-surfaceHighlight text-textMuted border border-white/10'}`}>
                  
                    <step.icon size={24} />
                  </div>
                  <div className="pt-3">
                    <h3
                    className={`text-xl font-semibold mb-2 transition-colors ${activeStep === index ? 'text-white' : 'text-textMuted'}`}>
                    
                      {step.title}
                    </h3>
                    <p className="text-textMuted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12">
              <button className="bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-full font-medium transition-all shadow-glow">
                Start Finance Application
              </button>
            </div>
          </div>

          <div className="relative h-[600px] rounded-3xl overflow-hidden glass-panel hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop"
              alt="Finance"
              className="absolute inset-0 w-full h-full object-cover opacity-60" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-10">
              <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-black/40">
                <h4 className="text-white font-semibold mb-4">
                  Representative Example
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-textMuted mb-1">Vehicle Price</p>
                    <p className="text-white font-medium">£45,000</p>
                  </div>
                  <div>
                    <p className="text-textMuted mb-1">Deposit</p>
                    <p className="text-white font-medium">£5,000</p>
                  </div>
                  <div>
                    <p className="text-textMuted mb-1">Term</p>
                    <p className="text-white font-medium">48 Months</p>
                  </div>
                  <div>
                    <p className="text-textMuted mb-1">APR</p>
                    <p className="text-primary font-medium">8.9%</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                  <p className="text-textMuted">Monthly Payment</p>
                  <p className="text-2xl font-bold text-white">
                    £845
                    <span className="text-sm font-normal text-textMuted">
                      /mo
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}