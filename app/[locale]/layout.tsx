import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { getTranslations } from "next-intl/server";
import { ToastContainer, toast } from 'react-toastify';
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RootMetadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${cairo.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Ahrefs analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="YVab7IUpJ7GpncxdfJ66Kg"
          strategy="lazyOnload"
        />
      </head>


      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
          <ScrollToTopButton />
        </NextIntlClientProvider>

        {/* Toast هون يشتغل على كل الصفحات */}
        <ToastContainer
          position={locale === 'ar' ? 'top-left' : 'top-right'}
          rtl={locale === 'ar'}
          autoClose={4000}
          hideProgressBar={false}
          theme="light"
        />
      </body>
    </html>
  );
}
