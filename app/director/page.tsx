import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  CalendarCheck2, 
  MapPin, 
  Phone, 
  Award, 
  Building2, 
  CheckCircle2 
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Director's Desk | Dr. Vinay Maurya | V.K. Medical Center",
  description: "Read the profile and vision of Dr. Vinay Maurya (BMAS), Director of V.K. Medical Center, Akbarpur. Learn about our commitment to accessible, elite specialist care in Ambedkar Nagar.",
};

export default function DirectorPage() {
  return (
    <>
      <SiteHeader activePath="" />
      <main className="min-h-screen bg-[var(--color-surface-container-low)]">
        {/* Breadcrumb section */}
        <section className="bg-white border-b border-[var(--color-outline-variant)] py-4">
          <div className="site-container flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <span className="text-xs font-semibold text-[var(--color-outline)]">
              Leadership / Director Profile
            </span>
          </div>
        </section>

        <section className="site-container mt-10 pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Left Column: Profile Card & Quick Info */}
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[2.5rem] bg-white border border-[var(--color-outline-variant)] p-6 shadow-md">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-muted">
                  <Image
                    src="/director.jpeg"
                    alt="Dr. Vinay Maurya"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 35vw, 100vw"
                  />
                  {/* Title Overlay / Badge */}
                  <div className="absolute left-4 bottom-4 rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    Director
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-4 flex gap-4">
                    <Award className="h-5 w-5 shrink-0 text-[var(--color-secondary)] mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">Credentials</h4>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">BMAS (Bachelor of Medicine & Surgery)</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-4 flex gap-4">
                    <Building2 className="h-5 w-5 shrink-0 text-[var(--color-secondary)] mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">Role</h4>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">Director & Chief Administrator, V.K. Medical Center</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-4 flex gap-4">
                    <MapPin className="h-5 w-5 shrink-0 text-[var(--color-secondary)] mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">Location</h4>
                      <p className="mt-1 text-sm text-[var(--color-primary)] font-medium">
                        Akbarpur, Baskhari Road, near Kisan Nursery, Ambedkar Nagar, UP.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/book-appointment"
                    className="btn-primary w-full justify-center text-sm py-3.5 rounded-2xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CalendarCheck2 className="h-5 w-5" />
                    Book Clinic Consultation
                  </Link>
                </div>
              </div>

              {/* Administrative Information Box */}
              <div className="rounded-[2.5rem] border border-white/20 bg-[var(--color-primary)] p-8 text-white shadow-md">
                <h4 className="text-lg font-bold">Contact the Director&apos;s Office</h4>
                <p className="mt-2 text-xs leading-relaxed text-blue-100/90">
                  For administrative inquiries, collaborations, corporate health tie-ups, or feedback regarding services at V.K. Medical Center, please contact our administrative helpline.
                </p>
                <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between">
                  <div className="flex gap-1.5 items-center">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs font-semibold">+91 9450987101</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Profile, Vision, Values */}
            <div className="flex flex-col gap-6">
              <div className="rounded-[2.5rem] bg-white border border-[var(--color-outline-variant)] p-8 shadow-sm">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)] block">
                  LEADERSHIP PROFILE
                </span>
                <h1 className="text-3xl font-extrabold text-[var(--color-primary)] sm:text-4xl mt-2">
                  Dr. Vinay Maurya
                </h1>
                <p className="mt-2 text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-[0.05em]">
                  Director, V.K. Medical Center Akbarpur
                </p>

                <div className="mt-6 h-[1px] bg-[var(--color-outline-variant)] w-full" />

                <div className="mt-6 space-y-5">
                  <h3 className="text-lg font-bold text-[var(--color-primary)]">About the Director</h3>
                  <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">
                    Dr. Vinay Maurya is the Director and foundational visionary of V.K. Medical Center. Holding a BMAS degree, he combines clinical understanding with rigorous administrative expertise, leading the clinic with a patient-first ethos.
                  </p>
                  <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">
                    Under his leadership, V.K. Medical Center has transformed from a local clinic into Akbarpur&apos;s premier specialty healthcare destination. His core mission has been clear since inception: to establish a world-class hub of consulting specialists, removing the necessity for patients in Ambedkar Nagar to undertake long, exhausting, and expensive journeys to major metropolitan areas for advanced care.
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="rounded-[2.5rem] bg-white border border-[var(--color-outline-variant)] p-8 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[var(--color-primary)]">Our Founding Vision</h3>
                <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">
                  &quot;We envisioned V.K. Medical Center as a beacon of trustworthy, specialized medicine. Healthcare accessibility is not just about local availability; it is about bringing the highest caliber of medical expertise directly to the people. By coordinating with alumni specialists from KGMU Lucknow and AIIMS Delhi, we ensure that every diagnosis is accurate and every treatment plan is evidence-based.&quot;
                </p>
                <div className="border-t border-[var(--color-outline-variant)] pt-6">
                  <h4 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4">Core Leadership Pillars</h4>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Elite Specialist Access",
                      "Transparent & Ethical Consultations",
                      "Patient-First Diagnostics",
                      "Fully Digitized Health Records",
                      "Affordable Super-Specialty Rates",
                      "Dedicated Community Care"
                    ].map((pillar, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[var(--color-secondary)] shrink-0" />
                        <span className="text-sm font-semibold text-[var(--color-on-surface)]">{pillar}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Message to the Community */}
              <div className="rounded-[2.5rem] bg-white border border-[var(--color-outline-variant)] p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[var(--color-primary)]">Message to Ambedkar Nagar</h3>
                <p className="mt-3 text-base leading-8 text-[var(--color-on-surface-variant)]">
                  &quot;V.K. Medical Center is deeply committed to the health and well-being of Akbarpur and the wider Ambedkar Nagar district. We thank our patients for their trust and Google reviews, which motivate us daily. We promise to continue expanding our specialized services, bringing more senior consultants, and keeping our standards high so that your health is always in safe, expert hands.&quot;
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/services"
                    className="btn-outline justify-center gap-2 py-3 px-6 text-sm font-semibold"
                  >
                    View Our Specialties
                  </Link>
                  <a
                    href="tel:+919450987101"
                    className="btn-primary justify-center gap-2 py-3 px-6 text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    Call Helpline: +91 9450987101
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
