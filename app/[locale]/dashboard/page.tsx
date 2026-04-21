import { getTranslations } from "next-intl/server";
import { ProgressHero } from "@/components/dashboard/ProgressHero";
import { MentorCard } from "@/components/dashboard/MentorCard";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { Announcements } from "@/components/dashboard/Announcements";
import { CertificateCard } from "@/components/dashboard/CertificateCard";

export default async function DashboardPage() {
  const t = await getTranslations("Dashboard");

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Section: Progress Hero */}
      <ProgressHero
        userName="أحمد"
        trackName={t("hero.track_name")}
        currentLesson={t("hero.current_lesson")}
        progressValue={45}
        totalLessons={12}
        completedLessons={6}
      />

      {/* Middle Section: Mentor & Task */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MentorCard
          name={t("topNav.userName")}
          role={t("mentor.role")}
          bio={t("mentor.bio")}
          avatarUrl="https://github.com/shadcn.png"
        />
        <TaskCard
          title={t("tasks.title")}
          context={t("tasks.lesson_name")}
          deadline="25 أبريل"
        />
      </div>

      {/* Bottom Section: Announcements & Certificate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Announcements />
        </div>
        <div className="lg:col-span-1">
          <CertificateCard
            progressValue={70}
            totalSteps={17}
            completedSteps={12}
          />
        </div>
      </div>
    </div>
  );
}
