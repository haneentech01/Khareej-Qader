"use client";

import React from "react";
import { TrackHeader } from "./TrackHeader";
import { TrackLessonsTable } from "./TrackLessonsTable";
import { useMentorTrack } from "@/hooks/useMentorTrack";

export function TrackPageMentor() {
  const {
    lessons,
  } = useMentorTrack();

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0 animate-in fade-in duration-500">
      {/* Header with Breadcrumbs, Title and Description */}
      <TrackHeader />

      <div className="w-full flex flex-col gap-6 bg-white py-4 px-8 rounded-3xl">

        {/* Lessons Table */}
        <TrackLessonsTable lessons={lessons} />
      </div>
    </div>
  );
}
