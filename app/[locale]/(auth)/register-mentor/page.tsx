import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { MentorRegisterForm } from "@/components/sections/BecomeTrainer/MentorRegisterFormWrapper";

export const metadata: Metadata = {
  title: "سجل كمدرب - خريج قادر",
};

export default function RegisterMentorPage() {
  return (
    <AuthLayout>
      <MentorRegisterForm />
    </AuthLayout>
  );
}
