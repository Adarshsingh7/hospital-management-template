import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CalendarCheck2,
  HeartPulse,
  Microscope,
  Phone,
  ShieldCheck,
  Stethoscope,
  Syringe,
  UserRoundSearch,
} from "lucide-react";
import { GoogleReviewWall } from "@/components/google-review-wall";
import { PageSection, SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  articles,
  featuredSpecialties,
  homePageData,
  homeQuickLinks,
  metrics,
  trustFeatures,
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <SiteHeader activePath="/" />
      <main className="pb-24">
        <section className="relative overflow-hidden rounded-sm sm:mx-20">
          <div className="absolute inset-0 rounded-sm">
            <Image
              src="/hero.jpeg"
              alt="V.K. Medical Center Clinic"
              fill
              priority
              className="rounded-sm object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(211,47,47,0.78),rgba(13,71,161,0.65),rgba(0,0,0,0.15))]" />
          </div>
          <div className="site-container relative flex min-h-[22rem] items-center py-12 sm:min-h-[26rem] sm:py-16 md:min-h-[44rem] md:py-24">
            <div className="max-w-3xl space-y-5 text-white md:space-y-7">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-[0.22em] uppercase text-white/80 backdrop-blur">
                {homePageData.hero.badge}
              </span>
              <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">
                {homePageData.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-rose-50/90 sm:text-lg sm:leading-8 md:text-xl">
                {homePageData.hero.description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link className="btn-primary justify-center bg-white text-[var(--color-primary)] hover:bg-rose-50 sm:justify-start" href={homePageData.hero.primaryCtaHref}>
                  <CalendarCheck2 className="h-5 w-5" />
                  {homePageData.hero.primaryCtaLabel}
                </Link>
                <a className="btn-glass justify-center sm:justify-start" href={homePageData.hero.secondaryCtaHref}>
                  <Phone className="h-5 w-5" />
                  {homePageData.hero.secondaryCtaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        <PageSection className="-mt-14 relative z-10">
          <div className="grid gap-5 md:grid-cols-3">
            {homeQuickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="surface-card group flex items-center justify-between gap-6 p-7"
              >
                <div className="space-y-3">
                  <span className="inline-flex rounded-2xl bg-[var(--color-secondary-container)] p-3 text-[var(--color-secondary)]">
                    <QuickLinkIcon icon={link.icon} />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                      {link.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-on-surface-variant)]">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--color-outline)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-secondary)]" />
              </Link>
            ))}
          </div>
        </PageSection>

        <PageSection
          eyebrow={homePageData.trustSection.eyebrow}
          title={homePageData.trustSection.title}
          description={homePageData.trustSection.description}
          className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
          tinted
        >
          <div className="relative">
            <div className="relative aspect-[0.95] overflow-hidden rounded-[2rem] shadow-[var(--shadow-strong)]">
              <Image
                src="/machine.jpeg"
                alt="Robotic surgery suite"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="absolute -right-3 -bottom-3 rounded-[1.4rem] bg-[var(--color-primary)] px-8 py-7 text-white shadow-[var(--shadow-strong)] md:-right-8 md:-bottom-8">
              <div className="text-4xl font-bold">{metrics.years}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/80">
                {homePageData.trustSection.metricLabel}
              </div>
            </div>
          </div>
          <div className="space-y-7">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="flex gap-5">
                <div className="mt-1 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-secondary)] shadow-[var(--shadow-soft)]">
                  <TrustIcon icon={feature.icon} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-base leading-7 text-[var(--color-on-surface-variant)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection
          eyebrow={homePageData.specialtiesSection.eyebrow}
          title={homePageData.specialtiesSection.title}
          description={homePageData.specialtiesSection.description}
          action={
            <Link className="section-link" href={homePageData.specialtiesSection.actionHref}>
              {homePageData.specialtiesSection.actionLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        >
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredSpecialties.map((specialty) => (
              <article
                key={specialty.title}
                className="surface-card group flex h-full flex-col p-7 transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]">
                  <SpecialtyIcon icon={specialty.icon} />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                  {specialty.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-on-surface-variant)]">
                  {specialty.description}
                </p>
              </article>
            ))}
          </div>
        </PageSection>

        <section className="bg-[var(--color-surface-container-low)] py-20">
          <div className="site-container">
            <GoogleReviewWall data={homePageData.reviews} />
          </div>
        </section>

        <PageSection
          title={homePageData.articlesSection.title}
          description={homePageData.articlesSection.description}
        >
          <div className="grid gap-7 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article.title} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                  {article.date}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-secondary)]">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-on-surface-variant)]">
                  {article.description}
                </p>
              </article>
            ))}
          </div>
        </PageSection>
      </main>
      <SiteFooter />
    </>
  );
}

function QuickLinkIcon({ icon }: { icon: string }) {
  if (icon === "doctor") return <UserRoundSearch className="h-6 w-6" />;
  if (icon === "services") return <Stethoscope className="h-6 w-6" />;
  return <ShieldCheck className="h-6 w-6" />;
}

function TrustIcon({ icon }: { icon: string }) {
  if (icon === "emergency") return <Phone className="h-6 w-6" />;
  if (icon === "technology") return <Microscope className="h-6 w-6" />;
  return <HeartPulse className="h-6 w-6" />;
}

function SpecialtyIcon({ icon }: { icon: string }) {
  if (icon === "cardiology") return <HeartPulse className="h-6 w-6" />;
  if (icon === "orthopedics") return <Syringe className="h-6 w-6" />;
  if (icon === "oncology") return <Microscope className="h-6 w-6" />;
  return <Brain className="h-6 w-6" />;
}
