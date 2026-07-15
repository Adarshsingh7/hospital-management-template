"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Layers, 
  Stethoscope, 
  Brain, 
  Bone, 
  Baby, 
  Building2 
} from "lucide-react";
import { SiteHeader, SiteFooter, PageHero, PageSection } from "@/components/site-shell";
import { ScrollReveal } from "@/components/scroll-reveal";

// Gallery image definitions with high-quality descriptions and tags
interface GalleryImage {
  id: string;
  title: string;
  category: "Gastroenterology" | "Neurosurgery" | "Orthopedics" | "Gynecology" | "Facilities";
  description: string;
  imageUrl: string;
}

const galleryImages: GalleryImage[] = [
  // Gastroenterology
  {
    id: "gastro-1",
    title: "Endoscopy Suite",
    category: "Gastroenterology",
    description: "Advanced upper GI endoscopy and colonoscopy diagnostic setup.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "gastro-2",
    title: "Gastroenterology Consultation",
    category: "Gastroenterology",
    description: "Dr. V.R. Ray discussing digestive and liver health reports with a patient.",
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "gastro-3",
    title: "Diagnostic Pathology Work",
    category: "Gastroenterology",
    description: "Analyzing stomach biopsy and liver pathology reports under advanced laboratory systems.",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  // Neurosurgery
  {
    id: "neuro-1",
    title: "Brain MRI Scan Review",
    category: "Neurosurgery",
    description: "Detailed MRI examination for cranial nerve mapping and tumor diagnostics.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "neuro-2",
    title: "Micro-Neurosurgery Setup",
    category: "Neurosurgery",
    description: "High-precision microscopic tools used in complex brain and spine surgeries.",
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "neuro-3",
    title: "Neurological Nerve Exam",
    category: "Neurosurgery",
    description: "Nerve testing and headache diagnostics conducted at the outpatient specialist clinic.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  // Orthopedics
  {
    id: "ortho-1",
    title: "Orthopedic Joint Exam",
    category: "Orthopedics",
    description: "Dr. Amit Sharma explaining knee joint mechanics and arthritis care to a patient.",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "ortho-2",
    title: "Skeletal Digital X-Ray",
    category: "Orthopedics",
    description: "High-resolution digital X-ray diagnostics for fractures and spine alignment.",
    imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "ortho-3",
    title: "Joint & Spine Rehabilitation",
    category: "Orthopedics",
    description: "Rehabilitation and recovery therapies for joint and ligament issues.",
    imageUrl: "https://images.unsplash.com/photo-1579684453423-f84349ef1a2e?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  // Gynecology
  {
    id: "gyn-1",
    title: "Maternity Checkup",
    category: "Gynecology",
    description: "Comprehensive ultrasound diagnostics and fetal wellness monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "gyn-2",
    title: "Women's Health Consultation",
    category: "Gynecology",
    description: "Dr. Priya Singh discussing preventative healthcare plans and women wellness.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "gyn-3",
    title: "Warm Consultation Setting",
    category: "Gynecology",
    description: "A private, safe, and comfortable consultation room for maternity counseling.",
    imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  // Facilities
  {
    id: "facility-1",
    title: "OPD Coordination Center",
    category: "Facilities",
    description: "Main reception and patient coordination area designed for quick checks.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "facility-2",
    title: "Modern Clinical Corridors",
    category: "Facilities",
    description: "Clean, hygienic, and highly organized passageways connecting specialist OPD chambers.",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d3b3de97e683?auto=format&fit=crop&q=80&w=1200&h=800"
  },
  {
    id: "facility-3",
    title: "Patient Outpatient Lounge",
    category: "Facilities",
    description: "Spacious, comfortable seating lounge for patient attendants and appointment booking.",
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1200&h=800"
  }
];

const categories = [
  { id: "all", label: "All Images", icon: Layers },
  { id: "Gastroenterology", label: "Gastroenterology", icon: Stethoscope },
  { id: "Neurosurgery", label: "Neurosurgery", icon: Brain },
  { id: "Orthopedics", label: "Orthopedics", icon: Bone },
  { id: "Gynecology", label: "Gynecology", icon: Baby },
  { id: "Facilities", label: "Clinic & Facilities", icon: Building2 }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images based on state
  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
  }, [lightboxIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation support for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <>
      <SiteHeader activePath="/gallery" />

      <main className="pb-24">
        {/* Page Hero Section */}
        <PageHero
          title="Image Gallery"
          description="Explore our clinical departments, medical facilities, and consulting environments built for premium patient care in Akbarpur."
        />

        {/* Gallery Content Section */}
        <PageSection>
          {/* Category Filter Tabs */}
          <ScrollReveal direction="up" duration={600}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12 border-b border-[var(--color-outline-variant)] pb-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setLightboxIndex(null);
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                      isActive 
                        ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/10 scale-[1.03]" 
                        : "bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container-high)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Grid Layout of Gallery Images */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image, index) => (
              <ScrollReveal
                key={image.id}
                direction="up"
                delay={index * 50}
                duration={600}
                className="h-full"
              >
                <div 
                  onClick={() => setLightboxIndex(index)}
                  className="surface-card group cursor-pointer overflow-hidden border border-[var(--color-outline-variant)] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl rounded-[2rem] h-full flex flex-col justify-between"
                >
                  {/* Image wrapper */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface-container)] shrink-0">
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                    
                    {/* Hover overlay with button */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 text-[var(--color-primary)] p-3 rounded-full shadow-lg backdrop-blur scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Department Badge */}
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] border border-[var(--color-outline-variant)] shadow-sm">
                      {image.category}
                    </div>
                  </div>

                  {/* Text descriptions */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                        {image.title}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-[var(--color-on-surface-variant)] line-clamp-2">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Fallback empty message (should not happen, but just in case) */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-base text-[var(--color-on-surface-variant)]">No images found in this category.</p>
            </div>
          )}
        </PageSection>

        {/* Call to Action Booking Banner */}
        <PageSection>
          <div className="rounded-[2.5rem] bg-[var(--color-primary)] p-8 md:p-16 text-white relative overflow-hidden shadow-[var(--shadow-strong)]">
            <div className="max-w-xl space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-rose-100/80">
                Patient-First Consultations
              </span>
              <h2 className="text-3xl font-extrabold md:text-5xl leading-tight text-white">
                Book an OPD Appointment Today
              </h2>
              <p className="text-base text-rose-100/80 leading-7">
                Schedule your consultation with our AIIMS Delhi and KGMU Lucknow alumni specialists in just a few clicks.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/book-appointment" className="btn-secondary px-6 py-3 font-bold justify-center rounded-xl text-sm shrink-0">
                  Book Consultation Now
                </Link>
                <a href="tel:+919450987101" className="btn-glass px-6 py-3 font-bold justify-center rounded-xl text-sm shrink-0">
                  Call Helpline
                </a>
              </div>
            </div>
          </div>
        </PageSection>
      </main>

      <SiteFooter />

      {/* Lightbox Modal Overlay */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white p-4 backdrop-blur-sm transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Close viewer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image Container with maximum height & width constraints */}
          <div className="relative w-full max-w-4xl aspect-[4/3] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={filteredImages[lightboxIndex].imageUrl}
              alt={filteredImages[lightboxIndex].title}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>

          {/* Descriptions and counter info */}
          <div className="mt-6 text-center max-w-2xl px-4">
            <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-2xs font-semibold uppercase tracking-wider text-rose-100/90 mb-2">
              {filteredImages[lightboxIndex].category}
            </div>
            <h4 className="text-xl font-bold md:text-2xl text-white">
              {filteredImages[lightboxIndex].title}
            </h4>
            <p className="mt-2 text-sm text-gray-300 max-w-lg mx-auto">
              {filteredImages[lightboxIndex].description}
            </p>
            <div className="mt-4 text-xs font-semibold tracking-wider text-gray-500">
              Image {lightboxIndex + 1} of {filteredImages.length}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
