"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, Link as LinkIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImageInputPreviewProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function ImageInputPreview({
  label,
  value,
  onChange,
  placeholder = "/images/placeholder.png",
}: ImageInputPreviewProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("حجم الصورة كبير جداً. يرجى اختيار صورة أقل من 2 ميجابايت.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-1 rounded-md transition-colors ${
              mode === "url"
                ? "bg-white text-brand-primary font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            رابط صورة
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-1 rounded-md transition-colors ${
              mode === "upload"
                ? "bg-white text-brand-primary font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            رفع ملف
          </button>
        </div>
      </div>

      <div className="flex items-start gap-4">
        {/* Preview Thumbnail */}
        <div className="relative size-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0 flex items-center justify-center group">
          {value ? (
            <>
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-contain p-1"
                unoptimized={value.startsWith("data:")}
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="إزالة الصورة"
              >
                <X className="size-3" />
              </button>
            </>
          ) : (
            <ImageIcon className="size-8 text-slate-300" />
          )}
        </div>

        {/* Input Controls */}
        <div className="flex-1 space-y-2">
          {mode === "url" ? (
            <div className="relative">
              <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="pr-9 dir-ltr text-right text-xs"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <label className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-slate-300 hover:border-brand-primary bg-slate-50 hover:bg-slate-100 transition-all text-xs font-medium text-slate-700">
                <Upload className="size-4 text-brand-primary" />
                <span>اختر صورة من جهازك</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
          <p className="text-[11px] text-slate-400">
            يمكنك إدخال مسار الصورة الداخلي (مثل /images/web.png) أو رابط خارجي أو رفع صورة مباشرة.
          </p>
        </div>
      </div>
    </div>
  );
}
