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
  Star,
  Clock,
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
  appointmentDoctors,
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
                {specialty.doctor ? (
                  <p className="mt-1 text-sm font-semibold text-[var(--color-secondary)]">
                    {specialty.doctor}
                  </p>
                ) : null}
                <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-on-surface-variant)]">
                  {specialty.description}
                </p>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection
          eyebrow="Our Medical Team"
          title="Meet Our Senior Consulting Specialists"
          description="Direct consultations with highly qualified doctors from premier institutes like AIIMS Delhi and KGMU Lucknow, right here in Akbarpur."
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {appointmentDoctors.map((doctor) => (
              <div
                key={doctor.name}
                className="surface-card group overflow-hidden border border-[var(--color-outline-variant)] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl rounded-[2rem]"
              >
                {/* Image Section */}
                <Link href={`/doctors/${doctor.slug}`} className="relative block aspect-square w-full overflow-hidden bg-muted">
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
                <div className="p-6">
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

                  <p className="mt-3 text-xs text-[var(--color-on-surface-variant)] line-clamp-3">
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
                    className="btn-primary mt-5 w-full justify-center text-xs py-2.5 rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] transition-all flex items-center gap-1.5"
                  >
                    <CalendarCheck2 className="h-3.5 w-3.5" />
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        <section className="bg-[var(--color-surface-container-low)] py-20">
          <div className="site-container">
            <GoogleReviewWall data={homePageData.reviews} />
          </div>
        </section>

        <PageSection
          eyebrow="Video Highlights"
          title="Patient Education & Clinic Gallery"
          description="Watch our latest educational videos, patient guidelines, and medical checkup tips in short vertical format."
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                title: "Gastro Health Care Tips",
                description: "Understanding symptoms of acidity & liver care.",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-doctor-explaining-mri-to-patient-41619-large.mp4",
                poster: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400&h=711"
              },
              {
                title: "Neurosurgery & Spine Advancements",
                description: "Insights into modern micro-neurosurgical techniques.",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-female-doctor-working-with-microscope-in-lab-41614-large.mp4",
                poster: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=400&h=711"
              },
              {
                title: "Outpatient Clinic Walkthrough",
                description: "A look inside the V.K. Medical Center consulting rooms.",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-medical-worker-checking-patient-details-on-tablet-41617-large.mp4",
                poster: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=400&h=711"
              },
              {
                title: "OPD Checkup Protocol",
                description: "What to expect during your first consulting visit.",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patient-in-hospital-41618-large.mp4",
                poster: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=711"
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-[2rem] bg-black border border-[var(--color-outline-variant)] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl aspect-[9/16]"
              >
                <video 
                  controls 
                  preload="metadata" 
                  poster={item.poster} 
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-10 text-white pointer-events-none transition-transform duration-300 group-hover:translate-y-0">
                  <h4 className="text-sm font-bold leading-tight">{item.title}</h4>
                  <p className="mt-1 text-[10px] text-gray-300 font-medium leading-normal">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection
          title={homePageData.articlesSection.title}
          description={homePageData.articlesSection.description}
        >
          <div className="grid gap-7 md:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.title}
                className="group"
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
