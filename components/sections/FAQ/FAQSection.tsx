"use client";

import { useLocale } from "next-intl";
import { SectionHeader } from "../../ui/SectionHeader";
import { useFAQ } from "@/hooks/useFAQ";
import { FAQAccordionItem } from "./FAQAccordionItem";
import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function FAQSection() {
  const { faqs, openIndex, toggleFAQ } = useFAQ();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { ref, controls, variants } = useScrollAnimation({ once: false, amount: 0.15, delay: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isRTL ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      id="faq"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="my-10 lg:my-20 py-5 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader namespace="FAQ" />

        <motion.div
          variants={containerVariants}
          className="max-w-6xl mx-auto flex flex-col gap-7 mt-12 md:mt-24"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FAQAccordionItem
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
