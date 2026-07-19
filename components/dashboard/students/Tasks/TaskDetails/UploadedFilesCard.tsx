"use client";

import React from "react";
import { Paperclip, Download, FileCode, FileArchive, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { UploadedFile } from "@/types";


interface UploadedFilesCardProps {
  files: UploadedFile[];
}
const FILE_ICONS: Record<string, { Icon: React.ElementType; bgColor: string }> = {
  HTML: { Icon: FileCode, bgColor: "bg-emerald-50 text-emerald-600" },
  CSS: { Icon: FileCode, bgColor: "bg-blue-50 text-blue-600" },
  ZIP: { Icon: FileArchive, bgColor: "bg-amber-50 text-amber-600" },
  DEFAULT: { Icon: FileText, bgColor: "bg-slate-50 text-slate-600" },
};

export function UploadedFilesCard({ files }: UploadedFilesCardProps) {
  const t = useTranslations("Dashboard.TaskDetailsPage");

  if (!files.length) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full">
      <div className="flex items-center gap-2">
        <Paperclip className="size-5 text-brand-base" />
        <h4 className="font-bold text-black text-lg">
          {t("uploaded_files_title")}
        </h4>
      </div>

      <div className="flex flex-col gap-3">
        {files.map((file, idx) => {
          const { Icon, bgColor } = FILE_ICONS[file.type] || FILE_ICONS.DEFAULT;

          return (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-brand-surface/30 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${bgColor}`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-black text-xs md:text-sm dir-ltr text-right">
                    {file.name}
                  </h5>
                  <p className="text-xs text-brand-muted/70 mt-0.5">
                    {file.type} File • {file.size}
                  </p>
                </div>
              </div>

              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-white shadow-xs border border-gray-100 hover:border-brand-surface hover:text-brand-base flex items-center justify-center text-brand-muted transition-all shrink-0 hover:cursor-pointer"
              >
                <Download className="size-4" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}