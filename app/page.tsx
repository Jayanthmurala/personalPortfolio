import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import IdBadge from "@/components/IdBadge";
import WorkIndex, { type WorkItem } from "@/components/WorkIndex";
import SkillGrid, { type Skill } from "@/components/SkillGrid";
import CursorArea from "@/components/CursorArea";
import ProcessIndex, { type Phase } from "@/components/ProcessIndex";
import Footer from "@/components/Footer";
import MarqueeBand from "@/components/MarqueeBand";
import ContactCTA from "@/components/ContactCTA";
import DesktopOnly from "@/components/DesktopOnly";
import InView from "@/components/InView";
import DotField from "@/components/lazy/DotField";
import LiquidEther from "@/components/lazy/LiquidEther";
import CursorGrid from "@/components/lazy/CursorGrid";
import Globe from "@/components/lazy/Globe";

const WORK: WorkItem[] = [
  {
    title: "Shri Arudra Exports",
    kind: "Client engagement · 2026",
    line: "A commodity trading house in Kakinada, put in front of international buyers. Trade terms, compliance and logistics made legible.",
    stack: "React · TypeScript · SEO · Playwright",
    href: "https://www.shriarudramerchantexports.com",
    live: "shriarudramerchantexports.com",
    image: "/work/arudra.jpg",
  },
  {
    title: "International Ocean Foods",
    kind: "Client engagement · 2026",
    line: "Cold-chain seafood and meat supply, presented for buyers who order by the container rather than the kilo.",
    stack: "React · TypeScript · SEO · Playwright",
    href: "https://www.internationaloceanfoods.com",
    live: "internationaloceanfoods.com",
    image: "/work/oceanfoods.jpg",
  },
  {
    title: "VishnuDentaCare",
    kind: "Product · 2025",
    line: "Practice management across multiple clinics, where every clinic's records stay sealed from every other's.",
    stack: "Next.js · Express · Prisma · PostgreSQL",
    href: "https://vishnudentacare.vercel.app",
    live: "vishnudentacare.vercel.app",
    image: "/work/dentacare.jpg",
  },
  {
    title: "PaperPilot",
    kind: "Product · 2025",
    line: "Handwritten answer sheets read and graded in seconds, and it learns to mark the way each teacher marks.",
    stack: "React · FastAPI · MongoDB · Groq",
    href: "https://paper-pilot-pi.vercel.app",
    live: "paper-pilot-pi.vercel.app",
    image: "/work/paperpilot.jpg",
  },
];

/** Ordered surface → foundation, so the grid reads as a cross-section. */
const SKILLS: Skill[] = [
  { name: "React", icon: "/skills/react.svg" },
  { name: "Next.js", icon: "/skills/nextjs.svg" },
  { name: "TypeScript", icon: "/skills/typescript.svg" },
  { name: "JavaScript", icon: "/skills/javascript.svg" },
  { name: "Tailwind CSS", icon: "/skills/tailwindcss.svg" },
  { name: "HTML5", icon: "/skills/html5.svg" },
  { name: "CSS3", icon: "/skills/css3.svg" },

  { name: "Node.js", icon: "/skills/nodejs.svg" },
  { name: "NestJS", icon: "/skills/nestjs.svg" },
  { name: "Express", icon: "/skills/express.svg" },
  { name: "FastAPI", icon: "/skills/fastapi.svg" },
  { name: "GraphQL", icon: "/skills/graphql.svg" },
  { name: "Socket.IO", icon: "/skills/socketio.svg" },
  { name: "Python", icon: "/skills/python.svg" },
  { name: "Java", icon: "/skills/java.svg" },

  { name: "C++", icon: "/skills/cplusplus.svg" },
  { name: "PostgreSQL", icon: "/skills/postgresql.svg" },
  { name: "MongoDB", icon: "/skills/mongodb.svg" },
  { name: "MySQL", icon: "/skills/mysql.svg" },
  { name: "Redis", icon: "/skills/redis.svg" },
  { name: "Prisma", icon: "/skills/prisma.svg" },
  { name: "Docker", icon: "/skills/docker.svg" },
  { name: "AWS", icon: "/skills/amazonwebservices.svg" },

  { name: "Linux", icon: "/skills/linux.svg" },
  { name: "Git", icon: "/skills/git.svg" },
  { name: "GitHub", icon: "/skills/github.svg" },
  { name: "GitHub Actions", icon: "/skills/githubactions.svg" },
  { name: "Vercel", icon: "/skills/vercel.svg" },
  { name: "Railway", icon: "/skills/railway.svg" },
  { name: "Render", icon: "/skills/render.svg" },
  { name: "Playwright", icon: "/skills/playwright.svg" },
  { name: "Jest", icon: "/skills/jest.svg" },

  { name: "n8n", icon: "/skills/n8n.svg" },

  { name: "ChatGPT", icon: "/skills/chatgpt.svg" },
  { name: "Claude", icon: "/skills/claude.svg" },
  { name: "Gemini", icon: "/skills/gemini.svg" },
  { name: "Cursor", icon: "/skills/cursor.svg" },
  { name: "Windsurf", icon: "/skills/windsurf.svg" },
  { name: "VS Code", icon: "/skills/vscode.svg" },
  { name: "Figma", icon: "/skills/figma.svg" },
];

const PROCESS: Phase[] = [
  {
    label: "Before anything",
    title: "A conversation, not an estimate",
    body: "Most briefs describe a solution someone has already settled on. The useful hour is the one spent finding the problem underneath it. Occasionally it turns out to be smaller than expected, and I will say so.",
  },
  {
    label: "Written down",
    title: "Scope, in plain language",
    body: "What it covers, what it does not, and what happens if it changes. Ambiguity is free at the start and expensive in month three. Nothing here needs a legal dictionary.",
  },
  {
    label: "In the open",
    title: "A running thing, not a status update",
    body: "Deployed early and updated often, so progress is something you can click rather than something you take my word for. Nothing arrives as a surprise at the end.",
  },
  {
    label: "Handover",
    title: "Left in a state someone can take over",
    body: "Access, documentation, and a codebase with the reasoning still attached. The work should outlast the engagement, including the part where you stop needing me.",
  },
];

export const metadata: Metadata = {
  title: "Jayanth Murala · Full-stack engineer",
  description:
    "Full-stack engineer in Machilipatnam, India. I build web apps, AI products and automation for clients in India and the US, and I build them to still work a year later.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <main id="content">
      <section className="relative w-full h-screen overflow-hidden">
        <InView className="absolute inset-0">
          <DotField
            dotRadius={2}
            dotSpacing={12}
            cursorRadius={100}
            cursorForce={0}
            bulgeOnly
            bulgeStrength={0}
            glowRadius={50}
            sparkle={false}
            waveAmplitude={0}
            gradientFrom="rgba(0, 168, 150, 0.35)"
            gradientTo="rgba(125, 211, 252, 0.25)"
            glowColor="#00A896"
          />
        </InView>

        {/* three.js is ~700KB and the fluid sim is expensive; phones keep the
            dot grid instead, which reads almost the same at that size. */}
        <DesktopOnly className="absolute inset-0" minWidth={768}>
          <LiquidEther
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            colors={["#6A3940", "#9a1854", "#00A896"]}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            isBounce={false}
            resolution={0.5}
          />
        </DesktopOnly>

        <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full flex-col items-center px-6 pt-44 text-center sm:pt-48">
          <p className="text-balance font-mono text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-[11px]">
            Full-stack engineer · Machilipatnam, India
          </p>

          {/* The name is the brand. Roles live in the band below, so they are
              deliberately absent here. */}
          <h1 className="mt-5 w-full select-none font-(family-name:--font-display) uppercase leading-[0.9] tracking-tight text-white">
            <span className="block whitespace-nowrap text-[clamp(3rem,13.5vw,12.5rem)]">
              Jayanth
            </span>
            <span
              className="block whitespace-nowrap text-[clamp(3rem,13.5vw,12.5rem)] text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              Murala
            </span>
          </h1>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
          <div className="relative h-[62vh] max-h-[35rem] w-auto">
            <div
              className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(0, 168, 150,0.45), transparent 70%)",
              }}
            />

            <Image
              src="/jayanth-cutout.png"
              alt="Jayanth Murala"
              width={845}
              height={957}
              priority
              className="pointer-events-none relative h-full w-auto select-none"
            />

            {/* Dissolves the figure into the section edge so it is not sliced
                off by a hard boundary. Sits above the photo, below the CTAs. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-black/70 to-black" />

            <div className="pointer-events-auto absolute inset-x-0 bottom-10 z-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#work"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-lg transition-colors hover:bg-white/80"
              >
                See the work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/70 bg-black/40 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>

        {/* Softens the whole hero edge — dots and fluid fade out with it. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-gradient-to-b from-transparent to-black" />
      </section>

      <MarqueeBand />

      {/* CursorGrid alone carries the background below the hero — cells only
          exist where the pointer has been. */}
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

      <section id="about" className="relative z-10 w-full pb-20 pl-0 pr-6 pt-0">
        <div className="grid gap-10 lg:grid-cols-[520px_1fr] lg:items-start">
          {/* Flush to the section's top-left corner. The box matches the
              770×848 viewBox aspect so the art fills it with no dead space. */}
          <div className="aspect-[770/848] w-full">
            <IdBadge>
              <div className="relative h-full w-full overflow-hidden bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/profile.jpg"
                  alt="Jayanth Murala"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />

                {/* name plate — sits on the photo, no hard edges */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent px-4 pb-4 pt-14">
                  <div className="mb-2 h-px w-10 bg-accent" />
                  <p className="font-(family-name:--font-display) text-lg uppercase leading-none text-white">
                    Jayanth Murala
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    Full-Stack Developer
                  </p>
                </div>
              </div>
            </IdBadge>
          </div>

          <div className="px-6 pt-16 text-left lg:pl-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              M. Jayanth Murala · Machilipatnam, India
            </p>

            <h2 className="mt-7 font-(family-name:--font-display) text-[clamp(2.75rem,7vw,5.25rem)] uppercase leading-[0.88] tracking-tight text-white">
              Load
              <br />
              <span className="text-accent">bearing.</span>
            </h2>

            <div className="mt-10 max-w-lg space-y-5 text-[17px] leading-[1.75] text-white/60">
              <p>
                Every product has a part nobody photographs. The schema beneath
                the screen. The retry that fires at three in the morning. The
                decision taken in week one that quietly holds up year three.
              </p>
              <p className="text-white">That is where I work.</p>
            </div>

            <ul className="mt-14 grid max-w-xl gap-px bg-white/15 sm:grid-cols-3">
              {[
                "Structure before surface",
                "Restraint over decoration",
                "Built to be inherited",
              ].map((axiom, i) => (
                <li key={axiom} className="bg-black pr-6 pt-5">
                  <span className="font-mono text-[10px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-(family-name:--font-display) text-[13px] uppercase leading-snug tracking-wide text-white">
                    {axiom}
                  </p>
                </li>
              ))}
            </ul>

            {/* -my-3 keeps the visual position while the padding gives the
                link a 40px+ hit area on touch. */}
            <Link
              href="/about"
              className="group mt-14 -my-3 inline-flex items-center gap-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
            >
              The long version
              <span className="h-px w-12 bg-white/25 transition-all group-hover:w-20 group-hover:bg-accent" />
            </Link>
          </div>
        </div>
      </section>

      <section id="work" className="relative z-10 w-full bg-black px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              Selected work
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
              2025 · 2026
            </p>
          </div>

          <CursorArea label="View">
            <WorkIndex items={WORK} />
          </CursorArea>

          <div className="mt-14 flex justify-center">
            <Link
              href="/work"
              className="group inline-flex items-center gap-4 rounded-full border border-white/20 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:border-accent/60 hover:text-white"
            >
              View all work
              <span className="h-px w-8 bg-white/30 transition-all group-hover:w-14 group-hover:bg-accent" />
            </Link>
          </div>
        </div>
      </section>

      <section id="capabilities" className="relative z-10 w-full px-6 pb-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              What I take on
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
              Cross-section
            </p>
          </div>

          <div className="mt-12">
            <SkillGrid skills={SKILLS} />
          </div>
        </div>
      </section>

      {/* A deliberate pause between what I can do and how I work. Generous
          space either side — the silence is what makes it read. */}
      <section className="relative z-10 w-full px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <span
            aria-hidden
            className="block font-(family-name:--font-display) text-6xl leading-none text-accent/25"
          >
            &ldquo;
          </span>

          <blockquote className="mt-4 font-(family-name:--font-display) text-[clamp(1.4rem,3.4vw,2.6rem)] uppercase leading-[1.25] tracking-tight text-white">
            Code is my craft.
            <br />
            Problem solving is my passion.
            <br />
            <span className="text-accent">Impact is my goal.</span>
          </blockquote>

          <div className="mx-auto mt-12 h-px w-16 bg-white/20" />

          <p className="mx-auto mt-12 max-w-xl text-[17px] leading-relaxed text-white/55">
            Anyone can make a thing work on the day it ships. The harder
            question is whether it still works a year later, on a Tuesday,
            when nobody is watching it and everybody depends on it.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">
            I build for that Tuesday.
          </p>
        </div>
      </section>

      <section id="process" className="relative z-10 w-full px-6 pb-36">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-baseline justify-between gap-6 border-b border-white/15 pb-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              How it runs
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">
              Engagement
            </p>
          </div>

          <div className="mt-16">
            <ProcessIndex phases={PROCESS} />
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 w-full px-6 pb-16 pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="border-t border-white/15 pt-14">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              Contact
            </h2>

            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px]">
              <ContactCTA />

              {/* Square box, and scale kept under ~9.5 — above that the sphere
                  outgrows the camera's field of view and gets clipped. */}
              <DesktopOnly className="mx-auto aspect-square w-[440px]">
                <InView className="h-full w-full">
                  <Globe
                  speed={2}
                  smoothing={8}
                  dots={{ color: "#ffffff", size: 5, density: 9, allDots: false }}
                  fill="dots"
                  scale={9}
                  stopOnHover
                  markerConfig={{
                    markers: [{ lat: 16.19, lng: 81.13 }],
                    color: "#00A896",
                    size: 55,
                  }}
                  direction="left"
                  initialLatitude={14}
                  initialLongitude={-81}
                  oceanColor="rgba(0,0,0,0)"
                  outlineColor="rgba(255,255,255,0.55)"
                  showOutline
                  graticuleColor="rgba(255,255,255,0.10)"
                  showGrid
                  outlineWidth={1}
                  dragSpeed={5}
                  detail={5}
                  />
                </InView>
              </DesktopOnly>
            </div>
          </div>
        </div>
      </section>

      </div>
      </main>

      <Footer />
    </div>
  );
}
