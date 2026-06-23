import React, { useEffect, useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    name: 'Showroom',
    href: '#showroom'
  },
  {
    name: 'Finance',
    href: '#finance'
  },
  {
    name: 'Part Exchange',
    href: '#part-exchange'
  },
  {
    name: 'About',
    href: '#about'
  },
  {
    name: 'Contact',
    href: '#contact'
  }];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 z-50">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="font-bold text-white tracking-wider">JMC</span>
          </div>
          <span className="font-semibold text-xl tracking-wide">MOTORS</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-textMuted hover:text-white transition-colors">
            
              {link.name}
            </a>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-textMuted">
            <Phone size={16} className="text-primary" />
            <span>0800 123 4567</span>
          </div>
          <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Book Viewing
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
          
            {navLinks.map((link) =>
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-medium text-white hover:text-primary transition-colors">
            
                {link.name}
              </a>
          )}
            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-textMuted">
                <Phone size={18} className="text-primary" />
                <span>0800 123 4567</span>
              </div>
              <button className="bg-primary text-white px-8 py-3 rounded-full font-medium mt-4">
                Book Viewing
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}