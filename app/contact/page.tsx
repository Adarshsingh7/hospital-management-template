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
import { contactFaqs, contactPageData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: contactPageData.metadata.title,
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader activePath="/contact" />
      <PageHero
        title={contactPageData.hero.title}
        description={contactPageData.hero.description}
      />
      <PageSection className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="surface-card p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            {contactPageData.inquirySection.title}
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
                {contactPageData.inquirySection.subjectOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
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
              {contactPageData.inquirySection.submitLabel}
            </button>
          </form>
        </section>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] bg-[var(--color-primary)] p-8 text-white shadow-[var(--shadow-strong)]">
            <h2 className="text-2xl font-semibold">{contactPageData.infoSection.title}</h2>
            <div className="mt-8 space-y-7">
              {contactPageData.infoSection.rows.map((row) => (
                <InfoRow
                  key={row.label}
                  icon={getContactInfoIcon(row.icon)}
                  label={row.label}
                  value={row.value}
                />
              ))}
            </div>
            <div className="mt-8 rounded-[1.25rem] border border-white/15 bg-white/8 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100/65">
                {contactPageData.infoSection.siteAddress.label}
              </p>
              <a
                href={contactPageData.infoSection.siteAddress.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-base font-medium text-white underline underline-offset-4 transition hover:text-[var(--color-secondary-fixed)]"
              >
                {contactPageData.infoSection.siteAddress.text}
              </a>
            </div>
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-100/70">
                {contactPageData.infoSection.socialsLabel}
              </p>
              <div className="mt-4 flex gap-3">
                {contactPageData.infoSection.socialIcons.map((icon, idx) => {
                  const Icon = getSocialIcon(icon);
                  return (
                    <button
                      key={idx}
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition hover:bg-[var(--color-secondary-fixed)] hover:text-[var(--color-primary)]"
                      aria-label="Social link"
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="surface-card bg-[var(--color-surface-container-high)] p-8">
            <h3 className="text-2xl font-semibold text-[var(--color-primary)]">
              {contactPageData.opdSection.title}
            </h3>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-on-surface)]">
              {contactPageData.opdSection.timings.map((timing, index) => (
                <div key={timing.label} className={`flex justify-between gap-4 ${index === 0 ? "border-b border-[var(--color-outline-variant)] pb-2" : "pt-1"}`}>
                  <span className="font-semibold text-[var(--color-primary)]">{timing.label}</span>
                  <span className="text-right">{timing.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 rounded-[1.25rem] bg-[var(--color-primary-container)] p-4 text-sm leading-6 text-[var(--color-on-primary-container)]">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
              <p>
                {contactPageData.opdSection.note}
              </p>
            </div>
          </section>
        </div>
      </PageSection>

      <section className="bg-[var(--color-surface-container)] py-8 md:py-12">
        <div className="site-container">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--color-outline-variant)] bg-white shadow-[var(--shadow-strong)]">
            <div className="border-b border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] px-6 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                {contactPageData.mapSection.badge}
              </p>
            </div>
            <iframe
              title={contactPageData.mapSection.badge}
              src={contactPageData.mapSection.embedUrl}
              className="h-[26rem] w-full border-0 md:h-[34rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <PageSection
        title={contactPageData.faqSection.title}
        description={contactPageData.faqSection.description}
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

function getContactInfoIcon(icon: string) {
  if (icon === "phone") return <Phone className="h-5 w-5" />;
  if (icon === "mail") return <Mail className="h-5 w-5" />;
  return <MapPin className="h-5 w-5" />;
}

function getSocialIcon(icon: string) {
  if (icon === "share") return Share2;
  if (icon === "mail") return Mail;
  return ThumbsUp;
}

function FaqIcon({ icon }: { icon: string }) {
  if (icon === "parking") return <CarFront className="h-5 w-5" />;
  if (icon === "visiting") return <Users className="h-5 w-5" />;
  return <FileText className="h-5 w-5" />;
}
