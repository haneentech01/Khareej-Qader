import { MoveLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionHeader } from "../../ui/SectionHeader";

interface NewsHeaderProps {
  subtitle: string;
  viewAllLabel: string;
}

export const NewsHeader = ({ subtitle, viewAllLabel }: NewsHeaderProps) => {
  return (
    <div className="lg:col-span-5 lg:sticky lg:top-32 text-center lg:text-start">
      {/* Badge Subtitle */}
      <span className="inline-block px-4 py-1.5 text-sm font-semibold
      text-brand-base bg-[#F0F5F1] rounded-full mb-6">
        {subtitle}
      </span>

      {/* Reusable Section Header Component */}
      <SectionHeader namespace="News" centered={false} className="mb-8" />

      {/* Desktop (lg+) View All Button */}
      <div className="hidden lg:block">
        <Link href="/news">
          <button className="group flex items-center gap-3 bg-brand-primary text-white 
          px-10 py-5 rounded-[24px] font-bold text-xl 
          shadow-[0_15px_40px_rgba(30,165,134,0.3)] 
          hover:bg-brand-dark transition-all transform hover:-translate-y-1">
            {viewAllLabel}
            <MoveLeft className="size-6 transition-transform group-hover:-translate-x-2" />
          </button>
        </Link>
      </div>
    </div>
  );
};
