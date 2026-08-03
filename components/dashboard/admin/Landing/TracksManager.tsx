"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  RotateCcw,
  Clock,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTracksCMS } from "@/hooks/cms/useTracksCMS";
import { TrackCMSItem } from "@/types/landing-cms";
import { ImageInputPreview } from "./ImageInputPreview";

export function TracksManager() {
  const {
    tracks,
    allTracksCount,
    search,
    setSearch,
    addTrack,
    updateTrack,
    deleteTrack,
    resetTracks,
  } = useTracksCMS();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<TrackCMSItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    time: "",
    img: "/images/web.png",
  });

  const handleOpenAdd = () => {
    setEditingTrack(null);
    setFormData({
      name: "",
      desc: "",
      time: "2 شهر - مكثف",
      img: "/images/web.png",
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (track: TrackCMSItem) => {
    setEditingTrack(track);
    setFormData({
      name: track.name,
      desc: track.desc,
      time: track.time,
      img: track.img,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.desc.trim()) {
      alert("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    if (editingTrack) {
      updateTrack(editingTrack.id, formData);
    } else {
      addTrack(formData);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت تأكد من حذف المسار التدريبي "${name}"؟`)) {
      deleteTrack(id);
    }
  };

  const handleReset = () => {
    if (confirm("هل تريد إعادة ضبط قسم المسارات إلى البيانات الافتراضية؟")) {
      resetTracks();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <Layers className="size-6 text-brand-primary" />
            إدارة المسارات التدريبية ({allTracksCount})
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            تحكم في المسارات التي تظهر في قسم "استكشف المسارات التدريبية" في الصفحة الرئيسية.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
          >
            <RotateCcw className="size-4" />
            <span>إعادة ضبط</span>
          </Button>

          <Button
            onClick={handleOpenAdd}
            size="sm"
            className="rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white gap-2"
          >
            <Plus className="size-4" />
            <span>إضافة مسار جديد</span>
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="relative max-w-md">
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن مسار تدريبي..."
          className="pr-10 bg-white border-slate-200 rounded-2xl focus:border-brand-primary"
        />
      </div>

      {/* Tracks Grid */}
      {tracks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8">
          <BookOpen className="size-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-700">لا توجد مسارات تدريبية</h3>
          <p className="text-slate-400 text-sm mt-1 mb-4">
            لم يتم العثور على أي مسارات مطابقة للبحث أو أن القائمة فارغة.
          </p>
          <Button onClick={handleOpenAdd} className="rounded-xl bg-brand-primary text-white">
            إضافة أول مسار
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="relative size-14 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                    <Image
                      src={track.img || "/images/web.png"}
                      alt={track.name}
                      fill
                      className="object-contain p-2"
                      unoptimized={track.img?.startsWith("data:")}
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(track)}
                      className="p-2 rounded-xl text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
                      title="تعديل المسار"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(track.id, track.name)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="حذف المسار"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                  {track.name}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {track.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <Clock className="size-3.5 text-brand-primary" />
                  {track.time}
                </span>
                <span className="text-[11px] text-slate-400">
                  ID: {track.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white sm:max-w-lg rounded-3xl p-6 dir-rtl text-right">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              {editingTrack ? "تعديل المسار التدريبي" : "إضافة مسار تدريبي جديد"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 my-2">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">اسم المسار</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: تطوير تطبيقات الويب"
                required
                className="mt-1 rounded-xl focus:border focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">وصف المسار</label>
              <textarea
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                placeholder="أدخل وصفاً مفصلاً للمسار وما سيتم تعلمه..."
                rows={3}
                required
                className="mt-1 w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-0 focus-visible:ring-0"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">مدة التدريب</label>
              <Input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="مثال: 3 أشهر - مكثف"
                required
                className="mt-1 rounded-xl focus:border focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
              />
            </div>

            <ImageInputPreview
              label="صورة المسار"
              value={formData.img}
              onChange={(url) => setFormData({ ...formData, img: url })}
              placeholder="/images/web.png"
            />

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="rounded-xl"
              >
                إلغاء
              </Button>
              <Button type="submit" className="rounded-xl bg-brand-primary text-white">
                {editingTrack ? "حفظ التغيرات" : "إضافة المسار"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
