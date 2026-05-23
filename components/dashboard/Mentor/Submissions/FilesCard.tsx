"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Paperclip, Download, FileArchive, FileText } from "lucide-react";

export function FilesCard() {
  const t = useTranslations("MentorSubmissions.files_card");

  const files = [
    {
      name: "project.zip",
      size: "2.4 MB",
      icon: FileArchive,
      iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
    },
    {
      name: "home-page.pdf",
      size: "1.1 MB",
      icon: FileText,
      iconBg: "bg-red-50 border-red-100 text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 border border-sidebar-border shadow-xs flex flex-col gap-6 w-full h-full justify-between">
      {/* Title Header */}
      <div className="flex justify-between items-center border-b border-slate-50 pb-4">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <Paperclip className="size-4.5 text-[#22b48d]" />
          </div>
          <h4 className="font-extrabold text-black text-lg">
            {t("title")}
          </h4>
        </div>
        <span className="text-brand-muted/70 text-xs md:text-sm font-bold bg-[#F6FBFA] px-2.5 py-1 rounded-lg border border-slate-100">
          {t("files_count")}
        </span>
      </div>

      {/* Files List */}
      <div className="flex flex-col divide-y divide-slate-50 flex-1 justify-center py-2">
        {files.map((file, idx) => {
          const FileIcon = file.icon;
          return (
            <div
              key={idx}
              className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0 gap-4"
            >
              {/* File Info */}
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-xl border flex items-center justify-center shrink-0 ${file.iconBg}`}>
                  <FileIcon className="size-5" />
                </div>
                <div className="space-y-0.5 text-right rtl:text-right ltr:text-left">
                  <span className="font-extrabold text-black text-sm block leading-none">
                    {file.name}
                  </span>
                  <span className="text-brand-muted/70 text-xs font-semibold block">
                    {file.size}
                  </span>
                </div>
              </div>

              {/* Download Trigger */}
              <button
                onClick={() => console.log(`Downloading ${file.name}`)}
                className="size-9 rounded-xl border border-emerald-100 bg-[#E8FDF2] text-[#22b48d] hover:bg-[#d1fae5] active:scale-95 transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
              >
                <Download className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
