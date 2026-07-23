"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Search,
  Users2,
  CheckCircle2,
  XCircle,
  Mail,
  Calendar,
  Loader2,
  UserCheck,
  UserX,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { AdminStudent } from "@/types";

interface StudentsTableProps {
  students: AdminStudent[];
  totalCount: number;
  activeCount: number;
  disabledCount: number;
  search: string;
  setSearch: (val: string) => void;
  statusFilter: "all" | "active" | "disabled";
  setStatusFilter: (val: "all" | "active" | "disabled") => void;
  loadingSlug: string | null;
  handleToggleAccount: (student: AdminStudent) => Promise<void>;
}

export function StudentsTable({
  students,
  totalCount,
  activeCount,
  disabledCount,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  loadingSlug,
  handleToggleAccount,
}: StudentsTableProps) {
  const t = useTranslations("Admin.students");
  const locale = useLocale();

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
      {/* Search & Filters */}
      <div className="p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 rtl:right-3.5 ltr:left-3.5" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search_placeholder")}
            className="pr-10 rtl:pr-10 ltr:pl-10 h-11 rounded-2xl border-slate-200 text-sm  
            focus:outline-none focus:ring-0 focus-visible:ring-0
            focus-visible:ring-offset-0
            focus:border-slate-200 active:ring-0
            active:outline-none"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl w-full md:w-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${statusFilter === "all"
                ? "bg-white text-black shadow-xs"
                : "text-slate-500 hover:text-black"
              }`}
          >
            {t("view.all")} ({totalCount})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${statusFilter === "active"
                ? "bg-white text-emerald-700 shadow-xs"
                : "text-slate-500 hover:text-emerald-700"
              }`}
          >
            {t("view.active")} ({activeCount})
          </button>
          <button
            onClick={() => setStatusFilter("disabled")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${statusFilter === "disabled"
                ? "bg-white text-red-600 shadow-xs"
                : "text-slate-500 hover:text-red-600"
              }`}
          >
            {t("view.disabled")} ({disabledCount})
          </button>
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-hidden">
        {students.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-4">
            <Users2 className="size-12 text-slate-300" />
            <p className="text-slate-500 font-bold">{t("empty.title")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/70 border-b border-slate-100">
                <TableRow>
                  <TableHead className="py-4 px-6 text-right font-extrabold text-brand-muted">
                    الطالب
                  </TableHead>
                  <TableHead className="py-4 px-6 text-right font-extrabold text-brand-muted">
                    حالة الحساب
                  </TableHead>
                  <TableHead className="py-4 px-6 text-right font-extrabold text-brand-muted">
                    معلومات التواصل
                  </TableHead>
                  <TableHead className="py-4 px-6 text-center font-extrabold text-brand-muted">
                    الإجراءات
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-slate-100">
                {students.map((student) => {
                  const slug = student.slug || String(student.id);
                  const isToggling = loadingSlug === slug;
                  const initial = student.full_name
                    ? student.full_name.charAt(0).toUpperCase()
                    : "S";

                  return (
                    <TableRow
                      key={student.id}
                      className="hover:bg-slate-50/50 transition-colors border-slate-100"
                    >
                      {/* Student Info */}
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-3.5 min-w-50">
                          <div className="size-11 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-base flex items-center justify-center shrink-0">
                            {initial}
                          </div>
                          <div className="space-y-0.5">
                            <h3 className="text-sm font-extrabold text-slate-900 truncate">
                              {student.full_name}
                            </h3>
                            {student.created_at && (
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <Calendar className="size-3 text-slate-400" />
                                {t("join_date")}{" "}
                                {new Date(student.created_at).toLocaleDateString(locale)}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Account Status */}
                      <TableCell className="py-4 px-6 whitespace-nowrap">
                        {student.account_status ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full text-xs font-bold">
                            <CheckCircle2 className="size-3.5" />
                            {t("account.active")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 border border-red-200/60 px-2.5 py-0.5 rounded-full text-xs font-bold">
                            <XCircle className="size-3.5" />
                            {t("account.disabled")}
                          </span>
                        )}
                      </TableCell>

                      {/* Contact & Location */}
                      <TableCell className="py-4 px-6">
                        <div className="space-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5 dir-ltr w-fit">
                            <Mail className="size-3.5 text-slate-400" />
                            {student.email}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-4 px-6 text-left whitespace-nowrap">
                        {student.account_status ? (
                          <Button
                            onClick={() => handleToggleAccount(student)}
                            disabled={isToggling}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 font-bold rounded-2xl h-10 px-4 gap-2 transition-all shadow-2xs"
                          >
                            {isToggling ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <UserX className="size-4 text-red-500" />
                            )}
                            <span>{t("account.disable")}</span>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleToggleAccount(student)}
                            disabled={isToggling}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl h-10 px-4 gap-2 transition-all shadow-2xs"
                          >
                            {isToggling ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <UserCheck className="size-4 text-white" />
                            )}
                            <span>{t("account.enable")}</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}