import React from "react";
import { getTranslations } from "next-intl/server";
import { TaskDetailsView } from "@/components/dashboard/students/Tasks/TaskDetails/TaskDetailsView";
import { TaskDetailsPageProps } from "@/types";

export default async function TaskDetailsPage({
  params,
  searchParams,
}: TaskDetailsPageProps
) {
  const { locale, taskId } = await params;
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams.status === "pending" ? "pending" : "completed";
  const t = await getTranslations("Dashboard.TaskDetailsPage");

  const breadcrumbItems = [
    { label: t("breadcrumb_home"), href: "/dashboard" },
    { label: t("breadcrumb_tasks"), href: "/dashboard/tasks" },
    { label: t("breadcrumb_task_title") },
  ];

  return (
    <TaskDetailsView
      id={taskId}
      locale={locale}
      status={status}
      title={t("title")}
      subtitle={t("subtitle")}
      breadcrumbItems={breadcrumbItems}
      switcherCompleted={t("review_status_completed")}
      switcherPending={t("review_status_waiting")}
    />
  );
}
