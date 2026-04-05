"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "../../ui/button";

interface TrackCardProps {
  name: string;
  desc: string;
  time: string;
  img: string;
  registerText: string;
}

/**
 * TrackCard: A pure presentation component for a single training track.
 */
export const TrackCard = ({ 
  name, 
  desc, 
  time, 
  img, 
  registerText 
}: TrackCardProps) => {
  return (
    <div className="h-full">
      <div className="bg-white rounded-[22px] 
        overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-50 
        transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        hover:-translate-y-2 group/card p-8 flex flex-col items-start text-start
        h-full lg:min-h-[580px] w-full mx-auto">

        {/* Track Image Wrapper */}
        <div className="w-full relative h-[210px] shrink-0 
          overflow-hidden rounded-2xl mb-8 pointer-events-none">
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent" />
        </div>

        {/* Card Content Area */}
        <div className="flex flex-col flex-1 gap-4 w-full">
          <h3 className="text-xl md:text-2xl font-extrabold 
            text-black leading-tight">
            {name}
          </h3>

          <p className="text-brand-muted text-sm md:text-base 
            leading-relaxed line-clamp-4">
            {desc}
          </p>

          {/* Metadata with Clock Icon */}
          <div className="flex items-center justify-start gap-2 py-2 mt-auto">
            <Clock className="size-5 md:size-6 text-brand-base flex-none" />
            <span className="text-xs md:text-sm text-brand-muted font-semibold">
              {time}
            </span>
          </div>

          <Button className="w-full h-15 bg-brand-base 
            text-white hover:bg-brand-primary/90 font-bold text-lg 
            rounded-[14px] transition-all shadow-[0_10px_20px_rgba(30,165,134,0.15)] mt-4">
            {registerText}
          </Button>
        </div>
      </div>
    </div>
  );
};
