/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white border-b border-brand-border/40 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        {/* Quote Icon Background Indicator */}
        <div className="text-brand-gold/15 flex justify-center mb-8">
          <Quote size={56} fill="currentColor" />
        </div>

        {/* Dynamic Review Block */}
        <div className="min-h-[180px] flex items-center justify-center">
          <blockquote className="font-display text-lg md:text-2xl font-medium text-brand-navy leading-relaxed max-w-2xl mx-auto">
            "{current.quote}"
          </blockquote>
        </div>

        {/* Author details */}
        <div className="mt-8">
          <cite className="not-italic font-bold text-base text-brand-navy block">
            {current.author}
          </cite>
          <span className="text-xs uppercase tracking-widest text-brand-gold block mt-1 font-mono">
            {current.role} — {current.location}
          </span>
        </div>

        {/* Controls and Dot indicators */}
        <div className="flex items-center justify-between mt-12 max-w-xs mx-auto border-t border-brand-border/60 pt-6">
          
          <button
            onClick={handlePrev}
            className="p-3 border border-brand-border hover:border-brand-gold hover:text-brand-gold rounded-full transition-all text-brand-navy cursor-pointer"
            title="Previous Testimonial"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-6 bg-brand-gold' : 'bg-brand-border hover:bg-brand-gold/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 border border-brand-border hover:border-brand-gold hover:text-brand-gold rounded-full transition-all text-brand-navy cursor-pointer"
            title="Next Testimonial"
          >
            <ChevronRight size={16} />
          </button>

        </div>
      </div>
    </section>
  );
}
