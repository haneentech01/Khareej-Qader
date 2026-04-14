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
      className="my-10 lg:my-20 py-5 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader namespace="Tracks" />

        <div className="relative group -mt-10 px-2 md:px-0 max-w-[1400px] mx-auto">
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
                  className={`md:basis-1/2 xl:basis-1/3 py-4 ${isRTL ? "pl-0 pr-6" : "pr-0 pl-6"}`}
                >
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                      hidden: { opacity: 0, x: isRTL ? 100 : -100 },
                      visible: (idx) => ({
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          damping: 20,
                          stiffness: 100,
                          duration: 0.6,
                          delay: 0.2 + idx * 0.15,
                        },
                      }),
                    }}
                    className="h-full"
                  >
                    <TrackCard {...track} registerText={trackData.registerText} />
                  </motion.div>
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
