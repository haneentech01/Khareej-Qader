
import { SubmissionReviewContent } from "@/components/dashboard/mentor/Submissions/Submission/SubmissionReviewContent";
import { getTranslations } from "next-intl/server";

interface SubmissionReviewPageProps {
  params: Promise<{
    locale: string;
    submissionId: string;
  }>;
}

export async function generateMetadata({ params }: SubmissionReviewPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.mentor_dashboard.submissionDetails" });
  return {
    title: t("header.title"),
    description: t("header.description"),
  };
}

export default async function SubmissionReviewPage({ params }: SubmissionReviewPageProps) {
  const { submissionId } = await params;
  return <SubmissionReviewContent submissionId={submissionId} />;
}
