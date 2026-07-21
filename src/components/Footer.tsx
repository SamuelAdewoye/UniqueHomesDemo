/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Landmark, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (id: string) => void;
  onToggleAdmin: () => void;
}

export default function Footer({ onNavigateToSection, onToggleAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-[#F5F5F0] border-t border-brand-gold/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Mission Block */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-brand-gold text-brand-navy rounded-lg">
                <Landmark size={20} />
              </div>
              <div>
                <span className="font-display font-bold text-base tracking-wider text-white block leading-none">
                  UNIQUE HOMES
                </span>
                <span className="text-[9px] tracking-[0.2em] font-medium text-brand-gold block mt-0.5">
                  & PROPERTIES LTD.
                </span>
              </div>
            </div>
            <p className="text-xs text-[#9A9AA8] leading-relaxed max-w-sm pt-2">
              Helping clients find, build, and transform exceptional properties across Abuja. Founded on a commitment to trust, engineering excellence, and generational value.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#9A9AA8]">
              {['home', 'about', 'services', 'properties', 'gallery', 'testimonials', 'faqs'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigateToSection(item)}
                    className="hover:text-brand-gold transition-colors capitalize cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-[#9A9AA8]">
              <li>
                <button onClick={() => onNavigateToSection('services')} className="hover:text-brand-gold transition-colors text-left cursor-pointer">
                  Property Sales & Brokerage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('services')} className="hover:text-brand-gold transition-colors text-left cursor-pointer">
                  Premium Leasing & Shortlets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('services')} className="hover:text-brand-gold transition-colors text-left cursor-pointer">
                  Custom Construction & Estate Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('services')} className="hover:text-brand-gold transition-colors text-left cursor-pointer">
                  Architectural Renovation & Remodeling
                </button>
              </li>
              <li>
                <button onClick={onToggleAdmin} className="text-brand-gold font-semibold hover:underline text-left cursor-pointer uppercase tracking-wider text-[10px]">
                  🔒 Enter Back Office Gate
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Core */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white border-l-2 border-brand-gold pl-2">
              Office Contacts
            </h4>
            <ul className="space-y-3 text-xs text-[#9A9AA8]">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="font-mono">+234 813 4853 895</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="font-mono">noahnwaneri2@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Suite 6, Bricks Plaza, opposite Joseph Jorin School, Arab Road, Kubwa, Abuja.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & attribution bar */}
        <div className="border-t border-[#F5F5F0]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#9A9AA8]">
          <div>
            &copy; {currentYear} Unique Homes & Properties Ltd. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
          <div className="text-[#9A9AA8]/80">
            Designed & Powered by <strong className="text-brand-gold font-semibold">WebberMax</strong>
          </div>
        </div>

      </div>
    </footer>
  );
}