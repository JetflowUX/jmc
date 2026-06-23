import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

export function Contact() {
  return (
    <section className="py-24 relative" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Visit Our Showroom
          </h2>
          <p className="text-textMuted text-lg">
            Experience our premium selection in person. Our dedicated team is
            ready to provide a personalized viewing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone Card */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-surface to-transparent">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 border border-primary/30">
                <Phone className="text-primary animate-pulse" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
              <p className="text-textMuted text-xs mb-4">
                Speak directly with Will or Dave at our sales desk.
              </p>
              <div className="space-y-2">
                <a
                  href={`tel:${DEALERSHIP_DETAILS.phone}`}
                  className="text-xl font-extrabold text-white hover:text-primary transition-colors block"
                >
                  {DEALERSHIP_DETAILS.phone}
                </a>
                <a
                  href={`tel:${DEALERSHIP_DETAILS.mobile}`}
                  className="text-sm font-semibold text-textMuted hover:text-white transition-colors block"
                >
                  Mobile: {DEALERSHIP_DETAILS.mobile}
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-surface to-transparent">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 border border-green-500/30">
                <MessageCircle className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-textMuted text-xs mb-4">
                Instant messaging for vehicle queries or custom quotes.
              </p>
              <a
                href={`https://wa.me/44${DEALERSHIP_DETAILS.mobile.replace(/[^\d]/g, '').slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors w-full flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Book Appointment Card */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-surface to-transparent">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/20">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Book Workshop</h3>
              <p className="text-textMuted text-xs mb-4">
                Schedule a service, diagnostics, or MOT inspection.
              </p>
              <a
                href="#/servicing"
                className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-semibold transition-colors w-full text-center block"
              >
                Book Workshop Slot
              </a>
            </div>
          </div>

          {/* Map and Hours */}
          <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/5">
            <div className="h-64 md:h-96 w-full bg-black relative">
              {/* Actual OpenStreetMaps / Interactive Map Card */}
              <iframe
                title="Dealership Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2366.529237667825!2d-2.2291244!3d53.5937968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb0db3d0473ef%3A0xe54d92aebcecd427!2s68+Bury+New+Rd%2C+Heywood+OL10+4RF!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                className="w-full h-full border-0 opacity-80 grayscale invert"
                allowFullScreen={false}
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-3 shadow-2xl">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{DEALERSHIP_DETAILS.name}</p>
                  <p className="text-[10px] text-textMuted">
                    {DEALERSHIP_DETAILS.address.line1}, {DEALERSHIP_DETAILS.address.line2}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface/50">
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <MapPin size={16} className="text-primary" /> Location
                </h4>
                <p className="text-textMuted text-sm leading-relaxed">
                  {DEALERSHIP_DETAILS.name}
                  <br />
                  {DEALERSHIP_DETAILS.address.line1}
                  <br />
                  {DEALERSHIP_DETAILS.address.line2}
                  <br />
                  {DEALERSHIP_DETAILS.address.town}, {DEALERSHIP_DETAILS.address.county}
                  <br />
                  {DEALERSHIP_DETAILS.address.postcode}
                </p>
                <a
                  href={DEALERSHIP_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs font-semibold text-white hover:text-primary transition-colors underline decoration-white/30 underline-offset-4"
                >
                  Get Directions on Maps
                </a>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Clock size={16} className="text-primary" /> Opening Hours
                </h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Monday - Friday</span>
                    <span className="text-white font-medium">{DEALERSHIP_DETAILS.openingHours.weekdays}</span>
                  </li>
                  <li className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Saturday</span>
                    <span className="text-white font-medium">{DEALERSHIP_DETAILS.openingHours.saturday}</span>
                  </li>
                  <li className="flex justify-between items-center text-xs">
                    <span className="text-textMuted">Sunday</span>
                    <span className="text-white font-medium">{DEALERSHIP_DETAILS.openingHours.sunday}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}