import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Metadata } from "next";

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
    namespace: "Auth.Metadata",
  });

  return {
    title: t("title_register"),
    description: t("subtitle"),
  };
}

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
