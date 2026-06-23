import React from "react";
import { getTranslations } from "next-intl/server";
import { SubmissionsPageMentor } from "@/components/Mentor/Submissions/List/SubmissionsPageMentor";

interface MentorSubmissionsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: MentorSubmissionsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MentorSubmissionsList.header" });
  const tMeta = await getTranslations({ locale, namespace: "Dashboard.metadata" });
  return {
    title: `${t("title")} - ${tMeta("title")}`,
  };
}

export default async function MentorSubmissionsPage() {
  return <SubmissionsPageMentor />;
}
