import Image from "next/image";
import { FeatureItem } from "@/types";
import { motion, Variants } from "framer-motion";

interface FeatureCardProps {
  feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const itemVariants: Variants = {
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
    <motion.div
      variants={itemVariants}
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
          src={feature.icon}
          alt={feature.title}
          width={72}
          height={72}
          className="object-contain w-12 h-12 md:w-[72px] md:h-[72px]"
        />
      </div>

      {/* Title & Description with improved spacing */}
      <div className="mt-6 md:mt-8 text-center flex flex-col h-full">
        <h3 className="text-lg md:text-xl font-bold text-black mb-4 transition-colors group-hover:text-brand-primary">
          {feature.title}
        </h3>
        <p className="text-brand-muted text-sm md:text-base leading-relaxed grow">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}
