"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useInsertData } from "@/lib/hooks/useInsertData";
import { ValidationErrors } from "@/types";

interface useFormConfig<T extends Record<string, unknown>> {
  initialValues: T;
  endpoint: string;
  validate: (values: T) => ValidationErrors;
  formatPayload?: (values: T) => Record<string, unknown> | FormData;
  successMessage?: string;
  onSuccess?: (data: unknown) => void;
  onError?: (errors: ValidationErrors, message: string) => void;
}

export function useForm<T extends Record<string, unknown>>(
  config: useFormConfig<T>,
) {
  const {
    initialValues,
    endpoint,
    validate,
    formatPayload,
    successMessage = "تمت العملية بنجاح",
    onSuccess,
    onError,
  } = config;

  const [formData, setFormData] = useState<T>(initialValues);

  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  const { loading, insertData } = useInsertData(endpoint);

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

  const extractBackendErrors = (
    data: Record<string, unknown> | null,
  ): ValidationErrors => {
    if (!data?.errors) return {};

    const errors = data.errors;
    if (typeof errors === "object" && !Array.isArray(errors)) {
      return errors as ValidationErrors;
    }

    return {};
  };

  // ─── إرسال الفورم ─────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    // 1) فحص محلي
    const localErrors = validate(formData);
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      const firstKey = Object.keys(localErrors)[0];
      toast.error(
        localErrors[firstKey]?.[0] || "يرجى ملء جميع الحقول المطلوبة",
      );
      return;
    }

    // 2) تحويل البيانات إن لزم
    const payload = formatPayload
      ? formatPayload(formData)
      : (formData as unknown as Record<string, unknown>);

    // 3) إرسال للباك
    const result = await insertData(payload);

    if (result.success) {
      // نجاح
      const message =
        ((result.data as Record<string, unknown>)?.message as string) ||
        successMessage;
      toast.success(message);
      onSuccess?.(result.data);
    } else {
      //  فشل
      const backendErrors = extractBackendErrors(result.data);

      if (Object.keys(backendErrors).length > 0) {
        setFieldErrors(backendErrors);
        const firstKey = Object.keys(backendErrors)[0];
        const firstErrorMsg = backendErrors[firstKey]?.[0] || result.message;
        toast.error(firstErrorMsg);
        onError?.(backendErrors, result.message);
      } else {
        toast.error(result.message);
        onError?.({}, result.message);
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
