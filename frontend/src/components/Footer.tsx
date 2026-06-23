import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="font-bold text-white tracking-wider">JMC</span>
              </div>
              <span className="font-semibold text-xl tracking-wide">
                MOTORS
              </span>
            </div>
            <p className="text-textMuted text-sm leading-relaxed mb-6">
              The UK's most trustworthy and premium independent used car
              dealership experience. Quality approved vehicles with transparent
              pricing.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                
                Instagram
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                
                Facebook
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-textMuted hover:text-white text-sm transition-colors">
                  
                  Search Vehicles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-textMuted hover:text-white text-sm transition-colors">
                  
                  Finance Calculator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-textMuted hover:text-white text-sm transition-colors">
                  
                  Part Exchange
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-textMuted hover:text-white text-sm transition-colors">
                  
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-textMuted hover:text-white text-sm transition-colors">
                  
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-textMuted text-sm">
                  123 Luxury Lane, Automotive Park, London, W1A 1AA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-textMuted text-sm">0800 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-textMuted text-sm">
                  sales@jmcmotors.co.uk
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-medium mb-6">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="text-textMuted">Mon - Fri</span>
                <span className="text-white">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-textMuted">Saturday</span>
                <span className="text-white">09:00 - 17:00</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-textMuted">Sunday</span>
                <span className="text-white">10:00 - 16:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-textMuted text-sm">
            &copy; {new Date().getFullYear()} JMC Motors Ltd. All rights
            reserved. FCA Regulated.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-textMuted hover:text-white transition-colors">
              
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-textMuted hover:text-white transition-colors">
              
              Terms of Service
            </a>
            <a
              href="#"
              className="text-textMuted hover:text-white transition-colors">
              
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>);

}