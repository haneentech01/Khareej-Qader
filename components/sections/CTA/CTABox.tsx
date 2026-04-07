import { Button } from "@/components/ui/button";
import { CtaData } from "@/types";
import { motion, Variants } from "framer-motion";

export function CTABox({ title, subtitle, buttonText }: CtaData) {
  // Variants for staggered entrance animation
  const containerVariants: Variants = {
    hidden: { opacity: 1 }, // Changed from 0 to 1 to ensure box is visible
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      className="relative bg-white 
        rounded-[40px] p-10 md:p-16 lg:p-20 
        overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] 
        flex flex-col lg:flex-row items-center justify-between 
        text-center lg:text-start rtl:lg:text-start 
        gap-8 lg:gap-12 group"
    >


      {/* Content Block */}
      <div className="relative z-10 lg:max-w-2xl">
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-[1.1]"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-brand-muted text-xl md:text-2xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Registration Button */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 shrink-0"
      >
        <Button
          size="lg"
          className="bg-brand-primary text-white hover:bg-brand-primary/90 font-bold 
           text-lg md:text-xl h-14 md:h-[70px] px-12 md:px-16 
           rounded-[24px] shadow-xl transition-all hover:scale-105 active:scale-95
           flex items-center gap-3"
        >
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  );
}

