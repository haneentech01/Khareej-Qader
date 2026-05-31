import { getTranslations } from "next-intl/server";
import { TrackPageClient } from "@/components/dashboard/Mentor/Track/TrackPageClient";

interface MentorTrackPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: MentorTrackPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MentorTrack.header" });
  const tMeta = await getTranslations({ locale, namespace: "Dashboard.metadata" });
  return {
    title: `${t("title")} - ${tMeta("title")}`,
  };
}

export default async function MentorTrackPage() {
  return <TrackPageClient />;
}
