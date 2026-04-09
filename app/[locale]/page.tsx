"use client";

import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUs";
import { TracksSection } from "@/components/sections/Tracks";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { NewsSection } from "@/components/sections/News";
import { GallerySection } from "@/components/sections/Gallery";
import { FAQSection } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* 1. Header */}
      <Header />

      {/* 2. Hero & Stats */}
      <HeroSection />

      {/* 3. About & Video */}
      <AboutSection />

      {/* 3. Process Section */}
      <HowItWorks />

      {/* 4. Features Section */}
      <WhyChooseUsSection />

      {/* 5. Training Tracks */}
      <TracksSection />

      {/* 6. Success Stories */}
      <TestimonialsSection />

      {/* 7. Latest News */}
      <NewsSection />

      {/* 8. Highlights Gallery */}
      <GallerySection />

      {/* 9. Frequently Asked Questions */}
      <FAQSection />

      {/* 10. Call to Action */}
      <CTASection />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
