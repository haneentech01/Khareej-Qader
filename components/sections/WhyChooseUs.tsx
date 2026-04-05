import { useTranslations } from "next-intl";
import { SectionHeader } from "../ui/SectionHeader";
import Image from "next/image";

/**
 * WhyChooseUs component showcasing the core benefits of the program
 * in a elegant grid of feature cards with floating gradient icons.
 */
export function WhyChooseUs() {
  const t = useTranslations("Features");

  const features = [
    {
      title: t("f1_title"),
      desc: t("f1_desc"),
      icon: "/images/icons/wrench.png"
    },
    {
      title: t("f2_title"),
      desc: t("f2_desc"),
      icon: "/images/icons/user.png"
    },
    {
      title: t("f3_title"),
      desc: t("f3_desc"),
      icon: "/images/icons/clipboardList.png"
    },
    {
      title: t("f4_title"),
      desc: t("f4_desc"),
      icon: "/images/icons/verified.png"
    },
    {
      title: t("f5_title"),
      desc: t("f5_desc"),
      icon: "/images/icons/power.png"
    },
    {
      title: t("f6_title"),
      desc: t("f6_desc"),
      icon: "/images/icons/briefcase.png"
    },
  ];

  return (
    <section className="mt-10 md:mt-20 mb-10 lg:my-[100px] bg-[#F6FBFA]
    relative overflow-visible">
      <div className="container pt-12 lg:pt-24 pb-12 mx-auto px-4 md:px-6">
        {/* Centered Heading */}
        <SectionHeader namespace="Features" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
        gap-y-16 md:gap-x-12 md:gap-y-20 xl:gap-14 mt-16 md:mt-24">
          {features.map((feat, index) => (
            <div
              key={index}
              className="relative p-8 lg:p-10 rounded-[20px] bg-white border 
              border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all 
              duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] 
              hover:-translate-y-2 group"
            >
              {/* TOP FLOATING ICON */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
              size-14 md:size-20 rounded-full bg-linear-to-b from-brand-base to-brand-accent
              flex items-center justify-center shadow-xl shadow-brand-primary/20 
              transition-transform duration-500 group-hover:scale-110 
              group-hover:rotate-6 z-10">
                <Image
                  src={feat.icon}
                  alt={feat.title}
                  width={72}
                  height={72}
                  className="object-contain w-12 h-12 md:w-[72px] md:h-[72px]"
                />
              </div>

              {/* Title & Description with improved spacing */}
              <div className="mt-6 md:mt-8 text-center flex flex-col h-full">
                <h3 className="text-lg md:text-xl font-bold text-black mb-4 transition-colors group-hover:text-brand-primary">
                  {feat.title}
                </h3>
                <p className="text-brand-muted text-sm md:text-base leading-relaxed grow">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
