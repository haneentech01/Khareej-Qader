import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { User, GraduationCap, Info, Lock, UserCog, CloudUpload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ProfileFieldSection, ProfileInputGroup } from "@/components/dashboard/Profile/ProfileFieldSection";
import { ProfileCVDisplay } from "@/components/dashboard/Profile/ProfileCVDisplay";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === "ar";
  const t = await getTranslations("Dashboard.ProfilePage");
  const breadcrumbItems = [
    { label: t("breadcrumb_home"), href: "/dashboard" },
    { label: t("breadcrumb_profile") },
  ];
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col gap-3.5">
        <Breadcrumbs items={breadcrumbItems} locale={locale} />
        <h1 className="text-4xl font-bold text-black">
          {t("title")}
        </h1>
        <p className="text-brand-muted text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Account Info Section */}
      <ProfileFieldSection title={t("account_info")} icon={UserCog}>
        <ProfileInputGroup label={t("username")}>
          <Input
            type="text"
            defaultValue="areisto_1023"
            className="bg-[#F8F8F8] text-[#191C1B] font-medium h-12 rounded-[10px]"
          />
        </ProfileInputGroup>

        <ProfileInputGroup label={t("avatar")}>
          <div className="relative">
            <CloudUpload className="size-6 text-brand-primary absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
            <label className={cn(
              "flex items-center justify-start cursor-pointer",
              "bg-[#F8F8F8] text-[#191C1B] font-medium h-12 rounded-[10px] border",
              isRtl ? "pr-11" : "pl-11"
            )}>
              <span className="text-[#8C8D8D] text-sm md:text-base">
                {t("avatar_hint")}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </ProfileInputGroup>
      </ProfileFieldSection>

      {/* Personal Info Section */}
      <ProfileFieldSection title={t("personal_info")} icon={User}>
        <ProfileInputGroup label={t("full_name")}>
          <Input
            defaultValue="أحمد محمد"
            className="border-[#BCCAC3] h-12 rounded-xl focus:ring-0 focus:outline-brand-base"
          />
        </ProfileInputGroup>
        <ProfileInputGroup label={t("email")}>
          <Input
            defaultValue="ahmed@example.com"
            className="border-[#BCCAC3] h-12 rounded-xl focus:ring-0 focus:outline-brand-base"
          />
        </ProfileInputGroup>
        <ProfileInputGroup label={t("phone")}>
          <Input
            defaultValue="+970 50 123 4567"
            className="border-[#BCCAC3] h-12 rounded-xl"
          />
        </ProfileInputGroup>
        <ProfileInputGroup label={t("gender")}>
          <Select defaultValue="male">
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </Select>
        </ProfileInputGroup>
      </ProfileFieldSection>

      {/* Educational Info Section */}
      <ProfileFieldSection title={t("edu_info")} icon={GraduationCap}>
        <ProfileInputGroup label={t("university")}>
          <Select defaultValue="azhar">
            <option value="azhar">جامعة الأزهر</option>
            <option value="islamic">الجامعة الإسلامية</option>
          </Select>
        </ProfileInputGroup>
        <ProfileInputGroup label={t("major")}>
          <Select defaultValue="cs">
            <option value="cs">هندسة حاسوب</option>
            <option value="it">تكنولوجيا المعلومات</option>
          </Select>
        </ProfileInputGroup>
        <div className="md:col-span-2">
          <ProfileInputGroup label={t("training_path")}>
            <div className="relative">
              <Input
                value="تطوير الويب"
                disabled
                className={`bg-[#F8FAFC] border-[#F1F5F9] text-black h-12 rounded-xl 
                  ${isRtl ? "pr-10" : "pl-10"}`}
              />
              <Lock className={`absolute 
                ${isRtl ? "right-3" : "left-3"} 
                top-1/2 -translate-y-1/2 
                size-4 text-brand-muted`} />
            </div>
          </ProfileInputGroup>
        </div>
      </ProfileFieldSection>

      {/* CV Section */}
      <ProfileCVDisplay />

      {/* Footer Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
        <div className="bg-[#BCCAC31A] px-8 py-3 rounded-full 
          flex items-center gap-2 text-brand-muted
          text-sm">
          <Info className="size-4 text-brand-primary" />
          {t("locked_info_hint")}
        </div>

        <Button className="bg-brand-primary hover:bg-brand-hover/90 cursor-pointer
         text-white h-14 px-12 rounded-[10px] font-bold text-lg">
          {t("save_btn")}
        </Button>
      </div>
    </div>
  );
}
