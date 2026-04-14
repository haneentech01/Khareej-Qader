"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { SectionHeader } from "../../ui/SectionHeader";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "../../ui/carousel-dots";
import { useTestimonials } from "@/hooks/useTestimonials";
import { TestimonialCard } from "./TestimonialCard";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function TestimonialsSection() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { testimonials } = useTestimonials();
  const { ref, controls, variants } = useScrollAnimation({ once: false, amount: 0.15, delay: 0.2 });

  const plugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnMouseEnter: false,
      stopOnInteraction: false
    })
  );

  return (
    <motion.section
      id="success-stories"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="my-10 lg:my-20 py-5 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader namespace="Testimonials" />

        <div className="max-w-7xl mx-auto mt-16 md:mt-24 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: isRTL ? "rtl" : "ltr",
              slidesToScroll: 1,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            {/* Fix RTL/LTR Margin Offset */}
            <CarouselContent className={isRTL ? "ml-0 -mr-4" : "mr-0 -ml-4"}>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className={isRTL ? "pl-0 pr-4" : "pr-0 pl-4"}>
                  <TestimonialCard testimonial={testimonial} isRTL={isRTL} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Nav Arrows inside the Carousel container */}
            <CarouselPrevious className={`hidden md:flex size-14 
              bg-white shadow-xl hover:text-brand-primary 
              active:scale-95 absolute top-1/2 -translate-y-1/2 left-auto right-auto ${isRTL ? "-right-5 xl:-right-2" : "-left-5 xl:-left-12"
              }`}
            />

            <CarouselNext className={`hidden md:flex size-14 
              bg-white shadow-xl hover:text-brand-primary 
              active:scale-95 absolute top-1/2 -translate-y-1/2 left-auto right-auto ${isRTL ? "-left-5 xl:left-14" : "-right-5 xl:-right-12"
              }`}
            />

            <CarouselDots className="mt-4" />
          </Carousel>
        </div>
      </div>
    </motion.section>
  );
}
