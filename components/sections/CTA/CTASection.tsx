"use client";

import { useCTA } from "@/hooks/useCTA";
import { CTABox } from "./CTABox";

export function CTASection() {
  const ctaData = useCTA();

  return (
    <section className="py-8 lg:py-12 bg-[#F8FAF8]">
      <div className="container mx-auto px-4 md:px-6">
        <CTABox {...ctaData} />
      </div>
    </section>
  );
}
