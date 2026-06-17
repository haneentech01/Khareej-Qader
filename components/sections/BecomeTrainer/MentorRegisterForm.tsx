// "use client";

// import React, { useState } from "react";
// import { useTranslations } from "next-intl";
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Home,
//   Building2,
//   Globe,
//   LayoutGrid,
//   Users,
//   Briefcase,
//   DollarSign,
//   Clock,
//   Loader2,
//   Send,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";

// type ContributionType = "mentoring" | "jobs" | "financial";

// interface FormValues {
//   name: string;
//   email: string;
//   phoneCode: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   track: string;
//   contribution: ContributionType;
// }

// interface MentorRegisterFormProps {
//   onCancel: () => void;
//   onSuccess?: () => void;
// }

// export function MentorRegisterForm({ onCancel, onSuccess }: MentorRegisterFormProps) {
//   const t = useTranslations("MentorRegisterForm");

//   const [loading, setLoading] = useState(false);
//   const [values, setValues] = useState<FormValues>({
//     name: "",
//     email: "",
//     phoneCode: "+970",
//     phone: "",
//     address: "",
//     city: "",
//     country: "",
//     track: "",
//     contribution: "mentoring",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleContribution = (type: ContributionType) => {
//     setValues((prev) => ({ ...prev, contribution: type }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // simulate API call
//     await new Promise((r) => setTimeout(r, 1500));
//     setLoading(false);
//     onSuccess?.();
//   };

//   const inputClass =
//     "h-11 rounded-xl border-slate-200 bg-[#F9FAFB] text-sm placeholder:text-slate-400 focus-visible:ring-brand-primary/20 focus-visible:border-brand-primary/40 w-full";

//   const labelClass = "text-xs font-bold text-brand-dark-text mb-1 block";

//   const sectionHeaderClass =
//     "flex items-center gap-2 justify-end mb-4 pb-2 border-b border-dashed border-slate-200";

//   const contributionOptions: {
//     type: ContributionType;
//     icon: React.ReactNode;
//     label: string;
//     desc: string;
//     activeColor: string;
//     activeBorder: string;
//     activeBg: string;
//   }[] = [
//     {
//       type: "mentoring",
//       icon: <User className="size-6" />,
//       label: t("contrib_mentoring"),
//       desc: t("contrib_mentoring_desc"),
//       activeColor: "text-brand-primary",
//       activeBorder: "border-brand-primary",
//       activeBg: "bg-brand-light",
//     },
//     {
//       type: "jobs",
//       icon: <Briefcase className="size-6" />,
//       label: t("contrib_jobs"),
//       desc: t("contrib_jobs_desc"),
//       activeColor: "text-brand-primary",
//       activeBorder: "border-brand-primary",
//       activeBg: "bg-brand-light",
//     },
//     {
//       type: "financial",
//       icon: <DollarSign className="size-6" />,
//       label: t("contrib_financial"),
//       desc: t("contrib_financial_desc"),
//       activeColor: "text-brand-primary",
//       activeBorder: "border-brand-primary",
//       activeBg: "bg-brand-light",
//     },
//   ];

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-6 text-right"
//       dir="rtl"
//     >
//       {/* ── Section 1: Basic Info ── */}
//       <div>
//         <div className={sectionHeaderClass}>
//           <h3 className="text-sm font-bold text-brand-dark-text">{t("basic_info")}</h3>
//           <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
//             <User className="size-4 text-brand-primary" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Full Name */}
//           <div>
//             <label className={labelClass}>
//               {t("full_name")} <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <Input
//                 name="name"
//                 required
//                 value={values.name}
//                 onChange={handleChange}
//                 placeholder={t("full_name_placeholder")}
//                 className={cn(inputClass, "ps-10")}
//               />
//               <User className="absolute top-1/2 -translate-y-1/2 start-3 size-4 text-slate-400 pointer-events-none" />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className={labelClass}>
//               {t("email")} <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <Input
//                 name="email"
//                 type="email"
//                 required
//                 value={values.email}
//                 onChange={handleChange}
//                 placeholder={t("email_placeholder")}
//                 className={cn(inputClass, "ps-10")}
//                 dir="ltr"
//               />
//               <Mail className="absolute top-1/2 -translate-y-1/2 start-3 size-4 text-slate-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         {/* Phone */}
//         <div className="mt-4">
//           <label className={labelClass}>
//             {t("phone")} <span className="text-red-500">*</span>
//           </label>
//           <div className="flex gap-2" dir="ltr">
//             <select
//               name="phoneCode"
//               value={values.phoneCode}
//               onChange={handleChange}
//               className="h-11 px-2 bg-[#F9FAFB] border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer shrink-0"
//             >
//               <option value="+970">🇵🇸 +970</option>
//               <option value="+972">🇵🇸 +972</option>
//               <option value="+966">🇸🇦 +966</option>
//               <option value="+971">🇦🇪 +971</option>
//               <option value="+20">🇪🇬 +20</option>
//               <option value="+962">🇯🇴 +962</option>
//             </select>
//             <div className="relative flex-1">
//               <Input
//                 name="phone"
//                 required
//                 value={values.phone}
//                 onChange={handleChange}
//                 placeholder={t("phone_placeholder")}
//                 className={cn(inputClass, "ps-10")}
//                 dir="ltr"
//               />
//               <Phone className="absolute top-1/2 -translate-y-1/2 start-3 size-4 text-slate-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Section 2: Location Info ── */}
//       <div>
//         <div className={sectionHeaderClass}>
//           <h3 className="text-sm font-bold text-brand-dark-text">{t("location_info")}</h3>
//           <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
//             <MapPin className="size-4 text-brand-primary" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Address */}
//           <div>
//             <label className={labelClass}>
//               {t("address")} <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <Input
//                 name="address"
//                 required
//                 value={values.address}
//                 onChange={handleChange}
//                 placeholder={t("address_placeholder")}
//                 className={cn(inputClass, "ps-10")}
//               />
//               <Home className="absolute top-1/2 -translate-y-1/2 start-3 size-4 text-slate-400 pointer-events-none" />
//             </div>
//           </div>

//           {/* City */}
//           <div>
//             <label className={labelClass}>
//               {t("city")} <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <Input
//                 name="city"
//                 required
//                 value={values.city}
//                 onChange={handleChange}
//                 placeholder={t("city_placeholder")}
//                 className={cn(inputClass, "ps-10")}
//               />
//               <Building2 className="absolute top-1/2 -translate-y-1/2 start-3 size-4 text-slate-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         {/* Country */}
//         <div className="mt-4">
//           <label className={labelClass}>
//             {t("country")} <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               name="country"
//               required
//               value={values.country}
//               onChange={handleChange}
//               className={cn(
//                 "h-11 ps-10 pe-4 rounded-xl border border-slate-200 bg-[#F9FAFB] text-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/40 appearance-none cursor-pointer",
//                 values.country === "" ? "text-slate-400" : "text-brand-dark-text"
//               )}
//             >
//               <option value="" disabled>{t("country_placeholder")}</option>
//               <option value="ps">🇵🇸 فلسطين</option>
//               <option value="jo">🇯🇴 الأردن</option>
//               <option value="sa">🇸🇦 المملكة العربية السعودية</option>
//               <option value="ae">🇦🇪 الإمارات</option>
//               <option value="eg">🇪🇬 مصر</option>
//               <option value="kw">🇰🇼 الكويت</option>
//               <option value="other">{t("other")}</option>
//             </select>
//             <Globe className="absolute top-1/2 -translate-y-1/2 start-3 size-4 text-slate-400 pointer-events-none" />
//           </div>
//         </div>
//       </div>

//       {/* ── Section 3: Professional Info ── */}
//       <div>
//         <div className={sectionHeaderClass}>
//           <h3 className="text-sm font-bold text-brand-dark-text">{t("professional_info")}</h3>
//           <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
//             <Briefcase className="size-4 text-brand-primary" />
//           </div>
//         </div>

//         {/* Track */}
//         <div>
//           <label className={labelClass}>
//             {t("track")} <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               name="track"
//               required
//               value={values.track}
//               onChange={handleChange}
//               className={cn(
//                 "h-11 ps-10 pe-4 rounded-xl border border-slate-200 bg-[#F9FAFB] text-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/40 appearance-none cursor-pointer",
//                 values.track === "" ? "text-slate-400" : "text-brand-dark-text"
//               )}
//             >
//               <option value="" disabled>{t("track_placeholder")}</option>
//               <option value="web">{t("track_web")}</option>
//               <option value="uxui">{t("track_uxui")}</option>
//               <option value="marketing">{t("track_marketing")}</option>
//             </select>
//             <LayoutGrid className="absolute top-1/2 -translate-y-1/2 start-3 size-4 text-slate-400 pointer-events-none" />
//           </div>
//         </div>
//       </div>

//       {/* ── Section 4: Contribution Type ── */}
//       <div>
//         <div className={sectionHeaderClass}>
//           <h3 className="text-sm font-bold text-brand-dark-text">
//             {t("contribution_title")} <span className="text-red-500">*</span>
//           </h3>
//           <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
//             <Users className="size-4 text-brand-primary" />
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3">
//           {contributionOptions.map((opt) => {
//             const isActive = values.contribution === opt.type;
//             return (
//               <button
//                 key={opt.type}
//                 type="button"
//                 onClick={() => handleContribution(opt.type)}
//                 className={cn(
//                   "flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center",
//                   isActive
//                     ? `${opt.activeBorder} ${opt.activeBg} shadow-md`
//                     : "border-slate-200 bg-[#F9FAFB] hover:border-slate-300 hover:shadow-sm"
//                 )}
//               >
//                 <div
//                   className={cn(
//                     "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
//                     isActive ? `${opt.activeBg} ${opt.activeColor}` : "bg-slate-100 text-slate-400"
//                   )}
//                 >
//                   {opt.icon}
//                 </div>
//                 <p className={cn("text-xs font-bold leading-tight", isActive ? opt.activeColor : "text-brand-dark-text")}>
//                   {opt.label}
//                 </p>
//                 <p className="text-[10px] text-brand-muted leading-relaxed">
//                   {opt.desc}
//                 </p>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Review Notice ── */}
//       <div className="flex items-center gap-3 bg-[#F0FDF9] border border-brand-primary/20 rounded-2xl px-4 py-3">
//         <Clock className="size-4 text-brand-primary shrink-0" />
//         <p className="text-xs text-brand-muted leading-relaxed">
//           {t("review_notice")}
//         </p>
//       </div>

//       {/* ── Footer Buttons ── */}
//       <div className="grid grid-cols-2 gap-4 pt-1">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="h-12 rounded-2xl border-2 border-slate-200 bg-white text-brand-dark-text font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer"
//         >
//           {t("cancel")}
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="h-12 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
//         >
//           {loading ? (
//             <Loader2 className="size-4 animate-spin" />
//           ) : (
//             <>
//               <Send className="size-4" />
//               {t("submit")}
//             </>
//           )}
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { Country, Course, Major, University } from "@/types";
import { useRegisterForm } from "@/hooks/auth/useRegisterForm";

export function RegisterForm() {
  const t = useTranslations("Auth");

  // ─── Hook للتسجيل (POST) ──────────────────────
  const { formData, fieldErrors, loading, handleChange, handleSubmit } =
    useRegisterForm();

  // ─── Hook لجلب الدول (GET) ──────────────────────
  const { data: countries } = useGetData<Country[]>(
    endpoints.lookup.countries
  );

  const { data: universities } = useGetData<University[]>(
    endpoints.lookup.universities
  );

  const { data: majors } = useGetData<Major[]>(
    endpoints.lookup.majors
  );

  const { data: courses } = useGetData<Course[]>(
    endpoints.lookup.courses
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[10px] 
      shadow-[0_20px_40px_0x_#0000000D] 
      py-8 md:py-8 px-4 lg:px-11"
    >
      {/* title + subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          {t("register_title")}
        </h1>
        <p className="text-brand-muted text-base">
          {t("subtitle")}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* full name */}
        <div>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            placeholder={t("full_name")}
            className="h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required />

          {fieldErrors.full_name?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.full_name[0]}
            </p>
          )}
        </div>

        {/* email */}
        <div>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("email")}
            className="h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required />

          {fieldErrors.email?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* phone */}
        <div>
          <div className="flex gap-2">
            <div className="w-1/3 min-w-[120px]">
              <Select
                id="country_iso"
                name="country_iso"
                value={formData.country_iso}
                onChange={handleChange}
                required
                className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              >
                <option value="">{t("country")}</option>

                {Array.isArray(countries) &&
                  countries.map((country) => (
                    <option key={country.iso} value={country.iso}>
                      {country.countryCode}
                    </option>
                  ))}
              </Select>
            </div>

            <div className="flex-1">
              <Input
                id="mobile_number"
                name="mobile_number"
                type="tel"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder={t("phone")}
                className="h-12 ltr:text-left rtl:text-right focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                required />
            </div>
          </div>

          {fieldErrors.country_iso?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.country_iso[0]}
            </p>
          )}
          {fieldErrors.mobile_number?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.mobile_number[0]}
            </p>
          )}
        </div>


        {/* gender */}
        <div>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required
          >
            <option disabled value="">{t("gender")}</option>
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </Select>

          {fieldErrors.gender?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.gender[0]}
            </p>
          )}
        </div>

        {/* university */}
        <div>
          <Select
            id="university_name"
            name="university_name"
            value={formData.university_name}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required>
            <option value="" disabled>{t("university")}</option>
            {Array.isArray(universities) &&
              universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.un_name}
                </option>
              ))}
          </Select>
          {fieldErrors.university_name?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.university_name[0]}
            </p>
          )}
        </div>

        {/* major */}
        <div>
          <Select
            id="university_major"
            name="university_major"
            value={formData.university_major}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required
          >
            <option>{t("major")}</option>
            {Array.isArray(majors) &&
              majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
          </Select>
          {fieldErrors.university_major?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.university_major[0]}
            </p>
          )}
        </div>

        {/* training path */}
        <div>
          <Select
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none" required>
            <option value="" disabled>{t("training_path")}</option>
            {Array.isArray(courses) &&
              courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
          </Select>
          {fieldErrors.course_id?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.course_id[0]}
            </p>
          )}
        </div>

        {/* register button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-brand-primary hover:bg-brand-accent text-white text-lg font-bold rounded-lg shadow-lg shadow-brand-primary/20 transition-all"
        >
          {loading
            ? <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            : t("register_btn")}
        </Button>

        {/* already have an account */}
        <div className="text-center">
          <p className="text-sm text-brand-muted">
            {t("has_account")}{" "}
            <Link href="/login" className="text-brand-primary font-bold hover:underline">
              {t("login_title")}
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

