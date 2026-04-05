import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

/**
 * CTASection component featuring a strong call-to-action 
 * to encourage users to register for the program.
 */
export function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative bg-brand-primary rounded-[40px] p-10 md:p-16 lg:p-24 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between text-center lg:text-start rtl:lg:text-start gap-12 group">
           {/* Decorative Background Circles */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-125" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48 transition-transform duration-1000 group-hover:scale-125" />

           {/* Content Block */}
           <div className="relative z-10 lg:max-w-2xl">
              <h2 className="text-3xl md:text-5xl lg:text-[60px] font-extrabold text-white mb-6 leading-tight">
                {t("title")}
              </h2>
              <p className="text-white/80 text-xl md:text-2xl font-medium max-w-xl mx-auto lg:mx-0">
                {t("subtitle")}
              </p>
           </div>

           {/* Registration Button */}
           <div className="relative z-10 shrink-0">
              <Button size="lg" className="bg-white text-brand-primary hover:bg-slate-50 font-extrabold text-xl md:text-2xl h-16 md:h-20 px-12 md:px-16 rounded-[24px] shadow-2xl transition-all hover:scale-105 active:scale-95">
                 {t("button")}
              </Button>
           </div>
        </div>
      </div>
    </section>
  );
}
