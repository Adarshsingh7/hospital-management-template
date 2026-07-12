"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  User,
  ArrowLeft,
  Check,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { blogsPageData } from "@/lib/site-data";

export default function BlogsPage() {
  const [selectedArticle, setSelectedArticle] = useState<(typeof blogsPageData.articles)[number] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = useMemo(() => {
    return blogsPageData.articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All Insights" ||
        article.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    if (activeCategory !== "All Insights") {
      return filteredArticles[0] || null;
    }
    return blogsPageData.articles[0];
  }, [activeCategory, filteredArticles]);

  const gridArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  const relatedInsights = useMemo(() => {
    if (!selectedArticle) return [];
    return blogsPageData.articles.filter((a) => a.id !== selectedArticle.id).slice(0, 3);
  }, [selectedArticle]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <>
      <SiteHeader activePath="/blogs" />

      {selectedArticle ? (
        <main className="bg-[var(--color-surface-container-lowest)] py-12 md:py-20 animate-in fade-in duration-300">
          <div className="site-container max-w-4xl">
            <button
              onClick={() => {
                setSelectedArticle(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-[var(--color-secondary)] hover:opacity-80 transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              {blogsPageData.detailView.backLabel}
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)]">
                {selectedArticle.category}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-primary)] md:text-5xl leading-tight">
                {selectedArticle.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-b border-[var(--color-outline-variant)] pb-8 mb-8 text-sm text-[var(--color-on-surface-variant)]">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[var(--color-secondary)]" />
                <span className="font-semibold text-[var(--color-primary)]">
                  {selectedArticle.author}
                </span>
                <span className="text-xs text-[var(--color-outline)]">
                  ({selectedArticle.authorRole})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--color-outline)]" />
                <span>{selectedArticle.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--color-outline)]" />
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] shadow-[var(--shadow-strong)] mb-12 bg-[var(--color-surface-container)]">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 800px, 100vw"
              />
            </div>

            <div className="prose max-w-none text-base leading-8 text-[var(--color-on-surface-variant)] space-y-6">
              {selectedArticle.contentMarkdown
                .split("\n\n")
                .filter((p) => p.trim().length > 0)
                .map((paragraph, idx) => {
                  const pTrim = paragraph.trim();

                  if (pTrim.startsWith("###")) {
                    return (
                      <h3
                        key={idx}
                        className="text-2xl font-bold text-[var(--color-primary)] pt-4"
                      >
                        {pTrim.replace("###", "").trim()}
                      </h3>
                    );
                  }

                  if (pTrim.startsWith(">")) {
                    const quoteText = pTrim
                      .split("\n")
                      .map((line) => line.replace(/^>\s?/, "").trim())
                      .join(" ");
                    return (
                      <blockquote
                        key={idx}
                        className="border-l-4 border-[var(--color-secondary)] bg-[var(--color-surface-container)] px-6 py-4 rounded-r-xl italic font-serif text-lg text-[var(--color-primary)] my-6"
                      >
                        {quoteText}
                      </blockquote>
                    );
                  }

                  if (pTrim.startsWith("-")) {
                    const listItems = pTrim.split("\n").map((li) => li.replace(/^-\s?/, "").trim());
                    return (
                      <ul key={idx} className="space-y-3 my-4">
                        {listItems.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <span className="inline-flex items-center justify-center rounded-full bg-[var(--color-secondary-container)] p-1 text-[var(--color-secondary)] shrink-0 mt-1">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return <p key={idx}>{pTrim}</p>;
                })}
            </div>

            <div className="mt-12 pt-6 border-t border-[var(--color-outline-variant)] flex items-center justify-between text-sm">
              <span className="font-bold uppercase tracking-wider text-[var(--color-primary)]">
                {blogsPageData.detailView.shareLabel}
              </span>
              <div className="flex gap-4 text-[var(--color-secondary)]">
                {blogsPageData.detailView.shareActions.map((action) => (
                  <button key={action} className="hover:opacity-75 transition cursor-pointer">{action}</button>
                ))}
              </div>
            </div>

            <div className="mt-16 rounded-[2rem] bg-[var(--color-primary)] p-8 md:p-12 text-white">
              <div className="max-w-xl mx-auto text-center space-y-4">
                <h3 className="text-2xl font-bold">{blogsPageData.detailView.newsletterTitle}</h3>
                <p className="text-sm text-rose-100/80 leading-6">
                  {blogsPageData.detailView.newsletterDescription}
                </p>
                <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder={blogsPageData.detailView.newsletterPlaceholder}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="h-12 flex-1 rounded-xl bg-white/10 border border-white/20 px-4 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                  <button
                    type="submit"
                    className="h-12 px-6 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white font-bold rounded-xl transition text-sm cursor-pointer shrink-0"
                  >
                    {subscribed ? blogsPageData.detailView.newsletterSuccessLabel : blogsPageData.detailView.newsletterIdleLabel}
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-20">
              <h3 className="text-2xl font-bold text-[var(--color-primary)] border-b border-[var(--color-outline-variant)] pb-4 mb-8">
                {blogsPageData.detailView.relatedTitle}
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedInsights.map((insight) => (
                  <article
                    key={insight.id}
                    onClick={() => {
                      setSelectedArticle(insight);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="surface-card p-5 cursor-pointer hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition duration-200"
                  >
                    <span className="text-2xs uppercase tracking-wider font-bold text-[var(--color-secondary)]">
                      {insight.category}
                    </span>
                    <h4 className="mt-2 text-base font-bold text-[var(--color-primary)] line-clamp-2 hover:text-[var(--color-secondary)]">
                      {insight.title}
                    </h4>
                    <p className="mt-2 text-xs text-[var(--color-on-surface-variant)] line-clamp-3">
                      {insight.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="bg-[var(--color-surface-container-lowest)] py-12 animate-in fade-in duration-300">
          <div className="site-container">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)]">
                {blogsPageData.listView.eyebrow}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-primary)] md:text-5xl">
                {blogsPageData.listView.title}
              </h1>
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <p className="text-sm md:text-base text-[var(--color-on-surface-variant)] max-w-2xl leading-7">
                  {blogsPageData.listView.description}
                </p>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-outline)]" />
                  <input
                    type="text"
                    placeholder={blogsPageData.listView.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-full pl-11 pr-4 rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] text-sm outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
              <aside className="space-y-6">
                <div className="surface-card p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-outline)] border-b border-[var(--color-outline-variant)] pb-3 mb-4">
                    {blogsPageData.listView.categoryLabel}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {blogsPageData.categories.map((cat) => {
                      const isActive = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                          }}
                          className={`flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-xs font-bold transition uppercase tracking-wider cursor-pointer ${
                            isActive
                              ? "bg-[var(--color-primary)] text-white"
                              : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)]"
                          }`}
                        >
                          <span>{cat}</span>
                          <ArrowRight className={`h-3 w-3 transition-transform ${isActive ? "translate-x-1" : ""}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              <div className="space-y-8">
                {featuredArticle ? (
                  <article
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="surface-card group grid gap-6 md:grid-cols-[1fr_1.2fr] p-6 hover:-translate-y-0.5 hover:shadow-[var(--shadow-strong)] transition duration-200 cursor-pointer"
                  >
                    <div className="relative aspect-[3/2] md:aspect-auto min-h-[200px] rounded-2xl overflow-hidden bg-[var(--color-surface-container)]">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover group-hover:scale-102 transition duration-500"
                        sizes="(min-width: 768px) 30vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-[var(--color-secondary-container)] text-[var(--color-secondary)] px-2.5 py-1 rounded-full">
                          {featuredArticle.category}
                        </span>
                        <span className="text-2xs text-[var(--color-outline)] font-semibold">
                          {featuredArticle.date}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-extrabold text-[var(--color-primary)] leading-snug group-hover:text-[var(--color-secondary)] transition">
                        {featuredArticle.title}
                      </h2>
                      <p className="mt-3 text-xs md:text-sm text-[var(--color-on-surface-variant)] leading-relaxed line-clamp-3">
                        {featuredArticle.summary}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-[var(--color-outline-variant)] pt-4">
                        <span className="text-xs font-semibold text-[var(--color-primary)] flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
                          {featuredArticle.author}
                        </span>
                        <span className="text-xs font-bold text-[var(--color-secondary)] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {blogsPageData.listView.readFullLabel}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                ) : (
                  <div className="surface-card p-12 text-center text-[var(--color-outline)]">
                    {blogsPageData.listView.emptyMessage}
                  </div>
                )}

                {gridArticles.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {gridArticles.map((article) => (
                      <article
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="surface-card group flex flex-col p-6 hover:-translate-y-0.5 hover:shadow-[var(--shadow-strong)] transition duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] uppercase font-bold tracking-widest bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)] px-2.5 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-2xs text-[var(--color-outline)]">
                            {article.date}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-[var(--color-primary)] leading-snug line-clamp-2 group-hover:text-[var(--color-secondary)] transition">
                          {article.title}
                        </h3>
                        <p className="mt-3 text-xs text-[var(--color-on-surface-variant)] leading-relaxed line-clamp-3 flex-1">
                          {article.summary}
                        </p>
                        <div className="mt-6 border-t border-[var(--color-outline-variant)] pt-4 flex items-center gap-2 text-2xs font-semibold text-[var(--color-primary)]">
                          <User className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
                          {article.author}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-20 border-t border-[var(--color-outline-variant)] pt-12">
              <div className="text-center">
                <span className="text-2xs font-bold uppercase tracking-[0.2em] text-[var(--color-outline)]">
                  {blogsPageData.listView.certificationsLabel}
                </span>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {blogsPageData.listView.certifications.map((cert) => (
                    <div
                      key={cert.title}
                      className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-4 flex flex-col items-center justify-center"
                    >
                      <span className="text-lg font-black text-[var(--color-primary)]">
                        {cert.title}
                      </span>
                      <span className="text-2xs text-[var(--color-outline)] mt-1 font-semibold uppercase">
                        {cert.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <SiteFooter />
    </>
  );
}
