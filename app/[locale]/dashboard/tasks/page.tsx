import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FileUpload } from "@/components/dashboard/Tasks/FileUpload";
import { PreviousTaskItem } from "@/components/dashboard/PreviousTaskItem";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard.TasksPage");

  const breadcrumbItems = [
    { label: t("breadcrumb_home"), href: "/dashboard" },
    { label: t("breadcrumb_tasks") },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col gap-3.5">
        <Breadcrumbs items={breadcrumbItems} locale={locale} />
        <h1 className="text-4xl font-bold text-black">
          {t("title")}
        </h1>
        <p className="text-brand-muted text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Main Task Card */}
      <div className="bg-white rounded-[20px] p-8 shadow-xs border border-gray-50 relative overflow-hidden">
        <div className="flex flex-col gap-6">
          {/* task header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-black mb-3.5">
                {t("current_task.title")}
              </h2>
              <p className="text-brand-base font-medium flex items-center gap-1 text-sm">
                {t("current_task.related_lesson")}
              </p>
            </div>

            {/* deadline */}
            <span className="bg-transparent-red text-dark-red
             text-sm md:text-base font-semibold px-4 py-2.5 rounded-full">
              {t("current_task.deadline_prefix")}
            </span>
          </div>

          {/* task description */}
          <div className="bg-[#F8FAFC] rounded-[20px] text-base md:text-lg p-6 text-brand-muted leading-relaxed">
            {t("current_task.task_description")}
          </div>

          {/* upload file */}
          <FileUpload
            title={t("current_task.upload_title")}
            dropText={t("current_task.upload_drop")}
            hintText={t("current_task.upload_hint")}
            buttonText={t("current_task.upload_btn")}
          />

          <div className="flex flex-col gap-8 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-black">{t("current_task.status_label")}</span>
              <span className="bg-[#FEF3C7] text-[#D97706] text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                <AlertCircle className="size-4" />
                {t("current_task.status_pending")}
              </span>
            </div>

            <Button className="w-full md:w-[200px] bg-brand-base hover:bg-brand-hover text-white h-14 rounded-2xl font-bold text-lg self-center">
              {t("current_task.submit_btn")}
            </Button>
          </div>
        </div>
      </div>

      {/* Previous Tasks Section */}
      <div className="mt-12 space-y-6">
        <h3 className="text-3xl font-bold text-black">{t("previous_tasks.title")}</h3>

        <div className="space-y-4">
          <PreviousTaskItem
            title="تطبيق على CSS"
            date="18 أبريل"
            status="completed"
          />
          <PreviousTaskItem
            title="تطبيق على CSS"
            date="18 أبريل"
            status="completed"
          />
        </div>
      </div>
    </div>
  );
}
