import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Star, Check } from 'lucide-react';
import { Reveal } from './Reveal';

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

const getPlatformLogo = (platform: string) => {
  if (platform === 'Google') {
    return (
      <div className="flex items-center gap-1.5 bg-amber-500/5 border border-amber-500/10 px-2.5 py-0.5 rounded-full text-amber-600 font-sans font-semibold text-[9px] tracking-wider uppercase">
        <svg className="w-3 h-3 text-amber-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.41 0-6.19-2.78-6.19-6.19s2.78-6.19 6.19-6.19c1.7 0 3.25.69 4.39 1.8l3.23-3.23C19.2 2.42 15.93 1 12.24 1 5.92 1 1 5.92 1 12.24s4.92 11.24 11.24 11.24c6.32 0 11.24-4.92 11.24-11.24 0-.64-.06-1.28-.18-1.95H12.24z"/>
        </svg>
        Google
      </div>
    );
  }
  if (platform === 'Trustpilot') {
    return (
      <div className="flex items-center gap-1.5 bg-green-500/5 border border-green-500/10 px-2.5 py-0.5 rounded-full text-green-600 font-sans font-semibold text-[9px] tracking-wider uppercase">
        <svg className="w-3 h-3 text-green-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 9.172h-8.864L12 0 9.172 9.172H0l7.264 5.37L4.545 24 12 19.172 19.455 24l-2.719-9.458z"/>
        </svg>
        Trustpilot
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 bg-blue-500/5 border border-blue-500/10 px-2.5 py-0.5 rounded-full text-blue-600 font-sans font-semibold text-[9px] tracking-wider uppercase">
      <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z"/>
      </svg>
      AutoTrader
    </div>
  );
};

function ReviewCard({ review, duplicate = false }: { review: (typeof reviews)[number]; duplicate?: boolean }) {
  const initials = review.name.split(' ').map((n) => n[0]).join('');

  return (
    // Spacing is a right margin rather than a track `gap`: the marquee loops by
    // translating -50%, which only lands seamlessly when each card's box
    // includes its own trailing space. A flex gap leaves the track half a gap
    // short and the loop visibly hitches.
    <figure
      aria-hidden={duplicate || undefined}
      className="relative mr-6 bg-gradient-to-b from-surface to-background/40 p-8 rounded-[32px] w-[320px] h-[320px] md:w-[350px] md:h-[350px] flex-shrink-0 flex flex-col justify-between border border-border shadow-[0_8px_30px_rgba(26,26,24,0.02)] hover:shadow-glow hover:border-primary/25 transition-[box-shadow,border-color] duration-300 group overflow-hidden"
    >
      {/* Elegant background quote mark */}
      <span
        className="absolute -right-2 -top-6 text-primary/[0.04] text-[180px] font-serif select-none pointer-events-none group-hover:text-primary/[0.08] transition-colors duration-300"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Rating and Platform Logo at top */}
      <div className="flex justify-between items-center z-10">
        <div className="flex gap-0.5 text-yellow-500" role="img" aria-label={`${review.rating} out of 5 stars`}>
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" stroke="none" aria-hidden="true" />
          ))}
        </div>
        {getPlatformLogo(review.platform)}
      </div>

      {/* Quote in Fraunces serif */}
      <blockquote className="my-auto pt-5 pb-3 flex-grow flex flex-col justify-start z-10">
        <span className="text-primary/40 text-4xl font-serif leading-none block mb-1 font-bold" aria-hidden="true">&ldquo;</span>
        <p className="text-text font-serif font-light text-sm md:text-base leading-relaxed italic line-clamp-4 pr-1">
          {review.text}
        </p>
      </blockquote>

      {/* Thin divider line */}
      <div className="w-full h-px bg-gradient-to-r from-border/10 via-border/50 to-border/10 mb-4 z-10" aria-hidden="true" />

      {/* Author Info footer */}
      <figcaption className="flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-surfaceHighlight border border-border/80 flex items-center justify-center text-text font-serif font-bold text-xs tracking-wider shrink-0 shadow-inner group-hover:border-primary/30 transition-colors duration-300" aria-hidden="true">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center border border-surface shadow" aria-hidden="true">
              <Check size={8} strokeWidth={4} />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-text">{review.name}</p>
            <p className="text-[10px] text-textMuted font-medium tracking-wide mt-0.5">{review.date}</p>
          </div>
        </div>
        <span className="text-[9px] font-bold text-primary/80 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
          Verified
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);

  // An animation nobody can see is only costing battery.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paused = isPaused || !isInView;

  return (
    <section className="py-24 overflow-hidden relative">
      <Reveal className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-normal text-text mb-6">
          What Our Clients Say
        </h2>
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-border">
            <span className="font-bold text-text">4.9/5</span>
            <div className="flex text-yellow-500" aria-hidden="true">
              {[...Array(5)].map((_, i) =>
              <Star key={i} size={14} fill="currentColor" />
              )}
            </div>
            <span className="text-sm text-textMuted">Google</span>
          </div>
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-border">
            <span className="font-bold text-text">5.0/5</span>
            <div className="flex text-green-500" aria-hidden="true">
              {[...Array(5)].map((_, i) =>
              <Star key={i} size={14} fill="currentColor" />
              )}
            </div>
            <span className="text-sm text-textMuted">Trustpilot</span>
          </div>
          <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-border">
            <span className="font-bold text-text">4.8/5</span>
            <div className="flex text-blue-500" aria-hidden="true">
              {[...Array(5)].map((_, i) =>
              <Star key={i} size={14} fill="currentColor" />
              )}
            </div>
            <span className="text-sm text-textMuted">AutoTrader</span>
          </div>
        </div>
      </Reveal>

      {/* Reduced motion gets a real scrollable rail instead of a frozen marquee —
          the content stays reachable, it just doesn't move on its own. */}
      {reduced ? (
        <div className="relative w-full overflow-x-auto pb-4">
          <div className="flex pl-6 w-max">
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      ) : (
        <div
          ref={railRef}
          className="relative w-full flex overflow-x-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />

          {/* No padding on the track: `translate3d(-50%)` resolves against
              this element's own border box, so padding offsets the loop. */}
          <div
            className="marquee-track flex w-max"
            data-paused={paused}
            style={{ ['--marquee-duration' as string]: '48s' }}
          >
            {/* Duplicated exactly once so the -50% translation loops seamlessly.
                The copy is hidden from assistive tech so screen readers don't
                read every review twice. */}
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
            {reviews.map((review) => (
              <ReviewCard key={`${review.name}-duplicate`} review={review} duplicate />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
