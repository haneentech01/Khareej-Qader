"use client";

import { SectionHeader } from "../../ui/SectionHeader";
import { TrackCard } from "./TrackCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "../../ui/carousel-dots";
import { useTracks } from "@/hooks/useTracks";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * TracksSection: Refactored to use Shadcn Embla Carousel.
 * 
 * - UI and Logic are cleanly separated.
 * - Presentation is split into reusable atomic components.
 * - Full RTL/LTR support natively.
 */
export function TracksSection() {
  const { trackData, isRTL } = useTracks();
  const { ref, controls, variants } = useScrollAnimation({ once: false, amount: 0.15, delay: 0.2 });

  return (
    <motion.section 
      id="tracks" 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="py-16 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader namespace="Tracks" />

        <div className="relative group mt-12 px-2 md:px-0 max-w-[1400px] mx-auto">
          <Carousel
            opts={{
              direction: isRTL ? "rtl" : "ltr",
              align: "start",
              loop: false,
            }}
            className="w-full relative"
          >
            {/* Fix RTL/LTR Margin Offset for perfectly aligned 3-card snap */}
            <CarouselContent className={isRTL ? "ml-0 -mr-6" : "mr-0 -ml-6"}>
              {trackData.tracks.map((track, index) => (
                <CarouselItem
                  key={`${track.name}-${index}`}
                  // Apply corresponding padding so width calculation bounds perfectly
                  className={`md:basis-1/2 xl:basis-1/3 py-4 ${isRTL ? "pl-0 pr-6" : "pr-0 pl-6"}`}
                >
                  <TrackCard
                    {...track}
                    registerText={trackData.registerText}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Controls */}
            <div className="hidden md:block">
              <CarouselPrevious
                className={`hidden md:flex size-12 xl:size-14 bg-white shadow-xl hover:text-brand-primary active:scale-95 absolute top-1/2 -translate-y-1/2 z-30 transition-all border border-slate-100 left-auto right-auto ${isRTL ? "-right-5 xl:-right-10" : "-left-5 xl:-left-10"}`}
              />
              <CarouselNext
                className={`hidden md:flex size-12 xl:size-14 bg-white shadow-xl hover:text-brand-primary active:scale-95 absolute top-1/2 -translate-y-1/2 z-30 transition-all border border-slate-100 left-auto right-auto ${isRTL ? "-left-5 xl:-left-10" : "-right-5 xl:-right-10"}`}
              />
            </div>

            <CarouselDots className="mt-8" />
          </Carousel>
        </div>
      </div>
    </motion.section>
  );
}
