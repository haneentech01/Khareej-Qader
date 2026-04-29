import { SectionHeader } from "../../ui/SectionHeader";
import { useWhyChooseUs } from "@/hook/useWhyChooseUs";
import { FeatureCard } from "./FeatureCard";
import { motion, Variants } from "framer-motion";

/**
 * WhyChooseUsSection component showcasing the core benefits of the program
 * in a elegant grid of feature cards with floating gradient icons.
 */
export function WhyChooseUsSection() {
    const { features } = useWhyChooseUs();

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    return (
        <section className="my-10 lg:my-20 py-5 bg-[#F6FBFA] relative overflow-visible">
            <div className="container mx-auto px-4 md:px-6">
                {/* Centered Heading */}
                <SectionHeader namespace="Features" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                    gap-y-16 md:gap-x-12 md:gap-y-20 xl:gap-14 mt-16 md:mt-24"
                >
                    {features.map((feat, index) => (
                        <FeatureCard key={index} feature={feat} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
