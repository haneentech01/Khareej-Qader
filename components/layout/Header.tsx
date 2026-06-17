"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useHeader } from "@/hooks/layout/useHeader";
import { useState } from "react";
import { RegisterModal } from "@/components/layout/RegisterModal";

const navLinks = [
    { key: "home", href: "/#home" },
    { key: "program", href: "/#program" },
    { key: "tracks", href: "/#tracks" },
    { key: "success_stories", href: "/#success-stories" },
    { key: "gallery", href: "/#gallery" },
    { key: "faq", href: "/#faq" },
] as const;

export function Header() {
    const {
        t,
        isMenuOpen,
        activeSection,
        toggleMenu,
        closeMenu,
        isScrolled
    } = useHeader(navLinks);

    const [modalOpen, setModalOpen] = useState(false);

    const handleRegisterClick = () => {
        closeMenu();
        setModalOpen(true);
    };

    return (
        <>
            <header className={`sticky top-0 z-50 w-full border-b
            border-slate-300 bg-white transition-all duration-300
            backdrop-blur supports-backdrop-filter:bg-white/60 
            ${isScrolled ? "py-0 shadow-md" : "py-0"
                }`}>
                <div className="container mx-auto flex items-center justify-between 
            px-6 md:px-10 lg:px-4 xl:px-20">
                    {/* Logo Section */}
                    <div className="flex items-center py-3">
                        <Link href="/" onClick={closeMenu} aria-label="home">
                            <Image
                                src="/images/logo.png"
                                alt="Kharij Qader Logo"
                                width={160}
                                height={60}
                                priority
                                className={`object-contain transition-all duration-300 origin-left ${isScrolled
                                    ? "w-[70px] md:w-20 xl:w-[90px]"
                                    : "w-20 md:w-24 xl:w-[110px]"
                                    }`}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-4 xl:gap-[30px]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                className={`text-lg transition-colors ${activeSection === link.href
                                    ? "text-brand-primary font-bold"
                                    : "text-black hover:text-brand-hover focus-visible:text-brand-hover"
                                    }`}
                                aria-label={link.key}
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions Section */}
                    <div className="">
                        <div className="hidden lg:flex items-center gap-2.5">
                            <Button
                                onClick={handleRegisterClick}
                                className="bg-brand-primary hover:bg-brand-primary/90
                                 border-brand-primary
                                text-lg text-white font-semibold shadow-sm transition-colors
                                w-16 lg:w-28 h-12 cursor-pointer"
                                aria-label="register now"
                            >
                                {t("register_now")}
                            </Button>
                            <Link href="/login" aria-label="login">
                                <Button
                                    variant="outline"
                                    className="text-[#0F172A] border-slate-300 font-medium
                                     hover:bg-slate-50 transition-colors text-lg
                                     w-20 lg:w-40 h-12"
                                    aria-label="login"
                                >
                                    {t("login")}
                                </Button>
                            </Link>

                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden flex items-center">
                            <Button variant="ghost"
                                size="icon"
                                onClick={toggleMenu}
                                className="text-brand-primary"
                                aria-label="open menu"
                            >
                                {isMenuOpen ? (
                                    <X className="w-5! h-5! md:w-7! md:h-7!" />
                                ) : (
                                    <Menu className="w-5! h-5! md:w-7! md:h-7!" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full
                     bg-white border-b border-[#CBD5E1] shadow-xl 
                     animate-in slide-in-from-top duration-300">
                        <nav className="flex flex-col p-6 gap-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 px-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.key}
                                        href={link.href}
                                        onClick={closeMenu}
                                        className={`text-sm md:text-lg py-3 text-center
                                    transition-colors ${activeSection === link.href
                                                ? "text-brand-primary font-bold border-brand-primary"
                                                : "text-black active:text-brand-primary"
                                            }`}
                                        aria-label={link.key}
                                    >
                                        {t(link.key)}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center 
                        justify-center gap-4 mt-4 pt-8 border-t border-[#CBD5E1]">
                                <Button
                                    onClick={handleRegisterClick}
                                    className="bg-brand-primary hover:bg-brand-dark
                                    text-lg text-white font-bold shadow-md h-[55px] 
                                    w-full sm:w-[200px] rounded-xl transition-all cursor-pointer"
                                    aria-label="register now"
                                >
                                    {t("register_now")}
                                </Button>
                                <Link href="/login"
                                    aria-label="login"
                                    onClick={closeMenu}
                                    className="w-full sm:w-[270px]">
                                    <Button
                                        variant="outline"
                                        className="border-2 border-brand-primary
                                         text-brand-primary hover:text-brand-dark
                                         hover:bg-brand-surface text-lg h-[55px] 
                                         w-full rounded-xl font-bold transition-all"
                                        aria-label="login"
                                    >
                                        {t("login")}
                                    </Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Register Modal */}
            <RegisterModal
                open={modalOpen}
                onOpenChange={setModalOpen} />
        </>
    );
}
