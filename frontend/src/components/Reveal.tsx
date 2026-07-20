import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

/**
 * Entrances decelerate — they arrive with velocity and settle. Using the same
 * curve everywhere is what makes separate sections read as one site.
 */
const EASE_DECELERATE: [number, number, number, number] = [0, 0, 0.2, 1];

const DURATION = 0.45;
const REDUCED_DURATION = 0.2;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Keep under ~0.2 — this is emphasis, not a queue. */
  delay?: number;
  /** Travel distance in px. Reduced motion collapses this to a plain fade. */
  y?: number;
}

/**
 * A single element that reveals once when it arrives. Use for section headers
 * and one-off blocks; for a set of siblings use RevealGroup so the stagger is
 * orchestrated by the parent instead of hard-coded per child.
 */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      // A low threshold on purpose: `amount` is the fraction of the element
      // that must be visible, so a block taller than the viewport can never
      // satisfy a high value and would stay invisible forever.
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reduced ? REDUCED_DURATION : DURATION,
        delay: reduced ? 0 : delay,
        ease: EASE_DECELERATE,
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Per-child offset. Total stagger stays under ~400ms at realistic counts. */
  stagger?: number;
}

/**
 * Orchestrates a set of RevealItem children on one timeline. The children carry
 * no delays of their own, so adding or reordering a card can't desynchronise the
 * sequence.
 */
export function RevealGroup({ children, className, stagger = 0.06 }: RevealGroupProps) {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : stagger },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  className?: string;
  y?: number;
}

/** A child of RevealGroup. Inherits its timing from the parent. */
export function RevealItem({ children, className, y = 20, ...rest }: RevealItemProps) {
  const reduced = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? REDUCED_DURATION : DURATION,
        ease: EASE_DECELERATE,
      },
    },
  };

  return (
    <motion.div className={className} variants={item} {...rest}>
      {children}
    </motion.div>
  );
}
