"use client";

import React from "react";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function FileUpload() {
  const t = useTranslations("Dashboard.TasksPage.current_task");

  return (
    <div className="mt-6">
      <h4 className="text-xl font-bold text-black mb-4">{t("upload_title")}</h4>
      
      <div className="border-2 border-dashed border-[#BCCAC3] rounded-[30px] p-12 flex flex-col items-center justify-center bg-transparent transition-all hover:bg-gray-50/50">
        <div className="size-16 bg-[#F4F7F5] rounded-full flex items-center justify-center mb-4">
          <CloudUpload className="size-8 text-brand-base" />
        </div>
        
        <p className="text-lg font-bold text-black mb-1">{t("upload_drop")}</p>
        <p className="text-sm text-brand-muted mb-6">{t("upload_hint")}</p>
        
        <Button className="bg-brand-base hover:bg-brand-hover text-white px-8 h-12 rounded-[10px] font-bold">
          {t("upload_btn")}
        </Button>
      </div>
    </div>
  );
}
