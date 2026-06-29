import MentorTasksContent from '@/components/mentor/Tasks/MenetorTasksContent'
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { getLocale, getTranslations } from "next-intl/server";

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
      <MentorTasksContent />
    </div>
  )
}
