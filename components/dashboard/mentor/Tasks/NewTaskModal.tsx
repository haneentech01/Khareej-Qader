"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTask } from "@/hooks/mentor/useCreateTask";
import { CreateTaskPayload } from "@/types";
import { useMentorCourses } from "@/hooks/mentor/useMentorCourses";

interface NewTaskModalProps {
  onSuccess?: () => void;
}

export const NewTaskModal = ({ onSuccess }: NewTaskModalProps) => {
  const t = useTranslations("MentorTasks.newTaskModal");

  // ─── Data sources ──────────────────────────
  const { courses, loading: coursesLoading } = useMentorCourses();
  const { loading: creating, createTask } = useCreateTask();

  // ─── Local form state ──────────────────────
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [passingGrade, setPassingGrade] = useState<number>(80);
  const [error, setError] = useState<string | null>(null);

  // ─── Form validation + submit ──────────────
  const validateForm = (): string | null => {
    if (!title.trim()) {
      return t("error_title_required", { defaultValue: "عنوان المهمة مطلوب" });
    }
    if (!videoId) {
      return t("error_lesson_required", { defaultValue: "الرجاء اختيار الدرس المرتبط" });
    }
    if (!deadLine) {
      return t("error_deadline_required", { defaultValue: "الرجاء تحديد موعد التسليم" });
    }
    return null;
  };

  const resetForm = () => {
    setTitle("");
    setVideoId("");
    setDescription("");
    setDeadLine("");
    setPassingGrade(80);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const deadLineIso = new Date(deadLine).toISOString();

    const payload: CreateTaskPayload = {
      video_id: Number(videoId),
      title: title.trim(),
      description: description.trim(),
      dead_line: deadLineIso,
      passing_grade: passingGrade,
    };

    const result = await createTask(payload);

    if (result.success) {
      resetForm();
      setOpen(false);
      onSuccess?.();
    } else {
      setError(
        result.message ||
        t("error_generic", { defaultValue: "حدث خطأ غير متوقع" }),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* New Task Button */}
      <DialogTrigger asChild>
        <Button className="cursor-pointer py-5 px-5 bg-brand-primary hover:bg-brand-base text-white">
          <Plus className="w-4 h-4" />
          {t("title")}
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Header */}
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-4">
                <span className="p-2 bg-green-50 text-brand-primary rounded-lg">
                  <Plus className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <DialogTitle className="text-xl font-bold text-black mb-1">
                    {t("title")}
                  </DialogTitle>
                  <DialogDescription className="text-brand-muted text-xs">
                    {t("subtitle")}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Row 1: Title and Lesson */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Task title */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-muted mb-3 block">
                    {t("task_title")} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder={t("task_title_placeholder")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-11 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                {/* Related lesson — filled from /videos/mentor/course */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-muted mb-3 block">
                    {t("related_lesson")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={videoId}
                    onChange={(e) =>
                      setVideoId(e.target.value ? Number(e.target.value) : "")
                    }
                    disabled={coursesLoading}
                    className="flex h-11 w-full rounded-md px-2
                    border border-input text-sm
                    focus:outline-none
                    focus:ring-0
                    focus:ring-offset-0
                    disabled:cursor-not-allowed
                    disabled:opacity-60 bg-white"
                  >
                    <option value="" disabled>
                      {coursesLoading
                        ? t("loading_lessons", { defaultValue: "جاري تحميل الدروس..." })
                        : t("related_lesson_placeholder")}
                    </option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.video_title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-muted mb-3 block">
                  {t("description")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md
                    border border-input
                    px-3 py-2 text-sm
                    focus:outline-none
                    focus:ring-0
                    focus:ring-offset-0
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    resize-none"
                    placeholder={t("description_placeholder")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={1000}
                  />
                  <span className="absolute bottom-2 left-2 text-xs text-gray-400">
                    {description.length}/1000
                  </span>
                </div>
              </div>

              {/* Row 2: Deadline + Passing Grade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-muted mb-3 block">
                    {t("due_date")} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={deadLine}
                    onChange={(e) => setDeadLine(e.target.value)}
                    className="flex h-11 w-full rounded-md
                    border border-input
                    px-2 py-2 text-sm
                    focus:outline-none
                    focus:ring-0
                    focus:ring-offset-0
                    disabled:cursor-not-allowed
                    disabled:opacity-50"
                    placeholder={t("due_date_placeholder")}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-muted mb-3 block">
                    {t("passing_grade", { defaultValue: "درجة النجاح" })}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={passingGrade}
                    onChange={(e) => setPassingGrade(Number(e.target.value))}
                    className="flex h-11 w-full rounded-md
                    border border-input
                    px-2 py-2 text-sm
                    focus:outline-none
                    focus:ring-0
                    focus:ring-offset-0
                    disabled:cursor-not-allowed
                    disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Error feedback */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="p-6 border-t bg-gray-50 sm:justify-end gap-2 flex-row justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto cursor-pointer"
                disabled={creating}
              >
                {t("cancel")}
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={creating}
              className="cursor-pointer w-full sm:w-auto
              bg-brand-primary hover:bg-brand-base text-white
              disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("submitting", { defaultValue: "جاري الإنشاء..." })}
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
