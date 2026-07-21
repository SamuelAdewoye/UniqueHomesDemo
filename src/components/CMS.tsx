/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Property, Inquiry } from '../types';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Edit2,
  Inbox,
  LayoutGrid,
  TrendingUp,
  Building,
  Key,
  FolderOpen,
  Image,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

import cmsPresetVilla from '../assets/images/cms-preset-villa.jpg';
import cmsPresetMansion from '../assets/images/cms-preset-mansion.jpg';
import cmsPresetPenthouse from '../assets/images/cms-preset-penthouse.jpg';
import cmsPresetLand from '../assets/images/cms-preset-land.jpg';
import cmsPresetOffice from '../assets/images/cms-preset-office.jpg';

interface CMSProps {
  properties: Property[];
  inquiries: Inquiry[];
  onAddProperty: (prop: Property) => void;
  onUpdateProperty: (prop: Property) => void;
  onDeleteProperty: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  onDeleteInquiry: (id: string) => void;
}

export default function CMS({
  properties,
  inquiries,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
  onUpdateInquiryStatus,
  onDeleteInquiry,
}: CMSProps) {
  const [activeTab, setActiveTab] = useState<'inventory' | 'add' | 'inquiries'>('inventory');
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Form States for Add/Edit
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(150000000);
  const [location, setLocation] = useState('Maitama, Abuja');
  const [type, setType] = useState<Property['type']>('Villa');
  const [status, setStatus] = useState<Property['status']>('For Sale');
  const [bedrooms, setBedrooms] = useState<string>('4');
  const [bathrooms, setBathrooms] = useState<string>('5');
  const [size, setSize] = useState('450 sqm');
  const [image, setImage] = useState(cmsPresetVilla);
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [specListString, setSpecListString] = useState('Smart Security, Double Glazing, Pre-installed Solar, Fully Furnished');
  const [toastMessage, setToastMessage] = useState('');

  // Sample Image Templates to help user quickly choose a beautiful house
  const imagePresets = [
    { label: 'Villa Modern', url: cmsPresetVilla },
    { label: 'Mansion Pool', url: cmsPresetMansion },
    { label: 'Luxury Penthouse', url: cmsPresetPenthouse },
    { label: 'Cleared Land plot', url: cmsPresetLand },
    { label: 'Modern Office Block', url: cmsPresetOffice }
  ];

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !location) return;

    const formattedSpecs = specListString.split(',').map(s => s.trim()).filter(Boolean);

    // Standard Currency Formatting for Naira PriceLabel
    let priceLabel = `₦${price.toLocaleString()}`;
    if (status === 'For Rent') {
      priceLabel += '/year';
    }

    if (editingPropertyId) {
      const updated: Property = {
        id: editingPropertyId,
        title,
        price,
        priceLabel,
        location,
        type,
        status,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        size,
        image,
        description: description || `Premium ${type} situated in the quiet secure layouts of ${location}. Built by Unique Homes.`,
        featured,
        specifications: formattedSpecs.length > 0 ? formattedSpecs : ['Bespoke Luxury Finishes', '24/7 Power Support', 'Dedicated Security']
      };
      onUpdateProperty(updated);
      setToastMessage('Listing updated successfully!');
      setEditingPropertyId(null);
    } else {
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        title,
        price,
        priceLabel,
        location,
        type,
        status,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        size,
        image,
        description: description || `Premium ${type} situated in the quiet secure layouts of ${location}. Built by Unique Homes.`,
        featured,
        specifications: formattedSpecs.length > 0 ? formattedSpecs : ['Bespoke Luxury Finishes', '24/7 Power Support', 'Dedicated Security']
      };
      onAddProperty(newProp);
      setToastMessage('New listing added successfully!');
    }

    // Reset Form Fields
    setTitle('');
    setPrice(150000000);
    setBedrooms('4');
    setBathrooms('5');
    setSize('450 sqm');
    setDescription('');
    setFeatured(false);
    setSpecListString('Smart Security, Double Glazing, Pre-installed Solar, Fully Furnished');
    
    // Auto toggle to inventory to view listing
    setTimeout(() => {
      setToastMessage('');
      setActiveTab('inventory');
    }, 1000);
  };

  const handleEditClick = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setTitle(prop.title);
    setPrice(prop.price);
    setLocation(prop.location);
    setType(prop.type);
    setStatus(prop.status);
    setBedrooms(prop.bedrooms?.toString() || '');
    setBathrooms(prop.bathrooms?.toString() || '');
    setSize(prop.size);
    setImage(prop.image);
    setDescription(prop.description);
    setFeatured(prop.featured);
    setSpecListString(prop.specifications.join(', '));
    setActiveTab('add');
  };

  const handleCancelEdit = () => {
    setEditingPropertyId(null);
    setTitle('');
    setPrice(150000000);
    setBedrooms('4');
    setBathrooms('5');
    setSize('450 sqm');
    setDescription('');
    setFeatured(false);
    setSpecListString('Smart Security, Double Glazing, Pre-installed Solar, Fully Furnished');
    setActiveTab('inventory');
  };

  // Stats Counters
  const countTotal = properties.length;
  const countForSale = properties.filter(p => p.status === 'For Sale').length;
  const countForRent = properties.filter(p => p.status === 'For Rent').length;
  const countConstruction = properties.filter(p => p.status === 'Under Construction').length;
  const countNewInquiries = inquiries.filter(i => i.status === 'New').length;

  return (
    <section className="pt-28 pb-20 min-h-screen bg-[#F5F5F0]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back Office Branding Title block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b border-brand-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-gold font-mono text-xs uppercase tracking-widest mb-1.5">
              <ShieldAlert size={14} />
              <span>Secure Executive Console</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-brand-navy">
              Back Office Dashboard
            </h1>
          </div>
          <p className="text-xs text-[#9A9AA8] font-mono mt-2 md:mt-0">
            Authenticated: <strong className="text-brand-navy">cwebafrica@gmail.com</strong>
          </p>
        </div>

        {/* Real-time Inventory Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-brand-navy text-[#F5F5F0] rounded-xl">
              <FolderOpen size={18} />
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-brand-navy block">{countTotal}</span>
              <span className="text-[10px] text-[#9A9AA8] uppercase font-bold tracking-wider">Total Listings</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#F5F5F0] text-brand-gold rounded-xl">
              <TrendingUp size={18} />
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-brand-navy block">{countForSale}</span>
              <span className="text-[10px] text-[#9A9AA8] uppercase font-bold tracking-wider">For Sale</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#F5F5F0] text-brand-gold rounded-xl">
              <Key size={18} />
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-brand-navy block">{countForRent}</span>
              <span className="text-[10px] text-[#9A9AA8] uppercase font-bold tracking-wider">For Lease</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#F5F5F0] text-brand-gold rounded-xl">
              <Building size={18} />
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-brand-navy block">{countConstruction}</span>
              <span className="text-[10px] text-[#9A9AA8] uppercase font-bold tracking-wider">Under Development</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm col-span-2 md:col-span-1 flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
              <Inbox size={18} />
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-brand-navy block">{inquiries.length}</span>
              <span className="text-[10px] text-[#9A9AA8] uppercase font-bold tracking-wider">
                Inquiries {countNewInquiries > 0 && <strong className="text-rose-600">({countNewInquiries} New)</strong>}
              </span>
            </div>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-brand-border/80 mb-8">
          <button
            onClick={() => { setActiveTab('inventory'); setEditingPropertyId(null); }}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
              activeTab === 'inventory' && !editingPropertyId
                ? 'border-brand-gold text-brand-gold font-bold'
                : 'border-transparent text-brand-navy/60 hover:text-brand-navy'
            }`}
          >
            <LayoutGrid size={14} />
            Active Inventory ({properties.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
              activeTab === 'add' || editingPropertyId
                ? 'border-brand-gold text-brand-gold font-bold'
                : 'border-transparent text-brand-navy/60 hover:text-brand-navy'
            }`}
          >
            <Plus size={14} />
            {editingPropertyId ? `Edit Property (${title})` : 'Add New Property'}
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
              activeTab === 'inquiries'
                ? 'border-brand-gold text-brand-gold font-bold'
                : 'border-transparent text-brand-navy/60 hover:text-brand-navy'
            }`}
          >
            <Inbox size={14} />
            Client Inquiries ({inquiries.length})
          </button>
        </div>

        {/* Toast Toast Alert Notification */}
        {toastMessage && (
          <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs font-semibold">
            <CheckCircle size={16} />
            {toastMessage}
          </div>
        )}

        {/* CMS Views Contents */}

        {/* VIEW 1: INVENTORY TABLE CATALOG */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-[24px] border border-brand-border/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-brand-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-base text-brand-navy">Verified Property Inventory</h3>
                <p className="text-xs text-[#9A9AA8]">Review, update or retire active Abuja real estate listings.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F5F5F0]/50 text-[10px] font-bold uppercase tracking-widest text-[#9A9AA8] border-b border-brand-border/60">
                    <th className="py-4 px-6">Property Title</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Price Point</th>
                    <th className="py-4 px-6">Type / Status</th>
                    <th className="py-4 px-6">Specs</th>
                    <th className="py-4 px-6 text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {properties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-[#F5F5F0]/15 text-xs transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="w-10 h-10 object-cover rounded-lg border border-brand-border shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-brand-navy block">{prop.title}</span>
                            {prop.featured && (
                              <span className="inline-block px-1.5 py-0.5 bg-brand-gold/10 text-brand-gold rounded text-[9px] font-bold uppercase tracking-wider">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#6B6B7B] font-medium">{prop.location}</td>
                      <td className="py-4 px-6 font-bold text-brand-navy font-mono">{prop.priceLabel}</td>
                      <td className="py-4 px-6">
                        <span className="text-brand-navy font-semibold uppercase tracking-wider">{prop.type}</span>
                        <span className="block text-[10px] text-[#9A9AA8] font-semibold">{prop.status}</span>
                      </td>
                      <td className="py-4 px-6 text-[#6B6B7B] font-mono">
                        {prop.bedrooms ? `${prop.bedrooms} Bed` : 'N/A'} | {prop.bathrooms ? `${prop.bathrooms} Bath` : 'N/A'}
                        <span className="block text-[10px] text-[#9A9AA8]">{prop.size}</span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(prop)}
                          className="p-2 border border-brand-border hover:border-brand-gold hover:text-brand-gold text-brand-navy rounded-lg transition-colors cursor-pointer"
                          title="Edit Listing"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you absolutely sure you want to retire "${prop.title}"?`)) {
                              onDeleteProperty(prop.id);
                              setToastMessage('Listing retired from database.');
                              setTimeout(() => setToastMessage(''), 1000);
                            }
                          }}
                          className="p-2 border border-brand-border hover:border-rose-600 hover:text-rose-600 text-brand-navy rounded-lg transition-colors cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 2: ADD / EDIT PROPERTY FORM */}
        {activeTab === 'add' && (
          <div className="bg-white rounded-[24px] border border-brand-border/60 shadow-sm p-8">
            <div className="mb-8 border-b border-brand-border/40 pb-5">
              <h3 className="font-display font-bold text-lg text-brand-navy">
                {editingPropertyId ? 'Modify Premium Property Listing' : 'Introduce New Property to Portfolio'}
              </h3>
              <p className="text-xs text-[#9A9AA8]">
                Ensure photos match architectural magazine standards. Complete all specifications accurately.
              </p>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="space-y-6">
              
              {/* Row 1: Title & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Property Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Oakwood Pavilion"
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Asking Price (NGN Naira)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    placeholder="e.g. 150000000"
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Location, Type, Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Abuja Neighborhood</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold cursor-pointer font-semibold text-brand-navy"
                  >
                    <option value="Maitama, Abuja">Maitama, Abuja</option>
                    <option value="Asokoro, Abuja">Asokoro, Abuja</option>
                    <option value="Wuse II, Abuja">Wuse II, Abuja</option>
                    <option value="Gwarinpa, Abuja">Gwarinpa, Abuja</option>
                    <option value="Lugbe, Abuja">Lugbe, Abuja</option>
                    <option value="Kubwa, Abuja">Kubwa, Abuja</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Structural Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Property['type'])}
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold cursor-pointer font-semibold text-brand-navy"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial">Commercial Block</option>
                    <option value="Land">Land Plot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Lease/Sale Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Property['status'])}
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold cursor-pointer font-semibold text-brand-navy"
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent (Lease)</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Sold">Mark as Sold</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Bedrooms, Bathrooms, Size */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Bedrooms Count</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    placeholder="e.g. 5 (Leave blank for Land)"
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Bathrooms Count</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    placeholder="e.g. 6 (Leave blank for Land)"
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Total Size Area (sqm)</label>
                  <input
                    type="text"
                    required
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 750 sqm"
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy font-mono"
                  />
                </div>
              </div>

              {/* Image Input and Presets */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Architectural Photo URL</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Unsplash premium architectural image URL"
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy font-mono"
                  />
                </div>

                {/* Preset Selection Buttons */}
                <div className="mt-3 bg-[#F5F5F0] p-4 rounded-xl border border-brand-border/60">
                  <span className="text-[10px] uppercase tracking-widest text-[#9A9AA8] block font-mono mb-2">
                    Quick High-Quality Image Templates:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {imagePresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setImage(preset.url);
                          setToastMessage(`Template Image selected: ${preset.label}`);
                          setTimeout(() => setToastMessage(''), 1000);
                        }}
                        className={`px-3 py-1.5 bg-white border border-brand-border rounded-lg text-[10px] font-semibold text-brand-navy hover:border-brand-gold hover:text-brand-gold cursor-pointer transition-colors ${
                          image === preset.url ? 'border-brand-gold text-brand-gold bg-brand-gold/5' : ''
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Property Narrative Brochure Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Detail the location benefits, masonry, custom marble finish, ceiling heights..."
                  className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                />
              </div>

              {/* Specifications comma list */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">
                  Structural Specifications Checklist (Comma-separated)
                </label>
                <input
                  type="text"
                  value={specListString}
                  onChange={(e) => setSpecListString(e.target.value)}
                  placeholder="e.g. CCTV Surveillance, Manicured Gardens, Rooftop Bar, Water Treatment"
                  className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-3 bg-[#F5F5F0] p-4 rounded-xl border border-brand-border/60">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-gold border-brand-border focus:ring-brand-gold"
                />
                <label htmlFor="featured-check" className="text-xs font-semibold text-brand-navy uppercase tracking-wider cursor-pointer">
                  Feature prominently on Home Banner / Carousel (★ Premium Highlight)
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-border/40">
                {editingPropertyId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3 border border-brand-border hover:bg-[#F5F5F0] text-brand-navy rounded-xl text-xs font-semibold uppercase tracking-wider"
                  >
                    Cancel Edit
                  </button>
                )}

                <button
                  type="submit"
                  className="px-8 py-3 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {editingPropertyId ? 'Apply Database Changes' : 'Publish Listing'}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* VIEW 3: INQUIRIES RECEIVED INBOX */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-white rounded-[24px] border border-brand-border/60 shadow-sm p-6">
              <h3 className="font-display font-bold text-base text-brand-navy">Client Communications Vault</h3>
              <p className="text-xs text-[#9A9AA8]">Inbound property purchase inquiries and project quotation submissions.</p>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[24px] border border-brand-border/60">
                <Inbox size={40} className="text-brand-gold/30 mx-auto mb-4" />
                <h4 className="font-display font-semibold text-brand-navy mb-1">Communications Inbox Empty</h4>
                <p className="text-xs text-[#6B6B7B]">Test-submit the contact form or a property details inquiry to log client leads.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`bg-white p-6 rounded-[24px] border shadow-sm transition-all flex flex-col md:flex-row justify-between md:items-start gap-4 ${
                      inq.status === 'New' ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-border/60'
                    }`}
                  >
                    <div className="space-y-3 flex-1">
                      {/* Badge and Date Header */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          inq.status === 'New'
                            ? 'bg-brand-gold text-white'
                            : inq.status === 'Actioned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {inq.status} Inquiry
                        </span>
                        <span className="text-[10px] text-[#9A9AA8] font-mono font-medium">{inq.date}</span>
                      </div>

                      {/* Client info */}
                      <div>
                        <h4 className="font-display font-bold text-base text-brand-navy leading-none mb-1">{inq.name}</h4>
                        <span className="text-xs text-[#6B6B7B] font-mono">
                          Phone: <strong>{inq.phone}</strong> | Email: <strong>{inq.email}</strong>
                        </span>
                      </div>

                      {/* Request block */}
                      <div className="p-3.5 bg-[#F5F5F0]/60 rounded-xl text-xs border border-brand-border/40">
                        <span className="block font-bold text-brand-navy uppercase tracking-wider text-[10px] mb-1 text-brand-gold">
                          TOPIC / SERVICE REQUESTED:
                        </span>
                        <span className="font-semibold text-brand-navy text-sm block mb-2">{inq.service}</span>
                        <p className="text-[#6B6B7B] leading-relaxed">"{inq.message}"</p>
                      </div>
                    </div>

                    {/* Actions menu */}
                    <div className="flex md:flex-col gap-2 justify-end shrink-0 self-end md:self-start border-t md:border-t-0 border-brand-border/40 pt-4 md:pt-0">
                      {inq.status === 'New' && (
                        <button
                          onClick={() => {
                            onUpdateInquiryStatus(inq.id, 'Actioned');
                            setToastMessage('Inquiry marked as actioned.');
                            setTimeout(() => setToastMessage(''), 1000);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
                        >
                          Mark Contacted
                        </button>
                      )}

                      {inq.status !== 'Archived' && (
                        <button
                          onClick={() => {
                            onUpdateInquiryStatus(inq.id, 'Archived');
                            setToastMessage('Inquiry archived in vault.');
                            setTimeout(() => setToastMessage(''), 1000);
                          }}
                          className="px-3 py-1.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
                        >
                          Archive Inquiry
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm('Delete client record completely? This is irreversible.')) {
                            onDeleteInquiry(inq.id);
                            setToastMessage('Client inquiry removed.');
                            setTimeout(() => setToastMessage(''), 1000);
                          }
                        }}
                        className="px-3 py-1.5 border border-brand-border hover:border-rose-600 hover:text-rose-600 rounded-lg text-[10px] font-semibold uppercase tracking-wider text-brand-navy cursor-pointer"
                      >
                        Delete Record
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
