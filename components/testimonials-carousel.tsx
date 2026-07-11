"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  source: "Clinic Testimonial" | "Google Maps Review";
  date?: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar Yadav",
    role: "Gastroenterology Patient",
    quote: "Dr. V.R. Ray's treatment for my chronic liver issue was life-saving. The clarity with which he explains the diagnosis gave me immense confidence. Truly AIIMS-level care in Akbarpur.",
    rating: 5,
    source: "Clinic Testimonial",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Sandeep Kumar Maurya",
    role: "Neurosurgery Patient",
    quote: "V.K. Medical Center is the best neuro clinic in Akbarpur. Dr. Surjeet Sir is the best doctor for neurosurgery in Akbarpur.",
    rating: 5,
    source: "Google Maps Review",
    date: "1 month ago",
  },
  {
    name: "PS Water CHEMICAL",
    role: "Neurosurgery Patient",
    quote: "Best Neuro Doctor in Akbarpur. Excellent consulting and spine care advice.",
    rating: 5,
    source: "Google Maps Review",
    date: "1 month ago",
  },
  {
    name: "STech Web Solution",
    role: "Gastroenterology Patient",
    quote: "Best gastroenterologist in Akbarpur. Very highly recommended for digestive health issues.",
    rating: 5,
    source: "Google Maps Review",
    date: "4 weeks ago",
  },
];

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const active = testimonials[activeIndex];

  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="space-y-6">
        <span className="eyebrow text-blue-100/75">Patient Testimonials</span>
        <h2 className="text-4xl font-bold md:text-5xl">
          What our patients say about us
        </h2>
        <p className="max-w-xl text-lg leading-8 text-blue-100/80">
          Real reviews and healing stories from patients treated by our AIIMS and KGMU alumni specialists.
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:bg-white/10 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:bg-white/10 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Review Card */}
      <article className="relative min-h-[320px] rounded-[2rem] border border-white/10 bg-white/7 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-md md:p-10 flex flex-col justify-between transition-all duration-300 animate-in fade-in zoom-in-95">
        <div>
          {/* Top Badge & Rating */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
              active.source === "Google Maps Review" 
                ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                : "bg-blue-400/20 text-blue-300 border border-blue-400/30"
            }`}>
              {active.source}
            </span>
            <div className="flex gap-1">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <p className="text-xl leading-9 text-white/95 font-medium italic">
            &ldquo;{active.quote}&rdquo;
          </p>
        </div>

        {/* User Footer */}
        <div className="mt-9 flex items-center gap-4">
          {active.image ? (
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/10">
              <Image
                src={active.image}
                alt={active.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
          ) : (
            <div className="h-14 w-14 rounded-full bg-white/10 border-2 border-white/10 flex items-center justify-center text-white font-bold text-lg">
              {active.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div className="font-bold text-white text-base">{active.name}</div>
            <div className="text-sm text-blue-100/70 flex items-center gap-2">
              <span>{active.role}</span>
              {active.date && (
                <>
                  <span className="text-blue-100/40">&bull;</span>
                  <span>{active.date}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
