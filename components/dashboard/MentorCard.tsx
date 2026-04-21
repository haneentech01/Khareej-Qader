"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

interface MentorCardProps {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export function MentorCard({ name, role, bio, avatarUrl }: MentorCardProps) {
  const t = useTranslations("Dashboard.mentor");

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <p className="text-brand-base text-xs font-semibold mb-2">{t("title")}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
            {bio}
          </p>
        </div>
        
        <div className="relative">
          <Avatar className="size-24 rounded-2xl border-4 border-gray-50">
            <AvatarImage src={avatarUrl} className="object-cover" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-1 left-1 size-4 bg-brand-base rounded-full border-2 border-white"></span>
        </div>
      </div>
      
      <Button className="w-full bg-brand-base hover:bg-brand-hover text-white rounded-xl h-12 font-bold transition-all">
        {t("contact")}
      </Button>
    </div>
  );
}
