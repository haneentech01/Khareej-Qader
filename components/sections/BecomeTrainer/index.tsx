"use client";


import { TrainerFeatures } from "./TrainerFeatures";
import { TrainerForm } from "./TrainerForm";
import { Reveal } from "@/components/animations/Reveal";

export function BecomeTrainerSection() {
  return (
    <section id="become-trainer" className="py-16 bg-[#F6FBFA] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex">
          {/* Features / Marketing Content */}
          <Reveal delay={0.2}>
            <TrainerFeatures />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
