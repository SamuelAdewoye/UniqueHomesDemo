/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Testimonial, FAQ } from './types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Grand Pavilion',
    price: 450000000,
    priceLabel: '₦450,000,000',
    location: 'Maitama, Abuja',
    type: 'Villa',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    size: '850 sqm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'An architectural masterpiece in Maitama, Abuja’s most exclusive residential enclave. Featuring triple-height ceilings, a private heated swimming pool, smart-home automation, automated gates, security outpost, and a private cinema. The details in the Italian marble floors and walnut wood wall paneling showcase luxury in its most quiet and confident form.',
    featured: true,
    specifications: ['Private Infinity Pool', 'Italian Marble Flooring', 'Smart Automation System', 'Home Cinema', '6-Car Underground Parking']
  },
  {
    id: 'prop-2',
    title: 'The Skyloft Penthouse',
    price: 280000000,
    priceLabel: '₦280,000,000',
    location: 'Asokoro, Abuja',
    type: 'Penthouse',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 5,
    size: '420 sqm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Elevated luxury in Asokoro, presenting breathtaking panoramic views of the Abuja cityscape. This penthouse is wrapped in double-glazed floor-to-ceiling glass walls, boasting a spacious private terrace, wrap-around balconies, a bespoke gourmet chef’s kitchen, and a private lift access key card.',
    featured: true,
    specifications: ['Panoramic City Views', 'Private Elevator Access', 'Floor-to-Ceiling Glass', 'Chef’s Kitchen', 'Bespoke Terrace Deck']
  },
  {
    id: 'prop-3',
    title: 'The Regent Commercial Plaza',
    price: 18000000,
    priceLabel: '₦18,000,000/year',
    location: 'Wuse II, Abuja',
    type: 'Commercial',
    status: 'For Rent',
    bedrooms: null,
    bathrooms: 4,
    size: '600 sqm',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium, column-free open commercial complex designed for high-profile corporations, luxury boutiques, or diplomatic missions in the thriving Wuse II commercial core. Features centralized dual HVAC climate systems, continuous backup generators, high-speed fiber connectivity, and dedicated private secure parking structures.',
    featured: false,
    specifications: ['Column-Free Layout', 'Central HVAC Climate System', 'Dual 250kVA Generators', 'High-Speed Fiber Lines', '24/7 Security Patrol']
  },
  {
    id: 'prop-4',
    title: 'Minimalist Glass Duplex',
    price: 12000000,
    priceLabel: '₦12,000,000/year',
    location: 'Gwarinpa, Abuja',
    type: 'Villa',
    status: 'For Rent',
    bedrooms: 4,
    bathrooms: 5,
    size: '500 sqm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'A striking minimalist residence offering modern design lines and superb comfort. Nestled in a peaceful residential close within Gwarinpa. This detached duplex features an open-concept living area, exquisite modern bathrooms with high-end brass finishes, a green manicured lawn, and high perimeter electric fencing.',
    featured: false,
    specifications: ['Electric Fence & CCTV', 'Manicured Lawn', 'Modern Brass Finishes', 'Fully Equipped Kitchen', '2-Room Staff Quarters']
  },
  {
    id: 'prop-5',
    title: 'Oakwood Gardens Terrace',
    price: 65000000,
    priceLabel: '₦65,000,000',
    location: 'Lugbe, Abuja',
    type: 'Apartment',
    status: 'Under Construction',
    bedrooms: 3,
    bathrooms: 4,
    size: '220 sqm',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Oakwood Gardens offers beautifully crafted terrace apartments under development in the accessible suburb of Lugbe. Perfect for young professionals and smart investors. Features modern eco-friendly solar panels pre-installed, high-quality masonry, double glazed windows, and an attractive flexible milestone installment plan.',
    featured: false,
    specifications: ['Pre-installed Solar Power', 'Gated Gated Community', 'Milestone Payment Plans', 'Dedicated Utility Rooms', 'Water Treatment Plant']
  },
  {
    id: 'prop-6',
    title: 'Prime Estate Land Plot',
    price: 35000000,
    priceLabel: '₦35,000,000',
    location: 'Kubwa, Abuja',
    type: 'Land',
    status: 'For Sale',
    bedrooms: null,
    bathrooms: null,
    size: '1000 sqm',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    description: 'A highly desirable 1,000 sqm development-ready land plot situated in the fast-growing residential layout of Kubwa. This land parcel is fully cleared, dry, fenced on three sides, and accompanied by an authenticated Certificate of Occupancy (C of O). Ideal for building a dream family estate or multi-unit block.',
    featured: false,
    specifications: ['Certificate of Occupancy (C of O)', '100% Cleared & Dry Land', 'Three-Side Perimeter Wall', 'Direct Access Road Link', 'Electricity Grid-Ready']
  },
  {
    id: 'prop-7',
    title: 'The Paramount Penthouse',
    price: 380000000,
    priceLabel: '₦380,000,000',
    location: 'Maitama, Abuja',
    type: 'Penthouse',
    status: 'Under Construction',
    bedrooms: 4,
    bathrooms: 5,
    size: '480 sqm',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'A breathtaking penthouse project currently under construction in Abuja’s premium Maitama district. With double-height living spaces, panoramic sky gardens, and state-of-the-art structural specifications. Offering custom choice in interior finishes if secured during construction stage.',
    featured: false,
    specifications: ['Panoramic Sky Gardens', 'Double-Height Ceilings', 'Customizable Finishes', 'Dedicated Concierge Lobby', 'Rooftop Lounge Area']
  },
  {
    id: 'prop-8',
    title: 'The Asokoro Serenity Villa',
    price: 600000000,
    priceLabel: '₦600,000,000',
    location: 'Asokoro, Abuja',
    type: 'Villa',
    status: 'Sold',
    bedrooms: 6,
    bathrooms: 7,
    size: '1200 sqm',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    description: 'This gorgeous luxury villa represents Abuja’s ultimate residential masterpiece, built with uncompromising quality. Proudly constructed, delivered and handed over by Unique Homes & Properties Ltd. Represents our standard of craftsmanship with its water stream courtyard and smart architectural insulation.',
    featured: false,
    specifications: ['Delivered and Sold', 'Signature Unique Homes build', 'Natural Water Stream Courtyard', 'Smart Thermal Insulation', 'Premium Fitness Center']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Unique Homes made the entire process seamless. Their professionalism and transparency gave us complete confidence from start to finish. We are proud of our new duplex in Maitama.',
    author: 'Amina Yusuf',
    role: 'Homeowner',
    location: 'Abuja'
  },
  {
    id: 't-2',
    quote: 'Building in Abuja from the diaspora is notoriously stressful. Dr. Noah’s team at Unique Homes changed that completely. They provided detailed structural reports, weekly photo updates, and completed our project on budget.',
    author: 'Dr. Chinedu Okafor',
    role: 'Diaspora Investor',
    location: 'London / Abuja'
  },
  {
    id: 't-3',
    quote: 'The remodeling service they provided for our corporate headquarters in Wuse II was phenomenal. They took our aging commercial block and transformed it into a modern, energy-efficient masterpiece within weeks.',
    author: 'Femi Adebayo',
    role: 'Managing Director, Veridian Corp',
    location: 'Abuja'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I schedule a property inspection with Unique Homes?',
    answer: 'You can easily schedule a physical or virtual guided tour by filling out the contact form below or clicking "Inquire Now" on any property. Our team will contact you within 2 hours to coordinate a convenient date and time. Inspections are conducted daily, including weekends.'
  },
  {
    id: 'faq-2',
    question: 'Do you handle both outright sales and rental leases?',
    answer: 'Yes, absolutely. Unique Homes specializes in both outright property sales (duplexes, land plots, penthouses) and premium long-term residential and commercial leases across Wuse, Maitama, Asokoro, Gwarinpa, and emerging high-value Abuja districts.'
  },
  {
    id: 'faq-3',
    question: 'Can Unique Homes manage construction projects for custom designs?',
    answer: 'Yes, we are a fully integrated Construction & Development firm. Founded by Dr. Noah, our team includes licensed architects, structural engineers, and project managers who manage projects from land acquisition, building approvals, actual construction, through to final interior handing over.'
  },
  {
    id: 'faq-4',
    question: 'Do you offer renovation services for existing homes?',
    answer: 'We provide specialized Renovation & Remodeling services to breathe new life into older structures. This includes structural strengthening, layout expansion, modern bathroom and kitchen upgrades, custom plumbing, solar panel installs, and interior finish remodeling.'
  },
  {
    id: 'faq-5',
    question: 'Which areas of Abuja do you cover?',
    answer: 'We cover Abuja’s premium and fast-growing districts, including Maitama, Asokoro, Wuse II, Gwarinpa, Jabi, Lugbe, Guzape, and Kubwa. We also help select and verify high-value landed assets in estate planning areas.'
  },
  {
    id: 'faq-6',
    question: 'How do I request a comprehensive quotation for a project?',
    answer: 'Simply click the "Get a Quote" button in our navigation bar or fill out the inquiry form. Specify your project requirements (e.g., custom duplex build, home renovation, or property purchase budget), and our engineering estimation desk will produce a detailed cost proposal for your review.'
  }
];
