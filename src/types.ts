/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  title: string;
  price: number; // In Nigerian Naira (NGN)
  priceLabel: string; // e.g. "₦250,000,000" or "₦4,500,000/year"
  location: string; // Abuja neighborhoods
  type: 'Apartment' | 'Villa' | 'Commercial' | 'Land' | 'Penthouse';
  status: 'For Sale' | 'For Rent' | 'Under Construction' | 'Sold';
  bedrooms: number | null;
  bathrooms: number | null;
  size: string; // e.g., "350 sqm" or "1,200 sqm"
  image: string; // Premium Unsplash architectural image
  description: string;
  featured: boolean;
  specifications: string[]; // Key selling points
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  propertyId?: string;
  propertyName?: string;
  status: 'New' | 'Actioned' | 'Archived';
  date: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
