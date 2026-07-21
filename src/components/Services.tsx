/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, Compass, Hammer, Paintbrush } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const servicesData = [
    {
      number: '01',
      title: 'Property Sales & Leasing',
      icon: <Compass className="w-6 h-6" />,
      description: 'Buy, sell, or lease residential and commercial properties across Abuja’s prime locations with complete security.',
      features: [
        'Apartments for sale & rent',
        'Shops & commercial spaces',
        'Landed property & estates',
        'Short-term & long-term leasing',
      ],
    },
    {
      number: '02',
      title: 'Construction & Development',
      icon: <Hammer className="w-6 h-6" />,
      description: 'From ground-breaking to handover, we build durable, modern structures designed to stand the test of time.',
      features: [
        'Residential buildings',
        'Commercial complexes',
        'Estate development',
        'Project management',
      ],
    },
    {
      number: '03',
      title: 'Renovation & Remodeling',
      icon: <Paintbrush className="w-6 h-6" />,
      description: 'Breathe new life into existing properties with our professional architectural and interior remodeling.',
      features: [
        'Home renovations',
        'Office remodeling',
        'Interior finishing',
        'Structural upgrades',
      ],
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F5F5F0] border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Headings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold block mb-2">
              What We Do
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">
              End-to-End Property Solutions
            </h2>
          </div>
          <p className="text-[#6B6B7B] max-w-md text-sm md:text-base leading-relaxed">
            Unique Homes operates a fully unified model, from land mapping and design engineering to property brokerage and luxury maintenance.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.number}
              className="bg-white p-8 rounded-[24px] shadow-sm border border-brand-border/55 flex flex-col justify-between group hover:shadow-xl hover:border-brand-gold/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                {/* Number & Icon Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-3xl font-light text-brand-gold/30 group-hover:text-brand-gold transition-colors duration-300">
                    {service.number}
                  </span>
                  <div className="p-3 bg-[#F5F5F0] text-brand-gold rounded-xl group-hover:bg-brand-navy group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-brand-navy mb-4 group-hover:text-brand-gold transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-[#6B6B7B] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features Bullets List */}
                <ul className="space-y-3 mb-8 border-t border-brand-border/40 pt-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-xs text-[#6B6B7B] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Action Link */}
              <button
                onClick={() => onSelectService(service.title)}
                className="flex items-center justify-between py-3 px-4 rounded-xl border border-brand-border hover:border-brand-gold text-xs font-semibold uppercase tracking-wider text-brand-navy hover:text-brand-gold bg-transparent cursor-pointer transition-colors"
              >
                Inquire About Service
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
