import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  Clock3,
  HeartPulse,
  Phone,
  ShieldCheck,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { PageHero, PageSection, SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  appointmentDoctors,
  contactFaqs,
  packageCards,
  specialties,
} from "@/lib/site-data";

export default function ServicesPage() {
  return (
    <>
      <SiteHeader activePath="/services" />
      <main>
        <PageHero
          title="Our Medical Services"
          description="Focused specialist care in gastroenterology, neurosurgery, neurology, and preventive medicine for patients in Akbarpur and Ambedkar Nagar."
        />

        <PageSection
          eyebrow="Core Services"
          title="Specialty Care Built Around Real Patient Needs"
          description="Our service lines are centered on digestive, liver, brain, spine, nerve, and routine medical care, with consultation pathways designed for faster diagnosis and better follow-up."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {specialties.map((specialty) => (
              <article
                key={specialty.title}
                className="surface-card flex h-full flex-col p-8"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-secondary-container)] text-[var(--color-secondary)]">
                  <ServiceIcon icon={specialty.icon} />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-[var(--color-primary)]">
                  {specialty.title}
                </h2>
                {specialty.doctor ? (
                  <p className="mt-1.5 text-sm font-semibold text-[var(--color-secondary)]">
                    Consulting Doctor: {specialty.doctor}
                  </p>
                ) : null}
                <p className="mt-4 flex-1 text-base leading-8 text-[var(--color-on-surface-variant)]">
                  {specialty.description}
                </p>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection
          eyebrow="Care Programs"
          title="Evaluation And Screening Packages"
          description="Structured consultation and screening support for common digestive and neurological concerns."
          tinted
        >
          <div className="grid gap-6 md:grid-cols-2">
            {packageCards.map((pkg) => (
              <article key={pkg.title} className="surface-card p-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white">
                  <PackageIcon icon={pkg.icon} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[var(--color-primary)]">
                  {pkg.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-[var(--color-on-surface-variant)]">
                  {pkg.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[var(--color-on-surface-variant)]">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-secondary)]" />
                    Specialist-led review of symptoms and medical history
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-secondary)]" />
                    Diagnostic guidance based on severity and duration
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-secondary)]" />
                    Clear next-step treatment and follow-up advice
                  </li>
                </ul>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection
          eyebrow="Consulting Doctors"
          title="Specialists Available For OPD"
          description="Book consultations with our visiting specialists based on the announced OPD schedule."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {appointmentDoctors.slice(0, 2).map((doctor) => (
              <article key={doctor.name} className="surface-card p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--color-primary)]">
                      {doctor.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                      {doctor.department}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--color-secondary-container)] px-4 py-2 text-sm font-semibold text-[var(--color-secondary)]">
                    {doctor.rating} Rating
                  </span>
                </div>
                <p className="mt-5 text-base leading-8 text-[var(--color-on-surface-variant)]">
                  {doctor.specialty}
                </p>
                <p className="mt-3 text-base leading-8 text-[var(--color-on-surface-variant)]">
                  {doctor.subspecialty}
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm font-medium text-[var(--color-primary)]">
                  <Clock3 className="h-4 w-4 text-[var(--color-secondary)]" />
                  {doctor.availability}
                </div>
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection
          eyebrow="Common Questions"
          title="Service And Appointment FAQs"
          description="Quick answers for patients planning consultations and follow-up care."
          tinted
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {contactFaqs.map((faq) => (
              <article key={faq.title} className="surface-card p-8">
                <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                  {faq.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-on-surface-variant)]">
                  {faq.description}
                </p>
              </article>
            ))}
          </div>
        </PageSection>

        <section className="bg-[var(--color-primary)] py-20 text-white">
          <div className="site-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="eyebrow text-blue-100/80">Book Your Visit</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Need specialist consultation in Akbarpur?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-blue-100/80">
                Choose the right department, check OPD availability, and book your appointment online or by phone.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-appointment"
                className="btn-primary justify-center bg-white text-[var(--color-primary)] hover:bg-rose-50"
              >
                <CalendarCheck2 className="h-5 w-5" />
                Book Appointment
              </Link>
              <a
                href="tel:+919450987101"
                className="btn-glass justify-center border-white/25 text-white"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <Link
                href="/blogs"
                className="btn-glass justify-center border-white/25 text-white"
              >
                <ArrowRight className="h-5 w-5" />
                Read Blogs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ServiceIcon({ icon }: { icon: string }) {
  if (icon === "gastroenterology") return <Stethoscope className="h-6 w-6" />;
  if (icon === "neurology") return <Syringe className="h-6 w-6" />;
  return <ShieldCheck className="h-6 w-6" />;
}

function PackageIcon({ icon }: { icon: string }) {
  if (icon === "heart") return <HeartPulse className="h-6 w-6" />;
  return <Stethoscope className="h-6 w-6" />;
}
