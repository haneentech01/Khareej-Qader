import { StudentsContent } from "@/components/dashboard/admin/Students/StudentsContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin.students" });
  return {
    title: t("title"),
    description: t("subtitle")
  };
}

export default function AdminStudentsPage() {
  return <StudentsContent />;
}

