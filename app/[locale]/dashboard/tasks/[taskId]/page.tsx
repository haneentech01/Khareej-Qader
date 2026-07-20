import React from "react";
import { getTranslations } from "next-intl/server";
import { TaskDetailsContent } from "@/components/dashboard/students/Tasks/TaskDetails/TaskDetailsContent";

interface TaskDetailsPageProps {
  params: Promise<{
    locale: string;
    taskId: string;
  }>;
}

export async function generateMetadata({ params }: TaskDetailsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.student_dashboard.taskDetails" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TaskDetailsPage({
  params
}: TaskDetailsPageProps
) {
  const { taskId } = await params;

  return (
    <TaskDetailsContent taskId={taskId} />
  );
}
