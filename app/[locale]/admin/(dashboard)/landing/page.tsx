"use client";

import React, { useState } from "react";
import { LayoutTemplate, Layers, Building2, UserCheck, Camera } from "lucide-react";
import { TracksManager } from "@/components/dashboard/admin/Landing/TracksManager";
import { PartnersManager } from "@/components/dashboard/admin/Landing/PartnersManager";
import { TestimonialsManager } from "@/components/dashboard/admin/Landing/TestimonialsManager";
import { GalleryManager } from "@/components/dashboard/admin/Landing/GalleryManager";

type TabType = "tracks" | "partners" | "testimonials" | "gallery";

export default function AdminLandingCMSPage() {
  const [activeTab, setActiveTab] = useState<TabType>("tracks");

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6 dir-rtl text-right">
      {/* Top Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-black tracking-tight flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-brand-light-green text-brand-primary flex items-center justify-center shrink-0">
            <LayoutTemplate className="size-6" />
          </div>
          إدارة أجزاء الصفحة الرئيسية (Landing Page CMS)
        </h1>
        <p className="text-brand-muted text-base">
          قم بإضافة وتعديل وإدارة محتوى أجزاء الصفحة الرئيسية التفاعلية مباشرة.
        </p>
      </div>

      {/* Custom Tabs Navigation */}
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-100 p-1.5 rounded-2xl gap-1 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("tracks")}
            className={`rounded-xl py-3 text-xs md:text-sm font-bold flex items-center gap-2 justify-center transition-all ${activeTab === "tracks"
              ? "bg-white text-brand-primary shadow-xs"
              : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
              }`}
          >
            <Layers className="size-4" />
            <span>المسارات التدريبية</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("partners")}
            className={`rounded-xl py-3 text-xs md:text-sm font-bold flex items-center gap-2 justify-center transition-all ${activeTab === "partners"
              ? "bg-white text-brand-primary shadow-xs"
              : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
              }`}
          >
            <Building2 className="size-4" />
            <span>شركاء النجاح</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("testimonials")}
            className={`rounded-xl py-3 text-xs md:text-sm font-bold flex items-center gap-2 justify-center transition-all ${activeTab === "testimonials"
              ? "bg-white text-brand-primary shadow-xs"
              : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
              }`}
          >
            <UserCheck className="size-4" />
            <span>قصص النجاح</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`rounded-xl py-3 text-xs md:text-sm font-bold flex items-center gap-2 justify-center transition-all ${activeTab === "gallery"
              ? "bg-white text-brand-primary shadow-xs"
              : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
              }`}
          >
            <Camera className="size-4" />
            <span>لقطات المعرض</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="mt-4">
          {activeTab === "tracks" && <TracksManager />}
          {activeTab === "partners" && <PartnersManager />}
          {activeTab === "testimonials" && <TestimonialsManager />}
          {activeTab === "gallery" && <GalleryManager />}
        </div>
      </div>
    </div>
  );
}
