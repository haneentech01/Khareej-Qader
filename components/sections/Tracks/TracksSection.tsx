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
import { useTracks } from "@/hook/useTracks";
import { motion, Variants } from "framer-motion";

export function TracksSection() {
  const { trackData, isRTL } = useTracks();

  return (
    <section
      id="tracks"
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
            <CarouselContent className=
              {isRTL ? "ml-0 -mr-6" : "mr-0 -ml-6"}>
              {trackData.tracks.map((track, index) => (
                <CarouselItem
                  key={`${track.name}-${index}`}
                  className={`md:basis-1/2 xl:basis-1/3 py-4 
                      ${isRTL ? "pl-0 pr-6" : "pr-0 pl-6"
                    }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      delay: Math.min(index * 0.4, 0.6),
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="h-full"
                  >
                    <TrackCard
                      {...track}
                      registerText={trackData.registerText}
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="hidden md:block">
              <CarouselPrevious
                className={`hidden md:flex 
                  size-12 xl:size-14 bg-white shadow-xl 
                  hover:text-brand-primary active:scale-95
                  absolute top-1/2 -translate-y-1/2 z-30 
                  transition-all duration-300 ease-in-out 
                  left-auto right-auto cursor-pointer
                  ${isRTL ? "-right-5 xl:-right-10" : "-left-5 xl:-left-10"
                  }`}
              />
              <CarouselNext
                className={`hidden md:flex 
                  size-12 xl:size-14 bg-white shadow-xl 
                  hover:text-brand-primary active:scale-95
                  absolute top-1/2 -translate-y-1/2 z-30 
                  transition-all duration-300 ease-in-out 
                  left-auto right-auto cursor-pointer
                  ${isRTL ? "-left-5 xl:-left-10" : "-right-5 xl:-right-10"
                  }`}
              />
            </div>

            <CarouselDots className="mt-8" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}