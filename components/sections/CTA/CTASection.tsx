"use client";

import { useCTA } from "@/hooks/useCTA";
import { CTABox } from "./CTABox";

export function CTASection() {
  const ctaData = useCTA();

  return (
    <section className="my-10 lg:my-20 py-5 bg-[#F8FAF8] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <CTABox {...ctaData} />
      </div>
    </section>
  );
}

