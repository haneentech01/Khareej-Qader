import { AuthLayout } from "@/components/auth/AuthLayout";
import { MentorRegisterForm } from "@/components/auth/MentorRegisterForm";
import { getTranslations } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;

  const t = await getTranslations({
    locale,
    namespace: "BecomeTrainer.Metadata",
  });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function RegisterMentorPage() {
  const benefits = ["feature1", "feature2", "feature3", "feature4"];

  return (
    <AuthLayout
      illustrationImage="/images/signupMentorLogo.png"
      benefitsKeys={benefits}
      translationNamespace="MentorRegisterModal"
    >
      <MentorRegisterForm />
    </AuthLayout>
  );
}
