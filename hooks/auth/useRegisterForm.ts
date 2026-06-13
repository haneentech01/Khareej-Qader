// "use client";

// import { useRouter } from "@/i18n/routing";
// import endpoints from "@/lib/api/endpoints";
// import { useInsertData } from "@/lib/hooks/useInsertData";
// import { RegisterFormData, RegisterResponse, ValidationErrors } from "@/types";
// import { useState } from "react";
// import { toast } from "react-toastify";

// export function useRegisterForm() {
//   const router = useRouter();

//   const [formData, setFormData] = useState<RegisterFormData>({
//     full_name: "",
//     email: "",
//     mobile_number: "",
//     country_iso: "",
//     gender: "",
//     university_name: "",
//     university_major: "",
//     course_id: "",
//   });

//   const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

//   const { loading, error, insertData } = useInsertData<RegisterResponse>(
//     endpoints.auth.student.register,
//   );

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({ ...prev, [name]: value }));

//     setFieldErrors((prev) => {
//       const updated = { ...prev };
//       delete updated[name];
//       return updated;
//     });
//   };

//   // ─── Handler للـ submit ───────────────────────
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setFieldErrors({});

//     const payload = {
//       ...formData,
//       course_id: formData.course_id ? [formData.course_id] : [],
//     };

//     const result = await insertData(payload);

//     if (result.success) {
//       toast.success(result.message || "تم تسجيل الحساب بنجاح");
//       router.push("/login");
//     } else {
//       // عرض أخطاء الحقول القادمة من الباك إند
//       if (Object.keys(result.validationErrors).length > 0) {
//         setFieldErrors(result.validationErrors);

//         // عرض أول خطأ كإشعار toast
//         const firstErrorKey = Object.keys(result.validationErrors)[0];
//         const firstErrorMsg = result.validationErrors[firstErrorKey]?.[0];
//         toast.error(firstErrorMsg || "يرجى التحقق من البيانات المدخلة");
//       } else if (result.message) {
//         toast.error(result.message);
//       } else {
//         toast.error("حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى");
//       }
//     }
//   };

//   return {
//     formData,
//     fieldErrors,
//     loading,
//     handleChange,
//     handleSubmit,
//   };
// }

"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useForm } from "../forms/useForm";
import { RegisterFormData, ValidationErrors } from "@/types";

// ─── قواعد الفحص المحلي ──────────────────────────
const validate = (values: RegisterFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.full_name.trim()) errors.full_name = ["Full name is required"];
  if (!values.email.trim()) errors.email = ["Email is required"];
  if (!values.mobile_number.trim())
    errors.mobile_number = ["Mobile number is required"];
  if (!values.country_iso) errors.country_iso = ["Country iso is required"];
  if (!values.gender) errors.gender = ["Gender is required"];
  if (!values.university_name)
    errors.university_name = ["University name is required"];
  if (!values.university_major)
    errors.university_major = ["University major is required"];
  if (!values.course_id) errors.course_id = ["Course id is required"];

  return errors;
};

// ─── تحويل البيانات قبل الإرسال ────────────────────
const formatPayload = (values: RegisterFormData) => ({
  ...values,
  course_id: values.course_id ? [values.course_id] : [],
});

export function useRegisterForm() {
  const router = useRouter();

  return useForm<RegisterFormData>({
    initialValues: {
      full_name: "",
      email: "",
      mobile_number: "",
      country_iso: "",
      gender: "",
      university_name: "",
      university_major: "",
      course_id: "",
    },

    endpoint: endpoints.auth.student.register,

    validate,
    formatPayload,

    successMessage: "تم تسجيل الحساب بنجاح",

    onSuccess: () => {
      router.push("/login");
    },
  });
}
