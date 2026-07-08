import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Info,
  Phone,
  ShieldPlus,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { PageHero, PageSection, SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  appointmentDepartments,
  appointmentDoctors,
  appointmentTimeSlots,
  bookingSteps,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Book an Appointment",
};

export default function BookAppointmentPage() {
  return (
    <>
      <SiteHeader activePath="/book-appointment" />
      <PageHero
        title="Appointment Booking"
        description="A four-step scheduling flow inspired by the Stitch screen, organized for fast triage and clear specialist selection."
      />
      <PageSection className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div className="surface-card p-6">
            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
              Booking Progress
            </h2>
            <div className="mt-6 space-y-5">
              {bookingSteps.map((step, index) => {
                const active = index === 0;
                return (
                  <div key={step} className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold ${
                        active
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                          : "border-[var(--color-outline-variant)] text-[var(--color-outline)]"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                        active
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-outline)]"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="surface-card bg-[var(--color-surface-container)] p-6">
            <h3 className="text-xl font-semibold text-[var(--color-primary)]">
              Need Help?
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-on-surface-variant)]">
              Our booking assistance team is available 24/7 for support.
            </p>
            <a className="btn-secondary mt-6 w-full justify-center" href="tel:+18001066">
              <Phone className="h-5 w-5" />
              Call Helpdesk
            </a>
          </div>
        </aside>

        <div className="space-y-8">
          <StepCard
            title="Step 1: Select Department"
            badge="Required"
            content={
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {appointmentDepartments.map((department, index) => (
                  <button
                    key={department.name}
                    type="button"
                    className={`rounded-[1.25rem] border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] ${
                      index === 0
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-fixed)]"
                        : "border-[var(--color-outline-variant)] bg-white"
                    }`}
                  >
                    <div className="inline-flex rounded-2xl bg-[var(--color-secondary-container)] p-3 text-[var(--color-secondary)]">
                      <DepartmentIcon icon={department.icon} />
                    </div>
                    <p className="mt-4 text-base font-semibold text-[var(--color-primary)]">
                      {department.name}
                    </p>
                  </button>
                ))}
              </div>
            }
          />

          <StepCard
            title="Step 2: Choose Your Specialist"
            action={
              <div className="relative w-full max-w-xs">
                <UserRound className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--color-outline)]" />
                <input
                  type="text"
                  placeholder="Search doctor name..."
                  className="h-11 w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] pl-10 pr-4 text-sm outline-none transition focus:border-[var(--color-secondary)]"
                />
              </div>
            }
            content={
              <div className="grid gap-6 lg:grid-cols-2">
                {appointmentDoctors.map((doctor, index) => (
                  <article
                    key={doctor.name}
                    className={`surface-card relative flex gap-4 p-4 ${
                      index === 0
                        ? "border-[var(--color-secondary)] bg-[color-mix(in_oklab,var(--color-secondary-container)_14%,white)]"
                        : ""
                    }`}
                  >
                    <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--color-primary)] shadow-[var(--shadow-soft)]">
                      {doctor.rating}
                    </div>
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1rem] bg-[var(--color-surface-container)]">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                        {doctor.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
                        {doctor.specialty}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-secondary)]">
                        <Check className="h-4 w-4" />
                        {doctor.availability}
                      </div>
                      <button
                        type="button"
                        className="mt-4 text-sm font-semibold text-[var(--color-secondary)] underline"
                      >
                        View Full Profile
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            }
          />

          <StepCard
            title="Step 3: Select Date & Time"
            content={
              <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
                <div className="rounded-[1.5rem] bg-[var(--color-surface-container)] p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-[var(--color-on-surface)]">
                      October 2024
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="icon-button">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button type="button" className="icon-button">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-outline)]">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                      <span key={`${day}-${index}`}>{day}</span>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm">
                    {[29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                      (day) => (
                        <div
                          key={day}
                          className={`rounded-xl py-3 ${
                            day === 2
                              ? "bg-[var(--color-primary)] font-semibold text-white"
                              : day < 1
                                ? "text-[var(--color-outline)] opacity-30"
                                : "bg-white text-[var(--color-on-surface)]"
                          }`}
                        >
                          {day}
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-[var(--color-on-surface)]">
                    Available Slots for Oct 2nd
                  </div>
                  <div className="mt-4 grid max-h-64 grid-cols-2 gap-3 overflow-y-auto pr-2">
                    {appointmentTimeSlots.map((slot, index) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={slot.disabled}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          slot.disabled
                            ? "cursor-not-allowed bg-[var(--color-surface-container-highest)] text-[var(--color-outline)] line-through"
                            : index === 1
                              ? "border-2 border-[var(--color-secondary)] bg-[color-mix(in_oklab,var(--color-secondary-container)_24%,white)] text-[var(--color-primary)]"
                              : "border border-[var(--color-outline-variant)] bg-white text-[var(--color-on-surface)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary-container)]/25"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            }
          />

          <StepCard
            title="Step 4: Patient Details"
            content={
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Full Name" placeholder="John Doe" />
                  <Field label="Contact Number" placeholder="+1 (555) 000-0000" />
                  <div className="md:col-span-2">
                    <label className="form-label" htmlFor="reason">
                      Reason for Visit
                    </label>
                    <textarea
                      id="reason"
                      rows={4}
                      placeholder="Briefly describe your symptoms or reason for the appointment..."
                      className="form-field mt-2 min-h-28 resize-y"
                    />
                  </div>
                </div>
                <div className="flex gap-3 rounded-[1.25rem] bg-[var(--color-surface-container-high)] p-4 text-sm leading-7 text-[var(--color-on-surface-variant)]">
                  <Info className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <p>
                    By clicking confirm, you agree to our patient
                    confidentiality policy. An SMS confirmation will be sent to
                    your mobile number.
                  </p>
                </div>
                <div className="flex flex-col justify-end gap-4 border-t border-[var(--color-outline-variant)] pt-6 md:flex-row">
                  <button type="button" className="btn-outline">
                    Save as Draft
                  </button>
                  <button type="submit" className="btn-danger">
                    Confirm Appointment
                  </button>
                </div>
              </form>
            }
          />
        </div>
      </PageSection>
      <SiteFooter />
    </>
  );
}

function StepCard({
  title,
  badge,
  action,
  content,
}: {
  title: string;
  badge?: string;
  action?: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <section className="surface-card p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            {title}
          </h2>
          {badge ? (
            <span className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-on-surface-variant)]">
              {badge}
            </span>
          ) : null}
        </div>
        {action}
      </div>
      {content}
    </section>
  );
}

function DepartmentIcon({ icon }: { icon: string }) {
  if (icon === "cardiology") return <HeartPulse className="h-6 w-6" />;
  if (icon === "neurology") return <ShieldPlus className="h-6 w-6" />;
  if (icon === "orthopedics") return <Stethoscope className="h-6 w-6" />;
  return <CalendarDays className="h-6 w-6" />;
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input className="form-field mt-2" placeholder={placeholder} />
    </div>
  );
}
