"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  User,
  ArrowLeft,
  Check,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

interface Article {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  summary: string;
  author: string;
  authorRole: string;
  image: string;
  contentMarkdown: string;
}

const articlesData: Article[] = [
  {
    id: "minimally-invasive-neurosurgery",
    category: "Clinical Research",
    date: "October 24, 2024",
    readTime: "8 min read",
    title: "Advancements in Minimally Invasive Neurosurgery: A 5-Year Study",
    summary:
      "The surgical team at V.K. Medical Center recently published a comprehensive review of outcomes following robotic-assisted neurovascular procedures. The results indicate a 30% reduction in recovery times and significantly lower complication rates compared to traditional methods.",
    author: "Dr. Surjeet Singh Patel",
    authorRole: "Chief of Neurosurgery",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=400",
    contentMarkdown: `
In the landscape of modern medicine, few fields have seen a transformation as radical as neurosurgery. Once characterized by extensive incisions and long recovery periods, the discipline is now moving toward a "keyhole" philosophy—minimizing trauma to the brain while maximizing surgical precision.

### Redefining Precision with Robotics
The integration of robotic-assisted systems has allowed neurosurgeons at V.K. Medical Center to operate with sub-millimeter accuracy. These systems do not replace the surgeon; rather, they serve as a high-fidelity extension of their hands, filtering out natural physiological tremors and providing a steady, navigated path to deep-seated lesions.

- **Reduced risk of post-operative infection** through smaller surgical corridors.
- **Enhanced visualization** using 4K high-definition digital exoscopes.
- **Accelerated recovery times**, often reducing hospital stays by 40%.

> "Our goal is no longer just survival; it is the absolute preservation of function and quality of life. Minimally invasive techniques are the bridge to that future."
> — Dr. Surjeet Singh Patel

### Augmented Reality in the Operating Room
By overlaying preoperative MRI and CT data onto the surgeon's live view, Augmented Reality (AR) allows us to "see through" tissue before a single cut is made. This spatial awareness is critical when navigating the complex vascular architecture of the human brain. At V.K. Medical Center, we are pioneering the use of these "digital twins" to plan surgeries in a virtual environment before executing them in the physical world.
    `,
  },
  {
    id: "gut-microbiome-mental-health",
    category: "Patient Wellness",
    date: "October 20, 2024",
    readTime: "6 min read",
    title: "Understanding the Link Between Gut Microbiome and Mental Health",
    summary:
      "A deep dive into how nutritional choices influence neurological wellbeing and long-term cognitive stability through the enteric nervous system.",
    author: "Dr. V.R. Ray",
    authorRole: "Chief of Gastroenterology",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=600&h=400",
    contentMarkdown: `
The connection between the gut and the brain is one of the most exciting frontiers of medical research. Often referred to as the "second brain," the enteric nervous system consists of millions of neurons lining the gastrointestinal tract, communicating directly with the central nervous system.

### The Microbiome-Gut-Brain Axis
The trillions of microbes residing in our gut produce neurotransmitters, including serotonin and dopamine, that regulate mood, sleep, and stress response. When the balance of these microbes is disrupted, it can influence systemic inflammation and neurological health.

- **Direct nerve pathways** linking gut health to mental clarity.
- **Inflammatory modulation** showing links between dietary habits and anxiety scores.
- **Nutritional therapeutic strategies** utilizing probiotics and prebiotics for cognitive support.

> "A healthy digestive system is foundational to overall physical and cognitive health. The food we digest is literally the fuel that drives our brain chemistry."
> — Dr. V.R. Ray

### Implementing Dietary Strategies
Transitioning toward a diet rich in diverse fibers, fermented foods, and plant-based nutrients provides the necessary fuel for beneficial gut bacteria. Small, sustainable modifications in everyday diets can lead to significant improvements in energy levels, cognitive performance, and emotional resilience over time.
    `,
  },
  {
    id: "cardiovascular-pavilion",
    category: "Hospital Updates",
    date: "October 18, 2024",
    readTime: "5 min read",
    title: "Grand Opening of the West Wing Cardiovascular Pavilion",
    summary:
      "V.K. Medical Center expands its capacity for cardiac care with state-of-the-art diagnostic imaging suites and a new pediatric cardiology unit.",
    author: "V.K. Medical Administration",
    authorRole: "Hospital Operations",
    image: "https://images.unsplash.com/photo-1586773860418-d3b3de97e683?auto=format&fit=crop&q=80&w=600&h=400",
    contentMarkdown: `
V.K. Medical Center is proud to announce the official opening of the West Wing Cardiovascular Pavilion. This expansion marks a major milestone in our commitment to providing accessible, top-tier cardiac care to the Ambedkar Nagar region.

### State-of-the-Art Diagnostic Technology
The new pavilion houses advanced cardiac imaging systems, including a state-of-the-art digital catheterization laboratory for minimally invasive diagnosis and intervention.

- **Dedicated pediatric cardiology clinic** with child-friendly diagnostic environments.
- **Advanced cardiac ICU** equipped with real-time patient telemetry systems.
- **Outpatient cardiac rehabilitation wing** featuring certified physiotherapists.

This new infrastructure significantly reduces wait times for critical outpatient diagnostic procedures and ensures immediate emergency intervention capability for cardiac emergencies in the community.
    `,
  },
  {
    id: "sepsis-detection-neonates",
    category: "Clinical Research",
    date: "October 15, 2024",
    readTime: "7 min read",
    title: "New Protocol for Early-Onset Sepsis Detection in Neonates",
    summary:
      "Our Neonatal Intensive Care Unit (NICU) implements a new AI-driven monitoring system to identify biomarkers of sepsis 4 hours earlier.",
    author: "Dr. V.R. Ray",
    authorRole: "Chief of Gastroenterology",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600&h=400",
    contentMarkdown: `
In neonatal care, every minute counts when diagnosing infections. Sepsis is one of the leading causes of critical concern in newborns. Our clinic and pediatrics affiliate group have introduced a breakthrough monitoring system to track biomarkers of inflammation in real time.

### Harnessing Predictor Metrics
By monitoring heart-rate variability and respiratory oxygen saturation curves through non-invasive sensors, the clinical team receives real-time alert notifications of early-onset sepsis before physical symptoms manifest.

- **Up to 4 hours early detection advantage** compared to standard lab work.
- **Non-invasive sensor deployment** reducing neonatal distress.
- **Immediate therapeutic intervention protocols** which improve critical recovery timelines.
    `,
  },
  {
    id: "seasonal-affective-disorder",
    category: "Patient Wellness",
    date: "October 12, 2024",
    readTime: "5 min read",
    title: "Managing Seasonal Affective Disorder in Urban Environments",
    summary:
      "Practical steps for maintaining hormonal balance and circadian rhythms as day cycles shorten during the autumn transition.",
    author: "Mental Health Outreach Team",
    authorRole: "Outpatient Counseling",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600&h=400",
    contentMarkdown: `
As seasonal light exposure shifts, many patients experience temporary changes in sleep patterns, energy levels, and emotional wellness. Our outreach team outlines straightforward lifestyle habits to support biological rhythms.

### Circadian Rhythm Stabilization
Exposure to morning sunlight remains the most effective tool to align the body's sleep-wake cycle. When natural light is limited, therapeutic lightboxes can be utilized as a reliable alternative.

- **Morning daylight walks** for 20-30 minutes.
- **Standardized sleep schedules** to stabilize endocrine responses.
- **Balanced nutrition** focusing on vitamin D3 rich foods during autumn and winter months.
    `,
  },
];

const categories = [
  "All Insights",
  "Clinical Research",
  "Patient Wellness",
  "Hospital Updates",
  "Technology & Innovation",
  "Physician Spotlight",
];

export default function ServicesPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filter articles based on active category & search query
  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
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

  // Featured article (first one matching category)
  const featuredArticle = useMemo(() => {
    if (activeCategory !== "All Insights") {
      return filteredArticles[0] || null;
    }
    return articlesData[0];
  }, [activeCategory, filteredArticles]);

  // Regular grid articles (excluding the featured one)
  const gridArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  // Related insights for details page (excluding current article)
  const relatedInsights = useMemo(() => {
    if (!selectedArticle) return [];
    return articlesData.filter((a) => a.id !== selectedArticle.id).slice(0, 3);
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
      <SiteHeader activePath="/services" />

      {selectedArticle ? (
        /* --- ARTICLE DETAIL VIEW (Second Screenshot Layout) --- */
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
              Back to Insights
            </button>

            {/* Article Header */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)]">
                {selectedArticle.category}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-primary)] md:text-5xl leading-tight">
                {selectedArticle.title}
              </h1>
            </div>

            {/* Author Meta */}
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

            {/* Feature Image */}
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

            {/* Markdown Content Parser */}
            <div className="prose max-w-none text-base leading-8 text-[var(--color-on-surface-variant)] space-y-6">
              {selectedArticle.contentMarkdown
                .split("\n\n")
                .filter((p) => p.trim().length > 0)
                .map((paragraph, idx) => {
                  const pTrim = paragraph.trim();

                  // Header Check
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

                  // Pull Quote Check
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

                  // Bullet List Check
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

            {/* Share and Socials */}
            <div className="mt-12 pt-6 border-t border-[var(--color-outline-variant)] flex items-center justify-between text-sm">
              <span className="font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Share this article
              </span>
              <div className="flex gap-4 text-[var(--color-secondary)]">
                <button className="hover:opacity-75 transition cursor-pointer">Twitter</button>
                <button className="hover:opacity-75 transition cursor-pointer">LinkedIn</button>
                <button className="hover:opacity-75 transition cursor-pointer">Facebook</button>
                <button className="hover:opacity-75 transition cursor-pointer">Email</button>
              </div>
            </div>

            {/* Stay Informed Box */}
            <div className="mt-16 rounded-[2rem] bg-[var(--color-primary)] p-8 md:p-12 text-white">
              <div className="max-w-xl mx-auto text-center space-y-4">
                <h3 className="text-2xl font-bold">Stay Informed</h3>
                <p className="text-sm text-rose-100/80 leading-6">
                  Subscribe to our V.K. Medical Center newsletter for the latest breakthroughs in surgical technology and preventive care tips.
                </p>
                <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="h-12 flex-1 rounded-xl bg-white/10 border border-white/20 px-4 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                  <button
                    type="submit"
                    className="h-12 px-6 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white font-bold rounded-xl transition text-sm cursor-pointer shrink-0"
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </form>
              </div>
            </div>

            {/* Related Insights Grid */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-[var(--color-primary)] border-b border-[var(--color-outline-variant)] pb-4 mb-8">
                Related Insights
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
        /* --- MAIN LISTING VIEW (First Screenshot Layout) --- */
        <main className="bg-[var(--color-surface-container-lowest)] py-12 animate-in fade-in duration-300">
          <div className="site-container">
            {/* Title Section */}
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-secondary)]">
                ARCHIVE & EDUCATION
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-primary)] md:text-5xl">
                Medical Insights & Health News
              </h1>
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <p className="text-sm md:text-base text-[var(--color-on-surface-variant)] max-w-2xl leading-7">
                  Exploring the frontiers of healthcare with clinical precision and compassionate healing expertise from the specialists of V.K. Medical Center.
                </p>
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-outline)]" />
                  <input
                    type="text"
                    placeholder="Search medical articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-full pl-11 pr-4 rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] text-sm outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>

            {/* Layout Grid: Sidebar Categories + Articles */}
            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
              {/* Left Categories Sidebar */}
              <aside className="space-y-6">
                <div className="surface-card p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-outline)] border-b border-[var(--color-outline-variant)] pb-3 mb-4">
                    Categories
                  </h3>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => {
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

                {/* Newsletter Card */}
                <div className="surface-card p-6 bg-[var(--color-primary)] text-white space-y-4">
                  <BookOpen className="h-8 w-8 text-rose-100/90" />
                  <h3 className="text-lg font-bold">Pulse Newsletter</h3>
                  <p className="text-xs leading-5 text-rose-100/75">
                    Receive monthly medical updates and wellness tips directly to your inbox.
                  </p>
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="h-10 w-full rounded-lg bg-white/10 border border-white/20 px-3 text-xs text-white placeholder-white/50 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full h-10 bg-[var(--color-secondary)] hover:opacity-90 font-bold rounded-lg text-xs tracking-wider uppercase transition cursor-pointer"
                    >
                      {subscribed ? "Subscribed!" : "Subscribe"}
                    </button>
                  </form>
                </div>
              </aside>

              {/* Right Articles Panel */}
              <div className="space-y-8">
                {/* 1. Featured Article (Big Card Layout) */}
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
                          Read Full Report
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                ) : (
                  <div className="surface-card p-12 text-center text-[var(--color-outline)]">
                    No articles found matching your criteria.
                  </div>
                )}

                {/* 2. Sub-articles Grid */}
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

            {/* Certifications Banner at Bottom of Listing */}
            <div className="mt-20 border-t border-[var(--color-outline-variant)] pt-12">
              <div className="text-center">
                <span className="text-2xs font-bold uppercase tracking-[0.2em] text-[var(--color-outline)]">
                  CLINICAL EXCELLENCE CERTIFICATIONS
                </span>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {[
                    { title: "JCI", desc: "Accredited Center" },
                    { title: "ISO", desc: "9001:2015 Quality" },
                    { title: "NABH", desc: "Platinum Member" },
                    { title: "MAGNET", desc: "Nursing Excellence" },
                  ].map((cert) => (
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
