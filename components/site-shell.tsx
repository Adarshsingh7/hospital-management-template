"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { navigation } from "@/lib/site-data";
import { VKLogo } from "./vk-logo";
import { Facebook, Instagram, Youtube, Twitter } from "./social-icons";

export function SiteHeader({ activePath }: { activePath: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:color-mix(in_oklab,var(--color-outline-variant)_55%,white)] bg-[color:color-mix(in_oklab,var(--color-surface)_86%,white)]/90 backdrop-blur-xl">
      <div className="site-container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <VKLogo className="h-10 md:h-12 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const active = item.href === activePath;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-b-2 border-[var(--color-primary)] pb-1 text-[var(--color-primary)]"
                    : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+919450987101" className="btn-outline px-4 py-2 text-sm font-semibold">
            Call: +91 9450987101
          </a>
          <Link href="/book-appointment" className="btn-primary px-4 py-2 text-sm">
            Book Appointment
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-outline-variant)] text-[var(--color-primary)] md:hidden focus:outline-none"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {isOpen && (
        <div className="border-t border-[color:color-mix(in_oklab,var(--color-outline-variant)_55%,white)] bg-[color:color-mix(in_oklab,var(--color-surface)_96%,white)] py-6 md:hidden">
          <div className="site-container flex flex-col gap-6">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => {
                const active = item.href === activePath;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xs font-bold uppercase tracking-[0.18em] py-2 transition ${
                      active
                        ? "text-[var(--color-primary)] border-l-2 border-[var(--color-primary)] pl-3"
                        : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] pl-3"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-[color:color-mix(in_oklab,var(--color-outline-variant)_55%,white)]">
              <a 
                href="tel:+919450987101" 
                onClick={() => setIsOpen(false)}
                className="btn-outline w-full justify-center py-2.5 text-sm font-semibold text-center"
              >
                Call: +91 9450987101
              </a>
              <Link 
                href="/book-appointment" 
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full justify-center py-2.5 text-sm text-center"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="bg-[var(--color-primary)] py-16 text-white">
        <div className="site-container grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="inline-flex items-center justify-center bg-white p-2 px-3.5 rounded-xl mb-4">
              <VKLogo className="h-8 w-auto" white={false} />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white">
              Super-specialty Gastroenterology and Neurosurgery consultations by KGMU and AIIMS Delhi alum specialists in Akbarpur, Ambedkar Nagar.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Youtube, href: "#", label: "YouTube" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterColumn
            title="Quick Links"
            links={[
              { href: "/", label: "Home" },
              { href: "/services", label: "View Specialities" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact Us" },
            ]}
          />
          <FooterColumn
            title="Specialities"
            links={[
              { href: "/doctors/dr-v-r-ray", label: "Gastroenterology (Dr. V.R. Ray)" },
              { href: "/doctors/dr-surjeet-singh-patel", label: "Neurosurgery (Dr. Surjeet Singh Patel)" },
              { href: "/doctors/dr-amit-sharma", label: "Orthopedics (Dr. Amit Sharma)" },
              { href: "/doctors/dr-priya-singh", label: "Gynecology (Dr. Priya Singh)" },
            ]}
          />
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Emergency & Booking
            </h3>
            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                OPD Booking Lines
              </div>
              <div className="mt-3 text-lg font-bold block">+91 9450987101</div>
              <div className="text-lg font-bold block">+91 9839454508</div>
              <p className="mt-3 text-xs leading-5 text-white">
                Akbarpur, Baskhari Road, near Kisan Nursery, Ambedkar Nagar.
              </p>
            </div>
          </div>
        </div>
        <div className="site-container mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p>© {new Date().getFullYear()} V.K. Medical Center. All rights reserved.</p>
            <p className="mt-1.5 text-xs text-white/70">
              Made with{" "}
              <a
                href="https://stechwebsolution.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                STech Web Solution
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6 font-semibold tracking-[0.18em] uppercase text-xs">
            <span>AIIMS & KGMU Alumni</span>
            <span>Quality Patient Care</span>
            <span>Akbarpur, Ambedkar Nagar</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 sm:bottom-8 sm:right-8">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919450987101"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.38)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] active:scale-95"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <svg className="h-7 w-7 fill-white text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Call Button */}
        <a
          href="tel:+919450987101"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#0066cc] text-white shadow-[0_4px_14px_rgba(0,102,204,0.38)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,102,204,0.5)] active:scale-95"
          aria-label="Call Us"
          title="Call Us"
        >
          <Phone className="h-6 w-6 text-white" strokeWidth={2.5} />
        </a>
      </div>
    </>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-white underline transition hover:opacity-80">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden py-18">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(254,226,226,0.38),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(219,234,254,0.8),transparent_36%),linear-gradient(180deg,rgba(254,254,254,0.96),rgba(243,244,246,0.92))]" />
      <div className="site-container relative py-8 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--color-primary)] md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--color-on-surface-variant)] md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}

export function PageSection({
  id,
  eyebrow,
  title,
  description,
  action,
  className = "",
  children,
  tinted = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
  tinted?: boolean;
}) {
  const inner = (
    <div className={`site-container ${className}`.trim()}>
      {title ? (
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-primary)] md:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-base leading-8 text-[var(--color-on-surface-variant)]">
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );

  if (tinted) {
    return <section id={id} className="bg-[var(--color-surface-container-low)] py-20">{inner}</section>;
  }

  return <section id={id} className="py-20">{inner}</section>;
}

export function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="section-link">
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
