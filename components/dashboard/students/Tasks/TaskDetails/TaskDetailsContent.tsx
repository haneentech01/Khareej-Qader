"use client";

import { useLocale, useTranslations } from "next-intl";
import { ProfilePageLayout } from "@/components/dashboard/profile";
import { useSubmitTask } from "@/hooks/dashboard/useSubmitTask";
import { useStudentTask } from "@/hooks/dashboard/useStudentTask";
import { TaskSubmissionForm } from "./TaskSubmissionForm";
import { TaskDetailsView } from "./TaskDetailsView";

interface TaskDetailsContentProps {
    taskId: string;
}

export function TaskDetailsContent({ taskId }: TaskDetailsContentProps) {
    const t = useTranslations("Dashboard.TaskDetailsPage");

    const { task, submission, status, loading, error, refetch } = useStudentTask(taskId);

    const { submitTask, loading: isSubmitting, error: submitError, reset } = useSubmitTask();

    const handleSubmission = async (id: string, file: File): Promise<boolean> => {
        const result = await submitTask(id, file);
        return result.success;
    };

    const viewStatus = status === "reviewed" ? "completed" : status;

    const uploadedFiles = submission?.file
        ? [{ name: submission.file.split('/').pop() || "file", size: "", type: "ZIP", url: submission.file }]
        : [];

    // 5. Render Layer
    return (
        <ProfilePageLayout loading={loading} error={error} onRetry={refetch} retryLabel={t("retry")}>
            {task && (
                <div className="max-w-7xl mx-auto px-4 md:px-0 pb-12">
                    {status === "not_submitted" && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <TaskSubmissionForm
                                taskId={taskId}
                                onSubmit={handleSubmission}
                                isSubmitting={isSubmitting}
                                submitError={submitError}
                                onResetState={reset}
                            />
                        </div>
                    )}

                    {status !== "not_submitted" && (
                        <TaskDetailsView
                            id={task.video?.id?.toString() || ""}
                            status={viewStatus as "completed" | "pending"}
                            title={task.title}
                            subtitle={task.video?.title || ""}
                            switcherCompleted={t("switcher_completed")}
                            switcherPending={t("switcher_pending")}
                            submission={submission}
                            uploadedFiles={uploadedFiles}
                        />
                    )}
                </div>
            )}
        </ProfilePageLayout>
    );
}