import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Heart, Shield, Users, Trophy } from "lucide-react";
import { SiteHeader, SiteFooter, PageHero, PageSection } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "About Us | V.K. Medical Center",
  description: "Learn more about V.K. Medical Center, our founders, and our mission to provide elite medical care in Akbarpur, Ambedkar Nagar.",
};

const trustHighlights = [
  {
    icon: Trophy,
    title: "Alumni Excellence",
    description: "Our doctors are alumni of India's premier institutes, including AIIMS Delhi and KGMU Lucknow.",
  },
  {
    icon: Users,
    title: "Patient-First Care",
    description: "Focused consultations, detailed diagnostic explanations, and compassionate healing touch.",
  },
  {
    icon: Shield,
    title: "Advanced Standards",
    description: "Equipped with state-of-the-art diagnostic facilities and following international quality protocols.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader activePath="/about" />
      
      {/* Page Hero */}
      <PageHero
        title="About V.K. Medical Center"
        description="Bringing world-class super-specialty healthcare closer to Ambedkar Nagar. Founded on clinical excellence, integrity, and patient-first values."
      />

      {/* Overview Section */}
      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          <div className="relative min-h-[350px] md:min-h-[450px] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-strong)]">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200&h=800"
              alt="Consultation desk at V.K. Medical Center"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)] block">
              OUR MISSION & PURPOSE
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--color-primary)] md:text-4xl leading-tight">
              Elevating local medical care with elite training and specialization
            </h2>
            <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">
              At **V.K. Medical Center**, we understand that access to high-quality healthcare is essential. Historically, residents of Akbarpur and surrounding areas had to travel to larger metros for advanced gastroenterology and neurosurgery consultations. 
            </p>
            <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">
              Our clinic bridges this gap by bringing senior clinicians with qualifications from **AIIMS Delhi** and **KGMU Lucknow** directly to Akbarpur. We ensure that every patient receives accurate diagnostics, evidence-based medication advice, and customized care.
            </p>
            
            <div className="pt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--color-primary)]">
                <Check className="h-5 w-5 text-[var(--color-secondary)] shrink-0" />
                <span>DM Gastroenterology (AIIMS)</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--color-primary)]">
                <Check className="h-5 w-5 text-[var(--color-secondary)] shrink-0" />
                <span>MCh Neurosurgery Expertise</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--color-primary)]">
                <Check className="h-5 w-5 text-[var(--color-secondary)] shrink-0" />
                <span>Live Database Appointment Scheduling</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--color-primary)]">
                <Check className="h-5 w-5 text-[var(--color-secondary)] shrink-0" />
                <span>Fully Digitized Medical Records</span>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Trust Highlights */}
      <PageSection className="bg-[var(--color-surface-container-low)] py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)]">
            WHY TRUST US
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--color-primary)]">
            High standards of outpatient services
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {trustHighlights.map((item, idx) => {
            const Icon = item.icon;
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

      {/* Specialist Founders Profile Section */}
      <PageSection>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)]">
            OUR SPECIALIST LEADERS
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--color-primary)] md:text-4xl">
            Meet our senior consulting specialists
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Doctor 1 */}
          <article className="surface-card p-6 flex flex-col md:flex-row gap-6 hover:shadow-[var(--shadow-strong)] transition duration-300">
            <div className="relative h-48 w-full md:w-48 shrink-0 overflow-hidden rounded-2xl bg-[var(--color-surface-container)]">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=350&h=350"
                alt="Dr. V.R. Ray"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 200px, 100vw"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-[var(--color-primary)]">
                  Dr. V.R. Ray
                </h3>
                <p className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider mt-1">
                  DM Gastroenterology (AIIMS Delhi)
                </p>
                <p className="text-sm font-semibold text-[var(--color-outline)] mt-1">
                  MBBS, MD (KGMU)
                </p>
                <p className="mt-3 text-xs leading-5 text-[var(--color-on-surface-variant)]">
                  Over a decade of specialist experience diagnosing and treating complex gastrointestinal, digestive, liver, and pancreatic disorders. Former senior resident at AIIMS Delhi.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--color-outline-variant)] text-xs font-bold text-[var(--color-primary)]">
                OPD Schedule: Every Thursday
              </div>
            </div>
          </article>

          {/* Doctor 2 */}
          <article className="surface-card p-6 flex flex-col md:flex-row gap-6 hover:shadow-[var(--shadow-strong)] transition duration-300">
            <div className="relative h-48 w-full md:w-48 shrink-0 overflow-hidden rounded-2xl bg-[var(--color-surface-container)]">
              <Image
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=350&h=350"
                alt="Dr. Surjeet Singh Patel"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 200px, 100vw"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-[var(--color-primary)]">
                  Dr. Surjeet Singh Patel
                </h3>
                <p className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider mt-1">
                  MCh Neurosurgery (Senior Specialist)
                </p>
                <p className="text-sm font-semibold text-[var(--color-outline)] mt-1">
                  MBBS, MS
                </p>
                <p className="mt-3 text-xs leading-5 text-[var(--color-on-surface-variant)]">
                  Senior neurosurgeon specializing in delicate brain surgery, spinal cord corrections, nerve blocks, and chronic pain management. Employs advanced micro-neurosurgical techniques.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--color-outline-variant)] text-xs font-bold text-[var(--color-primary)]">
                OPD Schedule: 2nd & 4th Saturday
              </div>
            </div>
          </article>
        </div>
      </PageSection>

      {/* CTA Section */}
      <PageSection>
        <div className="rounded-[2.5rem] bg-[var(--color-primary)] p-8 md:p-16 text-white relative overflow-hidden shadow-[var(--shadow-strong)]">
          <div className="max-w-xl space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-rose-100/80">
              EASY ONLINE APPOINTMENTS
            </span>
            <h2 className="text-3xl font-extrabold md:text-5xl leading-tight text-white">
              Ready to schedule your OPD consultation?
            </h2>
            <p className="text-base text-rose-100/80 leading-7">
              Select your department, doctor, and timeslot in just four clicks. Secure your appointment confirmation immediately.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href="/book-appointment" className="btn-secondary px-6 py-3 font-bold justify-center rounded-xl text-sm shrink-0">
                Book Consultation Now
              </Link>
              <a href="tel:+919450987101" className="btn-outline border-white/20 text-white hover:bg-white/10 px-6 py-3 font-bold justify-center rounded-xl text-sm shrink-0">
                Call Helpline
              </a>
            </div>
          </div>
        </div>
      </PageSection>

      <SiteFooter />
    </>
  );
}
