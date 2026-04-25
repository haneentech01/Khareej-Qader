"use client";

import React from "react";
import { FileText, Trash2, Download, CloudUpload } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProfileCVDisplay() {
  const t = useTranslations("Dashboard.ProfilePage");

  return (
    <div className="bg-white rounded-[30px] p-8 border border-gray-50 shadow-xs mt-6">
      <div className="flex items-center gap-2 mb-8 text-[#34B898]">
        <FileText className="size-6" />
        <h3 className="text-xl font-bold">{t("cv_info")}</h3>
      </div>

      <div className="border-2 border-dashed border-[#BCCAC3] rounded-[30px] p-10 bg-transparent">
        <div className="flex flex-col items-center">
          <div className="bg-white border border-gray-100 rounded-full px-6 py-4 flex items-center gap-4 shadow-sm mb-6">
             <div className="size-10 bg-brand-surface rounded-full flex items-center justify-center">
               <FileText className="size-6 text-brand-base" />
             </div>
             <div>
                <p className="font-bold text-black text-sm">CV_Ahmed_Ahmed.pdf</p>
                <p className="text-[10px] text-brand-muted">تم الرفع في 12 أكتوبر • 118 KB</p>
             </div>
             <div className="flex items-center gap-3 pr-4 border-r border-gray-100 mr-2">
                <button className="text-red-500 hover:text-red-600 transition-colors">
                  <Trash2 className="size-4" />
                </button>
                <button className="text-brand-base hover:text-brand-hover transition-colors">
                  <Download className="size-4" />
                </button>
             </div>
          </div>
          
          <p className="text-sm text-brand-muted">{t("cv_hint")}</p>
        </div>
      </div>
    </div>
  );
}
