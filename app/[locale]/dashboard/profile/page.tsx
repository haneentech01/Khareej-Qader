import { getTranslations } from "next-intl/server";
import { User, GraduationCap, Info, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ProfileFieldSection, ProfileInputGroup } from "@/components/dashboard/ProfileFieldSection";
import { ProfileCVDisplay } from "@/components/dashboard/ProfileCVDisplay";

export default async function ProfilePage() {
  const t = await getTranslations("Dashboard.ProfilePage");

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Account Info Section */}
      <ProfileFieldSection title={t("account_info")} icon={User}>
        <ProfileInputGroup label={t("username")}>
          <Input 
            value="areisto_1023" 
            disabled 
            className="bg-[#F8FAFC] border-[#F1F5F9] text-brand-muted h-12 rounded-xl text-center"
          />
        </ProfileInputGroup>
      </ProfileFieldSection>

      {/* Personal Info Section */}
      <ProfileFieldSection title={t("personal_info")} icon={User}>
        <ProfileInputGroup label={t("full_name")}>
          <Input 
            defaultValue="أحمد محمد" 
            className="border-[#BCCAC3] h-12 rounded-xl"
          />
        </ProfileInputGroup>
        <ProfileInputGroup label={t("email")}>
          <Input 
            defaultValue="ahmed@example.com" 
            className="border-[#BCCAC3] h-12 rounded-xl"
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
                    className="bg-[#F8FAFC] border-[#F1F5F9] text-brand-muted h-12 rounded-xl pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-brand-muted" />
              </div>
            </ProfileInputGroup>
        </div>
      </ProfileFieldSection>

      {/* CV Section */}
      <ProfileCVDisplay />

      {/* Footer Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
        <div className="bg-[#F4F7F5] px-6 py-3 rounded-full flex items-center gap-2 text-brand-muted text-sm">
           <Info className="size-4" />
           {t("locked_info_hint")}
        </div>
        
        <Button className="bg-brand-base hover:bg-brand-hover text-white h-14 px-12 rounded-2xl font-bold text-lg">
          {t("save_btn")}
        </Button>
      </div>
    </div>
  );
}
