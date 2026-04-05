import { useTranslations } from "next-intl";

interface SectionHeaderProps {
  /** The translation namespace (e.g., "About", "Tracks") */
  namespace: string;
  /** Custom classes for the container */
  className?: string;
  /** Whether the header should be centered. Defaults to true. */
  centered?: boolean;
}

export function SectionHeader({ namespace, className = "", centered = true }: SectionHeaderProps) {
  const t = useTranslations(namespace);

  return (
    <div className={`mb-10 md:mb-14 lg:mb-20 ${centered ? "text-center mx-auto" : ""} ${className}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-[45px] xl:text-6xl font-bold 
        text-black mb-4 leading-tight ${centered ? "" : "lg:text-[50px]"}`}>
        {t("title")}
      </h2>
      <p className={`text-brand-muted text-lg lg:text-xl max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {t("subtitle")}
      </p>
    </div>
  );
}
