/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Award, Briefcase, ShieldCheck, HeartHandshake, X } from 'lucide-react';
import founder from '../assets/images/founder.png';

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F5F5F0]/30 border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Founder Portrait Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl border border-brand-border bg-white p-3">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-brand-navy">
                <img
                  src={founder}
                  alt="Mr. Noah - Founder of Unique Homes"
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            {/* Absolute Badges */}
            <div className="absolute -bottom-6 -right-4 bg-brand-navy text-[#F5F5F0] p-5 rounded-2xl shadow-xl max-w-[200px] border border-brand-gold/20">
              <span className="font-display font-bold text-3xl text-brand-gold block leading-none mb-1">10+</span>
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#9A9AA8]">
                Years Serving Abuja
              </span>
            </div>
          </div>

          {/* Right: Editorial Narrative Content */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold block mb-2">
              Who We Are
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-8">
              Guiding Abuja's Finest Property Journeys
            </h2>

            {/* About Unique Homes */}
            <div className="mb-6">
              <h3 className="font-display font-bold text-lg text-brand-navy mb-3">About Unique Homes</h3>
              <p className="text-[#6B6B7B] text-sm md:text-base leading-relaxed">
                For years, Unique Homes & Properties Ltd. has helped individuals, families, and high-net-worth investors secure exceptional properties across Abuja’s most desirable locations. We operate beyond simple sales, ensuring that every plot of land, commercial structure, or residential home we offer represents a safe, verified, and high-yielding investment.
              </p>
            </div>

            {/* Divider */}
            <div className="w-20 h-[1px] bg-brand-gold my-6"></div>

            {/* About Mr. Noah */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-lg text-brand-navy mb-3">Our Founder's Commitment</h3>
              <p className="text-[#6B6B7B] text-sm md:text-base leading-relaxed">
                Founded by <strong className="text-brand-navy font-semibold">Mr. Noah</strong>, the company was built on an uncompromising commitment to trust, professionalism, and delivering engineering and real estate solutions that create lasting generational value. Mr. Noah’s vision coordinates our design, construction, and sales systems to make property transactions transparent and secure.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 border border-brand-navy hover:bg-brand-navy hover:text-[#F5F5F0] text-brand-navy rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </div>

      {/* Brand & Executive Bio Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-8 relative shadow-2xl border border-brand-border">
            
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-brand-navy hover:bg-[#F5F5F0] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold">
                Corporate Biography
              </span>
              <h3 className="font-display font-bold text-2xl text-brand-navy mt-1">
                About Mr. Noah & Unique Homes
              </h3>
            </div>

            {/* Story */}
            <div className="space-y-4 text-sm text-[#6B6B7B] leading-relaxed max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
              <p>
                Mr. Noah is a distinguished developer, structural designer, and corporate strategist with over a decade of real estate execution experience in West Africa. Holding multiple degrees in engineering and real estate management, he set out to build Unique Homes & Properties Ltd. as an antidote to the lack of transparency in the Abuja land market.
              </p>
              <p>
                Under his active leadership, Unique Homes has successfully delivered over 40 bespoke structures, leased or sold more than 1,000 prime listings, and successfully completed multi-scale architectural renovations across Abuja’s Wuse, Maitama, Jabi, and Asokoro neighborhoods.
              </p>

              {/* Pillars list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border/60 mt-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F5F5F0] text-brand-gold rounded-xl">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">
                      Verified Title Assets
                    </h5>
                    <p className="text-xs text-[#9A9AA8]">
                      All our property land parcels are completely verified with direct C of O or court titles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F5F5F0] text-brand-gold rounded-xl">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">
                      Professional Delivery
                    </h5>
                    <p className="text-xs text-[#9A9AA8]">
                      Bespoke construction project management that strictly complies with Nigerian Society of Engineers standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F5F5F0] text-brand-gold rounded-xl">
                    <Award size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">
                      Award-Winning Remodeling
                    </h5>
                    <p className="text-xs text-[#9A9AA8]">
                      Awarded for ecological structural rehabilitation, utilizing sustainable materials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F5F5F0] text-brand-gold rounded-xl">
                    <HeartHandshake size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">
                      Diaspora Security
                    </h5>
                    <p className="text-xs text-[#9A9AA8]">
                      Dedicated accounts and virtual walkthrough services for clients investing from overseas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-brand-border/60 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 bg-brand-navy text-[#F5F5F0] hover:bg-brand-navy/90 rounded-xl text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Close Biography
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
