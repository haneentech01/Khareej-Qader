"use client";

import { SectionHeader } from "../../ui/SectionHeader";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "../../ui/carousel-dots";
import { useGallery } from "@/hooks/sections/useGallery";
import { GalleryCard } from "./GalleryCard";

const COLS_TO_CLASS: Record<number, string> = {
   2: "grid-cols-2",
   3: "grid-cols-3",
   4: "grid-cols-4",
};

export function GallerySection() {
   const { chunkedPages, cols, isRTL } = useGallery();

   return (
      <section
         id="gallery"
         className="my-10 py-5 bg-white overflow-hidden"
      >
         <div className="container mx-auto px-4 md:px-6">
            <SectionHeader namespace="Gallery" centered={true} />

            <div className="relative w-full max-w-7xl mx-auto px-2">
               <Carousel
                  opts={{
                     direction: isRTL ? "rtl" : "ltr",
                     align: "start",
                     loop: false
                  }}
                  className="w-full"
               >
                  <CarouselContent>
                     {chunkedPages.map((pageGroup, pageIndex) => (
                        <CarouselItem
                           key={pageIndex}
                           className="w-full basis-full"
                        >
                           <div
                              className={`grid
                                 ${COLS_TO_CLASS[cols]
                                 ?? "grid-cols-4"}
                                 gap-4 md:gap-6 p-2`}
                           >
                              {pageGroup.map((item, cardIndex) => (
                                 <GalleryCard
                                    key={item.id}
                                    item={item}
                                    index={cardIndex}
                                 />
                              ))}
                           </div>
                        </CarouselItem>
                     ))}
                  </CarouselContent>

                  {chunkedPages.length > 1 && (
                     <>
                        <CarouselPrevious
                           className={`hidden md:flex size-14 bg-white shadow-xl
                           hover:text-brand-primary active:scale-95 absolute
                           top-1/2 -translate-y-1/2 left-auto right-auto
                           ${isRTL ? "-right-5 xl:-right-12" : "-left-5 xl:-left-12"}`}
                        />
                        <CarouselNext
                           className={`hidden md:flex size-14 bg-white shadow-xl
                           hover:text-brand-primary active:scale-95 absolute
                           top-1/2 -translate-y-1/2 left-auto right-auto
                           ${isRTL ? "-left-5 xl:-left-12" : "-right-5 xl:-right-12"}`}
                        />
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
