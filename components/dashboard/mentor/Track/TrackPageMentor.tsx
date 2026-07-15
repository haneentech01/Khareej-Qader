"use client";

import { useMemo, useState } from "react";
import { TrackLessonsTable } from "./TrackLessonsTable";
import { useMentorTrackCourses } from "@/hooks/mentor/useMentorTrackCourses";
import { MentorFilter } from "./TrackFilter";


export function TrackPageMentor() {
  const { courses, loading, error } = useMentorTrackCourses();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const q = searchQuery.trim().toLowerCase();
    return courses.filter((course) =>
      course.video_title.toLowerCase().includes(q),
    );
  }, [courses, searchQuery]);

  return (
    // <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0 animate-in fade-in duration-500">
    <div className="w-full flex flex-col gap-6 bg-white py-4 rounded-3xl">
      <MentorFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Lessons Table */}
      <TrackLessonsTable
        courses={filteredCourses}
        loading={loading}
        error={error} />
    </div>
    // </div>
  );
}
