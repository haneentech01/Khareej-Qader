"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Camera,
  Plus,
  Search,
  Pencil,
  Trash2,
  RotateCcw,
  Image as ImageIcon,
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
import { useGalleryCMS } from "@/hooks/cms/useGalleryCMS";
import { GalleryCMSItem } from "@/types/landing-cms";
import { ImageInputPreview } from "./ImageInputPreview";

export function GalleryManager() {
  const {
    gallery,
    allGalleryCount,
    search,
    setSearch,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetGallery,
  } = useGalleryCMS();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryCMSItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    image: "/images/logo.png",
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      image: "/images/logo.png",
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (item: GalleryCMSItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image: item.image,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("يرجى إدخال عنوان الصورة/اللقطة.");
      return;
    }

    if (editingItem) {
      updateGalleryItem(editingItem.id, formData);
    } else {
      addGalleryItem(formData);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`هل أنت تأكد من حذف الصورة "${title}"؟`)) {
      deleteGalleryItem(id);
    }
  };

  const handleReset = () => {
    if (confirm("هل تريد إعادة ضبط قسم معرض الصور إلى البيانات الافتراضية؟")) {
      resetGallery();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <Camera className="size-6 text-brand-primary" />
            إدارة لقطات من خريج قادر ({allGalleryCount})
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            تحكم في معرض الصور والفعاليات المعروضة في قسم "لقطات من خريج قادر".
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
            <span>إضافة لقطة جديدة</span>
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
          placeholder="ابحث عن عنوان الصورة..."
          className="pr-10 bg-white border-slate-200 rounded-2xl focus:border-brand-primary"
        />
      </div>

      {/* Gallery Grid */}
      {gallery.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8">
          <ImageIcon className="size-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-700">لا توجد صور في المعرض</h3>
          <p className="text-slate-400 text-sm mt-1 mb-4">
            لم يتم العثور على أي صورة مطابقة للبحث أو أن المعرض فارغ.
          </p>
          <Button onClick={handleOpenAdd} className="rounded-xl bg-brand-primary text-white">
            إضافة أول لقطة
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 bg-slate-50 border-b border-slate-100">
                <Image
                  src={item.image || "/images/logo.png"}
                  alt={item.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  unoptimized={item.image?.startsWith("data:")}
                />

                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/80 backdrop-blur-xs p-1 rounded-xl shadow-xs">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-brand-primary hover:bg-white transition-colors"
                    title="تعديل"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-white transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-800 line-clamp-2">
                  {item.title}
                </h3>
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
              {editingItem ? "تعديل لقطة المعرض" : "إضافة لقطة جديدة للمعرض"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 my-2">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">عنوان الصورة / اللقطة</label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: لقطة من حفل التخرج"
                required
                className="rounded-xl border-slate-200"
              />
            </div>

            <ImageInputPreview
              label="الصورة"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              placeholder="/images/logo.png"
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
                {editingItem ? "حفظ التغيرات" : "إضافة للصورة"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
