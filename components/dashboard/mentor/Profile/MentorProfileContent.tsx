"use client";

import React from "react";
import { useMentorProfile } from "@/hooks/mentor/useMentorProfile";
import { useMentorDashboard } from "@/hooks/mentor/useMentorDashboard";
import { MentorProfileHeader } from "./MentorProfileHeader";
import { MentorProfileStats } from "./MentorProfileStats";
import { MentorProfileInfo } from "./MentorProfileInfo";
import { MentorRecentSubmissions } from "./MentorRecentSubmissions";

export function MentorProfileContent() {
  const { mentor, loading: mentorLoading, error: mentorError } = useMentorProfile();
  const { dashboard, loading: dashLoading } = useMentorDashboard();

  const loading = mentorLoading || dashLoading;

  // ─── Error state ────────────────────────────────────────────────────────────
  if (mentorError && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <div className="size-16 rounded-3xl bg-red-50 flex items-center justify-center mb-2">
          <span className="text-3xl">⚠️</span>
        </div>
        <p className="text-red-500 font-semibold text-base">{mentorError}</p>
      </div>
    );
  }

  const submissions = dashboard?.last_task_submissions_count ?? [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0 animate-in fade-in duration-500">
      {/* ── Hero Header ─────────────────────────────────────────────────────────── */}
      <MentorProfileHeader mentor={mentor} loading={loading} />

      {/* ── Stats Row ──────────────────────────────────────────────────────────── */}
      <MentorProfileStats dashboard={dashboard} loading={loading} />

      {/* ── Two-column section ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Personal Info - 1 col */}
        <div className="lg:col-span-1">
          <MentorProfileInfo
            mentor={mentor}
            dashboard={dashboard}
            loading={loading}
          />
        </div>

        {/* Recent Submissions - 2 col */}
        <div className="lg:col-span-2">
          <MentorRecentSubmissions
            submissions={submissions}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
