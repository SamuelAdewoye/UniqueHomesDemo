import { useState, useEffect } from 'react';
import { Shield, Menu, X, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onOpenQuoteModal: () => void;
  activeSection: string;
}

export default function Navigation({
  isAdmin,
  setIsAdmin,
  onOpenQuoteModal,
  activeSection,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQs', href: '#faqs' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (isAdmin) {
      setIsAdmin(false); // Switch to public view to show the section
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 88; // height of navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-[88px] transition-all duration-300 border-b ${
        isScrolled || isAdmin
          ? 'bg-[#F5F5F0] border-brand-border shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setIsAdmin(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-left cursor-pointer group"
        >
          <div className="p-2 bg-brand-navy text-brand-gold rounded-xl transition-transform group-hover:scale-105">
            <Landmark size={24} />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-wider text-brand-navy block leading-none">
              UNIQUE HOMES
            </span>
            <span className="text-[10px] tracking-[0.2em] font-medium text-brand-gold block mt-0.5">
              & PROPERTIES LTD.
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId && !isAdmin;
            return (
              <button
                key={item.label}
                onClick={() => handleScrollTo(sectionId)}
                className={`text-sm font-medium tracking-wide transition-colors cursor-pointer relative py-2 ${
                  isActive
                    ? 'text-brand-gold font-semibold'
                    : 'text-brand-navy/80 hover:text-brand-navy'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold rounded-full" />
                )}
              </button>
            );
          })}

          {/* Properties - Dedicated Page Link */}
          <Link
            to="/properties"
            className="text-sm font-medium tracking-wide transition-colors cursor-pointer relative py-2 text-brand-navy/80 hover:text-brand-navy"
          >
            Properties
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Admin Toggle */}
          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              isAdmin
                ? 'bg-brand-gold text-white'
                : 'bg-brand-navy text-[#F5F5F0] hover:bg-brand-navy/90'
            }`}
          >
            <Shield size={14} />
            {isAdmin ? 'Client View' : 'Back Office'}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl text-sm font-semibold tracking-wide shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Actions Container (Controls & Hamburger) */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Back Office Badge on Mobile */}
          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isAdmin
                ? 'bg-brand-gold text-white'
                : 'bg-brand-navy text-[#F5F5F0]'
            }`}
            title="Toggle Admin Mode"
          >
            <Shield size={16} />
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-navy hover:bg-brand-border/30 rounded-xl transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[88px] left-0 w-full bg-[#F5F5F0] border-b border-brand-border shadow-lg z-40 transition-all">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScrollTo(item.href.replace('#', ''))}
                className="text-left py-2.5 text-base font-medium text-brand-navy hover:text-brand-gold border-b border-brand-border/40 transition-colors"
              >
                {item.label}
              </button>
            ))}

            {/* Properties - Dedicated Page Link */}
            <Link
              to="/properties"
              className="block text-left py-2.5 text-base font-medium text-brand-navy hover:text-brand-gold border-b border-brand-border/40 transition-colors"
            >
              Properties
            </Link>
            
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdmin(!isAdmin);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider ${
                  isAdmin
                    ? 'bg-brand-gold text-white'
                    : 'bg-brand-navy text-[#F5F5F0]'
                }`}
              >
                <Shield size={16} />
                {isAdmin ? 'Switch to Client View' : 'Access Back Office'}
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="py-3 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl text-sm font-semibold tracking-wide text-center"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

