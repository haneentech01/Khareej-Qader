import { useTranslations } from "next-intl";
import { SectionHeader } from "../ui/SectionHeader";
import { Plus, Minus, HelpCircle } from "lucide-react";
import React, { useState } from "react";

/**
 * FAQSection component displaying frequently asked questions
 * using a clean, interactive accordion layout.
 */
export function FAQSection() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader namespace="FAQ" />
        
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
           {faqs.map((faq, index) => {
             const isOpen = openIndex === index;
             return (
               <div 
                 key={index} 
                 className={`group rounded-[32px] overflow-hidden border transition-all duration-300 ${isOpen ? "bg-white border-brand-surface shadow-[0_15px_40px_rgba(0,0,0,0.04)]" : "bg-white/50 border-slate-100 hover:border-brand-surface/40"}`}
               >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-7 md:p-9 text-right rtl:text-right"
                  >
                     <div className="flex items-center gap-4 lg:gap-6">
                        <div className={`size-12 md:size-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-brand-primary text-white rotate-12 shadow-lg" : "bg-white text-brand-primary group-hover:scale-110 shadow-sm border border-slate-50"}`}>
                           <HelpCircle className="size-6 md:size-7" />
                        </div>
                        <h3 className={`text-lg md:text-xl lg:text-2xl font-bold transition-colors ${isOpen ? "text-slate-900" : "text-slate-600 group-hover:text-brand-primary"}`}>
                          {faq.q}
                        </h3>
                     </div>
                     
                     <div className={`size-10 md:size-12 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-brand-surface text-brand-primary rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-brand-surface group-hover:text-brand-primary"}`}>
                        {isOpen ? <Minus className="size-5 md:size-6" /> : <Plus className="size-5 md:size-6" />}
                     </div>
                  </button>
                  
                  {/* Accordion Content with simple animation logic */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 pt-0" : "max-h-0 opacity-0"}`}>
                     <div className="p-7 md:p-9 pt-0 md:pt-0 pointer-events-none">
                        <p className="text-brand-muted text-base md:text-lg lg:text-xl leading-relaxed border-t border-slate-50 pt-8 lg:pt-10">
                           {faq.a}
                        </p>
                     </div>
                  </div>
               </div>
             );
           })}
        </div>
      </div>
    </section>
  );
}
