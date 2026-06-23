import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
const reviews = [
{
  name: 'James Wilson',
  platform: 'Google',
  rating: 5,
  text: 'Exceptional service from start to finish. The team at JMC made buying my Porsche Taycan an absolute pleasure. No pressure, just genuine enthusiasm and professionalism.',
  date: '2 weeks ago'
},
{
  name: 'Sarah Jenkins',
  platform: 'Trustpilot',
  rating: 5,
  text: 'I was nervous about buying a used premium car, but the 60-point inspection and transparency gave me total confidence. The car was presented immaculately.',
  date: '1 month ago'
},
{
  name: 'David Thompson',
  platform: 'AutoTrader',
  rating: 5,
  text: "Best dealership experience I've ever had. They gave me a great price for my part exchange and the finance process was seamless. Highly recommend.",
  date: '3 months ago'
},
{
  name: 'Emma Roberts',
  platform: 'Google',
  rating: 5,
  text: 'Stunning showroom and incredible stock. The staff are incredibly knowledgeable about the vehicles they sell. A truly premium experience.',
  date: '4 months ago'
}];

export function Reviews() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          What Our Clients Say
        </h2>
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-white/10">
            <span className="font-bold text-white">4.9/5</span>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) =>
              <Star key={i} size={14} fill="currentColor" />
              )}
            </div>
            <span className="text-sm text-textMuted">Google</span>
          </div>
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-white/10">
            <span className="font-bold text-white">5.0/5</span>
            <div className="flex text-green-500">
              {[...Array(5)].map((_, i) =>
              <Star key={i} size={14} fill="currentColor" />
              )}
            </div>
            <span className="text-sm text-textMuted">Trustpilot</span>
          </div>
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-white/10">
            <span className="font-bold text-white">4.8/5</span>
            <div className="flex text-blue-500">
              {[...Array(5)].map((_, i) =>
              <Star key={i} size={14} fill="currentColor" />
              )}
            </div>
            <span className="text-sm text-textMuted">AutoTrader</span>
          </div>
        </div>
      </div>

      {/* Auto-scrolling carousel */}
      <div className="relative w-full flex overflow-x-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-6 px-6"
          animate={{
            x: [0, -1000]
          }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 20
          }}>
          
          {/* Duplicate reviews for seamless looping */}
          {[...reviews, ...reviews, ...reviews].map((review, index) =>
          <div
            key={index}
            className="glass-panel p-8 rounded-2xl min-w-[350px] md:min-w-[400px] flex-shrink-0">
            
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {review.name}
                  </h4>
                  <p className="text-sm text-textMuted">{review.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-medium px-2 py-1 bg-surfaceHighlight rounded text-white/80">
                    {review.platform}
                  </span>
                  <div className="flex text-primary">
                    {[...Array(review.rating)].map((_, i) =>
                  <Star key={i} size={14} fill="currentColor" />
                  )}
                  </div>
                </div>
              </div>
              <p className="text-textMuted leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>);

}