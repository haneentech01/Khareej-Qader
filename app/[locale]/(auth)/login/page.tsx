import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Auth.Metadata",
  });

  return {
    title: t("title_login"),
    description: t("subtitle"),
  };
}

interface LoginPageProps {
  searchParams: Promise<{
    registered?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const showActivationMessage = params.registered === "true";

  return (
    <AuthLayout>
      <LoginForm showActivationMessage={showActivationMessage} />
    </AuthLayout>
  );
}