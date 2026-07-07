"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface MentorCardProps {
  name: string;
  role: string;
  info: string;
  mobile: string;
  avatarUrl: string;
}

export function MentorCard({ name, mobile, info, avatarUrl }: MentorCardProps) {
  const t = useTranslations("Dashboard.mentor");

  return (
    <div className="bg-white rounded-[30px] px-8 py-10 border border-slate-100 
    shadow-sm flex flex-col justify-between h-full">

      <div className="flex items-start gap-5 mb-7">

        {/* Avatar */}
        <div className="relative">
          <Avatar className="size-20">
            <AvatarImage src={avatarUrl}
              className="object-cover rounded-[18px]" />
            <AvatarFallback className="text-2xl">{name[0]}</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-1 size-5 bg-brand-base rounded-full border-4 border-white"></span>
        </div>

        {/* Info */}
        <div>
          <p className="text-brand-base text-sm font-medium mb-2.5">
            {t("title")}
          </p>
          <h3 className="text-2xl font-bold text-black mb-2">
            {name}
          </h3>
          <p className="text-brand-muted text-sm leading-relaxed">
            {info}
          </p>
        </div>

      </div>

      <Link href={`https://wa.me/${mobile}`} target="_blank">
        <Button className="w-full bg-brand-primary hover:bg-brand-hover/90
      cursor-pointer text-white rounded-[10px] h-12 font-semibold">
          {t("contact")}
        </Button>
      </Link>
    </div>
  );
}
