import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, FileSignature, Key } from 'lucide-react';
import { Reveal } from './Reveal';
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
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-text mb-6">
              Seamless Finance Journey
            </h2>
            <p className="text-textMuted text-lg mb-12">
              We've partnered with leading lenders to offer competitive,
              flexible finance packages. Our transparent process puts you in
              control.
            </p>

            {/* An ordered list because these steps genuinely are a sequence —
                the 01/02/03 markers describe the content rather than decorate it. */}
            <ol className="space-y-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-border" aria-hidden="true" />

              {/* Active Line Progress — scaleY rather than height, so the
                  progress runs on the compositor instead of laying out each frame. */}
              <motion.div
                className="absolute left-7 top-7 bottom-7 w-0.5 bg-primary origin-top"
                aria-hidden="true"
                initial={false}
                animate={{ scaleY: activeStep / (steps.length - 1) }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} />


              {steps.map((step, index) =>
              <li key={step.title} className="relative">
                <button
                  type="button"
                  aria-current={activeStep === index ? 'step' : undefined}
                  className={`w-full text-left flex gap-6 group transition-opacity duration-200 ${activeStep === index ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                  onClick={() => setActiveStep(index)}>

                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-200 ${activeStep === index ? 'bg-primary text-white shadow-glow' : 'bg-surfaceHighlight text-textMuted border border-border'}`}>

                    <step.icon size={24} aria-hidden="true" />
                  </div>
                  <div className="pt-3">
                    {/* primaryHover, not primary: the brand orange is 3.7:1 on
                        this surface, which fails 4.5:1 for text this small. */}
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-primaryHover tabular-nums mb-1.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors duration-200 ${activeStep === index ? 'text-text' : 'text-textMuted'}`}>

                      {step.title}
                    </h3>
                    <p className="text-textMuted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </button>
              </li>
              )}
            </ol>

            <div className="mt-12">
              <button
                onClick={() => window.location.hash = '#/soft-credit-checker'}
                className="bg-primary hover:bg-primaryHover active:scale-[0.98] text-white px-8 py-4 rounded-full font-medium shadow-glow cursor-pointer transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
              >
                Start Finance Application
              </button>
            </div>
          </Reveal>

          <div className="relative h-[600px] rounded-3xl overflow-hidden glass-panel hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop"
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={2025}
              height={1350}
              className="absolute inset-0 w-full h-full object-cover opacity-60" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-10">
              <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl bg-surface/90 border border-border shadow-glass">
                <h4 className="text-text font-semibold mb-4">
                  Representative Example
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-textMuted mb-1">Vehicle Price</p>
                    <p className="text-text font-medium">£45,000</p>
                  </div>
                  <div>
                    <p className="text-textMuted mb-1">Deposit</p>
                    <p className="text-text font-medium">£5,000</p>
                  </div>
                  <div>
                    <p className="text-textMuted mb-1">Term</p>
                    <p className="text-text font-medium">48 Months</p>
                  </div>
                  <div>
                    <p className="text-textMuted mb-1">APR</p>
                    <p className="text-primary font-medium">8.9%</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                  <p className="text-textMuted">Monthly Payment</p>
                  <p className="text-2xl font-bold text-text">
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