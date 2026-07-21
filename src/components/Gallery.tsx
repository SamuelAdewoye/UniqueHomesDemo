/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import galleryVilla1 from '../assets/images/gallery-villa-1.jpg';
import galleryInterior1 from '../assets/images/gallery-interior-1.jpg';
import galleryApartment1 from '../assets/images/gallery-apartment-1.jpg';
import galleryInterior2 from '../assets/images/gallery-interior-2.jpg';
import galleryConstruction1 from '../assets/images/gallery-construction-1.jpg';
import galleryVilla2 from '../assets/images/gallery-villa-2.jpg';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'All' | 'Villas' | 'Apartments' | 'Interiors' | 'Construction'>('All');

  const galleryItems = [
    {
      id: 1,
      category: 'Villas',
      title: 'Maitama Manor Poolside',
      location: 'Maitama, Abuja',
      image: galleryVilla1,
    },
    {
      id: 2,
      category: 'Interiors',
      title: 'Monolithic Dining Courtyard',
      location: 'Asokoro, Abuja',
      image: galleryInterior1,
    },
    {
      id: 3,
      category: 'Apartments',
      title: 'Oakwood Terrace Elevation',
      location: 'Lugbe, Abuja',
      image: galleryApartment1,
    },
    {
      id: 4,
      category: 'Interiors',
      title: 'Brushed Brass Marble Suite',
      location: 'Wuse II, Abuja',
      image: galleryInterior2,
    },
    {
      id: 5,
      category: 'Construction',
      title: 'Guzape Hill Structural Ribs',
      location: 'Guzape, Abuja',
      image: galleryConstruction1,
    },
    {
      id: 6,
      category: 'Villas',
      title: 'Minimalist Detached Duplex',
      location: 'Gwarinpa, Abuja',
      image: galleryVilla2,
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTab === 'All' || item.category === activeTab
  );

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F5F5F0]/30 border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Gallery Headers */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold">
            The Details Matter
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 mb-4">
            A Glimpse of Considered Living
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6"></div>
          <p className="text-[#6B6B7B] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Every material, fitting, and space we construct represents the architectural design values of Unique Homes.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['All', 'Villas', 'Apartments', 'Interiors', 'Construction'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-brand-navy hover:bg-[#F5F5F0] border border-brand-border/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[4/5] rounded-[24px] overflow-hidden group shadow-sm border border-brand-border/60 bg-[#1A1A2E]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Minimalist Hover Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-gold text-[10px] font-mono uppercase tracking-widest mb-1.5">
                  {item.category}
                </span>
                <h4 className="font-display font-bold text-lg text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#9A9AA8]">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
