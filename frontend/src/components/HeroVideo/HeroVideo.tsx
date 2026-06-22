import React from 'react';
import { motion } from 'framer-motion';
import './HeroVideo.css'; // optional styling

interface HeroVideoProps {
  title?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ title = 'Find Your Next Car', ctaLabel = 'Browse Cars', onCta }) => {
  return (
    <section className="relative h-[70vh] overflow-hidden bg-darkBg">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-placeholder.mp4"
      />
      <div className="relative z-10 flex h-full items-center justify-center flex-col text-center text-white p-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {title}
        </motion.h1>
        {ctaLabel && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCta}
            className="mt-4 px-6 py-3 bg-primary text-white rounded-full shadow-lg"
          >
            {ctaLabel}
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default HeroVideo;
