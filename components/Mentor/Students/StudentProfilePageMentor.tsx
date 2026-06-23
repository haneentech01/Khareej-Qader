"use client";

import React from "react";
import { StudentProfileHeader } from "./StudentProfileHeader";
import { StudentProfileStats } from "./StudentProfileStats";
import { StudentPersonalInfo } from "./StudentPersonalInfo";
import { StudentSubmissionsTable } from "./StudentSubmissionsTable";
import { useMentorStudentProfile } from "@/hooks/useMentorStudentProfile";

interface StudentProfilePageMentorProps {
  studentId: string;
}

export function StudentProfilePageMentor({ studentId }: StudentProfilePageMentorProps) {
  const { student } = useMentorStudentProfile(studentId);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0 animate-in fade-in duration-500">
      {/* Student Profile Header & Hero */}
      <StudentProfileHeader student={student} />

      {/* Student Profile Stats Row */}
      <StudentProfileStats student={student} />

      {/* Two column details layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Right column: Personal Info (rendered first to be on the right in RTL layout) */}
        <div className="lg:col-span-1">
          <StudentPersonalInfo student={student} />
        </div>

        {/* Left column: Submissions Table */}
        <div className="lg:col-span-2">
          <StudentSubmissionsTable submissions={student.recentSubmissions} />
        </div>
      </div>
    </div>
  );
}
