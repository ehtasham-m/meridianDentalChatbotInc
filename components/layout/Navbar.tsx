"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants/services";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services", hasMenu: true },
  { label: "Doctors", href: "/#doctors" },
  { label: "Smile Gallery", href: "/#gallery" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-premium",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container-content">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ease-premium",
              scrolled
                ? "border border-line/70 bg-warm-100/80 shadow-nav backdrop-blur-xl"
                : "border border-transparent bg-transparent"
            )}
          >
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1 12C1 12 3 3 8 3C13 3 15 12 15 12"
                    stroke="#4FBF98"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="font-display text-[17px] font-medium tracking-tightest text-navy-700">
                {SITE.shortName}
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) =>
                link.hasMenu ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="group relative flex items-center gap-1 px-4 py-2 text-[14.5px] font-medium text-navy-700"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-300",
                          servicesOpen && "rotate-180"
                        )}
                      />
                      <span className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-mint-600 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4"
                        >
                          <div className="grid grid-cols-2 gap-1 rounded-xl2 border border-line bg-warm-100 p-4 shadow-nav">
                            {SERVICES.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/#services`}
                                className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface"
                              >
                                <service.icon size={18} className="mt-0.5 shrink-0 text-clinical-500" />
                                <div>
                                  <p className="text-[13.5px] font-medium text-navy-700">
                                    {service.name}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group relative px-4 py-2 text-[14.5px] font-medium text-navy-700"
                  >
                    {link.label}
                    <span className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-mint-600 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                )
              )}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-1.5 text-[14px] font-medium text-ink-muted transition hover:text-navy-700"
              >
                <Phone size={14} />
                {SITE.phoneDisplay}
              </a>
              <Button href="/appointment" size="sm">
                Book Appointment
              </Button>
            </div>

            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-navy-700 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-warm-100 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-medium text-navy-700">Menu</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-line py-4 text-[17px] font-medium text-navy-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center justify-center gap-2 text-[15px] font-medium text-ink-muted"
                >
                  <Phone size={16} />
                  {SITE.phoneDisplay}
                </a>
                <Button href="/appointment" size="lg" className="w-full">
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
