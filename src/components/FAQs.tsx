/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../types';

interface FAQsProps {
  faqs: FAQ[];
}

export default function FAQs({ faqs }: FAQsProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#F5F5F0]/20 border-b border-brand-border/40">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold">
            Support & Clarity
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6"></div>
          <p className="text-[#6B6B7B] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Clear answers, before you take the next step. Every property journey is personal. Here are a few of the questions our clients ask most often.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-brand-border/60 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:text-brand-gold transition-colors cursor-pointer"
                >
                  <span className="font-display font-bold text-sm md:text-base text-brand-navy group-hover:text-brand-gold">
                    {faq.question}
                  </span>
                  <span className="text-brand-gold ml-4 shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {/* Animated Body panel */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-brand-border/30' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 bg-[#F5F5F0]/30 text-xs md:text-sm text-[#6B6B7B] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
