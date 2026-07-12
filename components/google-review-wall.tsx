"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";

type Review = {
  name: string;
  date: string;
  review: string;
  rating: number;
};

type ReviewWallData = {
  eyebrow: string;
  title: string;
  description: string;
  businessName: string;
  rating: string;
  summaryLabel: string;
  writeReviewLabel: string;
  reviewUrl: string;
  reviewLinkLabel: string;
  items: Review[];
};

export function GoogleReviewWall({ data }: { data: ReviewWallData }) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollReviews = (direction: "previous" | "next") => {
    const rail = railRef.current;
    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>("[data-review-card]");
    const gap = 20;
    const cardWidth = firstCard?.offsetWidth ?? rail.clientWidth;
    const distance = direction === "previous" ? -(cardWidth + gap) : cardWidth + gap;

    rail.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3 text-center md:text-left">
          <span className="eyebrow md:mx-0">{data.eyebrow}</span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-primary)] md:text-4xl">
            {data.title}
          </h2>
          <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">
            {data.description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 md:justify-end">
          <button
            type="button"
            onClick={() => scrollReviews("previous")}
            aria-label="Previous Google review"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-outline-variant)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:bg-[var(--color-primary-fixed)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollReviews("next")}
            aria-label="Next Google review"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-outline-variant)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:bg-[var(--color-primary-fixed)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <article
          data-review-card
          className="surface-card flex min-h-[24rem] min-w-[88vw] snap-start flex-col justify-center rounded-[1.5rem] bg-white p-8 text-center sm:min-w-[24rem] lg:min-w-[25rem]"
        >
          <GoogleWordmark />
          <h3 className="mt-5 text-3xl font-bold text-[var(--color-primary)]">
            {data.businessName}
          </h3>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span className="text-4xl font-bold text-[var(--color-primary)]">
              {data.rating}
            </span>
            <StarRating rating={5} size="large" />
          </div>
          <p className="mt-3 text-lg text-[var(--color-on-surface-variant)]">
            {data.summaryLabel}
          </p>
          <Link
            href={data.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center rounded-sm bg-black px-6 py-4 text-base font-semibold !text-white transition hover:bg-neutral-800"
          >
            {data.writeReviewLabel}
          </Link>
        </article>

        {data.items.map((review) => (
          <article
            data-review-card
            key={`${review.name}-${review.date}`}
            className="surface-card flex min-h-[24rem] min-w-[88vw] snap-start flex-col rounded-[1.5rem] bg-white p-8 sm:min-w-[28rem] lg:min-w-[32rem]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary-container)] text-xl font-bold text-[var(--color-primary)]">
                {review.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                  {review.name}
                </h3>
                <p className="text-sm text-[var(--color-on-surface-variant)]">
                  {review.date}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <StarRating rating={review.rating} />
            </div>

            <p className="mt-5 flex-1 text-base leading-8 text-[var(--color-on-surface-variant)]">
              {review.review}
            </p>

            <Link
              href={data.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-[var(--color-secondary)] transition hover:text-[var(--color-primary)]"
            >
              <GoogleInitial />
              {data.reviewLinkLabel}
              <ExternalLink className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function StarRating({
  rating,
  size = "default",
}: {
  rating: number;
  size?: "default" | "large";
}) {
  const iconClass = size === "large" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, index) => (
        <Star
          key={index}
          className={`${iconClass} fill-[#fbbc05] text-[#fbbc05]`}
        />
      ))}
    </div>
  );
}

function GoogleWordmark() {
  return (
    <div className="mx-auto inline-flex items-center gap-1 text-3xl font-bold leading-none">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </div>
  );
}

function GoogleInitial() {
  return (
    <span className="inline-flex text-xl font-bold leading-none text-[#4285F4]">
      G
    </span>
  );
}
