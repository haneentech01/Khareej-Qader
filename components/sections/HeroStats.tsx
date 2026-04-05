import { useTranslations } from "next-intl";
import Image from "next/image";

export function HeroStats() {
  const t = useTranslations("HeroStats");

  const stats = [
    {
      key: "students",
      count: t("students_count"),
      label: t("students"),
      images: "/images/icons/users.png",
    },
    {
      key: "graduates",
      count: t("graduates_count"),
      label: t("graduates"),
      images: "/images/icons/graduation.png",
    },
    {
      key: "projects",
      count: t("projects_count"),
      label: t("projects"),
      images: "/images/icons/features.png",
    },
    {
      key: "trainers",
      count: t("trainers_count"),
      label: t("trainers"),
      images: "/images/icons/vector.png",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white px-0 py-10 md:py-12 lg:py-14 rounded-[40px] 
      shadow-[0_16px_35px_#0F172A0F] border border-gray-50 
      relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        gap-x-0 md:gap-x-0
        gap-y-12 sm:gap-y-16
        xl:gap-0">
          {stats.map((stat, index) => (
            <div key={stat.key} className="relative flex items-center justify-center 
            lg:justify-around group">
              <div className="flex items-center gap-4 lg:gap-9 transition-transform
               duration-300 hover:scale-102">
                {/* Icon Group */}
                <div className="shrink-0 transition-all duration-300 
                group-hover:scale-110">
                  <Image src={stat.images} alt={stat.key}
                    width={65} height={65}
                    className="w-9 h-9 md:w-[65px] md:h-[65px] 
                    object-contain"
                  />
                </div>

                {/* Text Group */}
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl md:text-5xl lg:text-[60px] font-bold 
                  text-black leading-none mb-1">
                    {stat.count}
                  </span>
                  <span className="text-brand-muted text-sm md:text-xl 
                  font-medium whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>


              </div>

              {/* Vertical Divider - Responsive Logic */}
              {/* xl: 4 cols */}
              {index % 4 !== 0 && (
                <div className="hidden xl:block absolute right-0 h-28 w-px bg-[#C7C7C7]" />
              )}
              {/* lg: 3 cols */}
              {index % 3 !== 0 && (
                <div className="hidden lg:block xl:hidden absolute right-0 h-28 w-px bg-[#C7C7C7]" />
              )}
              {/* sm/md: 2 cols */}
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
