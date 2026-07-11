import MentorTasksContent from '@/components/dashboard/mentor/Tasks/MenetorTasksContent'
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/dashboard/Layout/PageHeader";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.mentor_dashboard.tasks" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MentorTaskspage() {
  const t = await getTranslations("MentorTasks");
  const locale = await getLocale();

  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), href: '/mentor/' },
    { label: t('breadcrumbs.tasks'), href: '/mentor/tasks' },
  ];
  return (
    <div className="w-full space-y-8">
      <Breadcrumbs items={breadcrumbItems} locale={locale} />
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div>
        <MentorTasksContent />
      </div>
    </div>
  )
}
