/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactProps {
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  selectedServicePreset?: string;
}

export default function Contact({ onSubmitInquiry, selectedServicePreset = '' }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Property Sales & Leasing');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync preset service if passed down
  useEffect(() => {
    if (selectedServicePreset) {
      setService(selectedServicePreset);
    }
  }, [selectedServicePreset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    onSubmitInquiry({
      name,
      phone,
      email,
      service,
      message: message.trim() || `I want to inquire about "${service}". Please contact me as soon as possible.`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Corporate Office & Contacts */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold block mb-2">
                Get In Touch
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Ready to own or build in Abuja? Let’s get talking!
              </h2>
              <p className="text-[#6B6B7B] text-sm md:text-base leading-relaxed mb-8">
                Visit our office or message the team directly. We will help you take the next property decision with confidence.
              </p>

              {/* Office Details Blocks */}
              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F5F5F0] text-brand-gold rounded-xl shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#9A9AA8]">Telephone Lines</h5>
                    <p className="text-sm font-semibold text-brand-navy font-mono mt-0.5">+234 0813 4853 895</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F5F5F0] text-brand-gold rounded-xl shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#9A9AA8]">Email Address</h5>
                    <p className="text-sm font-semibold text-brand-navy font-mono mt-0.5">noahnwaneri2@gmail.com</p>
                    <p className="text-xs text-[#6B6B7B] font-mono">info@uniquehomes.ng</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F5F5F0] text-brand-gold rounded-xl shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#9A9AA8]">Physical Office</h5>
                    <p className="text-sm font-semibold text-brand-navy mt-0.5">
                      Suite 6, Bricks Plaza, opposite Joseph Jorin School, Arab Road, Kubwa, Abuja.
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F5F5F0] text-brand-gold rounded-xl shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#9A9AA8]">Business Hours</h5>
                    <p className="text-xs text-brand-navy font-semibold mt-0.5">Monday – Friday: 8:00 AM – 5:00 PM</p>
                    <p className="text-xs text-[#6B6B7B]">Saturday: 10:00 AM – 2:00 PM (By Inspection Appointment Only)</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Styled Map Preview */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-brand-border/60 shadow-inner bg-stone-100 flex items-center justify-center">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute left-[30%] top-0 bottom-0 w-[4px] bg-white"></div>
                <div className="absolute left-[70%] top-0 bottom-0 w-[6px] bg-white"></div>
                <div className="absolute top-[40%] left-0 right-0 h-[4px] bg-white"></div>
                <div className="absolute top-[80%] left-0 right-0 h-[8px] bg-white"></div>
                <div className="absolute left-[5%] top-[10%] w-24 h-24 rounded-full bg-[#1A1A2E]/5 border border-brand-navy/5"></div>
              </div>
              <div className="relative z-10 text-center flex flex-col items-center gap-2 p-4">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center shadow-lg border border-brand-gold/30">
                  <MapPin size={20} />
                </div>
                <div>
                  <h6 className="text-[11px] font-bold text-brand-navy uppercase tracking-wider">Unique Homes Head Office</h6>
                  <p className="text-[9px] text-[#6B6B7B] font-mono">Bricks Plaza, Arab Road, Kubwa</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Lead Submission Form */}
          <div className="lg:col-span-7 bg-[#F5F5F0] p-8 md:p-10 rounded-[28px] border border-brand-border shadow-md">
            
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-display font-bold text-2xl text-brand-navy mb-3">Inquiry Received</h3>
                <p className="text-[#6B6B7B] max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for contacting Unique Homes & Properties. We have securely received your inquiry and saved it to our registry. Our consultant will reach out to you within the next 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold">Secure Communications</span>
                  <h3 className="font-display font-bold text-xl text-brand-navy mt-1">Direct Consultant Form</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aliyu Bello"
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +234 803 123 4567"
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aliyubello@gmail.com"
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                    />
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Service Required</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full appearance-none bg-white border border-brand-border px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-gold cursor-pointer"
                    >
                      <option value="Property Sales & Leasing">Property Sales & Leasing</option>
                      <option value="Construction & Development">Construction & Development</option>
                      <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                      <option value="Property Valuation">General Property Consultation</option>
                    </select>
                  </div>
                </div>

                {/* Message (Optional so fallback text in handleSubmit works if empty) */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-navy mb-1.5">Your Message / Requirements</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Describe what you want to achieve (e.g. I want to build a 5 bedroom duplex in Gwarinpa, or lease an apartment...)"
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold text-brand-navy"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Send size={14} />
                  Send Inquiry
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}