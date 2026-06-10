"use client";

import React, { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import {
  Trash2,
  Play,
  Link2,
  Clock,
  Upload,
  Plus,
  Save,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileCheck2,
  Paperclip,
  HelpCircle,
  X,
  Target
} from "lucide-react";
import { useMentorLessonForm } from "@/hooks/useMentorLessonForm";
import { cn } from "@/lib/utils";

interface LessonEditPageMentorProps {
  lessonId: string;
}

export function LessonEditPageMentor({ lessonId }: LessonEditPageMentorProps) {
  const t = useTranslations("MentorLessonEdit");
  const tGlobal = useTranslations("MentorTrack");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    lessonsList,
    currentLesson,
    title,
    setTitle,
    description,
    setDescription,
    videoUrl,
    setVideoUrl,
    duration,
    setDuration,
    status,
    setStatus,
    objectives,
    newObjective,
    setNewObjective,
    thumbnailName,
    activeTab,
    setActiveTab,
    isSubmitting,
    toastMessage,
    maxDescLen,
    descCharCount,
    handleAddObjective,
    handleRemoveObjective,
    handleUpdateObjective,
    handleThumbnailUpload,
    handleSave,
    handleDelete
  } = useMentorLessonForm(lessonId);

  // Status configuration helper
  const getStatusBadgeClass = (s: typeof status) => {
    switch (s) {
      case "published":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      case "draft":
        return "bg-amber-50 text-amber-600 border border-amber-100";
      case "hidden":
        return "bg-slate-100 text-slate-500 border border-slate-200";
    }
  };

  const getStatusLabel = (s: typeof status) => {
    switch (s) {
      case "published":
        return t("published");
      case "draft":
        return t("draft");
      case "hidden":
        return t("hidden");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleThumbnailUpload(e.target.files[0].name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleThumbnailUpload(e.dataTransfer.files[0].name);
    }
  };

  if (!currentLesson) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16 px-4 md:px-0 animate-in fade-in duration-500">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={cn(
            "fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border animate-in slide-in-from-bottom-5 duration-300",
            toastMessage.type === "success"
              ? "bg-emerald-50 border-emerald-100 text-emerald-800"
              : "bg-red-50 border-red-100 text-red-800"
          )}
        >
          <div className={cn("size-6 rounded-full flex items-center justify-center text-white shrink-0", toastMessage.type === "success" ? "bg-emerald-500" : "bg-red-500")}>
            {toastMessage.type === "success" ? <Check className="size-3.5" /> : <X className="size-3.5" />}
          </div>
          <span className="text-sm font-bold">{toastMessage.text}</span>
        </div>
      )}

      {/* Top Breadcrumbs and Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-brand-muted text-xs md:text-sm font-medium">
          <Link href="/mentor" className="hover:text-black transition-colors">
            {t("breadcrumbs.home")}
          </Link>
          {isRtl ? <ChevronLeft className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
          <Link href="/mentor/track" className="hover:text-black transition-colors">
            {t("breadcrumbs.track")}
          </Link>
          {isRtl ? <ChevronLeft className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
          <span className="text-brand-primary font-bold">
            {t("breadcrumbs.edit_lesson")}
          </span>
        </div>

        {/* Delete Action Button */}
        <button
          onClick={() => {
            if (confirm(isRtl ? "هل أنت متأكد من حذف هذا الدرس؟" : "Are you sure you want to delete this lesson?")) {
              handleDelete();
              router.push("/mentor/track");
            }
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer"
        >
          <Trash2 className="size-4 shrink-0" />
          <span>{t("delete_lesson")}</span>
        </button>
      </div>

      {/* Title Block */}
      <div className="space-y-1 text-right rtl:text-right ltr:text-left pt-2">
        <h1 className="text-2xl md:text-3xl font-bold text-black flex items-center gap-2">
          {t("breadcrumbs.edit_lesson")}
        </h1>
        <p className="text-brand-muted text-sm md:text-base font-semibold">
          {currentLesson.title}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column (RTL Left side / Sidebar inside content): Status & Lesson List */}
        <div className="lg:col-span-4 space-y-6">

          {/* Lesson Status Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
            <h2 className="text-sm md:text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-primary" />
              {t("lesson_status")}
            </h2>

            <div className="space-y-4">
              {/* Published */}
              <label className="flex items-start gap-3.5 p-3 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="lesson_status"
                  checked={status === "published"}
                  onChange={() => setStatus("published")}
                  className="mt-1 size-4 accent-emerald-500 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    {t("published")}
                  </span>
                  <span className="text-xs text-slate-400 font-medium block">
                    {t("published_desc")}
                  </span>
                </div>
              </label>

              {/* Draft */}
              <label className="flex items-start gap-3.5 p-3 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="lesson_status"
                  checked={status === "draft"}
                  onChange={() => setStatus("draft")}
                  className="mt-1 size-4 accent-amber-500 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-amber-500" />
                    {t("draft")}
                  </span>
                  <span className="text-xs text-slate-400 font-medium block">
                    {t("draft_desc")}
                  </span>
                </div>
              </label>

              {/* Hidden */}
              <label className="flex items-start gap-3.5 p-3 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name="lesson_status"
                  checked={status === "hidden"}
                  onChange={() => setStatus("hidden")}
                  className="mt-1 size-4 accent-slate-400 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-slate-400" />
                    {t("hidden")}
                  </span>
                  <span className="text-xs text-slate-400 font-medium block">
                    {t("hidden_desc")}
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Track Lessons Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-sm md:text-base font-bold text-slate-800">
                {t("track_lessons")}
              </h2>
              <button
                onClick={() => alert(isRtl ? "إضافة درس جديد" : "Add new lesson")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-brand-primary rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="size-3.5" />
                <span>{t("add_lesson")}</span>
              </button>
            </div>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
              {lessonsList.map((lesson) => {
                const isActive = lesson.id === lessonId;
                return (
                  <Link
                    key={lesson.id}
                    href={`/mentor/track/${lesson.id}`}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl transition-all duration-300 border border-slate-50/40 text-right rtl:text-right ltr:text-left",
                      isActive
                        ? (isRtl ? "bg-emerald-50/70 border-r-4 border-r-brand-primary border-y-slate-100/50" : "bg-emerald-50/70 border-l-4 border-l-brand-primary border-y-slate-100/50")
                        : "hover:bg-slate-50 text-slate-700"
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Circle Number */}
                      <div
                        className={cn(
                          "size-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-300",
                          isActive
                            ? "bg-brand-primary text-white scale-105"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {lesson.number}
                      </div>

                      {/* Info */}
                      <div className="space-y-0.5">
                        <span className={cn("text-xs md:text-sm font-bold block leading-tight", isActive ? "text-brand-primary" : "text-slate-800")}>
                          {lesson.title}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="size-3 shrink-0" />
                          {lesson.duration} {isRtl ? "دقيقة" : "mins"}
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 self-center", getStatusBadgeClass(lesson.status))}>
                      {getStatusLabel(lesson.status)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (RTL Right side / Main content): Video & Form details */}
        <div className="lg:col-span-8 space-y-6">

          {/* Video Player Preview */}
          <div className="relative aspect-video rounded-3xl bg-slate-950 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.15)] group border border-slate-900">
            {/* Dark/Gradient Placeholder Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-slate-850 opacity-90 flex items-center justify-center" />

            {/* Preview Tag */}
            <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/90">
              {t("preview_lesson")}
            </div>

            {/* Play Button */}
            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 size-16 md:size-20 rounded-full bg-brand-primary hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <Play className="size-7 md:size-9 fill-white translate-x-[2px] rtl:-translate-x-[2px]" />
            </button>

            {/* Video Controls Bar Mockup */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-4 flex flex-col gap-2 opacity-100 transition-opacity duration-300">
              {/* Timeline slider */}
              <div className="w-full h-1 bg-white/20 rounded-full cursor-pointer relative group/timeline">
                <div className="absolute top-0 left-0 bottom-0 bg-brand-primary w-[30%] rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-md scale-0 group-hover/timeline:scale-100 transition-transform duration-150" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center text-white/90 text-xs font-medium">
                <div className="flex items-center gap-3">
                  <Play className="size-3.5 fill-white" />
                  <div className="flex items-center gap-1 text-[11px] text-white/70">
                    <span>00:00</span>
                    <span>/</span>
                    <span>{duration || "18:30"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <span className="hover:text-white cursor-pointer text-[10px] bg-white/10 px-2 py-0.5 rounded-md">1.0x</span>
                  <Clock className="size-3.5 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Form and Tabs details Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.015)] overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
              <button
                onClick={() => setActiveTab("about")}
                className={cn(
                  "px-6 py-4.5 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap",
                  activeTab === "about"
                    ? "border-brand-primary text-brand-primary bg-white"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                )}
              >
                {t("tab_about")}
              </button>
              <button
                onClick={() => setActiveTab("tasks")}
                className={cn(
                  "px-6 py-4.5 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap",
                  activeTab === "tasks"
                    ? "border-brand-primary text-brand-primary bg-white"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                )}
              >
                {t("tab_tasks")}
              </button>
              <button
                onClick={() => setActiveTab("attachments")}
                className={cn(
                  "px-6 py-4.5 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap",
                  activeTab === "attachments"
                    ? "border-brand-primary text-brand-primary bg-white"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                )}
              >
                {t("tab_attachments")}
              </button>
              <button
                onClick={() => setActiveTab("questions")}
                className={cn(
                  "px-6 py-4.5 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap",
                  activeTab === "questions"
                    ? "border-brand-primary text-brand-primary bg-white"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                )}
              >
                {t("tab_questions")}
              </button>
            </div>

            {/* Tab content panel */}
            <div className="p-6 md:p-8">
              {activeTab === "about" && (
                <form onSubmit={handleSave} className="space-y-6">
                  {/* Lesson Title Input */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-slate-700 block">
                      {t("lesson_title")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus:border-brand-primary/50 focus:bg-white focus:outline-hidden text-sm font-semibold text-slate-800 transition-all"
                    />
                  </div>

                  {/* Lesson Description Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs md:text-sm font-bold text-slate-700">
                      <span>{t("lesson_desc")} <span className="text-red-500">*</span></span>
                      <span className={cn("text-xs font-semibold", descCharCount > maxDescLen ? "text-red-500" : "text-slate-400")}>
                        {descCharCount} / {maxDescLen}
                      </span>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value.slice(0, maxDescLen))}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus:border-brand-primary/50 focus:bg-white focus:outline-hidden text-sm font-semibold text-slate-800 transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Two column row: Video URL & Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Video URL */}
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-slate-700 block">
                        {t("video_link")} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus:border-brand-primary/50 focus:bg-white focus:outline-hidden text-sm font-semibold text-slate-800 transition-all"
                        />
                        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRtl ? "right-3.5" : "left-3.5"}`}>
                          <Link2 className="size-4" />
                        </div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-bold text-slate-700 block">
                        {t("video_duration")} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus:border-brand-primary/50 focus:bg-white focus:outline-hidden text-sm font-semibold text-slate-800 transition-all"
                        />
                        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRtl ? "right-3.5" : "left-3.5"}`}>
                          <Clock className="size-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Drag & Drop Upload */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-bold text-slate-700 block">
                      {t("thumbnail")}
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-brand-primary/50 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="size-12 rounded-full bg-white flex items-center justify-center shadow-xs text-slate-400 group-hover:text-brand-primary transition-colors">
                        <Upload className="size-5" />
                      </div>
                      <div className="text-center space-y-1">
                        <span className="text-sm font-bold text-slate-700 block">
                          {thumbnailName || t("thumbnail_drop")}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 block">
                          {t("thumbnail_hint")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Objectives Section */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-xs md:text-sm font-bold text-slate-800 block">
                      {t("lesson_objectives")}
                    </h3>

                    <div className="space-y-3">
                      {objectives.map((obj, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-2xl transition-all hover:bg-slate-100/50 group/objective"
                        >
                          {/* Bullet Icon */}
                          <div className="size-6 rounded-full bg-emerald-50 text-brand-primary flex items-center justify-center shrink-0">
                            <Target className="size-3.5" />
                          </div>

                          {/* Objective Input */}
                          <input
                            type="text"
                            value={obj}
                            onChange={(e) => handleUpdateObjective(index, e.target.value)}
                            className="flex-1 bg-transparent focus:outline-hidden border-none text-sm font-bold text-slate-700"
                          />

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveObjective(index)}
                            className="size-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer opacity-0 group-hover/objective:opacity-100"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Objective input row */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newObjective}
                        onChange={(e) => setNewObjective(e.target.value)}
                        placeholder={t("add_objective")}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/50 focus:border-brand-primary/40 focus:bg-white focus:outline-hidden text-xs md:text-sm font-semibold text-slate-800 transition-all"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddObjective();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddObjective}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer"
                      >
                        <Plus className="size-4 shrink-0" />
                        <span>{t("add_objective")}</span>
                      </button>
                    </div>
                  </div>

                  {/* Form Save Action Buttons */}
                  <div className="flex justify-end items-center gap-4 pt-6 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-emerald-600 text-white rounded-2xl text-xs md:text-sm font-bold transition-all hover:scale-[1.02] shadow-md shadow-emerald-500/10 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Save className="size-4 shrink-0" />
                      <span>{isSubmitting ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ التعديلات" : "Save Changes")}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Tasks Tab High-Fidelity Mockup */}
              {activeTab === "tasks" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm md:text-base font-bold text-slate-800">
                      {isRtl ? "المهام المطلوبة لهذا الدرس" : "Required Tasks for this Lesson"}
                    </h3>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-brand-primary rounded-xl text-xs font-bold transition-all cursor-pointer">
                      <Plus className="size-3.5" />
                      <span>{isRtl ? "إضافة مهمة جديدة" : "Add New Task"}</span>
                    </button>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-5 hover:bg-slate-50/30 transition-all flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 text-brand-primary">
                      <FileCheck2 className="size-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm md:text-base font-bold text-slate-800">
                        {isRtl ? "تطبيق هيكل صفحة الويب" : "Apply Web Page Structure"}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-400 font-semibold leading-relaxed">
                        {isRtl
                          ? "قم ببناء صفحة HTML متكاملة تحتوي على الهيدر والقسم الرئيسي والفوتر مع كتابة وسوم الهيد بشكل صحيح."
                          : "Build a complete HTML page containing header, main, and footer sections with correct head tags."}
                      </p>
                    </div>
                    <button className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer self-center">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Attachments Tab High-Fidelity Mockup */}
              {activeTab === "attachments" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm md:text-base font-bold text-slate-800">
                      {isRtl ? "المرفقات والروابط الإضافية" : "Attachments and Additional Links"}
                    </h3>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-brand-primary rounded-xl text-xs font-bold transition-all cursor-pointer">
                      <Plus className="size-3.5" />
                      <span>{isRtl ? "إضافة ملف / رابط" : "Add File / Link"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* PDF Guide */}
                    <div className="border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5 hover:bg-slate-50/50 transition-all">
                      <div className="size-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 text-red-500">
                        <Paperclip className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs md:text-sm font-bold text-slate-800 block truncate">
                          {isRtl ? "دليل وسوم HTML5 الأساسية.pdf" : "HTML5 Tags Guide.pdf"}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 block">
                          2.4 MB - PDF
                        </span>
                      </div>
                      <button className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                        <X className="size-4" />
                      </button>
                    </div>

                    {/* MDN Web Docs Link */}
                    <div className="border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5 hover:bg-slate-50/50 transition-all">
                      <div className="size-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 text-brand-primary">
                        <Link2 className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs md:text-sm font-bold text-slate-800 block truncate">
                          MDN Web Docs - HTML Basics
                        </span>
                        <span className="text-[10px] font-semibold text-brand-primary block truncate">
                          developer.mozilla.org/html
                        </span>
                      </div>
                      <button className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Questions Tab High-Fidelity Mockup */}
              {activeTab === "questions" && (
                <div className="space-y-6">
                  <h3 className="text-sm md:text-base font-bold text-slate-800 border-b border-slate-50 pb-3">
                    {isRtl ? "أسئلة واستفسارات الطلاب حول الدرس" : "Student Questions about this Lesson"}
                  </h3>

                  <div className="space-y-4">
                    {/* Question Card */}
                    <div className="border border-slate-100 rounded-2xl p-5 space-y-4 bg-slate-50/20 hover:bg-slate-50/50 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-brand-primary font-bold text-xs">
                            {isRtl ? "خ" : "K"}
                          </div>
                          <div>
                            <span className="text-xs md:text-sm font-bold text-slate-800 block">
                              {isRtl ? "خالد محمود" : "Khaled Mahmoud"}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 block">
                              {isRtl ? "منذ يومين" : "2 days ago"}
                            </span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                          {isRtl ? "بانتظار الرد" : "Pending reply"}
                        </span>
                      </div>

                      <p className="text-xs md:text-sm font-semibold text-slate-600 leading-relaxed pl-12 rtl:pl-0 rtl:pr-12">
                        {isRtl
                          ? "هل يجب تضمين وسم header داخل body في جميع الصفحات، أم أنه اختياري؟"
                          : "Should I include the header tag inside the body tag on all pages, or is it optional?"}
                      </p>

                      {/* Reply area */}
                      <div className="pl-12 rtl:pl-0 rtl:pr-12 pt-2 flex gap-3">
                        <input
                          type="text"
                          placeholder={isRtl ? "اكتب ردك كمدرب هنا..." : "Write your trainer reply..."}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200/60 focus:border-brand-primary/40 focus:outline-hidden text-xs md:text-sm font-semibold text-slate-800 transition-all"
                        />
                        <button className="px-4 py-2.5 bg-brand-primary hover:bg-emerald-600 text-white rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer">
                          {isRtl ? "رد" : "Reply"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
