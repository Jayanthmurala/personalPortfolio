import type { Metadata } from "next";
import Link from "next/link";
import DesktopOnly from "@/components/DesktopOnly";
import Footer from "@/components/Footer";
import CursorGrid from "@/components/lazy/CursorGrid";
import ParticleImage from "@/components/lazy/ParticleImage";

export const metadata: Metadata = {
  title: "About",
  description:
    "How an electronics degree in a coastal town turned into building software that has to hold.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  {
    year: "2022",
    title: "Electronics, not software",
    body: "Started a B.Tech in Electronics & Communication at Vishnu Institute of Technology. The plan was circuits. Circuits teach you something software courses rarely do: every component has a tolerance, and the system is only as good as the weakest one in the chain.",
  },
  {
    year: "2024",
    title: "The detour that stuck",
    body: "A product assurance internship at Bharat Electronics, and somewhere in that year the detour became the direction. Writing code turned out to be the same discipline as testing hardware: find where it fails before someone else does.",
  },
  {
    year: "2025",
    title: "Building without a brief",
    body: "VishnuDentaCare and PaperPilot. Neither was commissioned. Both were built because the problems were interesting. One keeps several clinics' records sealed from each other; the other reads handwritten answer sheets. Work nobody asks for is where you find out what you actually care about.",
  },
  {
    year: "2026",
    title: "First people who paid me",
    body: "Shri Arudra Exports and International Ocean Foods put in front of international buyers, an ordering platform for Vending & Delivery LLC in the US, and AI product work at Intants. The systems got larger, which mostly means the cost of a careless decision got larger with them.",
  },
];

const BELIEFS = [
  {
    title: "Structure before surface",
    body: "A beautiful interface on a bad schema is a debt with interest. The order matters: decide what is true, then decide how it looks.",
  },
  {
    title: "Restraint over decoration",
    body: "Most features are someone's idea of what might be useful. The discipline is asking which ones survive contact with an actual user, and leaving the rest out.",
  },
  {
    title: "Built to be inherited",
    body: "Code has a second audience: whoever maintains it after you. Writing for that person is the most generous thing you can do, and it usually makes the first version better too.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-0 z-0">
          <CursorGrid
            cellSize={48}
            color="#00A896"
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

        {/* ── opening ─────────────────────────────────────────── */}
        <main id="content">
        <section className="relative z-10 w-full px-6 pb-24 pt-40 sm:pt-48">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-0">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
                  About
                </p>

                <h1 className="mt-7 font-(family-name:--font-display) text-[clamp(1.9rem,3.9vw,3.1rem)] uppercase leading-[0.95] tracking-tight text-white">
                  A coastal town,
                  <br />
                  an electronics degree,
                  <br />
                  <span className="text-accent">and a detour.</span>
                </h1>
              </div>

              {/* Held as loose particles until the pointer arrives, then it
                  pulls itself into a face. */}
              <DesktopOnly className="relative z-20 mx-auto aspect-square w-[400px] lg:-ml-28 xl:-ml-40">
                <ParticleImage
                  imageConfig={{
                    image: "/assets/jayanth-particle.png",
                    mode: "fit",
                    scale: 10,
                  }}
                  particleCount={80}
                  particleSize={6}
                  particleShape="circle"
                  particleColor="original"
                  hoverEnabled
                  hoverConfig={{
                    hoverType: "roam",
                    transition: { duration: 0.9, ease: "easeInOut" },
                    roamShape: "rectangle",
                    roamOpacity: 0.45,
                  }}
                  repulsionEnabled
                  repulsionConfig={{
                    repulsionMode: "outside",
                    repulsionForce: 4,
                    repulsionRadius: 28,
                  }}
                  width="100%"
                  height="100%"
                />
              </DesktopOnly>
            </div>

            <div className="mt-14 grid max-w-5xl gap-10 md:grid-cols-2 lg:gap-16">
              <div className="space-y-5 text-[17px] leading-[1.75] text-white/60">
                <p>
                  I grew up in Machilipatnam, a port town on the Andhra coast
                  that has been shipping things out to the world for about four
                  hundred years. It is not where people expect software to come
                  from, which has never seemed like much of an argument.
                </p>
                <p>
                  I went to university to study electronics. Circuits, signals,
                  tolerances. Somewhere between a lab bench and a laptop I
                  started writing software instead, and found the same job
                  underneath it: build the thing so it does not fall over, and
                  know exactly where it would if it did.
                </p>
              </div>

              <div className="space-y-5 text-[17px] leading-[1.75] text-white/60">
                <p>
                  What I do now is full-stack engineering with a lot of AI work
                  in it. Schemas, services, retries, workflow automation, and
                  models doing something genuinely useful rather than
                  something impressive in a demo.
                </p>
                <p className="text-white">
                  The part I care about is the part nobody sees. That is not
                  modesty. It is where the whole thing either holds or does not.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── now ─────────────────────────────────────────────── */}
        <section className="relative z-10 w-full px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                Where I am now
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
                2026
              </p>
            </div>

            <div className="mt-12 grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="font-(family-name:--font-display) text-2xl uppercase leading-none tracking-tight text-white">
                  AI product work
                </h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Intants
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-white/60">
                  Building the parts of a product that have to survive real
                  usage: data models that stay correct as the product changes,
                  services that fail in predictable ways, and AI features that
                  earn their place rather than decorate the roadmap.
                </p>
              </div>

              <div>
                <h2 className="font-(family-name:--font-display) text-2xl uppercase leading-none tracking-tight text-white">
                  Client engagements
                </h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Freelance · Ongoing
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-white/60">
                  Currently building an ordering platform for Vending &amp;
                  Delivery LLC in the United States, alongside a small number
                  of other engagements and n8n automations that take the
                  repetitive work off someone's desk. Usually somewhere
                  between a real product and a business that needs to be
                  understood before a line of code is worth writing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── the road here ───────────────────────────────────── */}
        <section className="relative z-10 w-full px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                The road here
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
                2022 · 2026
              </p>
            </div>

            <ol className="mt-4">
              {TIMELINE.map(({ year, title, body }) => (
                <li
                  key={year}
                  className="grid gap-y-3 border-b border-white/10 py-10 sm:grid-cols-12 sm:gap-x-10"
                >
                  <span className="font-(family-name:--font-display) text-3xl leading-none text-accent sm:col-span-2 sm:text-[2.5rem]">
                    {year}
                  </span>
                  <h3 className="font-(family-name:--font-display) text-xl uppercase leading-tight tracking-tight text-white sm:col-span-4">
                    {title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-white/60 sm:col-span-6">
                    {body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/25">
              B.Tech, Electronics &amp; Communication · Vishnu Institute of
              Technology, Bhimavaram
            </p>
          </div>
        </section>

        {/* ── beliefs ─────────────────────────────────────────── */}
        <section className="relative z-10 w-full px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                What I believe
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
                Three of them
              </p>
            </div>

            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {BELIEFS.map(({ title, body }, i) => (
                <div key={title} className="border-t-2 border-accent pt-5">
                  <span className="font-mono text-[10px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-(family-name:--font-display) text-lg uppercase leading-snug tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── off the clock ───────────────────────────────────── */}
        <section className="relative z-10 w-full px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="border-t border-white/15 pt-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                Off the clock
              </p>
              <p className="mt-8 max-w-2xl text-[17px] leading-[1.75] text-white/60">
                I still solve problems for fun, which is either a red flag or
                the whole point depending on who you ask. A few hundred of them on
                LeetCode, mostly the medium ones, because those are where the
                thinking is. The rest of the time I am reading about system
                design, taking apart products I admire, or building something
                deliberately strange to see what happens.
              </p>
              <p className="mt-5 max-w-2xl text-[17px] leading-[1.75] text-white">
                Curiosity is the only part of this job that cannot be taught.
              </p>
            </div>
          </div>
        </section>

        {/* ── close ───────────────────────────────────────────── */}
        <section className="relative z-10 w-full px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="border-t border-white/15 pt-14">
              <h2 className="max-w-3xl font-(family-name:--font-display) text-[clamp(1.75rem,4.5vw,3.25rem)] uppercase leading-[1] tracking-tight text-white">
                That is the long version.
                <br />
                <span className="text-accent">Now tell me about yours.</span>
              </h2>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/#work"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                >
                  See the work
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
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
