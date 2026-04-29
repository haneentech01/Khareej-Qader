import { getTranslations } from "next-intl/server";
import { ProgressHero } from "@/components/dashboard/Home/ProgressHero";
import { MentorCard } from "@/components/dashboard/Home/MentorCard";
import { TaskCard } from "@/components/dashboard/Home/TaskCard";
import { Announcements } from "@/components/dashboard/Home/Announcements";
import { CertificateCard } from "@/components/dashboard/Home/CertificateCard";

export default async function DashboardPage() {
  const t = await getTranslations("Dashboard");

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 1. Top Section: Progress Hero */}
      <div>
        <ProgressHero
          userName="أحمد"
          trackName={t("hero.track_name")}
          currentLesson={t("hero.current_lesson")}
          progressValue={45}
          totalLessons={12}
          completedLessons={6}
        />
      </div>

      {/* 2. Middle Section: Mentor & Task */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TaskCard
          title={t("tasks.title")}
          context={t("tasks.lesson_name")}
          deadline="25 أبريل"
        />

        <MentorCard
          name={t("topNav.userName")}
          role={t("mentor.role")}
          bio={t("mentor.bio")}
          avatarUrl="https://github.com/shadcn.png"
        />
      </div>

      {/* 3. Bottom Section: Announcements & Certificate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <CertificateCard
          progressValue={70}
          completedSteps={12}
          totalSteps={17}
        />

        <Announcements />
      </div>
    </div>
  );
}
