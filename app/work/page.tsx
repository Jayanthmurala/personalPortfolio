import type { Metadata } from "next";
import Link from "next/link";
import ChromaGrid, { type ChromaItem } from "@/components/ChromaGrid";
import Footer from "@/components/Footer";
import CursorGrid from "@/components/lazy/CursorGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client engagements, products and experiments. Systems built to hold up after launch.",
  alternates: { canonical: "/work" },
};

const ACCENT = "#00A896";

/** Client work first: someone paying for it is the strongest signal. */
const CLIENT: ChromaItem[] = [
  {
    image: "/work/arudra.jpg",
    title: "Shri Arudra Exports",
    subtitle: "Commodity trading, made legible",
    handle: "2026",
    location: "React · TypeScript · SEO",
    borderColor: ACCENT,
    gradient: "linear-gradient(160deg, #00A896, #000)",
    url: "https://www.shriarudramerchantexports.com",
  },
  {
    image: "/work/oceanfoods.jpg",
    title: "International Ocean Foods",
    subtitle: "Cold-chain seafood, sold by the container",
    handle: "2026",
    location: "React · TypeScript · SEO",
    borderColor: ACCENT,
    gradient: "linear-gradient(160deg, #00A896, #000)",
    url: "https://www.internationaloceanfoods.com",
  },
  {
    image: "/work/placeholder-private.svg",
    title: "Vending & Delivery LLC",
    subtitle: "Buyer app, admin, and order integrity",
    handle: "2026 · Ongoing",
    location: "React Native · Node",
    borderColor: "#6b7280",
    gradient: "linear-gradient(160deg, #374151, #000)",
  },
];

/** Built without a brief, which is where the interesting problems live. */
const PRODUCTS: ChromaItem[] = [
  {
    image: "/work/dentacare.jpg",
    title: "VishnuDentaCare",
    subtitle: "Multi-clinic practice management",
    handle: "2025",
    location: "Next.js · Prisma",
    borderColor: ACCENT,
    gradient: "linear-gradient(160deg, #00A896, #000)",
    url: "https://vishnudentacare.vercel.app",
  },
  {
    image: "/work/paperpilot.jpg",
    title: "PaperPilot",
    subtitle: "Handwritten sheets, graded in seconds",
    handle: "2025",
    location: "React · FastAPI · Groq",
    borderColor: ACCENT,
    gradient: "linear-gradient(160deg, #00A896, #000)",
    url: "https://paper-pilot-pi.vercel.app",
  },
  {
    image: "/work/careercoach.jpg",
    title: "AI Career Coach",
    subtitle: "Mock interviews with real-time feedback",
    handle: "2025",
    location: "Next.js · LangChain · Inngest",
    borderColor: ACCENT,
    gradient: "linear-gradient(160deg, #00A896, #000)",
    url: "https://ai-career-coach-hazel-three.vercel.app",
  },
  {
    image: "/work/house.jpg",
    title: "The House Remembers",
    subtitle: "The interface is the concept",
    handle: "2026 · Experiment",
    location: "TypeScript · Next.js",
    borderColor: "#9a1854",
    gradient: "linear-gradient(160deg, #9a1854, #000)",
    url: "https://thehouseremembers.vercel.app",
  },
];

/** Repos worth opening, without pretending they are products. */
const REPOS = [
  {
    title: "Spotify microservices",
    body: "Song, user and admin services split apart, each with its own boundary.",
    href: "https://github.com/Jayanthmurala/SpotifyUserBackend",
  },
  {
    title: "EEG noise filtering",
    body: "Adaptive ML filtering of EEG signals for brain-computer interfaces. The electronics degree, still showing up.",
    href: "https://github.com/Jayanthmurala/Adaptive-ML-Based-Noise-Filtering-for-EEG-Signals-for-BCI-App",
  },
  {
    title: "Multi-vendor commerce",
    body: "An e-commerce backend with vendors, admin, OTP and the usual unglamorous plumbing.",
    href: "https://github.com/Jayanthmurala/E_commerce_project_1-Backend-",
  },
  {
    title: "AI code review",
    body: "Automated review that comments on readability and maintainability, not just syntax.",
    href: "https://github.com/Jayanthmurala/Ai-Based_code_review",
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-0 z-0">
          <CursorGrid
            cellSize={48}
            color={ACCENT}
            radius={150}
            falloff="smooth"
            holdTime={350}
            fadeDuration={900}
            lineWidth={1}
            maxOpacity={0.55}
            fillOpacity={0.05}
            gridOpacity={0}
            cellRadius={0}
            clickPulse
            pulseSpeed={600}
          />
        </div>

        <main id="content">
        <section className="relative z-10 w-full px-6 pb-16 pt-40 sm:pt-48">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
              Work
            </p>
            <h1 className="mt-7 max-w-3xl font-(family-name:--font-display) text-[clamp(2.25rem,5.5vw,4.25rem)] uppercase leading-[0.95] tracking-tight text-white">
              Everything that
              <br />
              <span className="text-accent">had to hold.</span>
            </h1>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/55">
              Client engagements, products built without a brief, n8n
              automations that quietly remove someone's manual Monday, and a
              few experiments. Some are live, one is under NDA, and the rest
              are open on GitHub.
            </p>
          </div>
        </section>

        <section className="relative z-10 w-full bg-black px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                Client engagements
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
                Paid work
              </p>
            </div>
            <div className="mt-10">
              <ChromaGrid items={CLIENT} radius={340} damping={0.45} fadeOut={0.6} />
            </div>
          </div>
        </section>

        <section className="relative z-10 w-full bg-black px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                Products &amp; experiments
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
                Self-initiated
              </p>
            </div>
            <div className="mt-10">
              <ChromaGrid items={PRODUCTS} radius={340} damping={0.45} fadeOut={0.6} />
            </div>
          </div>
        </section>

        <section className="relative z-10 w-full px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                Also on GitHub
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
                Code, not case studies
              </p>
            </div>

            <ul className="mt-4">
              {REPOS.map(({ title, body, href }) => (
                <li key={title}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid gap-y-2 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.03] sm:grid-cols-12 sm:gap-x-8"
                  >
                    <h3 className="font-(family-name:--font-display) text-lg uppercase leading-tight tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1 sm:col-span-4">
                      {title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-white/55 sm:col-span-7">
                      {body}
                    </p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors group-hover:text-accent sm:col-span-1 sm:text-right">
                      Repo ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative z-10 w-full px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="border-t border-white/15 pt-14">
              <h2 className="max-w-3xl font-(family-name:--font-display) text-[clamp(1.75rem,4.5vw,3.25rem)] uppercase leading-[1] tracking-tight text-white">
                Yours could be
                <br />
                <span className="text-accent">the next one.</span>
              </h2>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                >
                  More about me
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}
