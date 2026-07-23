import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCreateCourse } from "@/hooks/admin/useCreateCourse";
import type { CreateCoursePayload } from "@/types";

const INITIAL_FORM_STATE: CreateCoursePayload = {
  name: "",
  description: "",
  price: 0,
  youtube_playlist_url: "",
};

interface UseCreateCourseFormProps {
  onSuccess: () => void;
}

export function useCreateCourseForm({ onSuccess }: UseCreateCourseFormProps) {
  const t = useTranslations("Admin.courses");
  const { insertData, loading } = useCreateCourse();

  const [form, setForm] = useState<CreateCoursePayload>(INITIAL_FORM_STATE);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.description.trim()) {
      setError(t("create.name"));
      return;
    }

    const result = await insertData(form as unknown as Record<string, unknown>);

    if (result.success) {
      setForm(INITIAL_FORM_STATE);
      onSuccess();
    } else {
      setError(
        result.message ?? "An error occurred while creating the course.",
      );
    }
  };

  return {
    form,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
}
