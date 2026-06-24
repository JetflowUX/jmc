import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Wrench, BadgeCheck } from 'lucide-react';

export function Hero() {
  const trustBadges = [
    { icon: ShieldCheck, text: 'HPI Checked' },
    { icon: Wrench, text: '60 Point Inspection' },
    { icon: BadgeCheck, text: '12 Month MOT' },
    { icon: CheckCircle2, text: 'FCA Regulated' }
  ];

  return (
    <section className="relative min-h-screen lg:h-screen flex items-center justify-center py-28 lg:py-0 overflow-hidden">
      {/* Background Frame */}
      <div className="absolute inset-0 w-full h-full z-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background z-10" />
        <video
          src="/videos/hero-placeholder.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-[0.12] grayscale pointer-events-none"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-6 leading-tight text-text">
              Find Your Next Car <br />
              <span className="text-gradient">With Confidence</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-textMuted mb-10 font-light"
          >
            Quality Approved Vehicles. Transparent Pricing. Flexible Finance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#/showroom"
              className="bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-glow flex items-center justify-center text-center cursor-pointer"
            >
              Browse Showroom
            </a>
            <a
              href="#/finance"
              className="bg-transparent hover:bg-surfaceHighlight text-text border border-border px-8 py-4 rounded-full font-medium text-lg transition-all flex items-center justify-center text-center cursor-pointer"
            >
              Get Finance Quote
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <badge.icon className="text-primary w-5 h-5 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-textMuted">
                  {badge.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}