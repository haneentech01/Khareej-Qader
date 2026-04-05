import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

/**
 * Footer component providing site navigation, contact information,
 * and social media links with a high-end branding consistent with the landing page.
 */
export function Footer() {
  const t = useTranslations("Footer");
  const h = useTranslations("Header");

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61585324196967#" },
    { icon: FaInstagram, href: "https://www.instagram.com/areisto.co/" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/areisto/posts/?feedView=all" },
  ];

  const quickLinks = [
    { label: h("home"), href: "/" },
    { label: h("program"), href: "#program" },
    { label: h("tracks"), href: "#tracks" },
    { label: h("success_stories"), href: "#success-stories" },
    { label: h("gallery"), href: "#gallery" },
    { label: h("faq"), href: "#faq" },

  ];



  return (
    <footer className="pt-20 pb-10 bg-[#F8FAF8] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-4 gap-16 lg:gap-20 mb-20 md:mb-24 px-4 lg:px-0">
          {/* Brand Column */}
          <div className="flex flex-col gap-8 max-w-sm">
            <Link href="/" className="inline-block transition-transform 
            hover:scale-105 active:scale-95">
              <Image src="/images/logoFooter.png" alt="Khareej Qader"
                width={180} height={108}
                className="w-auto h-12 md:h-14 lg:h-[108px]" />
            </Link>
            <p className="text-brand-muted text-sm lg:text-base leading-relaxed">
              {t("description")}
            </p>

          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xl md:text-lg font-bold 
            text-black mb-6 after:content-[''] after:block 
            after:w-8 after:h-1 after:bg-brand-primary after:mt-2
            after:rounded-full">
              {t("quick_links")}
            </h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-brand-muted 
                  text-sm md:text-base hover:text-brand-primary 
                  hover:translate-x-3 transition-all inline-block font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-sm md:text-lg font-bold text-black 
            mb-6 after:content-[''] after:block after:w-8 after:h-1 
            after:bg-brand-primary after:mt-2 after:rounded-full">
              {t("support")}
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: t("contact_us_link"), href: "#contact" },
                { label: t("help_center"), href: "#help" },
                { label: t("privacy_policy"), href: "#privacy" },
                { label: t("terms_conditions"), href: "#terms" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-brand-muted 
                  text-sm md:text-base hover:text-brand-primary 
                  hover:translate-x-3 transition-all inline-block font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Column */}
          <div>
            <h4 className="text-sm md:text-lg font-bold text-black 
            mb-6 after:content-[''] after:block after:w-8 after:h-1 
            after:bg-brand-primary after:mt-2 after:rounded-full">
              {t("subscribe_title")}
            </h4>
            <p className="text-brand-muted text-sm md:text-base 
            leading-relaxed mb-6">
              {t("subscribe_desc")}
            </p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("email_placeholder")}
                className="w-full px-6 py-4 bg-white 
                border border-slate-100 rounded-xl focus:outline-none 
                focus:ring-2 focus:ring-brand-primary/50 text-slate-700 
                placeholder:text-slate-400 font-medium"
                required
              />
              <button
                type="submit"
                className="w-full bg-brand-primary 
                hover:bg-brand-primary/90 text-white font-bold py-4 
                rounded-xl transition-colors duration-200"
              >
                {t("subscribe_btn")}
              </button>
            </form>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="pt-10 border-t border-[#BCC9C433]
        flex flex-col md:flex-row items-center 
        justify-between gap-6 px-4 lg:px-0">
          <div className="flex gap-4">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a key={i} href={social.href}
                  className="size-8 md:size-10 bg-[#EEEEEC] shadow-sm 
                    rounded-full flex items-center justify-center 
                    text-brand-muted border border-slate-100 
                    hover:bg-brand-primary hover:text-white 
                    transition-all transform hover:-translate-y-1">
                  <Icon className="size-4 md:size-5" />
                </a>
              );
            })}
          </div>

          <div className="">
            <p className="text-brand-muted text-sm md:text-base 
            font-medium text-center">
              {t("rights")}
            </p>
          </div>

        </div>

        {/* Watermark Section */}
        <div className="flex items-center justify-center my-9 md:my-12 
        px-4 w-full overflow-hidden">
          <span className="text-brand-base text-[70px] 
          md:text-[120px] font-extrabold text-center 
          opacity-6 uppercase select-none w-full whitespace-nowrap 
          tracking-widest">
            AREISTO
          </span>
        </div>
      </div>
    </footer>
  );
}
