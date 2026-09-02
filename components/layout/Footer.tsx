"use client";

import Link from "next/link";
import { ArrowUp, Instagram, Facebook, Linkedin, ShieldCheck, Award, BadgeCheck } from "lucide-react";
import { SITE } from "@/lib/constants/site";
import { Button } from "@/components/ui/Button";

const QUICK_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Doctors", href: "/#doctors" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

const CERTIFICATIONS = [
  { label: "Pakistan Medical & Dental Council", icon: ShieldCheck },
  { label: "ISO 9001 Clinical Standards", icon: Award },
  { label: "Class B Sterilisation Certified", icon: BadgeCheck },
];

export function Footer() {
  return (
    <footer className="bg-navy-700 pt-20 text-warm-100">
      <div className="container-content">
        <div className="grid gap-12 border-b border-warm-100/10 pb-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-500/20">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1 12C1 12 3 3 8 3C13 3 15 12 15 12"
                    stroke="#4FBF98"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="font-display text-[17px] font-medium">{SITE.shortName}</span>
            </Link>
            <p className="max-w-xs text-[14.5px] leading-relaxed text-warm-100/60">
              {SITE.descriptor}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
                { icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
                { icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-100/15 text-warm-100/70 transition hover:border-mint-500 hover:text-mint-500"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-eyebrow text-warm-100/50">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14.5px] text-warm-100/75 transition hover:text-mint-500"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-eyebrow text-warm-100/50">
              Visit
            </p>
            <p className="text-[14.5px] leading-relaxed text-warm-100/75">
              {SITE.addressLine1}
              <br />
              {SITE.addressLine2}
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-3 block text-[14.5px] text-warm-100/75 hover:text-mint-500"
            >
              {SITE.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-1 block text-[14.5px] text-warm-100/75 hover:text-mint-500"
            >
              {SITE.email}
            </a>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-eyebrow text-warm-100/50">
              Stay Informed
            </p>
            <p className="mb-4 text-[14.5px] text-warm-100/70">
              One email a month on dental care and studio updates. No spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 rounded-full border border-warm-100/15 bg-warm-100/5 p-1.5 pl-4"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email"
                className="w-full bg-transparent text-[14px] text-warm-100 placeholder:text-warm-100/40 focus:outline-none"
              />
              <Button variant="primary" size="sm" type="submit" className="shrink-0">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-8">
          {CERTIFICATIONS.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-[13px] text-warm-100/55">
              <c.icon size={15} className="text-mint-500" />
              {c.label}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-warm-100/10 py-6 sm:flex-row">
          <p className="text-[13px] text-warm-100/45">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-[13px] text-warm-100/60 transition hover:text-mint-500"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
