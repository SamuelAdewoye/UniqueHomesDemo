// src/routes/PropertyListPage.tsx
// Dedicated property listing page – with shared Nav + Footer for consistency

import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { Search, Grid, List, MapPin, BedDouble, Bath, Maximize, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function PropertyListPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/api/properties');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProperties(data);
          } else {
            const cached = localStorage.getItem('unique_homes_properties_v1');
            if (cached) setProperties(JSON.parse(cached));
          }
        } else {
          const cached = localStorage.getItem('unique_homes_properties_v1');
          if (cached) setProperties(JSON.parse(cached));
        }
      } catch (e) {
        const cached = localStorage.getItem('unique_homes_properties_v1');
        if (cached) setProperties(JSON.parse(cached));
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredProperties = properties.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    const matchesType = selectedType === 'All' || p.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'For Sale': return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
      case 'For Rent': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Under Construction': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Sold': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-[#F5F5F0] text-brand-navy';
    }
  };

  const handleNavigateToSection = (id: string) => {
    // Navigate back to home page then scroll to section
    window.location.href = `/#${id}`;
  };

  const handleToggleAdmin = () => {
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center text-[#F5F5F0]">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand-gold">Loading All Properties</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Shared Navigation – same as landing page */}
      <Navigation
        isAdmin={false}
        setIsAdmin={handleToggleAdmin}
        onOpenQuoteModal={() => {}}
        activeSection=""
      />

      <main className="pt-[88px] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Page Header */}
          <header className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-brand-navy mb-4">
              All Properties
            </h1>
            <p className="text-[#6B6B7B] max-w-2xl mx-auto text-sm md:text-base">
              Browse our complete property portfolio from Abuja's most exclusive locations.
            </p>
          </header>

          {/* Filter Bar */}
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm mb-10">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9AA8]" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, location..."
                  className="w-full pl-11 pr-4 py-3 bg-[#F5F5F0] border border-brand-border rounded-xl text-sm focus:outline-none focus:border-brand-gold transition-colors text-brand-navy"
                />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="w-full lg:w-auto px-4 py-3 bg-[#F5F5F0] border border-brand-border rounded-xl text-xs font-medium text-brand-navy focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="All">All Property Types</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full lg:w-auto px-4 py-3 bg-[#F5F5F0] border border-brand-border rounded-xl text-xs font-medium text-brand-navy focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Sold">Sold</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-2 border-l border-brand-border/60 pl-4 lg:self-stretch">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                    viewMode === 'grid' ? 'bg-brand-navy text-[#F5F5F0]' : 'bg-white text-brand-navy border border-brand-border'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                    viewMode === 'list' ? 'bg-brand-navy text-[#F5F5F0]' : 'bg-white text-brand-navy border border-brand-border'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-xs font-mono text-[#9A9AA8] mb-6">
            SHOWING {filteredProperties.length} OF {properties.length} PROPERTIES
          </div>

          {/* Property Cards */}
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-brand-border">
              <h3 className="font-display font-semibold text-lg text-brand-navy mb-2">No properties found</h3>
              <p className="text-[#6B6B7B] text-sm mb-6">Try adjusting your search or filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedType('All'); setSelectedStatus('All'); }}
                className="px-5 py-2.5 bg-brand-navy text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(p => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:shadow-xl hover:border-brand-gold/20 transition-all duration-300 group">
                  <div className="relative aspect-[4/3] bg-[#F5F5F0] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(p.status)}`}>
                      {p.status}
                    </span>
                    {p.featured && (
                      <span className="absolute top-4 right-4 bg-brand-navy text-brand-gold px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-brand-gold/30 shadow-sm">
                        ★ Premium
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-[#9A9AA8] font-semibold mb-2">
                      <MapPin size={12} className="text-brand-gold" />
                      <span>{p.location}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-brand-navy mb-2 group-hover:text-brand-gold transition-colors line-clamp-1">
                      {p.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-border/40 mb-4 text-xs text-[#6B6B7B] font-mono">
                      <div className="flex items-center gap-1.5">
                        <BedDouble size={14} className="text-[#9A9AA8]" />
                        <span>{p.bedrooms ? `${p.bedrooms}` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 border-x border-brand-border/40 justify-center">
                        <Bath size={14} className="text-[#9A9AA8]" />
                        <span>{p.bathrooms ? `${p.bathrooms}` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <Maximize size={14} className="text-[#9A9AA8]" />
                        <span>{p.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-brand-navy font-mono">{p.priceLabel}</span>
                      <button
                        onClick={() => alert(`Inquire about ${p.title}`)}
                        className="px-4 py-2 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredProperties.map(p => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:shadow-xl hover:border-brand-gold/20 transition-all duration-300 flex flex-col md:flex-row">
                  <div className="relative w-full md:w-[280px] aspect-[4/3] md:aspect-auto bg-[#F5F5F0] overflow-hidden shrink-0">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#9A9AA8] font-semibold mb-2">
                        <MapPin size={12} className="text-brand-gold" />
                        <span>{p.location}</span>
                        {p.featured && (
                          <span className="ml-2 bg-brand-navy text-brand-gold px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
                            Premium
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-xl text-brand-navy mb-3">{p.title}</h3>
                      <p className="text-sm text-[#6B6B7B] line-clamp-2 mb-4">{p.description}</p>
                    </div>
                    <div>
                      <div className="flex gap-6 py-3 border-y border-brand-border/40 mb-4 text-xs text-[#6B6B7B] font-mono">
                        <span>{p.bedrooms ? `${p.bedrooms} Bed` : 'N/A'}</span>
                        <span className="pl-6 border-l border-brand-border/40">{p.bathrooms ? `${p.bathrooms} Bath` : 'N/A'}</span>
                        <span className="pl-6 border-l border-brand-border/40">{p.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-brand-navy font-mono">{p.priceLabel}</span>
                        <button
                          onClick={() => alert(`Inquire about ${p.title}`)}
                          className="px-6 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                        >
                          Inquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-16 text-center">
            <Link to="/" className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl font-semibold text-sm transition-colors">
              <ArrowRight size={14} className="rotate-180 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Shared Footer – same as landing page */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onToggleAdmin={handleToggleAdmin}
      />
    </div>
  );
}
