"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useInsertData } from "@/lib/hooks/useInsertData";
import { LoginFormData, RegisterResponse, ValidationErrors } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

export function useLoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    full_name: "",
  });

  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  const { loading, error, insertData } = useInsertData<RegisterResponse>(
    endpoints.auth.student.register,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  // ─── Handler للـ submit ───────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const payload = {
      ...formData,
    };

    const result = await insertData(payload);

    if (result.success) {
      toast.success(result.message || "تم تسجيل الحساب بنجاح");
      router.push("/login");
    } else {
      // عرض أخطاء الحقول القادمة من الباك إند
      if (Object.keys(result.validationErrors).length > 0) {
        setFieldErrors(result.validationErrors);

        // عرض أول خطأ كإشعار toast
        const firstErrorKey = Object.keys(result.validationErrors)[0];
        const firstErrorMsg = result.validationErrors[firstErrorKey]?.[0];
        toast.error(firstErrorMsg || "يرجى التحقق من البيانات المدخلة");
      } else if (result.message) {
        toast.error(result.message);
      } else {
        toast.error("حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى");
      }
    }
  };

  return {
    formData,
    fieldErrors,
    loading,
    handleChange,
    handleSubmit,
  };
}
