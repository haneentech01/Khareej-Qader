"use client";

import React from "react";
import { TrainerFeatures } from "./TrainerFeatures";
import { TrainerForm } from "./TrainerForm";
import { Reveal } from "@/components/animations/Reveal";

export function BecomeTrainerSection() {
  return (
    <section id="become-trainer" className="py-16 bg-[#F6FBFA] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Features / Marketing Content */}
          <Reveal delay={0.2}>
            <TrainerFeatures />
          </Reveal>

          {/* Registration Form */}
          <Reveal delay={0.4}>
            <TrainerForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
