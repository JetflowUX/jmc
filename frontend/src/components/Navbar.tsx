import React, { useEffect, useState } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEALERSHIP_DETAILS } from '../config';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'about' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#/" className="flex items-center gap-2 z-50">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="font-bold text-white tracking-wider">JMC</span>
          </div>
          <span className="font-semibold text-xl tracking-wide text-white">MOTORS</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 z-50">
          <a
            href="#/showroom"
            className="text-sm font-medium text-textMuted hover:text-white transition-colors"
          >
            Showroom
          </a>

          <a
            href="#/soft-credit-checker"
            className="text-sm font-medium text-textMuted hover:text-white transition-colors"
          >
            Finance Checker
          </a>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-sm font-medium text-textMuted hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              Services <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-52 glass-panel rounded-2xl p-2 border border-white/10 z-50"
                >
                  {servicesLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-xs font-semibold text-textMuted hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all"
                    >
                      {link.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-sm font-medium text-textMuted hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              About <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-52 glass-panel rounded-2xl p-2 border border-white/10 z-50"
                >
                  {aboutLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-xs font-semibold text-textMuted hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all"
                    >
                      {link.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6 z-50">
          <a href={`tel:${DEALERSHIP_DETAILS.phone}`} className="flex items-center gap-2 text-sm text-textMuted hover:text-white transition-colors">
            <Phone size={16} className="text-primary animate-pulse" />
            <span>{DEALERSHIP_DETAILS.phone}</span>
          </a>
          <a href="#/servicing" className="bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
            Book Service
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-50 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/98 backdrop-blur-xl z-40 flex flex-col justify-start pt-28 px-8 gap-6 overflow-y-auto"
          >
            <div className="space-y-4">
              <a
                href="#/showroom"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xl font-bold text-white hover:text-primary transition-colors"
              >
                Showroom
              </a>

              <a
                href="#/soft-credit-checker"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xl font-bold text-white hover:text-primary transition-colors"
              >
                Finance Checker
              </a>
            </div>

            <div className="border-t border-white/5 pt-4">
              <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider block mb-2">Our Services</span>
              <div className="space-y-2">
                {servicesLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-semibold text-textMuted hover:text-white pl-2 border-l border-white/10"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider block mb-2">About us</span>
              <div className="space-y-2">
                {aboutLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-semibold text-textMuted hover:text-white pl-2 border-l border-white/10"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 mt-auto pb-8 space-y-4 flex flex-col items-center">
              <a href={`tel:${DEALERSHIP_DETAILS.phone}`} className="flex items-center gap-2 text-textMuted text-lg hover:text-white">
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