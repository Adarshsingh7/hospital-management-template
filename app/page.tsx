import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CalendarCheck2,
  CirclePlay,
  HeartPulse,
  Microscope,
  Phone,
  ShieldCheck,
  Stethoscope,
  Syringe,
  UserRoundSearch,
  Star,
  Clock,
} from "lucide-react";
import { GoogleReviewWall } from "@/components/google-review-wall";
import { PageSection, SiteFooter, SiteHeader } from "@/components/site-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  articles,
  featuredSpecialties,
  homePageData,
  homeQuickLinks,
  metrics,
  trustFeatures,
  appointmentDoctors,
  videoHighlights,
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <SiteHeader activePath="/" />
      <main className="pb-24">
        <section className="relative overflow-hidden w-full min-h-[calc(100vh-5rem)] flex items-center">
          <div className="absolute inset-0">
            <Image
              src="/hero.jpeg"
              alt="V.K. Medical Center Clinic"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(211,47,47,0.78),rgba(13,71,161,0.65),rgba(0,0,0,0.15))]" />
          </div>
          <div className="site-container relative flex items-center py-16 md:py-24 w-full">
            <ScrollReveal direction="up" duration={800} className="max-w-3xl space-y-5 text-white md:space-y-7">
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
            </ScrollReveal>
          </div>
        </section>

        <PageSection className="-mt-14 relative z-10">
          <div className="grid gap-5 md:grid-cols-3">
            {homeQuickLinks.map((link, idx) => (
              <ScrollReveal key={link.title} direction="up" delay={idx * 100} duration={600} className="h-full">
                <Link
                  href={link.href}
                  className="surface-card group flex items-center justify-between gap-6 p-7 h-full"
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
              </ScrollReveal>
            ))}
          </div>
        </PageSection>

        <PageSection
          className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]"
          tinted
        >
          <div>
            <div className="mb-10 max-w-3xl">
              <span className="eyebrow">{homePageData.trustSection.eyebrow}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-primary)] md:text-4xl">
                {homePageData.trustSection.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-on-surface-variant)]">
                {homePageData.trustSection.description}
              </p>
            </div>

            <div className="space-y-7">
              {trustFeatures.map((feature, idx) => (
                <ScrollReveal key={feature.title} direction="up" delay={idx * 150} duration={600} className="flex gap-5">
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
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal direction="left" duration={800} className="relative">
            <div className="relative aspect-[0.95] overflow-hidden rounded-[2rem] shadow-[var(--shadow-strong)]">
              <Image
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800&h=800"
                alt="Surgeons performing a surgery"
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
          </ScrollReveal>
        </PageSection>

        <PageSection
          eyebrow={homePageData.specialtiesSection.eyebrow}
          title={homePageData.specialtiesSection.title}
          description={homePageData.specialtiesSection.description}
          action={
            <Link className="section-link" href={homePageData.specialtiesSection.actionHref}>
              {homePageData.specialtiesSection.actionLabel}
            </Link>
          }
        >
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredSpecialties.map((specialty, idx) => (
              <ScrollReveal
                key={specialty.title}
                direction="up"
                delay={idx * 100}
                duration={700}
                className="h-full"
              >
                <article className="surface-card group flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-surface-container)]">
                    <Image
                      src={specialty.image}
                      alt={specialty.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 100vw"
                    />
                    {/* Floating Icon */}
                    <div className="absolute left-4 bottom-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[var(--color-secondary)] shadow-[var(--shadow-strong)]">
                      <SpecialtyIcon icon={specialty.icon} />
                    </div>
                  </div>
                  
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-[var(--color-primary)]">
                      {specialty.title}
                    </h3>
                    {specialty.doctor ? (
                      <p className="mt-1 text-xs font-semibold text-[var(--color-secondary)]">
                        {specialty.doctor}
                      </p>
                    ) : null}
                    <p className="mt-2.5 flex-1 text-xs leading-6 text-[var(--color-on-surface-variant)]">
                      {specialty.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-[var(--color-outline-variant)] pt-4">
                      <span className="text-2xs font-bold uppercase tracking-wider text-[var(--color-outline)]">
                        {specialty.volume}
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </PageSection>

        <PageSection
          eyebrow="Our Medical Team"
          title="Meet Our Senior Consulting Specialists"
          description="Direct consultations with highly qualified doctors from premier institutes like AIIMS Delhi and KGMU Lucknow, right here in Akbarpur."
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {appointmentDoctors.map((doctor, idx) => (
              <ScrollReveal
                key={doctor.name}
                direction="up"
                delay={idx * 100}
                duration={700}
                className="h-full"
              >
                <div className="surface-card group overflow-hidden border border-[var(--color-outline-variant)] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl rounded-[2rem] h-full flex flex-col justify-between"
                >
                  {/* Image Section */}
                  <Link href={`/doctors/${doctor.slug}`} className="relative block aspect-square w-full overflow-hidden bg-muted shrink-0">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    />
                    {/* Rating Pill */}
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[var(--color-primary)] shadow-sm backdrop-blur">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{doctor.rating}</span>
                    </div>
                    {/* Department Badge */}
                    <div className="absolute left-4 bottom-4 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {doctor.department}
                    </div>
                  </Link>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <Link href={`/doctors/${doctor.slug}`} className="block">
                      <h3 className="text-xl font-bold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                        {doctor.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-[0.05em]">
                      {doctor.specialty.split(" - ")[1] || doctor.specialty}
                    </p>
                    
                    <div className="mt-3 h-[1px] bg-[var(--color-outline-variant)] w-full" />
                    
                    <p className="mt-3 text-xs font-medium text-[var(--color-on-surface-variant)] line-clamp-2">
                      <strong className="text-[var(--color-primary)] block text-[11px] uppercase tracking-wider mb-0.5">Specialization:</strong>
                      {doctor.subspecialty}
                    </p>

                    <p className="mt-3 text-xs text-[var(--color-on-surface-variant)] line-clamp-3 flex-1">
                      {doctor.description}
                    </p>

                    {/* Timing Section */}
                    <div className="mt-4 flex items-start gap-2 rounded-xl bg-[var(--color-surface-container-low)] p-3 border border-[var(--color-outline-variant)]">
                      <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-secondary)]" />
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">Availability</div>
                        <div className="text-xs font-semibold text-[var(--color-primary)]">{doctor.availability}</div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <Link
                      href="/book-appointment"
                      className="btn-primary mt-5 w-full justify-center text-xs py-2.5 rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <CalendarCheck2 className="h-3.5 w-3.5" />
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </PageSection>

        <section className="bg-[var(--color-surface-container-low)] py-20">
          <div className="site-container">
            <ScrollReveal direction="up" duration={800}>
              <GoogleReviewWall data={homePageData.reviews} />
            </ScrollReveal>
          </div>
        </section>

        <PageSection
          eyebrow="Video Highlights"
          title="Patient Education & Clinic Gallery"
          description="Watch our latest educational videos, patient guidelines, and clinic moments in a swipeable highlight reel."
        >
          <ScrollReveal direction="up" duration={800}>
            <div className="rounded-[2rem] border border-[var(--color-outline-variant)] bg-[linear-gradient(135deg,rgba(13,71,161,0.05),rgba(211,47,47,0.06),rgba(255,255,255,0.92))] p-5 shadow-[var(--shadow-soft)] md:p-7">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                    Clinic Reel
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-on-surface-variant)] md:text-base">
                    Browse four quick hospital-focused clips with smoother spacing, wider frames, and swipeable navigation across devices.
                  </p>
                </div>
                <div className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] backdrop-blur">
                  4 Featured Videos
                </div>
              </div>

              <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {videoHighlights.map((item) => (
                  <article
                    key={item.title}
                    className="group min-w-0 shrink-0 snap-start basis-[85%] sm:basis-[70%] lg:basis-[48%] xl:basis-[42%]"
                  >
                    <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-black">
                        <video
                          controls
                          preload="metadata"
                          poster={item.poster}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        >
                          <source src={item.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-primary)] shadow-sm">
                          <CirclePlay className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
                          {item.label}
                        </div>
                      </div>

                      <div className="space-y-3 p-5">
                        <h4 className="text-lg font-semibold leading-tight text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-secondary)]">
                          {item.title}
                        </h4>
                        <p className="text-sm leading-6 text-[var(--color-on-surface-variant)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </PageSection>

        <PageSection
          title={homePageData.articlesSection.title}
          description={homePageData.articlesSection.description}
        >
          <div className="grid gap-7 md:grid-cols-3">
            {articles.map((article, idx) => (
              <ScrollReveal
                key={article.title}
                direction="up"
                delay={idx * 100}
                duration={700}
                className="h-full"
              >
                <Link
                  href={`/blogs?id=${article.id}`}
                  className="group cursor-pointer block text-left h-full"
                >
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
                </Link>
              </ScrollReveal>
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
