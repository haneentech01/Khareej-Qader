"use client";

import { useState, ChangeEvent, FormEvent, DragEvent } from "react";

export interface TrainerFormValues {
  name: string;
  email: string;
  phoneCode: string;
  phone: string;
  specialization: string;
  country: string;
  portfolio: string;
  aboutMe: string;
  password: string;
  agreed: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  specialization?: string;
  country?: string;
  profilePicture?: string;
  password?: string;
  agreed?: string;
  general?: string;
}

export function useTrainerForm(t: (key: string, values?: Record<string, unknown>) => string) {
  const [values, setValues] = useState<TrainerFormValues>({
    name: "",
    email: "",
    phoneCode: "+970",
    phone: "",
    specialization: "",
    country: "",
    portfolio: "",
    aboutMe: "",
    password: "",
    agreed: false,
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Clear field-specific error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateFile = (file: File): boolean => {
    setErrors((prev) => ({ ...prev, profilePicture: undefined }));

    // Type validation
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        profilePicture: t("email_invalid_error"), // fallbacks are handled or generic
      }));
      return false;
    }

    // Size validation (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        profilePicture: "Max size is 5MB",
      }));
      return false;
    }

    return true;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setProfilePicture(file);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setProfilePicture(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!values.name.trim()) {
      tempErrors.name = t("required_fields_error");
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
      tempErrors.email = t("required_fields_error");
      isValid = false;
    } else if (!emailRegex.test(values.email)) {
      tempErrors.email = t("email_invalid_error");
      isValid = false;
    }

    if (!values.phone.trim()) {
      tempErrors.phone = t("required_fields_error");
      isValid = false;
    }

    if (!values.specialization.trim()) {
      tempErrors.specialization = t("required_fields_error");
      isValid = false;
    }

    if (!values.country.trim()) {
      tempErrors.country = t("required_fields_error");
      isValid = false;
    }

    if (!values.password) {
      tempErrors.password = t("required_fields_error");
      isValid = false;
    } else if (values.password.length < 8) {
      tempErrors.password = t("password_length_error");
      isValid = false;
    }

    if (!values.agreed) {
      tempErrors.agreed = t("required_fields_error");
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Simulate API registration request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err: unknown) {
      setErrors({ general: (err as { message?: string })?.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setValues({
      name: "",
      email: "",
      phoneCode: "+970",
      phone: "",
      specialization: "",
      country: "",
      portfolio: "",
      aboutMe: "",
      password: "",
      agreed: false,
    });
    setProfilePicture(null);
    setSuccess(false);
    setErrors({});
  };

  return {
    values,
    profilePicture,
    showPassword,
    errors,
    loading,
    success,
    isDragActive,
    setShowPassword,
    handleInputChange,
    handleFileChange,
    handleDrag,
    handleDrop,
    removeProfilePicture,
    handleSubmit,
    resetForm,
  };
}
