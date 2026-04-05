"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { HowItWorks } from "@/components/sections/HowItWorksSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TracksSection } from "@/components/sections/tracks";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsSection } from "@/components/sections/news";
import { GallerySection } from "@/components/sections/GallerySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero & Stats */}
      <HeroSection />

      {/* 2. About & Video */}
      <AboutSection />

      {/* 3. Process Section */}
      <HowItWorks />

      {/* 4. Features Section */}
      <WhyChooseUs />

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
