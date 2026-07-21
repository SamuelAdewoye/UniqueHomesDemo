/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Stats() {
  const statsData = [
    { value: '800+', label: 'Homes Rented' },
    { value: '200+', label: 'Homes Sold' },
    { value: '400+', label: 'Homes Renovated' },
    { value: '40+', label: 'Homes Constructed' },
    { value: '900+', label: 'Clients Satisfied' },
  ];

  return (
    <section className="py-20 bg-brand-navy border-b border-brand-gold/10 relative overflow-hidden">
      {/* Decorative luxury abstract shapes */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Core Narrative Row */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-gold">
            Proven Performance
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F5F0] mt-3">
            Quiet Confidence Through Demonstrated Results
          </h2>
        </div>

        {/* Big Stats Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 items-center">
          {statsData.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center flex flex-col justify-center ${
                i > 0 ? 'md:border-l md:border-[#F5F5F0]/10' : ''
              }`}
            >
              <span className="font-display font-bold text-4xl lg:text-[54px] text-brand-gold block leading-none mb-3">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[#9A9AA8]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
