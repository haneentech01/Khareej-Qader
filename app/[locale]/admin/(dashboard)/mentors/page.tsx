import { MentorsContent } from "@/components/dashboard/admin/Mentors/MentorsContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin.mentors" });
  return {
    title: t("title"),
    description: t("subtitle")
  };
}

export default function AdminMentorsPage() {
  return <MentorsContent />;
}
