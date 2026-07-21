/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Property, Inquiry } from '../types';
import {
  Search,
  Filter,
  Grid,
  List,
  Heart,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  X,
  Send,
  CheckCircle,
} from 'lucide-react';

interface PropertiesProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
}

export default function Properties({
  properties,
  favorites,
  onToggleFavorite,
  onSubmitInquiry,
}: PropertiesProps) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Layout State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Detail Modal State
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Inquiry Form inside modal
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Extract unique locations, types, and statuses for dropdowns dynamically
  const locations = ['All', 'Maitama, Abuja', 'Asokoro, Abuja', 'Wuse II, Abuja', 'Gwarinpa, Abuja', 'Lugbe, Abuja', 'Kubwa, Abuja'];
  const types = ['All', 'Villa', 'Apartment', 'Commercial', 'Land', 'Penthouse'];
  const statuses = ['All', 'For Sale', 'For Rent', 'Under Construction', 'Sold'];

  // Filter Logic
  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      selectedLocation === 'All' || prop.location === selectedLocation;

    const matchesType = selectedType === 'All' || prop.type === selectedType;

    const matchesStatus =
      selectedStatus === 'All' || prop.status === selectedStatus;

    return matchesSearch && matchesLocation && matchesType && matchesStatus;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formEmail) return;

    onSubmitInquiry({
      name: formName,
      phone: formPhone,
      email: formEmail,
      service: `Property Inquiry: ${selectedProperty?.title}`,
      message: formMessage || `I am highly interested in inspecting "${selectedProperty?.title}" located in ${selectedProperty?.location}. Please contact me.`,
      propertyId: selectedProperty?.id,
      propertyName: selectedProperty?.title,
    });

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormMessage('');
      setSelectedProperty(null);
    }, 2000);
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'For Sale':
        return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
      case 'For Rent':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Under Construction':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Sold':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-[#F5F5F0] text-brand-navy';
    }
  };

  return (
    <section id="properties" className="py-20 lg:py-28 bg-white border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold">
            A Glimpse of Considered Living
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 mb-4">
            Abuja's Handpicked Property Portfolio
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6"></div>
          <p className="text-[#6B6B7B] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Unique Homes curates premium residential and commercial spaces constructed with structural excellence. Find your future estate here.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#F5F5F0] p-6 rounded-[24px] border border-brand-border mb-12 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Left: Search Input */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9AA8]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood, title..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-brand-border rounded-xl text-sm focus:outline-none focus:border-brand-gold transition-colors text-brand-navy"
              />
            </div>

            {/* Middle: Dropdown Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto flex-1 max-w-2xl">
              {/* Location Select */}
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none bg-white border border-brand-border px-4 py-3 rounded-xl text-xs font-medium text-brand-navy focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  <option value="All">Location: All</option>
                  {locations.filter(l => l !== 'All').map(loc => (
                    <option key={loc} value={loc}>{loc.replace(', Abuja', '')}</option>
                  ))}
                </select>
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9AA8] pointer-events-none" size={12} />
              </div>

              {/* Type Select */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full appearance-none bg-white border border-brand-border px-4 py-3 rounded-xl text-xs font-medium text-brand-navy focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  <option value="All">Type: All</option>
                  {types.filter(t => t !== 'All').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9AA8] pointer-events-none" size={12} />
              </div>

              {/* Status Select */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full appearance-none bg-white border border-brand-border px-4 py-3 rounded-xl text-xs font-medium text-brand-navy focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  <option value="All">Status: All</option>
                  {statuses.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9AA8] pointer-events-none" size={12} />
              </div>
            </div>

            {/* Right: Layout Toggle Button */}
            <div className="flex items-center gap-2 border-l border-brand-border/60 pl-4 lg:self-stretch">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-brand-navy text-[#F5F5F0]'
                    : 'bg-white text-brand-navy hover:bg-[#F5F5F0]/40 border border-brand-border'
                }`}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                  viewMode === 'list'
                    ? 'bg-brand-navy text-[#F5F5F0]'
                    : 'bg-white text-brand-navy hover:bg-[#F5F5F0]/40 border border-brand-border'
                }`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>

          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 text-xs font-mono text-[#9A9AA8]">
          <span>SHOWING {filteredProperties.length} OF {properties.length} PROPERTIES</span>
          {favorites.length > 0 && (
            <span className="text-brand-gold font-semibold uppercase">
              ★ {favorites.length} SAVED TO WISHLIST
            </span>
          )}
        </div>

        {/* Listings Layout Container */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-[#F5F5F0]/20 rounded-[28px] border border-dashed border-brand-border">
            <h3 className="font-display font-semibold text-lg text-brand-navy mb-2">No Properties Found</h3>
            <p className="text-[#6B6B7B] text-sm mb-6">Try refining or clearing your active filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All');
                setSelectedType('All');
                setSelectedStatus('All');
              }}
              className="px-5 py-2.5 bg-brand-navy text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => {
              const isFavorite = favorites.includes(prop.id);
              return (
                <div
                  key={prop.id}
                  className="bg-white rounded-[24px] overflow-hidden border border-brand-border/50 hover:shadow-xl hover:border-brand-gold/20 transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* Thumbnail Card Frame */}
                  <div className="relative aspect-[4/3] bg-[#F5F5F0] overflow-hidden">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Labels */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(prop.status)}`}>
                        {prop.status}
                      </span>
                      {prop.featured && (
                        <span className="bg-brand-navy text-brand-gold px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-brand-gold/30 shadow-sm">
                          ★ Premium
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(prop.id);
                      }}
                      className="absolute top-4 right-4 p-2.5 bg-white/85 backdrop-blur-sm hover:bg-white rounded-full shadow-md text-brand-navy hover:text-rose-600 transition-colors cursor-pointer z-10"
                      title={isFavorite ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    >
                      <Heart size={16} fill={isFavorite ? '#e11d48' : 'none'} className={isFavorite ? 'text-rose-600' : ''} />
                    </button>
                  </div>

                  {/* Information Details */}
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#9A9AA8] font-semibold mb-2">
                      <MapPin size={12} className="text-brand-gold" />
                      <span>{prop.location}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-brand-navy mb-2 group-hover:text-brand-gold transition-colors duration-200">
                      {prop.title}
                    </h3>

                    <p className="text-xs text-[#6B6B7B] line-clamp-2 mb-4">
                      {prop.description}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-border/40 mb-6 text-xs text-[#6B6B7B] font-medium font-mono">
                      <div className="flex items-center gap-1.5">
                        <BedDouble size={14} className="text-[#9A9AA8]" />
                        <span>{prop.bedrooms ? `${prop.bedrooms} Bed` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 border-x border-brand-border/40 justify-center">
                        <Bath size={14} className="text-[#9A9AA8]" />
                        <span>{prop.bathrooms ? `${prop.bathrooms} Bath` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <Maximize size={14} className="text-[#9A9AA8]" />
                        <span>{prop.size}</span>
                      </div>
                    </div>

                    {/* Price and CTA Row */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#9A9AA8] block font-mono uppercase tracking-widest">ASKING PRICE</span>
                        <span className="text-lg font-bold text-brand-navy font-mono leading-none">{prop.priceLabel}</span>
                      </div>

                      <button
                        onClick={() => setSelectedProperty(prop)}
                        className="px-4 py-2 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Layout */
          <div className="flex flex-col gap-6">
            {filteredProperties.map((prop) => {
              const isFavorite = favorites.includes(prop.id);
              return (
                <div
                  key={prop.id}
                  className="bg-white rounded-[24px] overflow-hidden border border-brand-border/50 hover:shadow-xl hover:border-brand-gold/20 transition-all duration-300 group flex flex-col md:flex-row"
                >
                  {/* Thumbnail Left Frame */}
                  <div className="relative w-full md:w-[320px] aspect-[4/3] md:aspect-auto bg-[#F5F5F0] overflow-hidden shrink-0">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Labels */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(prop.status)}`}>
                        {prop.status}
                      </span>
                    </div>

                    {/* Wishlist button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(prop.id);
                      }}
                      className="absolute top-4 right-4 p-2.5 bg-white/85 backdrop-blur-sm hover:bg-white rounded-full shadow-md text-brand-navy hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Heart size={16} fill={isFavorite ? '#e11d48' : 'none'} className={isFavorite ? 'text-rose-600' : ''} />
                    </button>
                  </div>

                  {/* Information Details Right */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#9A9AA8] font-semibold mb-2">
                        <MapPin size={12} className="text-brand-gold" />
                        <span>{prop.location}</span>
                        {prop.featured && (
                          <span className="ml-2 bg-brand-navy text-brand-gold px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
                            Premium Listing
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-xl md:text-2xl text-brand-navy mb-3 group-hover:text-brand-gold transition-colors duration-200">
                        {prop.title}
                      </h3>

                      <p className="text-sm text-[#6B6B7B] leading-relaxed mb-6 line-clamp-3">
                        {prop.description}
                      </p>
                    </div>

                    <div>
                      {/* Specifications Row */}
                      <div className="flex gap-6 py-3 border-y border-brand-border/40 mb-6 text-xs text-[#6B6B7B] font-medium font-mono">
                        <div className="flex items-center gap-1.5">
                          <BedDouble size={14} className="text-[#9A9AA8]" />
                          <span>{prop.bedrooms ? `${prop.bedrooms} Bedrooms` : 'N/A Bed'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 pl-6 border-l border-brand-border/40">
                          <Bath size={14} className="text-[#9A9AA8]" />
                          <span>{prop.bathrooms ? `${prop.bathrooms} Bathrooms` : 'N/A Bath'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 pl-6 border-l border-brand-border/40">
                          <Maximize size={14} className="text-[#9A9AA8]" />
                          <span>{prop.size} Total Size</span>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#9A9AA8] block font-mono uppercase tracking-widest">ASKING PRICE</span>
                          <span className="text-2xl font-bold text-brand-navy font-mono leading-none">{prop.priceLabel}</span>
                        </div>

                        <button
                          onClick={() => setSelectedProperty(prop)}
                          className="px-6 py-3 bg-brand-navy hover:bg-brand-navy/90 text-[#F5F5F0] rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                        >
                          View Full Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Property Full Details & Inquiry Dialog Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-4xl w-full p-6 md:p-8 relative shadow-2xl border border-brand-border my-8">
            
            {/* Close */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-6 right-6 p-2.5 rounded-xl text-brand-navy hover:bg-[#F5F5F0] transition-colors cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            {/* Split Grid inside Modal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[75vh] overflow-y-auto pr-2 no-scrollbar">
              
              {/* Left Column: Details & Photo */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Photo Frame */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-brand-border">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(selectedProperty.status)}`}>
                    {selectedProperty.status}
                  </span>
                </div>

                {/* Property Meta */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#9A9AA8] font-semibold mb-2">
                    <MapPin size={12} className="text-brand-gold" />
                    <span>{selectedProperty.location}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-navy mb-2">
                    {selectedProperty.title}
                  </h3>
                  <div className="text-xl font-bold text-brand-gold font-mono mb-4">
                    {selectedProperty.priceLabel}
                  </div>
                  <p className="text-sm text-[#6B6B7B] leading-relaxed">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Spec Icons Grid */}
                <div className="grid grid-cols-3 gap-3 bg-[#F5F5F0] p-4 rounded-xl border border-brand-border/60 text-xs font-mono font-medium text-brand-navy">
                  <div className="flex flex-col gap-1 items-center justify-center p-2 bg-white rounded-lg">
                    <BedDouble size={16} className="text-brand-gold" />
                    <span>{selectedProperty.bedrooms ? `${selectedProperty.bedrooms} Beds` : 'N/A Bedrooms'}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center justify-center p-2 bg-white rounded-lg">
                    <Bath size={16} className="text-brand-gold" />
                    <span>{selectedProperty.bathrooms ? `${selectedProperty.bathrooms} Baths` : 'N/A Bathrooms'}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center justify-center p-2 bg-white rounded-lg">
                    <Maximize size={16} className="text-brand-gold" />
                    <span>{selectedProperty.size}</span>
                  </div>
                </div>

                {/* Key Specifications Bullet Checklist */}
                <div>
                  <h4 className="font-display font-semibold text-sm text-brand-navy uppercase tracking-wider mb-3">
                    Premium Features & Specifications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProperty.specifications.map((spec) => (
                      <li key={spec} className="flex items-center gap-2 text-xs text-[#6B6B7B] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right Column: Lead Capture Form */}
              <div className="lg:col-span-5 bg-[#F5F5F0] p-6 rounded-2xl border border-brand-border flex flex-col justify-center">
                
                {inquirySubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                      <CheckCircle size={32} />
                    </div>
                    <h4 className="font-display font-bold text-lg text-brand-navy mb-2">Inquiry Logged</h4>
                    <p className="text-xs text-[#6B6B7B] leading-relaxed">
                      Your interest in "{selectedProperty.title}" has been securely captured in our Back Office system. Our agent will call you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold">Immediate Inquiry</span>
                      <h4 className="font-display font-bold text-base text-brand-navy mt-1">Contact Our Abuja Office</h4>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Aliyu Bello"
                        className="w-full bg-white border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. +234 803 123 4567"
                        className="w-full bg-white border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. aliyubello@gmail.com"
                        className="w-full bg-white border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1">Custom Message (Optional)</label>
                      <textarea
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        rows={3}
                        placeholder={`e.g. I would love to schedule a viewing for this ${selectedProperty.type}...`}
                        className="w-full bg-white border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      <Send size={12} />
                      Send Property Inquiry
                    </button>
                  </form>
                )}

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
