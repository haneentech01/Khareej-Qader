"use client";

import React from "react";
import { Paperclip, Download, FileCode, FileArchive } from "lucide-react";
import { useTranslations } from "next-intl";

export function UploadedFilesCard() {
  const t = useTranslations("Dashboard.TaskDetailsPage");

  const files = [
    {
      name: "index.html",
      size: "2.4 KB",
      type: "HTML",
      icon: FileCode,
      bgColor: "bg-emerald-50 text-emerald-600",
      iconColor: "text-emerald-500",
    },
    {
      name: "style.css",
      size: "1.8 KB",
      type: "CSS",
      icon: FileCode,
      bgColor: "bg-blue-50 text-blue-600",
      iconColor: "text-blue-500",
    },
    {
      name: "project.zip",
      size: "1.2 MB",
      type: "ZIP",
      icon: FileArchive,
      bgColor: "bg-amber-50 text-amber-600",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full">
      {/* Card Title */}
      <div className="flex items-center gap-2">
        <Paperclip className="size-5 text-brand-base" />
        <h4 className="font-bold text-black text-lg">
          {t("uploaded_files_title")}
        </h4>
      </div>

      {/* Files List */}
      <div className="flex flex-col gap-3">
        {files.map((file, idx) => {
          const Icon = file.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-brand-surface/30 transition-all group"
            >
              {/* File Info */}
              <div className="flex items-center gap-2.5">
                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${file.bgColor}`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-black text-xs md:text-sm dir-ltr text-right">
                    {file.name}
                  </h5>
                  <p className="text-xs text-brand-muted/70 mt-0.5">
                    {t("uploaded_files_title").includes("ملفات")
                      ? `ملف ${file.type} • ${file.size}`
                      : `${file.type} File • ${file.size}`}
                  </p>
                </div>
              </div>

              {/* Download Action */}
              <button className="size-10 rounded-full bg-white shadow-xs border border-gray-100 hover:border-brand-surface hover:text-brand-base flex items-center justify-center text-brand-muted transition-all shrink-0 hover:cursor-pointer">
                <Download className="size-4 " />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
