import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { Reveal } from "@/components/animations/Reveal";

// Below-the-fold sections loaded dynamically to improve initial loading & TBT
const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((mod) => mod.HowItWorks)
);
const WhyChooseUsSection = dynamic(() =>
  import("@/components/sections/WhyChooseUs").then((mod) => mod.WhyChooseUsSection)
);
const PartnersSection = dynamic(() =>
  import("@/components/sections/Partners").then((mod) => mod.PartnersSection)
);
const TracksSection = dynamic(() =>
  import("@/components/sections/Tracks").then((mod) => mod.TracksSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/Testimonials").then((mod) => mod.TestimonialsSection)
);
const NewsSection = dynamic(() =>
  import("@/components/sections/News").then((mod) => mod.NewsSection)
);
const GallerySection = dynamic(() =>
  import("@/components/sections/Gallery").then((mod) => mod.GallerySection)
);
const BecomeTrainerSection = dynamic(() =>
  import("@/components/sections/BecomeTrainer").then((mod) => mod.BecomeTrainerSection)
);
const FAQSection = dynamic(() =>
  import("@/components/sections/FAQ").then((mod) => mod.FAQSection)
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTA").then((mod) => mod.CTASection)
);

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

      {/* 9. Become a Trainer Section */}
      <Reveal>
        <BecomeTrainerSection />
      </Reveal>

      {/* 10. Frequently Asked Questions */}
      <Reveal>
        <FAQSection />
      </Reveal>

      {/* 11. Call to Action */}
      <Reveal>
        <CTASection />
      </Reveal>

    </main>
  );
}

