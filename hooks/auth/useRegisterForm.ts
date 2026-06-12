"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useInsertData } from "@/lib/hooks/useInsertData";
import { RegisterFormData, RegisterResponse, ValidationErrors } from "@/types";
import { useEffect, useState } from "react";

export function useRegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    full_name: "",
    email: "",
    mobile_number: "",
    country_iso: "",
    gender: "",
    university_name: "",
    university_major: "",
    course_id: "",
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

    setFieldErrors((prev) => ({ ...prev, [name]: [] }));
  };

  // ─── Handler للـ submit ───────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await insertData(formData);

    if (result) {
      router.push("/login");
    }
  };

  return {
    formData,
    fieldErrors,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
