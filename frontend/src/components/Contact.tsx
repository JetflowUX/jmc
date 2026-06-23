import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar } from
'lucide-react';
export function Contact() {
  return (
    <section className="py-24 relative" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Visit Our Showroom
          </h2>
          <p className="text-textMuted text-lg">
            Experience our premium collection in person. Our dedicated team is
            ready to provide a personalized viewing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-8 rounded-2xl">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 border border-primary/30">
                <Phone className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
              <p className="text-textMuted mb-4">
                Speak directly with our sales team.
              </p>
              <a
                href="tel:08001234567"
                className="text-2xl font-bold text-white hover:text-primary transition-colors">
                
                0800 123 4567
              </a>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 border border-green-500/30">
                <MessageCircle className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                WhatsApp
              </h3>
              <p className="text-textMuted mb-4">
                Instant messaging for quick queries.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                Chat on WhatsApp
              </button>
            </div>

            <div className="glass-panel p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/20">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Book Appointment
              </h3>
              <p className="text-textMuted mb-4">
                Schedule a personalized viewing.
              </p>
              <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-medium transition-colors w-full">
                Book Now
              </button>
            </div>
          </div>

          {/* Map and Hours */}
          <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden flex flex-col">
            <div className="h-64 md:h-96 w-full bg-surfaceHighlight relative">
              {/* Placeholder for actual map implementation */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white">JMC Motors</p>
                    <p className="text-xs text-textMuted">
                      123 Luxury Lane, London
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface/50">
              <div>
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" /> Location
                </h4>
                <p className="text-textMuted leading-relaxed">
                  123 Luxury Lane
                  <br />
                  Automotive Park
                  <br />
                  London
                  <br />
                  W1A 1AA
                </p>
                <button className="mt-4 text-sm font-medium text-white hover:text-primary transition-colors underline decoration-white/30 underline-offset-4">
                  Get Directions
                </button>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-primary" /> Opening Hours
                </h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-textMuted">Monday - Friday</span>
                    <span className="text-white font-medium">
                      09:00 - 18:00
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-textMuted">Saturday</span>
                    <span className="text-white font-medium">
                      09:00 - 17:00
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-textMuted">Sunday</span>
                    <span className="text-white font-medium">
                      10:00 - 16:00
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}