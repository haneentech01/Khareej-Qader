import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CertificateProgressCard } from "@/components/dashboard/students/Certificates/CertificateProgressCard";
import { CertificatePreview } from "@/components/dashboard/students/Certificates/CertificatePreview";
import { CertificateDetails } from "@/components/dashboard/students/Certificates/CertificateDetails";
import { PageHeader } from "@/components/dashboard/Layout/PageHeader";

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard.CertificatesPage");

  const breadcrumbItems = [
    { label: t("breadcrumb_home"), href: "/dashboard" },
    { label: t("breadcrumb_certificate") },
  ];

  // Mock data for the UI demonstration
  const completionPercent: number = 70;
  const studentName = locale === "ar" ? "أحمد أحمد" : "Ahmed Ahmed";
  const issueDate = locale === "ar" ? "2024 أبريل 18" : "18 April 2024";
  const requirementsCompleted = t("progress_card.requirements_completed", {
    completed: 12,
    total: 17,
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col gap-3.5">
        <Breadcrumbs items={breadcrumbItems} locale={locale} />
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </div>

      {/* Progress Card */}
      <CertificateProgressCard
        title={t("progress_card.title")}
        requirementsCompleted={requirementsCompleted}
        percentCompletedText={locale === "ar" ? "مكتمل" : "completed"}
        currentCertificateLabel={t("progress_card.current_certificate")}
        trackName={t("progress_card.track_name")}
        trackDesc={t("progress_card.track_desc")}
        percent={completionPercent}
      />


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
        <div className="lg:col-span-2">
          <CertificateDetails
            title={t("details.title")}
            typeLabel={t("details.type_label")}
            typeValue={t("details.type_value")}
            trackLabel={t("details.track_label")}
            trackValue={t("details.track_value")}
            expectedDateLabel={t("details.expected_date_label")}
            expectedDate={issueDate}
            alertMessage={t("details.alert_message")}
            downloadBtnText={t("details.download_btn")}
            disabledHint={t("details.disabled_hint")}
            isUnlocked={completionPercent === 100}
          />
        </div>

        <div className="lg:col-span-3">
          <CertificatePreview
            academyName={t("preview.academy_name")}
            certificateType={t("preview.certificate_type")}
            trackName={t("progress_card.track_name")}
            certifyText={t("preview.certify_text")}
            studentName={studentName}
            completionText={t("preview.completion_text", {
              track: t("progress_card.track_name"),
              role: t("progress_card.track_role"),
            })}
            academicDirector={t("preview.academic_director")}
            directorName={t("preview.director_name")}
            issueDateLabel={t("preview.issue_date_label")}
            issueDate={issueDate}
          />
        </div>
      </div>
    </div>
  );
}
