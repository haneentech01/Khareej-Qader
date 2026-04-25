"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { TestimonialItem } from "@/types";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  isRTL: boolean;
}

export function TestimonialCard({ testimonial, isRTL }: TestimonialCardProps) {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-[18px] px-2 md:px-12 lg:px-16 pb-8">
      {/* Right: Premium Quote Card */}
      <motion.div
        initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white rounded-[20px] p-8 md:p-[46px] md:py-16
          shadow-[0_20px_70px_rgba(0,0,0,0.07)] border border-slate-50 
          relative w-full lg:w-2/3 xl:w-1/2 z-10"
      >

        {/* Quote Icon */}
        <div className="flex justify-start mb-5">
          <Image
            width={45}
            height={35}
            src="/images/quote.png"
            alt="Quote"
            className="w-[45px] h-[35px]"
          />
        </div>

        {/* Star Rating */}
        <div className="flex gap-1 mb-5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i}
              className="size-5 md:size-6 fill-[#ffce00] text-[#ffce00]" />
          ))}
        </div>

        {/* Quote Text */}
        <blockquote className="mb-[73px] text-start">
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1B1C31] leading-[1.6] md:leading-[1.4]">
            &quot;{testimonial.quote}&quot;
          </p>
        </blockquote>

        {/* Author Section */}
        <div className="flex flex-col md:flex-row md:items-center lg:items-start gap-8">
          <div className="flex flex-col gap-1 text-start">
            <h4 className="text-lg md:text-xl font-black text-black">{testimonial.name}</h4>
            <p className="text-brand-muted text-base font-medium">{testimonial.role}</p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-[#34B89814] px-4 py-2 lg:px-2 lg:py-3 xl:px-4 xl:py-2 rounded-full border border-[#28bca1]/10">
            <Image width={12} height={12} src="/images/icons/star.png" alt="Status" />
            <span className="text-[#28bca1] font-bold text-sm md:text-base lg:text-sm xl:text-base">
              {testimonial.badge}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Left: Person Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
        viewport={{ once: true }}
        className="relative w-full h-[406px] lg:w-1/2 lg:h-[606px] max-w-[510px]"
      >
        <div className="w-full h-full relative">
          <Image
            src={testimonial.image}
            alt={`${testimonial.name} Image`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
