import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Wrench,
  BadgeCheck,
  CreditCard,
  FileText,
  Tag } from
'lucide-react';
const reasons = [
{
  icon: BadgeCheck,
  title: '12 Month MOT',
  desc: 'Every vehicle comes with a fresh 12-month MOT for your peace of mind.'
},
{
  icon: Wrench,
  title: '60 Point Inspection',
  desc: 'Rigorous mechanical and cosmetic checks by our certified technicians.'
},
{
  icon: CreditCard,
  title: 'Competitive Finance',
  desc: 'Flexible finance packages tailored to your budget from leading lenders.'
},
{
  icon: ShieldCheck,
  title: 'Warranty Options',
  desc: 'Comprehensive warranty coverage available up to 36 months.'
},
{
  icon: FileText,
  title: 'HPI Checked',
  desc: 'Full background checks ensuring no hidden history or outstanding finance.'
},
{
  icon: Tag,
  title: 'Transparent Pricing',
  desc: 'No hidden fees or admin charges. The price you see is the price you pay.'
}];

export function WhyBuy() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden" id="about">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Buy From JMC Motors
          </h2>
          <p className="text-textMuted text-lg">
            We set the standard for premium used vehicle sales in the UK. Our
            commitment to quality, transparency, and customer service ensures a
            buying experience unlike any other.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
            className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
            
              <div className="w-14 h-14 bg-surfaceHighlight rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-primary/50 group-hover:shadow-glow transition-all">
                <reason.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-textMuted leading-relaxed">{reason.desc}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}