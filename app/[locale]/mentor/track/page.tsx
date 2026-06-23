import { getTranslations } from "next-intl/server";
import { TrackPageMentor } from "@/components/Mentor/Track/TrackPageMentor";

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
  return <TrackPageMentor />;
}
