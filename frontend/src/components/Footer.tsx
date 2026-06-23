import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { DEALERSHIP_DETAILS } from '../config';

export function Footer() {
  const [makes, setMakes] = useState<string[]>([]);

  useEffect(() => {
    fetch('/mock-data/inventory.json')
      .then((res) => res.json())
      .then((data: any[]) => {
        // Collect first 10 unique makes in inventory
        const unique = Array.from(new Set(data.map((v) => v.make))).sort().slice(0, 10);
        setMakes(unique);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <footer className="bg-surface border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <a href="#/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="font-bold text-white tracking-wider">JMC</span>
              </div>
              <span className="font-semibold text-xl tracking-wide text-white">
                MOTORS
              </span>
            </a>
            <p className="text-textMuted text-sm leading-relaxed mb-6">
              Premium used car dealership located in Bury, Lancashire. Supplying high-quality pre-owned vehicles with transparency and excellence.
            </p>
            <div className="text-[10px] text-textMuted/70 space-y-1">
              <p>Company No: {DEALERSHIP_DETAILS.companyNo}</p>
              <p>VAT No: {DEALERSHIP_DETAILS.vatNo}</p>
              <p>FCA FRN: {DEALERSHIP_DETAILS.fcaFRN}</p>
            </div>
          </div>

          {/* Used Cars Makes */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Used Cars</h4>
            <ul className="space-y-3">
              {makes.length > 0 ? (
                makes.map((make) => (
                  <li key={make}>
                    <a
                      href={`#/showroom?make=${make}`}
                      className="text-textMuted hover:text-white text-sm transition-colors"
                    >
                      Used {make}
                    </a>
                  </li>
                ))
              ) : (
                ['Audi', 'BMW', 'Ford', 'Volkswagen', 'Mercedes-Benz'].map((m) => (
                  <li key={m}>
                    <a
                      href={`#/showroom?make=${m}`}
                      className="text-textMuted hover:text-white text-sm transition-colors"
                    >
                      Used {m}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <a
                  href={DEALERSHIP_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMuted text-sm hover:text-white transition-colors"
                >
                  {DEALERSHIP_DETAILS.address.line1}, {DEALERSHIP_DETAILS.address.line2}, {DEALERSHIP_DETAILS.address.town}, {DEALERSHIP_DETAILS.address.county}, {DEALERSHIP_DETAILS.address.postcode}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href={`tel:${DEALERSHIP_DETAILS.phone}`} className="text-textMuted text-sm hover:text-white transition-colors">
                  Office: {DEALERSHIP_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href={`tel:${DEALERSHIP_DETAILS.mobile}`} className="text-textMuted text-sm hover:text-white transition-colors">
                  Mobile: {DEALERSHIP_DETAILS.mobile}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href={`mailto:${DEALERSHIP_DETAILS.email}`} className="text-textMuted text-sm hover:text-white transition-colors">
                  {DEALERSHIP_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="text-textMuted">Mon - Fri</span>
                <span className="text-white font-medium">{DEALERSHIP_DETAILS.openingHours.weekdays}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-textMuted">Saturday</span>
                <span className="text-white font-medium">{DEALERSHIP_DETAILS.openingHours.saturday}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-textMuted">Sunday</span>
                <span className="text-white font-medium">{DEALERSHIP_DETAILS.openingHours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FCA Regulations Warning Disclaimer */}
        <div className="border-t border-white/5 pt-8 pb-6 text-[10px] text-textMuted/60 leading-relaxed text-justify">
          <p>
            <strong>FCA Regulation Disclaimer:</strong> {DEALERSHIP_DETAILS.name} is authorised and regulated by the Financial Conduct Authority, FRN: {DEALERSHIP_DETAILS.fcaFRN}. All finance is subject to status and income. Written Quotations are available on request. We act as a credit broker, not a lender. We work with a number of carefully selected credit providers who may be able to offer you finance for your purchase. We are only able to offer finance products from these providers.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-textMuted">
          <p>
            &copy; {new Date().getFullYear()} {DEALERSHIP_DETAILS.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#/warranty" className="hover:text-white transition-colors">Warranty</a>
            <a href="#/servicing" className="hover:text-white transition-colors">Servicing</a>
            <a href="#/team" className="hover:text-white transition-colors">Our Promise</a>
          </div>
        </div>
      </div>
    </footer>
  );
}