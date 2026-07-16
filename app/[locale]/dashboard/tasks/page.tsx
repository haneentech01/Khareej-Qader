import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FileUpload } from "@/components/dashboard/students/Tasks/FileUpload";
import { PreviousTaskItem } from "@/components/dashboard/students/Tasks/PreviousTaskItem";
import { PageHeader } from "@/components/dashboard/Layout/PageHeader";
import StudentsTasksContent from "@/components/dashboard/students/Tasks/StudentsTasksContent";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.student_dashboard.tasks" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TasksPage({
  params,
}: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const { locale, id } = await params;
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

        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </div>

      <div>
        <StudentsTasksContent id={id} />
      </div>
    </div>
  );
}
