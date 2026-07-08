import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Menu, Phone, Share2 } from "lucide-react";
import { navigation } from "@/lib/site-data";

export function SiteHeader({ activePath }: { activePath: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:color-mix(in_oklab,var(--color-outline-variant)_55%,white)] bg-[color:color-mix(in_oklab,var(--color-surface)_86%,white)]/90 backdrop-blur-xl">
      <div className="site-container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="text-2xl font-bold tracking-tight text-[var(--color-primary)]">
          St. Marina General
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const active = item.href === activePath;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-[0.18em] transition ${
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
          <a href="tel:+18001066" className="btn-outline px-4 py-2 text-sm">
            Emergency
          </a>
          <Link href="/book-appointment" className="btn-primary px-4 py-2 text-sm">
            Book Appointment
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-outline-variant)] text-[var(--color-primary)] md:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-primary)] py-16 text-white">
      <div className="site-container grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold">St. Marina</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-blue-100/72">
            Precision Care, Compassionate Healing. Leading the future of medical
            excellence with accessible emergency, specialist, and preventive care.
          </p>
          <div className="mt-6 flex gap-3">
            {[Share2, Mail, Phone].map((Icon) => (
              <span
                key={Icon.displayName}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/85"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        <FooterColumn
          title="Hospital Links"
          links={[
            { href: "/", label: "Home" },
            { href: "/services", label: "View Specialities" },
            { href: "/book-appointment", label: "Book Appointment" },
            { href: "/contact", label: "Contact Us" },
          ]}
        />
        <FooterColumn
          title="Support"
          links={[
            { href: "#", label: "Privacy Policy" },
            { href: "#", label: "Terms of Service" },
            { href: "#", label: "Patient Portal" },
            { href: "#", label: "Careers" },
          ]}
        />
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100/70">
            Emergency Contact
          </h3>
          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100/65">
              24/7 Dispatch Center
            </div>
            <div className="mt-3 text-3xl font-bold">1066</div>
            <p className="mt-3 text-sm leading-7 text-blue-100/74">
              Immediate medical assistance is one call away.
            </p>
          </div>
        </div>
      </div>
      <div className="site-container mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-blue-100/65 md:flex-row md:items-center md:justify-between">
        <p>© 2024 St. Marina General Hospital. All rights reserved.</p>
        <div className="flex items-center gap-6 font-semibold tracking-[0.18em] uppercase">
          <span>JCI Accredited</span>
          <span>ISO 9001</span>
          <span>NABH Certified</span>
        </div>
      </div>
    </footer>
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
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100/70">
        {title}
      </h3>
      <ul className="mt-5 space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-blue-100/80 underline transition hover:text-white">
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,244,255,0.38),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(214,227,255,0.8),transparent_36%),linear-gradient(180deg,rgba(249,249,255,0.96),rgba(240,243,255,0.92))]" />
      <div className="site-container relative py-8 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--color-primary)] md:text-6xl">
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
  eyebrow,
  title,
  description,
  action,
  className = "",
  children,
  tinted = false,
}: {
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
    return <section className="bg-[var(--color-surface-container-low)] py-20">{inner}</section>;
  }

  return <section className="py-20">{inner}</section>;
}

export function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="section-link">
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
