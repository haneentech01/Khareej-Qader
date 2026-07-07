import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { SubmissionsPageMentor } from "@/components/dashboard/mentor/Submissions/List/SubmissionsPageMentor";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/dashboard/Layout/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.mentor_dashboard.submissions" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MentorSubmissionsPage() {
  const t = await getTranslations("MentorSubmissions");
  const locale = await getLocale();

  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), href: '/mentor' },
    { label: t('breadcrumbs.submissions') },
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
        <SubmissionsPageMentor />
      </div>
    </div>
  );
}
