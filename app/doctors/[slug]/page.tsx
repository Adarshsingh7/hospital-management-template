import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarCheck2,
  Clock,
  MapPin,
  Phone,
  Star,
  CheckCircle,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { appointmentDoctors } from "@/lib/site-data";

// Generate static params for all doctors
export async function generateStaticParams() {
  return appointmentDoctors.map((doctor) => ({
    slug: doctor.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = appointmentDoctors.find((d) => d.slug === slug);
  if (!doctor) {
    return {
      title: "Doctor Profile Not Found",
    };
  }
  return {
    title: `${doctor.name} | V.K. Medical Center`,
    description: `${doctor.specialty} at V.K. Medical Center. ${doctor.subspecialty}. Book OPD consultation in Akbarpur.`,
  };
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const doctor = appointmentDoctors.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  // Define specialty details and services based on department/slug
  const servicesMap: Record<string, string[]> = {
    gastroenterology: [
      "Stomach & Intestine Ulcer treatment",
      "Fatty Liver, Hepatitis, & Cirrhosis care",
      "Chronic Acidity, Heartburn, & GERD management",
      "Colitis, IBS (Irritable Bowel Syndrome) therapy",
      "Pancreatic & Gallbladder disease consultation",
      "Digestive issues, persistent constipation & bloating",
    ],
    neurosurgery: [
      "Brain tumors & vascular anomaly consultations",
      "Spine disorders, slip disc, & sciatica therapies",
      "Chronic headache, migraine, & facial pain care",
      "Nerve pain, neuropathy, & tingling management",
      "Microscopic & minimally invasive neurosurgical guidance",
      "Head injury, stroke rehab, & palsy consultations",
    ],
    orthopedics: [
      "Total Knee & Hip replacement consultations",
      "Osteoarthritis, rheumatoid arthritis management",
      "Complex fractures, trauma care & bone alignment",
      "Chronic joint pain, neck pain, & lower back pain therapy",
      "Sports injuries, ligament tears & sprains",
      "Osteoporosis screening & bone mineral density improvement",
    ],
    gynecology: [
      "High-risk pregnancy management & antenatal care",
      "PCOS & PCOD medical plans and lifestyle advice",
      "Irregular periods, fibroids, & ovarian cyst treatments",
      "Maternity health checkups & prenatal counseling",
      "Menopausal symptoms & hormonal balance programs",
      "Preventive screenings, pap smear, & breast health checks",
    ],
  };

  const services = servicesMap[doctor.department.toLowerCase()] || [];

  return (
    <>
      <SiteHeader activePath="" />
      <main className="min-h-screen bg-[var(--color-surface-container-low)] pb-24">
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
              Doctors / {doctor.name}
            </span>
          </div>
        </section>

        <section className="site-container mt-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left Column: Card & Visual Callouts */}
            <div className="space-y-6">
              {/* Doctor Card Profile */}
              <div className="overflow-hidden rounded-[2.5rem] bg-white border border-[var(--color-outline-variant)] p-6 shadow-md">
                <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-muted">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 35vw, 100vw"
                  />
                  {/* Rating Badge */}
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-4 py-1.5 text-sm font-extrabold text-[var(--color-primary)] shadow-sm backdrop-blur">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                  </div>
                  {/* Department Badge */}
                  <div className="absolute left-4 bottom-4 rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    {doctor.department}
                  </div>
                </div>

                {/* Quick Info */}
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-4 flex gap-4">
                    <Clock className="h-5 w-5 shrink-0 text-[var(--color-secondary)] mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">OPD Availability</h4>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">{doctor.availability}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-4 flex gap-4">
                    <MapPin className="h-5 w-5 shrink-0 text-[var(--color-secondary)] mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">Clinic Address</h4>
                      <p className="mt-1 text-sm text-[var(--color-primary)] font-medium leading-relaxed">
                        Akbarpur, Baskhari Road, near Kisan Nursery, Ambedkar Nagar, UP.
                      </p>
                    </div>
                  </div>

                  {/* Call-to-action button */}
                  <Link
                    href="/book-appointment"
                    className="btn-primary w-full justify-center text-sm py-3.5 rounded-2xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl shadow-[var(--color-primary)]/10"
                  >
                    <CalendarCheck2 className="h-5 w-5" />
                    Book OPD Appointment
                  </Link>
                </div>
              </div>

              {/* Patient Guideline Box */}
              <div className="rounded-[2rem] border border-white/20 bg-[var(--color-primary)] p-8 text-white shadow-md">
                <h4 className="text-lg font-bold">Important Instructions</h4>
                <p className="mt-2 text-xs leading-relaxed text-blue-100/90">
                  Please bring all previous prescriptions, MRI scans, CT reports, blood test results, and discharge summaries for your consultation.
                </p>
                <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between">
                  <div className="flex gap-1.5 items-center">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs font-semibold">+91 9450987101</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full">
                    OPD Hotline
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Bio & Qualifications */}
            <div className="flex flex-col gap-6">
              {/* Doctor Header & Bio */}
              <div className="rounded-[2.5rem] bg-white border border-[var(--color-outline-variant)] p-8 shadow-sm">
                <h1 className="text-3xl font-extrabold text-[var(--color-primary)] sm:text-4xl">
                  {doctor.name}
                </h1>
                <p className="mt-2 text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-[0.05em] leading-relaxed">
                  {doctor.specialty}
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-on-surface-variant)]">
                  {doctor.subspecialty}
                </p>

                <div className="mt-6 h-[1px] bg-[var(--color-outline-variant)] w-full" />

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-[var(--color-primary)]">About the Doctor</h3>
                  <p className="mt-3 text-base leading-8 text-[var(--color-on-surface-variant)]">
                    {doctor.description}
                  </p>
                  <p className="mt-4 text-base leading-8 text-[var(--color-on-surface-variant)]">
                    As a consulting specialist at V.K. Medical Center, {doctor.name} is dedicated to bringing world-class outpatient care to patients in Akbarpur and nearby regions, avoiding the need for long journeys to major metro cities for expert medical opinions.
                  </p>
                </div>
              </div>

              {/* Treatments & Services Card */}
              {services.length > 0 && (
                <div className="rounded-[2.5rem] bg-white border border-[var(--color-outline-variant)] p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-[var(--color-primary)]">Expertise & Treatments</h3>
                  <p className="mt-2 text-sm text-[var(--color-on-surface-variant)] mb-6">
                    Our specialty center is fully equipped to diagnose, consult, and manage the following conditions:
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {services.map((service, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 shrink-0 text-[var(--color-secondary)] mt-0.5" />
                        <span className="text-sm font-medium text-[var(--color-on-surface)] leading-normal">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Consultation Scheduling Info */}
              <div className="rounded-[2.5rem] bg-white border border-[var(--color-outline-variant)] p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[var(--color-primary)]">Book Your Consultation</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-on-surface-variant)]">
                  Appointments can be booked in advance online by clicking the &quot;Book OPD Appointment&quot; button or by contacting the outpatient helpline. Walk-ins are subject to availability, so booking ahead is highly recommended.
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/book-appointment"
                    className="btn-primary justify-center gap-2 py-3 px-6 text-sm"
                  >
                    <CalendarCheck2 className="h-4 w-4" />
                    Book OPD Slot
                  </Link>
                  <a
                    href="tel:+919450987101"
                    className="btn-outline justify-center gap-2 py-3 px-6 text-sm font-semibold"
                  >
                    <Phone className="h-4 w-4" />
                    Call Booking: +91 9450987101
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
