import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import CursorGrid from "@/components/lazy/CursorGrid";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me what it has to hold. A few lines about the problem is enough to start.",
  alternates: { canonical: "/contact" },
};

const ELSEWHERE = [
  { label: "Email", value: "jayanthmurala1@gmail.com", href: "mailto:jayanthmurala1@gmail.com" },
  { label: "GitHub", value: "github.com/Jayanthmurala", href: "https://github.com/Jayanthmurala" },
  {
    label: "LinkedIn",
    value: "in/jayanth-murala",
    href: "https://linkedin.com/in/jayanth-murala-0045b2281",
  },
  { label: "LeetCode", value: "u/jayanthmurala1", href: "https://leetcode.com/u/jayanthmurala1" },
];

export default function ContactPage() {
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

        <main id="content">
        <section className="relative z-10 w-full px-6 pb-24 pt-40 sm:pt-48">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
              Contact
            </p>

            <h1 className="mt-7 max-w-3xl font-(family-name:--font-display) text-[clamp(2.25rem,5.5vw,4.25rem)] uppercase leading-[0.95] tracking-tight text-white">
              Tell me what
              <br />
              <span className="text-accent">it has to hold.</span>
            </h1>

            <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
              <div>
                <ContactForm />
              </div>

              <aside className="lg:pt-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Or find me here
                </p>

                <ul className="mt-6 space-y-5">
                  {ELSEWHERE.map(({ label, value, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className="group block"
                      >
                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                          {label}
                        </span>
                        <span className="mt-1 block break-all text-[15px] text-white/70 transition-colors group-hover:text-accent">
                          {value}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 border-t border-white/15 pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Machilipatnam, India
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    IST · UTC+5:30
                  </p>
                  <p className="mt-5 text-[14px] leading-relaxed text-white/45">
                    Working with clients in the US and India. The time
                    difference has never been the hard part.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}
