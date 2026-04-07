"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useHeader } from "@/hooks/useHeader";

const navLinks = [
    { key: "home", href: "/" },
    { key: "program", href: "#program" },
    { key: "tracks", href: "#tracks" },
    { key: "success_stories", href: "#success-stories" },
    { key: "gallery", href: "#gallery" },
    { key: "faq", href: "#faq" },
] as const;

export function Header() {
    const {
        t,
        isMenuOpen,
        activeSection,
        toggleMenu,
        closeMenu
    } = useHeader(navLinks);

    return (
        <header className="sticky top-0 z-50 w-full border-b
        border-[#CBD5E1] bg-white 
        backdrop-blur supports-backdrop-filter:bg-white/60 ">
            <div className="container mx-auto flex items-center justify-between 
            px-4 md:px-10 lg:px-10 xl:px-20">

                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" onClick={closeMenu}>
                        <Image
                            src="/images/logo.png"
                            alt="Kharij Qader Logo"
                            width={100}
                            height={60}
                            priority
                            className="object-contain 
                            w-16 md:w-24 xl:w-[90px]"
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
                        >
                            {t(link.key)}
                        </Link>
                    ))}
                </nav>

                {/* Actions Section */}
                <div className="">
                    <div className="hidden lg:flex items-center gap-2.5">
                        <Button
                            className="bg-brand-primary hover:bg-brand-primary/90
                            text-lg text-white font-semibold shadow-sm transition-colors
                            w-16 lg:w-28 h-12"
                        >
                            {t("register_now")}
                        </Button>
                        <Button
                            variant="outline"
                            className="text-[#0F172A] border-[#CBD5E1] font-medium
                             hover:bg-slate-50 transition-colors text-lg
                             w-20 lg:w-40 h-12"
                        >
                            {t("login")}
                        </Button>

                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center">
                        <Button variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            className="text-brand-primary"
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
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center 
                        justify-center gap-4 mt-4 pt-8 border-t border-[#CBD5E1]">
                            <Button
                                onClick={closeMenu}
                                className="bg-brand-primary hover:bg-brand-dark
                                text-lg text-white font-bold shadow-md h-[55px] 
                                w-full sm:w-[200px] rounded-xl transition-all"
                            >
                                {t("register_now")}
                            </Button>
                            <Button
                                onClick={closeMenu}
                                variant="outline"
                                className="border-2 border-brand-primary
                                 text-brand-primary hover:text-brand-dark
                                 hover:bg-brand-surface text-lg h-[55px] 
                                 w-full sm:w-[270px] rounded-xl font-bold transition-all"
                            >
                                {t("login")}
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

