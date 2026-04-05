"use client";

import { useTranslations, useLocale } from "next-intl";
import { SectionHeader } from "../ui/SectionHeader";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "../ui/carousel-dots";

const GALLERY_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8];

/** Returns the number of grid columns based on current viewport width */
function getColumns(width: number): number {
   if (width >= 1280) return 4; // xl
   if (width >= 768) return 3;  // md, lg
   return 2;                    // sm
}

const COLS_TO_CLASS: Record<number, string> = {
   2: "grid-cols-2",
   3: "grid-cols-3",
   4: "grid-cols-4",
};

export function GallerySection() {
   const t = useTranslations("Gallery");
   const locale = useLocale();
   const isRTL = locale === "ar";

   const [cols, setCols] = useState(4);

   // Listen to viewport changes to maintain the correct CSS grid and chunk sizes
   useEffect(() => {
      const update = () => setCols(getColumns(window.innerWidth));
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
   }, []);

   // Break our total images into chunks representing a full "page" (2 rows x N cols)
   const itemsPerPage = cols * 2;
   const chunkedPages = [];
   for (let i = 0; i < GALLERY_IMAGES.length; i += itemsPerPage) {
      chunkedPages.push(GALLERY_IMAGES.slice(i, i + itemsPerPage));
   }

   return (
      <section id="gallery" className="py-10 lg:py-20 bg-white overflow-hidden">
         <div className="container mx-auto px-4 md:px-6">

            {/* Section Header */}
            <SectionHeader namespace="Gallery" centered={true} className="mb-12 lg:mb-16" />

            <div className="relative w-full max-w-7xl mx-auto px-2 md:px-8">
               <Carousel
                  opts={{
                     direction: isRTL ? "rtl" : "ltr",
                     align: "start",
                     loop: false,
                  }}
                  className="w-full"
               >
                  <CarouselContent>
                     {chunkedPages.map((pageGroup, pageIndex) => (
                        <CarouselItem key={pageIndex} className="w-full basis-full">
                           <div className={`grid ${COLS_TO_CLASS[cols] ?? "grid-cols-4"} gap-4 md:gap-6`}>
                              {pageGroup.map((i) => (
                                 <div
                                    key={i}
                                    className="group relative w-full aspect-square rounded-[24px]
                          overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.07)]
                          transition-all duration-700 hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)] cursor-pointer"
                                 >
                                    {/* Gallery Image */}
                                    <Image
                                       src="/images/logo.png"
                                       alt={`Khareej Qader Gallery ${i}`}
                                       fill
                                       className="object-contain p-6 transition-transform duration-[1.5s] group-hover:scale-110"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-brand-primary/80 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500
                          flex flex-col items-center justify-center gap-4">
                                       <div className="size-14 bg-white rounded-full flex items-center justify-center
                            text-brand-primary shadow-2xl scale-0 group-hover:scale-100 group-hover:rotate-12
                            transition-transform duration-500">
                                          <Maximize2 className="size-6" />
                                       </div>
                                       <span className="text-white font-bold text-base tracking-wide
                            translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                          {t("image_title")}
                                       </span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </CarouselItem>
                     ))}
                  </CarouselContent>

                  {chunkedPages.length > 1 && (
                     <>
                        <CarouselPrevious className={`hidden md:flex size-14 bg-white shadow-xl hover:text-brand-primary active:scale-95 absolute top-1/2 -translate-y-1/2 left-auto right-auto ${isRTL ? "-right-5 xl:-right-12" : "-left-5 xl:-left-12"}`} />
                        <CarouselNext className={`hidden md:flex size-14 bg-white shadow-xl hover:text-brand-primary active:scale-95 absolute top-1/2 -translate-y-1/2 left-auto right-auto ${isRTL ? "-left-5 xl:-left-12" : "-right-5 xl:-right-12"}`} />
                        <div className="hidden lg:block">
                           <CarouselDots className="mt-10" />
                        </div>
                        <div className="block lg:hidden">
                           <CarouselDots className="mt-8" />
                        </div>
                     </>
                  )}
               </Carousel>
            </div>

         </div>
      </section>
   );
}
