/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Property, Inquiry } from './types';
import { INITIAL_PROPERTIES, TESTIMONIALS, FAQS } from './data';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import VideoTour from './components/VideoTour';
import About from './components/About';
import Services from './components/Services';
import Properties from './components/Properties';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import CMS from './components/CMS';
import Footer from './components/Footer';

import { X, Send, CheckCircle, Landmark, Shield } from 'lucide-react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServicePreset, setSelectedServicePreset] = useState('');

  // Quote Modal state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteType, setQuoteType] = useState('Custom Construction');
  const [quoteBudget, setQuoteBudget] = useState('₦100,000,000 - ₦250,000,000');
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    // 1. Properties
    const cachedProps = localStorage.getItem('unique_homes_properties_v1');
    if (cachedProps) {
      setProperties(JSON.parse(cachedProps));
    } else {
      setProperties(INITIAL_PROPERTIES);
      localStorage.setItem('unique_homes_properties_v1', JSON.stringify(INITIAL_PROPERTIES));
    }

    // 2. Inquiries
    const cachedInquiries = localStorage.getItem('unique_homes_inquiries_v1');
    if (cachedInquiries) {
      setInquiries(JSON.parse(cachedInquiries));
    } else {
      // Pre-seed 1 mock inquiry to make admin dashboard interesting initially
      const initialInq: Inquiry[] = [
        {
          id: 'inq-initial-1',
          name: 'Chief Aliyu Gwarzo',
          phone: '+234 802 999 8888',
          email: 'aliyu.gwarzo@nigerianenergy.org',
          service: 'Property Inquiry: The Grand Pavilion',
          message: 'I want to schedule a physical inspection of this Maitama Villa for next Wednesday afternoon. Please confirm security credentials for entry.',
          propertyName: 'The Grand Pavilion',
          propertyId: 'prop-1',
          status: 'New',
          date: new Date('2026-07-20T14:30:00').toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ];
      setInquiries(initialInq);
      localStorage.setItem('unique_homes_inquiries_v1', JSON.stringify(initialInq));
    }

    // 3. Favorites
    const cachedFavs = localStorage.getItem('unique_homes_favorites_v1');
    if (cachedFavs) {
      setFavorites(JSON.parse(cachedFavs));
    }
  }, []);

  // Sync to LocalStorage on changes
  const savePropertiesToCache = (updated: Property[]) => {
    setProperties(updated);
    localStorage.setItem('unique_homes_properties_v1', JSON.stringify(updated));
  };

  const saveInquiriesToCache = (updated: Inquiry[]) => {
    setInquiries(updated);
    localStorage.setItem('unique_homes_inquiries_v1', JSON.stringify(updated));
  };

  // Scroll Section Highlight Tracker
  useEffect(() => {
    if (isAdmin) return;

    const sections = ['home', 'about', 'services', 'properties', 'gallery', 'testimonials', 'faqs'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);

  // Public CRUD operations passing to CMS

  const handleAddProperty = (newProp: Property) => {
    const updated = [newProp, ...properties];
    savePropertiesToCache(updated);
  };

  const handleUpdateProperty = (updatedProp: Property) => {
    const updated = properties.map((p) => (p.id === updatedProp.id ? updatedProp : p));
    savePropertiesToCache(updated);
  };

  const handleDeleteProperty = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    savePropertiesToCache(updated);
  };

  // Public contact inquiry submission
  const handleCreateInquiry = (inqData: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInq: Inquiry = {
      ...inqData,
      id: `inq-${Date.now()}`,
      status: 'New',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const updated = [newInq, ...inquiries];
    saveInquiriesToCache(updated);
  };

  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    saveInquiriesToCache(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((i) => i.id !== id);
    saveInquiriesToCache(updated);
  };

  // Wishlist favorite toggler
  const handleToggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('unique_homes_favorites_v1', JSON.stringify(updated));
  };

  // Trigger smooth scrolling helper from footer or CTA
  const handleNavigateToSection = (id: string) => {
    setIsAdmin(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 88;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 150);
  };

  // Services CTA handler
  const handleSelectServicePreset = (serviceName: string) => {
    setSelectedServicePreset(serviceName);
    handleNavigateToSection('contact');
  };

  // Estimator Quote Form Submit
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone || !quoteEmail) return;

    handleCreateInquiry({
      name: quoteName,
      phone: quotePhone,
      email: quoteEmail,
      service: `Project Estimate: ${quoteType}`,
      message: `Project estimate request. Selected Budget: ${quoteBudget}. Specifications Details: ${
        quoteDetails || 'Standard luxury specs requested.'
      }`,
    });

    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setQuoteName('');
      setQuotePhone('');
      setQuoteEmail('');
      setQuoteDetails('');
      setIsQuoteOpen(false);
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen text-brand-navy font-sans antialiased">
      {/* 1. Global Navigation Bar */}
      <Navigation
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onOpenQuoteModal={() => setIsQuoteOpen(true)}
        activeSection={activeSection}
      />

      {/* 2. Primary Page Layouts Routing */}
      {isAdmin ? (
        /* Luxury Admin back office */
        <CMS
          properties={properties}
          inquiries={inquiries}
          onAddProperty={handleAddProperty}
          onUpdateProperty={handleUpdateProperty}
          onDeleteProperty={handleDeleteProperty}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onDeleteInquiry={handleDeleteInquiry}
        />
      ) : (
        /* Canonical Editorial Client Landing Page */
        <main>
          {/* Hero Section */}
          <Hero
            onExploreProperties={() => handleNavigateToSection('properties')}
            onWatchVideo={() => handleNavigateToSection('video-tour')}
          />

          {/* Video Walkthrough Tour */}
          <VideoTour />

          {/* About Corporate & Founder profile */}
          <About />

          {/* Business Services */}
          <Services onSelectService={handleSelectServicePreset} />

          {/* Properties Grid Showcase */}
          <Properties
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSubmitInquiry={handleCreateInquiry}
          />

          {/* Photo Gallery Masonry */}
          <Gallery />

          {/* Performance Statistics */}
          <Stats />

          {/* Client Testimonials */}
          <Testimonials testimonials={TESTIMONIALS} />

          {/* Support FAQs */}
          <FAQs faqs={FAQS} />

          {/* Lead Contact Form */}
          <Contact
            onSubmitInquiry={handleCreateInquiry}
            selectedServicePreset={selectedServicePreset}
          />

          {/* Final Call To Action Band */}
          <section className="py-20 bg-brand-navy text-[#F5F5F0] text-center relative overflow-hidden border-t border-brand-gold/10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-brand-gold font-semibold">
                Start Your Partnership
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                Your Dream Property Starts Here.
              </h2>
              <p className="text-sm text-[#9A9AA8] max-w-lg mx-auto leading-relaxed">
                Whether you seek a luxury villa in Maitama, a commercial plaza in Wuse II, or wish to start a custom architectural build, we are Abuja's trusted partners.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => handleNavigateToSection('contact')}
                  className="px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl text-sm font-semibold uppercase tracking-wider cursor-pointer shadow-md transition-transform hover:-translate-y-0.5"
                >
                  Get Started Today
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* 3. Canonical Footer */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
      />

      {/* 4. Luxury Project Quotation Estimator Dialog Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-8 relative shadow-2xl border border-brand-border">
            {/* Close Button */}
            <button
              onClick={() => setIsQuoteOpen(false)}
              className="absolute top-6 right-6 p-2.5 rounded-xl text-brand-navy hover:bg-[#F5F5F0] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Success state */}
            {quoteSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle size={32} />
                </div>
                <h4 className="font-display font-bold text-lg text-brand-navy mb-2">Quote Proposal Logged</h4>
                <p className="text-xs text-[#6B6B7B] leading-relaxed">
                  Your project requirements have been safely transmitted to our Estimation Desk. A representative will contact you with a detailed bill of quantities shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-brand-gold font-mono text-[9px] uppercase tracking-widest leading-none">
                    <Landmark size={12} />
                    <span>Cost Analysis & Estimator</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-brand-navy mt-1">Get a Project Proposal</h3>
                  <p className="text-[10px] text-[#6B6B7B] mt-0.5">Receive a certified engineering cost forecast for your Abuja project.</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-brand-navy mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    placeholder="e.g. Aliyu Bello"
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-widest text-brand-navy mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      placeholder="e.g. +234 803 123 4567"
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold text-brand-navy font-mono"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-widest text-brand-navy mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={quoteEmail}
                      onChange={(e) => setQuoteEmail(e.target.value)}
                      placeholder="e.g. aliyu@gmail.com"
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                    />
                  </div>
                </div>

                {/* Type of project select */}
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-brand-navy mb-1">Structural Project Model</label>
                  <select
                    value={quoteType}
                    onChange={(e) => setQuoteType(e.target.value)}
                    className="w-full bg-white border border-brand-border px-4 py-2.5 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-gold cursor-pointer"
                  >
                    <option value="Custom Duplex Construction">Custom Duplex/Villa Construction</option>
                    <option value="Property Acquisition">Property Outright Purchase</option>
                    <option value="Full Estate Development">Estate Development / Investment</option>
                    <option value="Structural Renovation & Remodeling">Structural Remodeling & Interior</option>
                  </select>
                </div>

                {/* Budget range select */}
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-brand-navy mb-1">Forecast Investment Budget (NGN)</label>
                  <select
                    value={quoteBudget}
                    onChange={(e) => setQuoteBudget(e.target.value)}
                    className="w-full bg-white border border-brand-border px-4 py-2.5 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-gold cursor-pointer"
                  >
                    <option value="₦35,000,000 - ₦75,000,000">₦35,000,000 - ₦75,000,000</option>
                    <option value="₦75,000,000 - ₦150,000,000">₦75,000,000 - ₦150,000,000</option>
                    <option value="₦150,000,000 - ₦300,000,000">₦150,000,000 - ₦300,000,000</option>
                    <option value="₦300,000,000 - ₦600,000,000+">₦300,000,000 - ₦600,000,000+</option>
                  </select>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-brand-navy mb-1">Project Particulars / Specifications</label>
                  <textarea
                    value={quoteDetails}
                    onChange={(e) => setQuoteDetails(e.target.value)}
                    rows={3}
                    placeholder="e.g. Cleared land in Maitama, require modern thermal isolation, solar plant..."
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                  />
                </div>

                {/* Submit button (Reserve Gold for primary actions) */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send size={12} />
                  Request Estimation Quote
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. Direct Secret Admin Quick Access Button floating */}
      <button
        onClick={() => {
          setIsAdmin(!isAdmin);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-6 right-6 z-40 p-3 bg-brand-navy/90 hover:bg-brand-navy hover:text-brand-gold text-[#F5F5F0] rounded-full shadow-2xl backdrop-blur-md cursor-pointer border border-brand-gold/10 flex items-center gap-2 group transition-all"
        title="Toggle Back Office / Client View"
      >
        <Shield size={16} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all text-[10px] uppercase font-bold tracking-widest leading-none">
          {isAdmin ? 'View Site' : 'Back Office'}
        </span>
      </button>

    </div>
  );
}
