import { useTranslations } from "next-intl";
import { SectionHeader } from "../ui/SectionHeader";
import Image from "next/image";

/**
 * HowItWorksSection component that explains the program flow with
 * a professional step-by-step design featuring top-mounted numbers
 * and bottom-mounted icons.
 */
export function HowItWorks() {
    const t = useTranslations("HowItWorks");

    const steps = [
        {
            number: "01",
            title: t("step1_title"),
            desc: t("step1_desc"),
            icon: "/images/icons/userPlus.png"
        },
        {
            number: "02",
            title: t("step2_title"),
            desc: t("step2_desc"),
            icon: "/images/icons/registerForTheProgram.png"
        },
        {
            number: "03",
            title: t("step3_title"),
            desc: t("step3_desc"),
            icon: "/images/icons/learnAndApply.png"
        },
        {
            number: "04",
            title: t("step4_title"),
            desc: t("step4_desc"),
            icon: "/images/icons/certificate.png"
        },
    ];

    return (
        <section className="pt-14 pb-8 lg:pb-20 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
                <Image
                    src="/images/bottomBG.png"
                    alt=""
                    width={1920}
                    height={300}
                    className="w-full h-auto object-bottom opacity-100"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <SectionHeader namespace="HowItWorks" />

                {/* Steps Container */}
                <div className="relative mt-12 md:mt-32">
                    {/* Grid Layout for Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 
                    lg:grid-cols-4 gap-y-14
                    md:gap-y-28 md:gap-x-20 lg:gap-10">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {/* Step Card */}
                                <div className="h-full bg-white
                                    rounded-[20px] p-4 pt-9 md:pt-16
                                    flex flex-col items-center text-center
                                    shadow-[0_10px_40px_#0000000D] border border-slate-50
                                    transition-all duration-500 group-hover:shadow-2xl
                                    group-hover:shadow-brand-primary/10 group-hover:-translate-y-2
                                    "
                                >
                                    {/* TOP CIRCLE: Step Number with Gradient */}
                                    <div className="absolute top-0 left-1/2 
                                    -translate-x-1/2 -translate-y-1/2
                                    size-14 md:size-16 rounded-full bg-linear-to-b from-brand-primary to-brand-dark
                                    text-white flex items-center justify-center font-bold text-xl md:text-2xl
                                    shadow-xl shadow-brand-primary/20 z-20 transition-transform duration-500
                                    group-hover:scale-110">
                                        {step.number}
                                    </div>

                                    {/* Content Title & Description */}
                                    <div className="w-full max-w-[240px] md:max-w-[180px]">
                                        <h3 className="text-lg md:text-xl font-bold text-black mb-4
                                    transition-colors group-hover:text-brand-primary">
                                            {step.title}
                                        </h3>
                                        <p className="text-brand-muted text-sm md:text-base leading-relaxed grow">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* BOTTOM CIRCLE: Icon Display */}
                                    <div className="mt-5 md:mt-8 size-16 md:size-20 rounded-[24px]
                                    bg-[#F0F5F1] flex items-center justify-center
                                    transition-all duration-500 group-hover:rotate-6">
                                        <Image
                                            src={step.icon}
                                            alt={step.title}
                                            width={32}
                                            height={42}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* FLOW ARROW: Responsive Logic */}
                                {index !== steps.length - 1 && (
                                    <>
                                        {/* LG Screens: 4-column layout (Arrows between 1-2, 2-3, 3-4) */}
                                        <div className="hidden lg:block absolute top-[-60px] left-[-50%]
                                        w-[85%] h-14 z-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                                            <Image
                                                src="/images/dashArrow.png"
                                                alt="Flow Arrow"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* MD Screens: 2-column layout (Arrows between 1-2 and 3-4 only) */}
                                        {index % 2 === 0 && (
                                            <div className="hidden md:block lg:hidden absolute top-[-60px] left-[-50%]
                                            w-[85%] h-14 z-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                                                <Image
                                                    src="/images/dashArrow.png"
                                                    alt="Flow Arrow"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


