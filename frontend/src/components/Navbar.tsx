import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEALERSHIP_DETAILS } from '../config';

interface NavDropdownProps {
  label: string;
  links: { name: string; href: string }[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Opens on hover for mouse users and on click/focus for everyone else. The
 * previous version was hover-only with an inert button, which left these two
 * nav sections unreachable by keyboard.
 */
function NavDropdown({ label, links, isOpen, onOpen, onClose }: NavDropdownProps) {
  const id = `nav-${label.toLowerCase()}`;

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => (isOpen ? onClose() : onOpen())}
        className="text-sm font-medium text-textMuted hover:text-primary transition-colors duration-200 flex items-center gap-1 cursor-pointer"
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: [0, 0, 0.2, 1] } }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.13, ease: [0.4, 0, 1, 1] } }}
            className="absolute left-0 mt-2 w-52 glass-panel rounded-2xl p-2 border border-border z-50"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block text-xs font-semibold text-textMuted hover:text-primary hover:bg-surfaceHighlight px-4 py-2.5 rounded-xl transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'about' | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Escape closes the menu and returns focus to the control that opened it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const servicesLinks = [
    { name: 'Part Exchange', href: '#/part-exchange' },
    { name: 'Vehicle Sourcing', href: '#/sourcing' },
    { name: 'Nationwide Delivery', href: '#/delivery' },
    { name: 'Servicing & MOT', href: '#/servicing' }
  ];

  const aboutLinks = [
    { name: 'Our Promise & Team', href: '#/team' },
    { name: 'Customer Reviews', href: '#/testimonials' },
    { name: 'Warranty Info', href: '#/warranty' }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#/" className="flex items-center gap-2 z-50">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="font-bold text-white tracking-wider">JMC</span>
          </div>
          <span className="font-semibold text-xl tracking-wide text-text">MOTORS</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 z-50">
          <a
            href="#/showroom"
            className="text-sm font-medium text-textMuted hover:text-primary transition-colors"
          >
            Showroom
          </a>

          <a
            href="#/soft-credit-checker"
            className="text-sm font-medium text-textMuted hover:text-primary transition-colors"
          >
            Finance Checker
          </a>

          <NavDropdown
            label="Services"
            links={servicesLinks}
            isOpen={activeDropdown === 'services'}
            onOpen={() => setActiveDropdown('services')}
            onClose={() => setActiveDropdown(null)}
          />

          <NavDropdown
            label="About"
            links={aboutLinks}
            isOpen={activeDropdown === 'about'}
            onOpen={() => setActiveDropdown('about')}
            onClose={() => setActiveDropdown(null)}
          />
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6 z-50">
          {/* The phone icon used to pulse forever. It signalled nothing, so it
              went — see the "one signature moment" rule. */}
          <a href={`tel:${DEALERSHIP_DETAILS.phone}`} className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors duration-200">
            <Phone size={16} className="text-primary" aria-hidden="true" />
            <span>{DEALERSHIP_DETAILS.phone}</span>
          </a>
          <a href="#/servicing" className="bg-transparent text-text hover:bg-surfaceHighlight border border-border px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
            Book Service
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          className="lg:hidden z-50 text-text w-11 h-11 -mr-2 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: [0, 0, 0.2, 1] } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            className="fixed inset-0 bg-background/98 backdrop-blur-xl z-40 flex flex-col justify-start pt-28 px-8 gap-6 overflow-y-auto"
          >
            <div className="space-y-4">
              <a
                href="#/showroom"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xl font-bold text-text hover:text-primary transition-colors"
              >
                Showroom
              </a>

              <a
                href="#/soft-credit-checker"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xl font-bold text-text hover:text-primary transition-colors"
              >
                Finance Checker
              </a>
            </div>

            <div className="border-t border-border pt-4">
              <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider block mb-2">Our Services</span>
              <div className="space-y-2">
                {servicesLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-semibold text-textMuted hover:text-primary pl-2 border-l border-border"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider block mb-2">About us</span>
              <div className="space-y-2">
                {aboutLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-semibold text-textMuted hover:text-primary pl-2 border-l border-border"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6 mt-auto pb-8 space-y-4 flex flex-col items-center">
              <a href={`tel:${DEALERSHIP_DETAILS.phone}`} className="flex items-center gap-2 text-textMuted text-lg hover:text-primary">
                <Phone size={18} className="text-primary" />
                <span>{DEALERSHIP_DETAILS.phone}</span>
              </a>
              <a
                href="#/servicing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-primary text-white hover:bg-primaryHover py-3 rounded-full font-bold text-center shadow-glow"
              >
                Book Service
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}