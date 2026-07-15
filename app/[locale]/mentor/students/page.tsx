import MentorStudentsContent from '@/components/dashboard/mentor/Students/MentorStudentsContent'
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/dashboard/Layout/PageHeader";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.mentor_dashboard.students" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MentorStudentsPage() {
  const t = await getTranslations("MentorStudents");
  const locale = await getLocale();

  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), href: '/mentor' },
    { label: t('breadcrumbs.students') },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col">
        <Breadcrumbs items={breadcrumbItems} locale={locale} />
        <PageHeader
          title={t('header.title')}
          subtitle={t('header.subtitle')}
        />
      </div>


      <div>
        <MentorStudentsContent />
      </div>
    </div>
  );
}
