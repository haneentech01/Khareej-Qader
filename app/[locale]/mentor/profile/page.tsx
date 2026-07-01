import { MentorProfileContent } from "@/components/mentor/Profile/MentorProfileContent";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "MentorProfilePage.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

interface MentorProfilePageProps {
  params: Promise<{ locale: string }>;
}

export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
  await params;
  return (
    <div>
      <MentorProfileContent />
    </div>
  );
}
