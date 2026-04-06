import { SectionHeader } from "../../ui/SectionHeader";
import { useWhyChooseUs } from "@/hooks/useWhyChooseUs";
import { FeatureCard } from "./FeatureCard";

/**
 * WhyChooseUsSection component showcasing the core benefits of the program
 * in a elegant grid of feature cards with floating gradient icons.
 */
export function WhyChooseUsSection() {
    const { features } = useWhyChooseUs();

    return (
        <section className="mt-10 md:mt-20 mb-10 lg:my-[100px] bg-[#F6FBFA]
    relative overflow-visible">
            <div className="container pt-12 lg:pt-24 pb-12 mx-auto px-4 md:px-6">
                {/* Centered Heading */}
                <SectionHeader namespace="Features" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
        gap-y-16 md:gap-x-12 md:gap-y-20 xl:gap-14 mt-16 md:mt-24">
                    {features.map((feat, index) => (
                        <FeatureCard key={index} feature={feat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
