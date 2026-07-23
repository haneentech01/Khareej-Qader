"use client";

import { AuthIllustration } from "./AuthIllustration";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  illustrationImage?: string;
  benefitsKeys?: string[];
  translationNamespace?: string;
}

export function AuthLayout({
  children,
  illustrationImage,
  benefitsKeys,
  translationNamespace,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F6FBFA]">
      {/* Mobile Logo (Visible only on mobile/tablet) */}
      <div className="lg:hidden absolute top-8 -left-3 md:left-3 md:top-14">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Areisto Academy"
            width={90}
            height={40}
            className="object-contain w-37.5 h-15 md:w-56 md:h-24"
          />
        </Link>
      </div>

      {/* Form */}
      <div className="flex flex-col items-center lg:items-start justify-start 
      w-full lg:w-1/2 p-6 md:p-12 overflow-y-auto">
        <div className="w-full lg:max-w-158.5">
          {children}
        </div>
      </div>

      {/* Illustration (Desktop Only) */}
      <AuthIllustration
        imageSrc={illustrationImage}
        benefits={benefitsKeys}
        translationNamespace={translationNamespace}
      />
    </div>
  );
}

