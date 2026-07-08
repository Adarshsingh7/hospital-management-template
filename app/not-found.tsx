import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 text-4xl font-bold text-[var(--color-primary)] md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-on-surface-variant)]">
        The page you requested is not available in this portal. Return to the
        hospital homepage to continue browsing services and appointments.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to homepage
      </Link>
    </main>
  );
}
