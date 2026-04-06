"use client";

import { SectionHeader } from "../../ui/SectionHeader";
import { useFAQ } from "@/hooks/useFAQ";
import { FAQAccordionItem } from "./FAQAccordionItem";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function FAQSection() {
  const { faqs, openIndex, toggleFAQ } = useFAQ();
  const { ref, controls, variants } = useScrollAnimation({ once: false, amount: 0.15, delay: 0.2 });

  return (
    <motion.section 
      id="faq" 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader namespace="FAQ" />

        <div className="max-w-6xl mx-auto flex flex-col gap-7 mt-12 md:mt-24">
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
