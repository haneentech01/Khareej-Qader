import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
     <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

/**
 * Footer component providing site navigation, contact information,
 * and social media links with a high-end branding consistent with the landing page.
 */
export function Footer() {
  const t = useTranslations("Footer");
  const h = useTranslations("Header");

  const socialLinks = [
    { icon: FacebookIcon, href: "#" },
    { icon: TwitterIcon, href: "#" },
    { icon: InstagramIcon, href: "#" },
    { icon: LinkedinIcon, href: "#" },
  ];

  const quickLinks = [
    { label: h("home"), href: "/" },
    { label: h("program"), href: "#program" },
    { label: h("tracks"), href: "#tracks" },
    { label: h("success_stories"), href: "#success-stories" },
  ];

  const legalLinks = [
    { label: h("gallery"), href: "#gallery" },
    { label: h("faq"), href: "#faq" },
  ];

  return (
    <footer className="pt-20 pb-10 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 mb-20 md:mb-24 px-4 lg:px-0">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-8 max-w-sm">
             <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95">
               <Image src="/images/logo.png" alt="Khareej Qader" width={180} height={60} className="w-auto h-12 md:h-14 lg:h-16" />
             </Link>
             <p className="text-[#64748B] text-lg lg:text-xl leading-relaxed">
               {t("description")}
             </p>
             <div className="flex gap-4">
                 {socialLinks.map((social, i) => {
                   const Icon = social.icon;
                   return (
                     <a key={i} href={social.href} className="size-12 md:size-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 hover:bg-brand-primary hover:text-white transition-all transform hover:-translate-y-1">
                        <Icon className="size-6 md:size-7" />
                     </a>
                   );
                 })}
             </div>
          </div>

          {/* Quick Links Column */}
          <div>
             <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 border-r-4 border-brand-primary pr-4">
                {t("quick_links")}
             </h4>
             <ul className="flex flex-col gap-5">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-[#64748B] text-lg md:text-xl hover:text-brand-primary hover:translate-x-3 transition-all inline-block font-medium">
                       {link.label}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          {/* More Links Column */}
          <div>
             <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 border-r-4 border-brand-primary pr-4 opacity-0 md:opacity-100">
                &nbsp;
             </h4>
             <ul className="flex flex-col gap-5">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-[#64748B] text-lg md:text-xl hover:text-brand-primary hover:translate-x-3 transition-all inline-block font-medium">
                       {link.label}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          {/* Contact Column */}
          <div>
             <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 border-r-4 border-brand-primary pr-4">
                {t("contact_us")}
             </h4>
             <ul className="flex flex-col gap-7">
                <li className="flex items-start gap-4">
                   <div className="shrink-0 size-10 md:size-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-primary">
                      <Mail className="size-5 md:size-6" />
                   </div>
                   <span className="text-[#64748B] text-lg md:text-xl font-medium pt-1">info@khareejqader.com</span>
                </li>
                <li className="flex items-start gap-4">
                   <div className="shrink-0 size-10 md:size-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-primary">
                      <Phone className="size-5 md:size-6" />
                   </div>
                   <span className="text-[#64748B] text-lg md:text-xl font-medium pt-1" dir="ltr">+971 4 000 0000</span>
                </li>
                <li className="flex items-start gap-4">
                   <div className="shrink-0 size-10 md:size-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-primary">
                      <MapPin className="size-5 md:size-6" />
                   </div>
                   <span className="text-[#64748B] text-lg md:text-xl font-medium pt-1">دبي، الإمارات العربية المتحدة</span>
                </li>
             </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 px-4 lg:px-0">
           <p className="text-[#64748B] text-lg lg:text-xl font-medium text-center">
             {t("rights")}
           </p>
           <div className="flex gap-8 text-[#94A3B8] text-lg font-medium">
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
