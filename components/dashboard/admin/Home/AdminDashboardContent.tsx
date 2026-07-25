"use client";

import React, { useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Users, Users2, BookOpen } from "lucide-react";
import { useAdminCounts } from "@/hooks/admin/useAdminCounts";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import QuickActions from "./QuickActions";
import RecentStudents from "./RecentStudents";
import RecentMentors from "./RecentMentors";
import { ErrorState } from "../Layout";
import DashboardStats from "./DashboardStats";
import AdminDashboardHeader from "./AdminDashboardHeader";

export function AdminDashboardContent() {
  const t = useTranslations("Admin.dashboard");
  const tCommon = useTranslations("Admin.common");

  // ─── Data layer ──────────────────────────────────────────────
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

  // ─── Derived state ───────────────────────────────────────────
  const loading = countsLoading || dashboardLoading;
  const error = countsError || dashboardError;

  const refetch = useCallback(() => {
    refetchCounts();
    refetchDashboard();
  }, [refetchCounts, refetchDashboard]);

  const statsCards = useMemo(
    () => [
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
        icon: Users2,
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
    ],
    [t, studentsCount, mentorsCount, coursesCount],
  );

  // ─── Error State ─────────────────────────────────────────────
  if (error && !loading) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <AdminDashboardHeader />

      {/* ─── Stats Cards ────────────────────────────────────────── */}
      <DashboardStats statsCards={[...statsCards]} loading={countsLoading} />

      {/* ─── Quick Actions ──────────────────────────────────────── */}
      <QuickActions />

      {/* ─── Recent Students + Recent Mentors ───────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {dashboardLoading ? (
          <RecentListSkeleton />
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

export default AdminDashboardContent;

// ─── Loading Skeleton ──────────────────────
const RecentListSkeleton = React.memo(function RecentListSkeleton() {
  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-100 p-6 h-64 flex items-center justify-center animate-pulse">
        <div className="size-8 rounded-full bg-slate-100" />
      </div>
      <div className="bg-white rounded-3xl border border-slate-100 p-6 h-64 flex items-center justify-center animate-pulse">
        <div className="size-8 rounded-full bg-slate-100" />
      </div>
    </>
  );
});

RecentListSkeleton.displayName = "RecentListSkeleton";

