"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAdminCourses } from "@/hooks/admin/useAdminCourses";
import { ProfilePageLayout } from "@/components/dashboard/profile";
import { CoursesHeader } from "./CoursesHeader";
import { CoursesTable } from "./CoursesTable";
import { CreateCourseDialog } from "./CreateCourseDialog";


export function CoursesContent() {
  const tCommon = useTranslations("Admin.common");

  const {
    courses,
    loading,
    error,
    refetch,
  } = useAdminCourses();

  const [open, setOpen] = useState(false);

  return (
    <ProfilePageLayout
      loading={loading}
      error={error}
      onRetry={refetch}
      retryLabel={tCommon("retry")}
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        <CoursesHeader onCreate={() => setOpen(true)} />

        <CoursesTable courses={courses} />

        <CreateCourseDialog
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </ProfilePageLayout>
  );
}
