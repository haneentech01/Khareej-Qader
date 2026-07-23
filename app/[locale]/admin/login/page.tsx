import { getTranslations } from "next-intl/server";
import { AdminLoginForm } from "@/components/dashboard/admin/Layout/Auth/AdminLoginForm";

interface AdminLoginPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: AdminLoginPageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Admin.metadata",
  });
  return {
    title: `${t("title")} — Admin Login`,
    description: t("description"),
  };
}

export default async function AdminLoginPage({ params }: AdminLoginPageProps) {
  await params;
  return (
    <AdminLoginForm />
  );
}
