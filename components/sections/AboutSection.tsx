import { useTranslations } from "next-intl";
import { SectionHeader } from "../ui/SectionHeader";
import { Play } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
   const t = useTranslations("About");

   return (
      <section id="program" className="bg-white pt-48 pb-0 md:pt-56 lg:pt-64 xl:pt-60
       relative overflow-hidden">
         <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Consistent Section Heading */}
            <div className="text-center mb-16 md:mb-24">
               <SectionHeader namespace="About" />
            </div>

            {/* Laptop Video Player */}
            <div className="relative mx-auto mt-10 md:mt-20 max-w-7xl group overflow-visible">
               <div className="relative w-full aspect-16/10 md:aspect-[1.6/1] lg:aspect-16/10">
                  <Image
                     src="/images/laptop.png"
                     alt="Program Overview Laptop"
                     fill
                     className="object-contain"
                     priority
                  />

                  {/* Fully Semantic & Accessible Interactive Trigger */}
                  <button
                     type="button"
                     aria-label={t("play_video")}
                     className="absolute inset-0 z-10 flex items-center justify-center 
                                rounded-3xl outline-none focus-visible:ring-4 
                                focus-visible:ring-brand-primary/50 transition-all 
                                cursor-pointer"
                  >
                     {/* Play Button Icon */}
                     <div className="relative size-16 md:size-32 lg:size-40 bg-brand-primary 
                                      rounded-full flex items-center justify-center text-white 
                                      shadow-2xl transition-all duration-500 
                                      group-hover:scale-110 group-hover:shadow-brand-primary/40 
                                      group-active:scale-95 group-active:duration-150">

                        <Play className="size-8 md:size-12 lg:size-16 fill-current 
                        ml-1.5 transition-transform group-hover:rotate-6" />
                     </div>

                     {/* Tooltip-like Text Overlay */}
                     <span className="absolute bottom-[73px] md:bottom-28 lg:bottom-36 xl:bottom-48
                                       right-2 -translate-x-12 md:right-10 lg:right-16 xl:right-24
                                       text-white font-bold 
                                       text-sm md:text-xl lg:text-2xl 
                                       transition-all duration-500 delay-75 
                                       opacity-0 translate-y-4 
                                       group-hover:opacity-100 group-hover:translate-y-0 
                                       pointer-events-none drop-shadow-md">
                        {t("play_video")}
                     </span>
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}
