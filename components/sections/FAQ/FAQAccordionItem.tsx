import { Plus, Minus, HelpCircle } from "lucide-react";
import { FaqItem } from "@/types";

interface FAQItemProps {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQAccordionItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className={`group rounded-[14px] overflow-hidden border 
      transition-all duration-300 
      ${
        isOpen
          ? "bg-linear-to-b from-[#FFFFFF00] to-[#ABABAB0F] border-brand-surface shadow-[0_1px_3px_#8F8F8F33]"
          : "bg-white border-slate-100 hover:border-brand-surface/40"
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between 
        px-7 md:px-8 text-right rtl:text-right transition-all duration-300 
        ${isOpen ? "pt-7 pb-0" : "py-7"}`}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div
            className={`size-8 md:size-10 rounded-2xl 
            flex items-center justify-center transition-all duration-300 
            ${
              isOpen
                ? "bg-brand-primary text-white rotate-12 shadow-lg"
                : "bg-white text-brand-primary group-hover:scale-110 shadow-sm border border-slate-50"
            }`}
          >
            <HelpCircle className="size-5 md:size-6" />
          </div>
          <h3
            className={`text-sm md:text-lg 
            font-bold transition-colors 
            ${isOpen ? "text-black" : "text-slate-600 group-hover:text-black"}`}
          >
            {faq.q}
          </h3>
        </div>

        <div
          className={`size-10 md:size-12 rounded-full flex items-center 
          justify-center transition-all duration-300 
          ${
            isOpen
              ? "bg-brand-surface text-brand-primary rotate-180"
              : "bg-slate-100 text-slate-400 group-hover:bg-brand-surface group-hover:text-brand-primary"
          }`}
        >
          {isOpen ? <Minus className="size-5 md:size-6" /> : <Plus className="size-5 md:size-6" />}
        </div>
      </button>

      {/* Accordion Content with simple animation logic */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out 
        ${isOpen ? "max-h-[500px] opacity-100 pt-0" : "max-h-0 opacity-0"}`}
      >
        <div className="p-7 md:p-9 pt-0 md:pt-0 pointer-events-none">
          <p className="text-brand-muted text-sm md:text-base leading-relaxed border-t border-slate-50 pt-[17px]">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}
