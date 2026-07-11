import type { Metadata } from "next";
import { PageHero, PageSection, SiteFooter, SiteHeader } from "@/components/site-shell";
import { BookingWizard } from "@/components/booking-wizard";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Schedule a consultation with our senior specialists across Gastroenterology, Neurosurgery, Orthopedics, and Gynecology in Akbarpur.",
};

export default function BookAppointmentPage() {
  return (
    <>
      <SiteHeader activePath="/book-appointment" />
      <PageHero
        title="Book an OPD Appointment"
        description="Schedule a consultation with our senior specialists in Gastroenterology, Neurosurgery, Orthopedics, and Gynecology."
      />
      <PageSection>
        <BookingWizard />
      </PageSection>
      <SiteFooter />
    </>
  );
}
