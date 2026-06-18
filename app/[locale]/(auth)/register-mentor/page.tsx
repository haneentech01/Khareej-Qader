import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { MentorRegisterForm } from "@/components/auth/MentorRegisterFormWrapper";




export const metadata: Metadata = {
  title: "سجل كمدرب - خريج قادر",
};

export default function RegisterMentorPage() {
  const benefits = ["feature1", "feature2", "feature3", "feature4"];

  return (
    <AuthLayout
      illustrationImage="/images/signupMentorLogo.png"
      benefitsKeys={benefits}
      translationNamespace="MentorRegisterModal"
    >
      <MentorRegisterForm />
    </AuthLayout>
  );
}
