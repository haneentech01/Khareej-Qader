
import { TrackHeader } from "@/components/dashboard/mentor/Track/TrackHeader";
import { TrackPageMentor } from "@/components/dashboard/mentor/Track/TrackPageMentor";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getTranslations } from "next-intl/server";

interface MentorTrackPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: MentorTrackPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MentorTrack.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MentorTrackPage({ params }: MentorTrackPageProps) {
  const { locale } = await params;

  const t = await getTranslations("MentorTrack");
  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '/mentor/' },
    { label: t('breadcrumbs.track') },
  ];

  return (
    <>
      <div className="w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} locale={locale} />
        <TrackHeader />
      </div>

      <div className="mt-8">
        <TrackPageMentor />
      </div>
    </>
  );
}
