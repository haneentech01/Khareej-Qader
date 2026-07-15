"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileSkeleton } from "./ProfileSkeleton";

interface ProfilePageLayoutProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  retryLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ProfilePageLayout({
  loading,
  error,
  onRetry,
  retryLabel = "إعادة المحاولة",
  children,
  className = "",
}: ProfilePageLayoutProps) {

  // ─── Loading ──────────────────────────────────
  if (loading) {
    return <ProfileSkeleton />;
  }

  // ─── Error ────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <div className="size-16 rounded-3xl bg-red-50 flex items-center justify-center">
          <AlertCircle className="size-8 text-red-500" />
        </div>
        <p className="text-red-500 font-semibold text-base text-center max-w-md">
          {error}
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-light cursor-pointer"
          >
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }

  // ─── No Data ──────────────────────────────────
  if (!children) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <p className="text-brand-muted text-base text-center">
          لا توجد بيانات لعرضها حاليًا.
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-light cursor-pointer"
          >
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }

  // ─── Content ──────────────────────────────────
  return (
    <div className={`max-w-7xl mx-auto space-y-8 pb-10 px-4 md:px-0 ${className}`}>
      {children}
    </div>
  );
}
