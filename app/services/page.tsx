import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, HeartPulse, ScanHeart, ShieldPlus, Stethoscope } from "lucide-react";
import { PageHero, PageSection, SiteFooter, SiteHeader } from "@/components/site-shell";
import { packageCards, specialties } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Medical Services & Specialities",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader activePath="/services" />
      <PageHero
        title="Our Specialities and Centers of Excellence"
        description="Providing world-class medical expertise with cutting-edge technology and a compassionate approach to patient care across all departments."
      />
      <PageSection>
        <div className="surface-card flex flex-col gap-4 p-3 md:flex-row md:items-center">
          <input
            type="text"
            placeholder="Search Specialties, Conditions, or Procedures..."
            className="h-12 flex-1 rounded-[1rem] border border-transparent bg-transparent px-4 text-sm outline-none"
          />
          <button className="btn-secondary justify-center">Find Service</button>
        </div>
      </PageSection>
      <PageSection>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {specialties.map((specialty) => (
            <article
              key={specialty.title}
              className="surface-card group flex h-full flex-col p-8 transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-secondary-container)] text-[var(--color-secondary)] transition duration-200 group-hover:scale-105">
                <SpecialtyServiceIcon icon={specialty.icon} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-[var(--color-primary)]">
                {specialty.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-on-surface-variant)]">
                {specialty.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)]">
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection>
        <div className="overflow-hidden rounded-[2rem] bg-[var(--color-primary-container)] px-8 py-10 text-[var(--color-on-primary-container)] shadow-[var(--shadow-strong)] lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="eyebrow text-[var(--color-on-primary-container)]/75">
                Specialized Health Packages
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[var(--color-on-primary-container)] md:text-4xl">
                Preventive healthcare designed for different life stages.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-on-primary-container)]/85">
                Invest in your long-term wellness with curated screening packages
                inspired by the Stitch services page.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {packageCards.map((card) => (
                  <article key={card.title} className="rounded-[1.5rem] bg-white p-6 text-[var(--color-on-surface)] shadow-[var(--shadow-soft)]">
                    <div className="inline-flex rounded-2xl bg-[var(--color-surface-container)] p-3 text-[var(--color-primary)]">
                      <PackageIcon icon={card.icon} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--color-primary)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-on-surface-variant)]">
                      {card.description}
                    </p>
                    <button type="button" className="mt-5 text-sm font-semibold text-[var(--color-secondary)]">
                      View Package
                    </button>
                  </article>
                ))}
              </div>
            </div>
            <div className="relative min-h-[20rem] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-strong)]">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200&h=600"
                alt="Doctor consulting patient at V.K. Medical Center"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </div>
        </div>
      </PageSection>
      <SiteFooter />
    </>
  );
}

function SpecialtyServiceIcon({ icon }: { icon: string }) {
  if (icon === "cardiology") return <HeartPulse className="h-6 w-6" />;
  if (icon === "gastroenterology") return <Stethoscope className="h-6 w-6" />;
  if (icon === "nephrology") return <ShieldPlus className="h-6 w-6" />;
  if (icon === "orthopedics") return <ScanHeart className="h-6 w-6" />;
  if (icon === "neurology") return <ShieldPlus className="h-6 w-6" />;
  return <Stethoscope className="h-6 w-6" />;
}

function PackageIcon({ icon }: { icon: string }) {
  if (icon === "heart") return <HeartPulse className="h-5 w-5" />;
  return <ShieldPlus className="h-5 w-5" />;
}
