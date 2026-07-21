/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Home, Key, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onExploreProperties: () => void;
  onWatchVideo: () => void;
}

export default function Hero({ onExploreProperties, onWatchVideo }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 bg-gradient-to-b from-[#F5F5F0]/60 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-brand-gold"></span>
              <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-brand-gold uppercase">
                Abuja's Trusted Property Partner
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-[54px] font-bold text-brand-navy leading-[1.1] tracking-tight mb-6">
              Find, Build, and Transform{' '}
              <span className="text-brand-gold">Exceptional</span> Properties in Abuja.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base md:text-lg text-[#6B6B7B] leading-relaxed mb-8 max-w-xl">
              From premium residential homes to commercial developments, Unique Homes & Properties helps clients buy, lease, build, and renovate with confidence.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onExploreProperties}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-brand-navy hover:bg-brand-navy/90 text-[#F5F5F0] rounded-xl text-base font-semibold tracking-wide transition-all duration-200 shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                Explore Properties
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onWatchVideo}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-brand-border hover:bg-[#F5F5F0]/40 text-brand-navy rounded-xl text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#F5F5F0] flex items-center justify-center text-brand-gold">
                  <Play size={10} fill="currentColor" className="ml-0.5" />
                </div>
                Watch Video Tour
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-brand-border/60 pt-8">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-brand-gold">
                      <Users size={16} />
                    </div>
                    <span className="font-display font-bold text-xl md:text-2xl text-brand-navy">900+</span>
                  </div>
                  <p className="text-xs text-[#9A9AA8] font-medium uppercase tracking-wider">Satisfied Clients</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-brand-gold">
                      <Home size={16} />
                    </div>
                    <span className="font-display font-bold text-xl md:text-2xl text-brand-navy">200+</span>
                  </div>
                  <p className="text-xs text-[#9A9AA8] font-medium uppercase tracking-wider">Homes Sold</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-brand-gold">
                      <Key size={16} />
                    </div>
                    <span className="font-display font-bold text-xl md:text-2xl text-brand-navy">800+</span>
                  </div>
                  <p className="text-xs text-[#9A9AA8] font-medium uppercase tracking-wider">Homes Rented</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            {/* Visual Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-brand-border bg-[#F5F5F0]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Unique Homes Premium Exterior Architecture in Abuja"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Floating Property Card */}
            <div className="absolute -bottom-6 -left-4 md:left-6 max-w-[280px] md:max-w-[320px] bg-white p-5 rounded-2xl shadow-2xl border border-brand-border/40 transform transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-[10px] uppercase tracking-wider font-semibold rounded-md">
                  Featured Property
                </span>
                <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider font-semibold rounded-md">
                  For Sale
                </span>
              </div>
              <h4 className="font-display font-bold text-lg text-brand-navy mb-1 leading-tight">
                4 Bedroom Detached Duplex
              </h4>
              <p className="text-xs text-[#6B6B7B] mb-3">Maitama, Abuja</p>
              <div className="flex items-center justify-between border-t border-brand-border/40 pt-3">
                <span className="text-sm font-semibold text-brand-navy font-mono">₦250,000,000</span>
                <span className="text-xs text-brand-gold font-semibold tracking-wider uppercase flex items-center gap-1">
                  Active Listing
                </span>
              </div>
            </div>

            {/* Visual background accents */}
            <div className="absolute -z-10 top-1/2 -right-12 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
