"use client";

import { AuthIllustration } from "./AuthIllustration";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F6FBFA]">
      {/* Mobile Logo (Visible only on mobile/tablet) */}
      <div className="lg:hidden absolute top-8 left-8">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Areisto Academy"
            width={100}
            height={50}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Form */}
      <div className="flex flex-col items-start justify-start 
      w-full lg:w-1/2 p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-[634px]">
          {children}
        </div>
      </div>

      {/* Illustration (Desktop Only) */}
      <AuthIllustration />
    </div>
  );
}
