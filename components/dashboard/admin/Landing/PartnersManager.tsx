"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Plus,
  Search,
  Pencil,
  Trash2,
  RotateCcw,
  Building2,
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
import { usePartnersCMS } from "@/hooks/cms/usePartnersCMS";
import { PartnerCMSItem } from "@/types/landing-cms";
import { ImageInputPreview } from "./ImageInputPreview";

export function PartnersManager() {
  const {
    partners,
    allPartnersCount,
    search,
    setSearch,
    addPartner,
    updatePartner,
    deletePartner,
    resetPartners,
  } = usePartnersCMS();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<PartnerCMSItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    logo: "/images/partners/AUG.png",
  });

  const handleOpenAdd = () => {
    setEditingPartner(null);
    setFormData({
      name: "",
      logo: "/images/partners/AUG.png",
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (partner: PartnerCMSItem) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("يرجى إدخال اسم الجامعة الشريكة.");
      return;
    }

    if (editingPartner) {
      updatePartner(editingPartner.id, formData);
    } else {
      addPartner(formData);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت تأكد من حذف الجامعة الشريكة "${name}"؟`)) {
      deletePartner(id);
    }
  };

  const handleReset = () => {
    if (confirm("هل تريد إعادة ضبط قسم شركاء النجاح إلى البيانات الافتراضية؟")) {
      resetPartners();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <Building2 className="size-6 text-brand-primary" />
            إدارة شركاء النجاح من الجامعات ({allPartnersCount})
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            تحكم في شعارات وأسماء الجامعات التي تظهر في قسم "شركاء النجاح من الجامعات".
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
            <span>إضافة جامعة جديدة</span>
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
          placeholder="ابحث عن جامعة شريكة..."
          className="pr-10 bg-white border-slate-200 rounded-2xl focus:border-brand-primary"
        />
      </div>

      {/* Partners Grid */}
      {partners.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8">
          <GraduationCap className="size-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-700">لا توجد جامعات شريكة</h3>
          <p className="text-slate-400 text-sm mt-1 mb-4">
            لم يتم العثور على أي جامعة مطابقة للبحث أو أن القائمة فارغة.
          </p>
          <Button onClick={handleOpenAdd} className="rounded-xl bg-brand-primary text-white">
            إضافة أول جامعة
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between items-center text-center group"
            >
              <div className="w-full flex justify-end gap-1 mb-2">
                <button
                  onClick={() => handleOpenEdit(partner)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
                  title="تعديل الجامعة"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id, partner.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="حذف الجامعة"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="relative w-36 h-20 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex items-center justify-center mb-4">
                <Image
                  src={partner.logo || "/images/partners/AUG.png"}
                  alt={partner.name}
                  fill
                  className="object-contain p-2"
                  unoptimized={partner.logo?.startsWith("data:")}
                />
              </div>

              <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white sm:max-w-lg rounded-3xl p-6 dir-rtl text-right">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              {editingPartner ? "تعديل الجامعة الشريكة" : "إضافة جامعة شريكة جديدة"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 my-2">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">اسم الجامعة</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: جامعة الأزهر - غزة"
                required
                className="rounded-xl border-slate-200"
              />
            </div>

            <ImageInputPreview
              label="شعار الجامعة (Logo)"
              value={formData.logo}
              onChange={(url) => setFormData({ ...formData, logo: url })}
              placeholder="/images/partners/AUG.png"
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
                {editingPartner ? "حفظ التغيرات" : "إضافة الجامعة"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
