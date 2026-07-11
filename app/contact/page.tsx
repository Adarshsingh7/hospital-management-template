import type { Metadata } from "next";
import {
  CarFront,
  Clock3,
  FileText,
  Mail,
  MapPin,
  Phone,
  Share2,
  ThumbsUp,
  Users,
} from "lucide-react";
import { PageHero, PageSection, SiteFooter, SiteHeader } from "@/components/site-shell";
import { contactFaqs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader activePath="/contact" />
      <PageHero
        title="Contact Us"
        description="We are dedicated to providing the highest level of care. Reach our team for services, scheduling, billing, or visit planning."
      />
      <PageSection className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="surface-card p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            Send an Inquiry
          </h2>
          <form className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ContactField label="Full Name" placeholder="John Doe" />
              <ContactField label="Email Address" placeholder="john@example.com" type="email" />
            </div>
            <div>
              <label className="form-label" htmlFor="subject">
                Subject
              </label>
              <select id="subject" className="form-field mt-2">
                <option>General Inquiry</option>
                <option>Appointment Help</option>
                <option>Billing &amp; Insurance</option>
                <option>Patient Feedback</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="form-field mt-2 min-h-32 resize-y"
                placeholder="How can we help you today?"
              />
            </div>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </section>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] bg-[var(--color-primary)] p-8 text-white shadow-[var(--shadow-strong)]">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <div className="mt-8 space-y-7">
              <InfoRow
                icon={<Phone className="h-5 w-5" />}
                label="Booking Phone 1"
                value="+91 9450987101"
              />
              <InfoRow
                icon={<Phone className="h-5 w-5" />}
                label="Booking Phone 2"
                value="+91 9839454508"
              />
              <InfoRow
                icon={<Mail className="h-5 w-5" />}
                label="Email Us"
                value="info@vkmedicalcenter.com"
              />
              <InfoRow
                icon={<MapPin className="h-5 w-5" />}
                label="Our Location"
                value="Akbarpur, Baskhari Road, near Kisan Nursery, Ambedkar Nagar"
              />
            </div>
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-100/70">
                Follow Our Socials
              </p>
              <div className="mt-4 flex gap-3">
                {[Share2, Mail, ThumbsUp].map((Icon, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition hover:bg-[var(--color-secondary-fixed)] hover:text-[var(--color-primary)]"
                    aria-label="Social link"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="surface-card bg-[var(--color-surface-container-high)] p-8">
            <h3 className="text-2xl font-semibold text-[var(--color-primary)]">
              OPD Timings
            </h3>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-on-surface)]">
              <div className="flex justify-between gap-4 border-b border-[var(--color-outline-variant)] pb-2">
                <span className="font-semibold text-[var(--color-primary)]">Dr. V.R. Ray (Gastro):</span>
                <span className="text-right">Thursdays (11:00 AM - 3:30 PM)</span>
              </div>
              <div className="flex justify-between gap-4 pt-1">
                <span className="font-semibold text-[var(--color-primary)]">Dr. Surjeet Patel (Neuro):</span>
                <span className="text-right">2nd & 4th Saturdays (11:00 AM - 3:30 PM)</span>
              </div>
            </div>
            <div className="mt-6 flex gap-3 rounded-[1.25rem] bg-[var(--color-primary-container)] p-4 text-sm leading-6 text-[var(--color-on-primary-container)]">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
              <p>
                Please bring previous prescriptions, reports, and MRI scans for the consultation.
              </p>
            </div>
          </section>
        </div>
      </PageSection>

      <section className="relative h-[32rem] overflow-hidden bg-[var(--color-surface-container)]">
        <div
          className="absolute inset-0 grayscale opacity-45"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200&h=600)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,250,252,0),rgba(250,250,252,0.86)_78%,rgba(250,250,252,1))]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--color-primary)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] shadow-[var(--shadow-strong)]">
              V.K. Medical Center
            </div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-strong)] ring-8 ring-[color-mix(in_oklab,var(--color-primary)_18%,transparent)]">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      <PageSection
        title="Common Questions"
        description="Quick answers to help you navigate your visit."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {contactFaqs.map((faq) => (
            <article key={faq.title} className="surface-card group p-6">
              <div className="inline-flex rounded-2xl bg-[var(--color-secondary-container)] p-3 text-[var(--color-on-secondary-container)] transition duration-200 group-hover:scale-105">
                <FaqIcon icon={faq.icon} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[var(--color-on-surface)]">
                {faq.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-on-surface-variant)]">
                {faq.description}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <SiteFooter />
    </>
  );
}

function ContactField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input type={type} className="form-field mt-2" placeholder={placeholder} />
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[var(--color-secondary-fixed)]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100/65">
          {label}
        </p>
        <p className="mt-1 text-lg font-medium">{value}</p>
      </div>
    </div>
  );
}

function FaqIcon({ icon }: { icon: string }) {
  if (icon === "parking") return <CarFront className="h-5 w-5" />;
  if (icon === "visiting") return <Users className="h-5 w-5" />;
  return <FileText className="h-5 w-5" />;
}
