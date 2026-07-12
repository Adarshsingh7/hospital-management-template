import Link from "next/link";
import { Star } from "lucide-react";

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
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 text-center">
        <span className="eyebrow mx-auto">{data.eyebrow}</span>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-primary)] md:text-4xl">
          {data.title}
        </h2>
        <p className="mx-auto max-w-3xl text-base leading-8 text-[var(--color-on-surface-variant)]">
          {data.description}
        </p>
      </div>

      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        <div className="mb-6 break-inside-avoid rounded-[2rem] bg-white p-8 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto inline-flex items-center gap-1 text-3xl font-bold leading-none">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>
          <h3 className="mt-4 text-3xl font-bold text-[var(--color-primary)]">
            {data.businessName}
          </h3>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-4xl font-bold text-[var(--color-primary)]">{data.rating}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-6 w-6 fill-[#fbbc05] text-[#fbbc05]"
                />
              ))}
            </div>
          </div>
          <p className="mt-3 text-lg text-[var(--color-on-surface-variant)]">
            {data.summaryLabel}
          </p>
          <Link
            href={data.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-4 text-lg font-semibold !text-white transition hover:bg-neutral-800"
          >
            {data.writeReviewLabel}
          </Link>
        </div>

        {data.items.map((review) => (
          <article
            key={`${review.name}-${review.date}`}
            className="mb-6 break-inside-avoid rounded-[2rem] bg-white p-8 shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary-container)] text-xl font-bold text-[var(--color-primary)]">
                {review.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[var(--color-primary)]">
                  {review.name}
                </h3>
                <p className="text-base text-[var(--color-on-surface-variant)]">
                  {review.date}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 fill-[#fbbc05] text-[#fbbc05]"
                />
              ))}
            </div>

            <p className="mt-5 text-lg leading-9 text-[var(--color-on-surface-variant)]">
              {review.review}
            </p>

            <div className="mt-8 flex items-center justify-between gap-4">
              <Link
                href={data.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-lg font-medium text-[var(--color-on-surface-variant)] transition hover:text-[var(--color-secondary)]"
              >
                <span className="inline-flex items-center gap-1 text-2xl font-bold leading-none">
                  <span className="text-[#4285F4]">G</span>
                </span>
                {data.reviewLinkLabel}
              </Link>
              <span className="text-xl text-[#4285F4]">↗</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
