// "use client";
// import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
// import { ProfilePageLayout } from "../../profile";
// import { AdminDashboardHeader } from "./AdminDashboardHeader";
// import DashboardStats from "./DashboardStats";
// import QuickActions from "./QuickActions";
// import { PlatformOverview } from "./PlatformOverview";
// import RecentStudents from "./RecentStudents";
// import RecentMentors from "./RecentMentors";


// export function AdminDashboardContent() {
//   const {
//     stats,
//     recentStudents,
//     recentMentors,
//     loading,
//     error,
//     refetch,
//   } = useAdminDashboard();

//   return (
//     <ProfilePageLayout
//       loading={loading}
//       error={error}
//       onRetry={refetch}
//     >
//       <AdminDashboardHeader />

//       <DashboardStats stats={stats} />

//       <QuickActions />

//       <PlatformOverview stats={stats} />

//       <div className="grid lg:grid-cols-2 gap-6">
//         <RecentStudents students={recentStudents} />

//         <RecentMentors mentors={recentMentors} />
//       </div>
//     </ProfilePageLayout>
//   );
// }

"use client";

import { useTranslations } from "next-intl";
import { GraduationCap, Users, BookOpen, AlertCircle, Loader2 } from "lucide-react";
import { useAdminCounts } from "@/hooks/admin/useAdminCounts";
import { Button } from "@/components/ui/button";
import DashboardStats from "./DashboardStats";
import PlatformOverview from "./PlatformOverview";
import QuickActions from "./QuickActions";
import RecentStudents from "./RecentStudents";
import RecentMentors from "./RecentMentors";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";

/**
 * AdminDashboardContent — الصفحة الرئيسية للوحة الأدمن.
 *
 * ✅ تعرض نظرة عامة سريعة (counts) + روابط للأقسام.
 * ✅ تستخدم الـ hooks الموجودة (no separate stats endpoint needed).
 */
export function AdminDashboardContent() {
  const t = useTranslations("Admin.dashboard");
  const tCommon = useTranslations("Admin.common");
  const {
    studentsCount,
    mentorsCount,
    coursesCount,
    loading: countsLoading,
    error: countsError,
    refetch: refetchCounts,
  } = useAdminCounts();

  const {
    recentStudents,
    recentMentors,
    loading: dashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard,
  } = useAdminDashboard();

  const loading = countsLoading || dashboardLoading;
  const error = countsError || dashboardError;

  const refetch = () => {
    refetchCounts();
    refetchDashboard();
  };

  const statsCards = [
    {
      key: "students",
      label: t("stats.students"),
      value: studentsCount,
      icon: Users,
      color: "emerald",
      href: "/admin/students",
    },
    {
      key: "mentors",
      label: t("stats.mentors"),
      value: mentorsCount,
      icon: Users,
      color: "indigo",
      href: "/admin/mentors",
    },
    {
      key: "courses",
      label: t("stats.courses"),
      value: coursesCount,
      icon: BookOpen,
      color: "amber",
      href: "/admin/courses",
    },
  ];

  // ─── Error State ─────────────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="size-16 rounded-3xl bg-red-50 flex items-center justify-center">
            <AlertCircle className="size-8 text-red-500" />
          </div>
          <p className="text-red-500 font-semibold text-center max-w-md">
            {error}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-light cursor-pointer"
          >
            {tCommon("retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-black mb-2">
          {t("title")}
        </h1>
        <p className="text-brand-muted">{t("subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats statsCards={statsCards} loading={countsLoading} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Students + Recent Mentors */}
      <div className="grid lg:grid-cols-2 gap-6">
        {dashboardLoading ? (
          <>
            <div className="bg-white rounded-3xl border border-slate-100 p-6 h-64 flex items-center justify-center">
              <Loader2 className="size-8 animate-spin text-slate-300" />
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 p-6 h-64 flex items-center justify-center">
              <Loader2 className="size-8 animate-spin text-slate-300" />
            </div>
          </>
        ) : (
          <>
            <RecentStudents students={recentStudents} />
            <RecentMentors mentors={recentMentors} />
          </>
        )}
      </div>
    </div>
  );
}

