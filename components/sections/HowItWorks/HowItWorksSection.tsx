import Image from "next/image";
import { SectionHeader } from "../../ui/SectionHeader";
import { useHowItWorks } from "../../../hooks/useHowItWorks";
import { StepCard } from "./StepCard";
import { FlowArrow } from "./FlowArrow";
import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * HowItWorksSection component that explains the program flow with
 * a professional step-by-step design featuring top-mounted numbers
 * and bottom-mounted icons.
 */
export function HowItWorksSection() {
    const { steps } = useHowItWorks();
    const { ref, controls, variants: sectionVariants } = useScrollAnimation({ once: true, amount: 0.1 });

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

    const stepVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={sectionVariants}
            className="my-10 lg:my-20 py-5 bg-white relative overflow-hidden"
        >
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
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 
                    lg:grid-cols-4 gap-y-14
                    md:gap-y-28 md:gap-x-20 lg:gap-10"
                    >
                        {steps.map((step, index) => (
                            <motion.div 
                                key={index} 
                                variants={stepVariants}
                                className="relative group"
                            >
                                <StepCard step={step} />
                                <FlowArrow index={index} totalSteps={steps.length} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
