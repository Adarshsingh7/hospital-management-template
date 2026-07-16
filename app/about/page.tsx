import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Shield, Trophy, Users } from "lucide-react";
import { SiteHeader, SiteFooter, PageHero, PageSection } from "@/components/site-shell";
import { aboutPageData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: aboutPageData.metadata.title,
  description: aboutPageData.metadata.description,
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader activePath="/about" />

      <PageHero
        title={aboutPageData.hero.title}
        description={aboutPageData.hero.description}
      />

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          <div className="relative min-h-[350px] md:min-h-[450px] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-strong)]">
            <Image
              src={aboutPageData.overview.image}
              alt={aboutPageData.overview.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)] block">
              {aboutPageData.overview.eyebrow}
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--color-primary)] md:text-4xl leading-tight">
              {aboutPageData.overview.title}
            </h2>
            {aboutPageData.overview.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-[var(--color-on-surface-variant)]">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 grid gap-4 sm:grid-cols-2">
              {aboutPageData.overview.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-sm font-bold text-[var(--color-primary)]">
                  <Check className="h-5 w-5 text-[var(--color-secondary)] shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Leadership & Vision"
        title="Director's Message"
        description="A message from Dr. Vinay Maurya on our commitment to Ambedkar Nagar."
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-[var(--color-primary)]">
              Leading with clinical values, accessibility, and a patient-first focus.
            </h3>
            <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">
              Welcome to V.K. Medical Center. When we founded this facility, our focus was clear: to ensure no resident of Akbarpur or Ambedkar Nagar has to travel hours to access premium super-specialty consultations.
            </p>
            <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">
              We brought senior specialists from institutions like KGMU and AIIMS Delhi right here to your neighborhood. Today, we are proud to offer advanced gastrointestinal care, neurosurgery, orthopedics, and maternity consultations under one roof with modern facilities.
            </p>
            <div className="pt-4">
              <Link href="/director" className="btn-primary">
                Read Full Director&apos;s Profile & Vision
              </Link>
            </div>
          </div>
          <div className="relative min-h-[350px] md:min-h-[400px] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-strong)] border border-[var(--color-outline-variant)]">
            <Image
              src="/director.jpeg"
              alt="Dr. Vinay Maurya"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </PageSection>

      <PageSection
        className="grid gap-8 rounded-sm border border-[var(--color-outline-variant)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch"
        tinted
      >
        <div className="relative overflow-hidden rounded-sm bg-[var(--color-primary)] p-8 text-white md:p-10">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[var(--color-secondary)]" />
          <div className="relative space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-100/80">
              {aboutPageData.missionSection.eyebrow}
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
              {aboutPageData.missionSection.title}
            </h2>
            <p className="text-base leading-8 text-rose-100/85">
              {aboutPageData.missionSection.description}
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          {aboutPageData.missionSection.items.map((item, index) => (
            <article
              key={item.title}
              className="flex gap-5 rounded-sm border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-5 transition duration-200 hover:border-[var(--color-secondary-fixed-dim)] hover:shadow-[var(--shadow-soft)]"
            >
              <div className="shrink-0">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-[var(--color-secondary-container)] text-[var(--color-secondary)]">
                  <Check className="h-5 w-5" />
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                  Mission {index + 1}
                </div>
                <h3 className="mt-1 text-lg font-bold text-[var(--color-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-on-surface-variant)]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection className="bg-[var(--color-surface-container-low)] py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)]">
            {aboutPageData.trustSection.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--color-primary)]">
            {aboutPageData.trustSection.title}
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {aboutPageData.trustSection.items.map((item, idx) => {
            const Icon = getAboutIcon(item.icon);
            return (
              <div
                key={idx}
                className="surface-card p-8 flex flex-col items-center text-center hover:-translate-y-1 transition duration-200"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-secondary-container)] text-[var(--color-secondary)] mb-6">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[var(--color-on-surface-variant)]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </PageSection>

      <PageSection>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)]">
            {aboutPageData.specialistsSection.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--color-primary)] md:text-4xl">
            {aboutPageData.specialistsSection.title}
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {aboutPageData.specialistsSection.items.map((doctor) => (
            <article key={doctor.name} className="surface-card p-6 flex flex-col md:flex-row gap-6 hover:shadow-[var(--shadow-strong)] transition duration-300">
              <div className="relative h-48 w-full md:w-48 shrink-0 overflow-hidden rounded-2xl bg-[var(--color-surface-container)]">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 200px, 100vw"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-[var(--color-primary)]">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider mt-1">
                    {doctor.credential}
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-outline)] mt-1">
                    {doctor.education}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-[var(--color-on-surface-variant)]">
                    {doctor.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--color-outline-variant)] text-xs font-bold text-[var(--color-primary)]">
                  {doctor.schedule}
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="rounded-[2.5rem] bg-[var(--color-primary)] p-8 md:p-16 text-white relative overflow-hidden shadow-[var(--shadow-strong)]">
          <div className="max-w-xl space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-rose-100/80">
              {aboutPageData.cta.eyebrow}
            </span>
            <h2 className="text-3xl font-extrabold md:text-5xl leading-tight text-white">
              {aboutPageData.cta.title}
            </h2>
            <p className="text-base text-rose-100/80 leading-7">
              {aboutPageData.cta.description}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href={aboutPageData.cta.primaryHref} className="btn-secondary px-6 py-3 font-bold justify-center rounded-xl text-sm shrink-0">
                {aboutPageData.cta.primaryLabel}
              </Link>
              <a href={aboutPageData.cta.secondaryHref} className="btn-glass px-6 py-3 font-bold justify-center rounded-xl text-sm shrink-0">
                {aboutPageData.cta.secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </PageSection>

      <SiteFooter />
    </>
  );
}

function getAboutIcon(icon: string) {
  if (icon === "trophy") return Trophy;
  if (icon === "users") return Users;
  return Shield;
}
