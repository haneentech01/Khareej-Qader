import Image from "next/image";
import { HeroStatItem } from "@/types";
import { Counter } from "@/components/ui/Counter";

interface HeroStatsComponentProps {
  stats: HeroStatItem[];
}

export function HeroStats({ stats }: HeroStatsComponentProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
      <div className="bg-white px-0 py-10 md:py-12 lg:py-14 rounded-[40px] 
      shadow-[0_16px_35px_#0F172A0F] border border-gray-50 
      relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        gap-x-0 md:gap-x-0 gap-y-12 
        sm:gap-y-16 xl:gap-0">
          {stats.map((stat, index) => (
            <div key={stat.key} className="relative flex items-center 
            justify-center 
            lg:justify-around group">
              <div className="flex items-center gap-4 lg:gap-9 
              transition-transform
              duration-300 hover:scale-102">
                <div className="shrink-0 transition-all duration-300 group-hover:scale-110">
                  <Image src={stat.images} alt={stat.key}
                    width={65} height={65}
                    className="w-9 h-9 md:w-[45px] md:h-[45px] object-contain"
                  />
                </div>

                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xl md:text-3xl lg:text-4xl font-bold 
                  text-black leading-none mb-1">
                    <Counter targetValue={stat.count} />
                  </span>
                  <span className="text-brand-muted text-sm md:text-lg 
                  font-medium whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              </div>

              {/* Responsive dividers */}
              {index % 4 !== 0 && (
                <div className="hidden xl:block absolute right-0 h-24 w-px bg-[#C7C7C7]" />
              )}
              {index % 3 !== 0 && (
                <div className="hidden lg:block xl:hidden absolute right-0 h-24 w-px bg-[#C7C7C7]" />
              )}
              {index % 2 !== 0 && (
                <div className="block lg:hidden absolute right-0 h-20 w-px bg-[#C7C7C7]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
