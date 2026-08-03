"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Quote,
  Plus,
  Search,
  Pencil,
  Trash2,
  RotateCcw,
  Star,
  UserCheck,
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
import { useTestimonialsCMS } from "@/hooks/cms/useTestimonialsCMS";
import { TestimonialCMSItem } from "@/types/landing-cms";
import { ImageInputPreview } from "./ImageInputPreview";

export function TestimonialsManager() {
  const {
    testimonials,
    allTestimonialsCount,
    search,
    setSearch,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    resetTestimonials,
  } = useTestimonialsCMS();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialCMSItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    badge: "قصة نجاح متميزة",
    image: "/images/personsImages.png",
    rating: 5,
  });

  const handleOpenAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      role: "خريج مسار التدريب",
      quote: "",
      badge: "قصة نجاح متميزة",
      image: "/images/personsImages.png",
      rating: 5,
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (t: TestimonialCMSItem) => {
    setEditingTestimonial(t);
    setFormData({
      name: t.name,
      role: t.role,
      quote: t.quote,
      badge: t.badge || "قصة نجاح متميزة",
      image: t.image,
      rating: t.rating || 5,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) {
      alert("يرجى إدخال اسم الطالب ونص قصة النجاح.");
      return;
    }

    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, formData);
    } else {
      addTestimonial(formData);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت تأكد من حذف قصة النجاح الخاصة بـ "${name}"؟`)) {
      deleteTestimonial(id);
    }
  };

  const handleReset = () => {
    if (confirm("هل تريد إعادة ضبط قسم قصص النجاح إلى البيانات الافتراضية؟")) {
      resetTestimonials();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <UserCheck className="size-6 text-brand-primary" />
            إدارة قصص نجاح طلابنا ({allTestimonialsCount})
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            تحكم في تجارب وشهادات الطلاب المعروضة في قسم "قصص نجاح حقيقية من طلابنا".
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
            <span>إضافة قصة نجاح</span>
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
          placeholder="ابحث باسم الطالب أو المسار..."
          className="pr-10 bg-white border-slate-200 rounded-2xl focus:border-brand-primary"
        />
      </div>

      {/* Testimonials Grid */}
      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8">
          <Quote className="size-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-700">لا توجد قصص نجاح</h3>
          <p className="text-slate-400 text-sm mt-1 mb-4">
            لم يتم العثور على أي عناصر مطابقة للبحث أو أن القائمة فارغة.
          </p>
          <Button onClick={handleOpenAdd} className="rounded-xl bg-brand-primary text-white">
            إضافة أول قصة نجاح
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <Image
                        src={t.image || "/images/personsImages.png"}
                        alt={t.name}
                        fill
                        className="object-cover"
                        unoptimized={t.image?.startsWith("data:")}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(t)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
                      title="تعديل"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm italic leading-relaxed mb-4 line-clamp-4">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="bg-brand-primary/10 text-brand-primary font-semibold px-2.5 py-1 rounded-full text-[11px]">
                  {t.badge || "قصة نجاح"}
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
              {editingTestimonial ? "تعديل قصة النجاح" : "إضافة قصة نجاح جديدة"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 my-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">اسم الطالب</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: أحمد محمود"
                  required
                  className="rounded-xl border-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">الصفة / التخصص</label>
                <Input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="مثال: مطور ويب خريج"
                  required
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">نص الشهادة / التقييم</label>
              <textarea
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="أدخل نص التقييم وتجربة الطالب..."
                rows={3}
                required
                className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">وسام التميّز (Badge)</label>
                <Input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="مثال: قصة نجاح متميزة"
                  className="rounded-xl border-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">التقييم (من 5)</label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="rounded-xl border-slate-200 dir-ltr text-right"
                />
              </div>
            </div>

            <ImageInputPreview
              label="صورة الشخص الشخصية"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              placeholder="/images/personsImages.png"
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
                {editingTestimonial ? "حفظ التغيرات" : "إضافة القصة"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
