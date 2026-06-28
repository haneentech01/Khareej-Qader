import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول - خريج قادر",
};

interface LoginPageProps {
  searchParams: Promise<{
    registered?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const showActivationMessage = params.registered === "true";

  return (
    <AuthLayout>
      <LoginForm showActivationMessage={showActivationMessage} />
    </AuthLayout>
  );
}