/**
 * Types for Landing Page Dynamic Content Management (CMS)
 */

export interface TrackCMSItem {
  id: string;
  name: string;
  desc: string;
  time: string;
  img: string;
  createdAt: string;
}

export interface PartnerCMSItem {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
}

export interface TestimonialCMSItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  badge: string;
  image: string;
  rating: number;
  createdAt: string;
}

export interface GalleryCMSItem {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}

export type LandingSectionType = "tracks" | "partners" | "testimonials" | "gallery";
