"use client";

import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUs";
import { PartnersSection } from "@/components/sections/Partners";
import { TracksSection } from "@/components/sections/Tracks";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { NewsSection } from "@/components/sections/News";
import { GallerySection } from "@/components/sections/Gallery";
import { FAQSection } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/animations/Reveal";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">

      {/* 2. Hero & Stats */}
      <Reveal>
        <HeroSection />
      </Reveal>

      {/* 3. About & Video */}
      <Reveal>
        <AboutSection />
      </Reveal>

      {/* 3. Process Section */}
      <Reveal>
        <HowItWorks />
      </Reveal>

      {/* 4. Features Section */}
      <Reveal>
        <WhyChooseUsSection />
      </Reveal>

      {/* 4.1 University Partners */}
      <Reveal>
        <PartnersSection />
      </Reveal>

      {/* 5. Training Tracks */}
      <Reveal>
        <TracksSection />
      </Reveal>

      {/* 6. Success Stories */}
      <Reveal>
        <TestimonialsSection />
      </Reveal>

      {/* 7. Latest News */}
      <Reveal>
        <NewsSection />
      </Reveal>

      {/* 8. Highlights Gallery */}
      <Reveal>
        <GallerySection />
      </Reveal>

      {/* 9. Frequently Asked Questions */}
      <Reveal>
        <FAQSection />
      </Reveal>

      {/* 10. Call to Action */}
      <Reveal>
        <CTASection />
      </Reveal>

    </main>
  );
}
