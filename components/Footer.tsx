"use client";

import Image from "next/image";
import Link from "next/link";

const LINK =
  "block break-words py-2.5 text-[15px] text-white/55 transition-colors hover:text-white";

type FooterLink = { label: string; href?: string; external?: boolean };

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Skills", href: "/#capabilities" },
      { label: "Process", href: "/#process" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { label: "GitHub", href: "https://github.com/Jayanthmurala", external: true },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/jayanth-murala-0045b2281",
        external: true,
      },
      { label: "LeetCode", href: "https://leetcode.com/u/jayanthmurala1", external: true },
    ],
  },
  {
    heading: "Say hello",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "jayanthmurala1@gmail.com", href: "mailto:jayanthmurala1@gmail.com" },
      { label: "Machilipatnam, India", href: undefined },
    ],
  },
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.2 10.2 0 0022 12.2C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.4 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.36 7.5 7.25 6.6 7.25 5.5C7.25 4.4 6.36 3.5 5.25 3.5ZM20.5 20.5H17.13V14.68C17.13 13.15 16.6 12.15 15.25 12.15C14.22 12.15 13.62 12.85 13.35 13.52C13.25 13.76 13.22 14.09 13.22 14.42V20.5H9.85C9.85 20.5 9.9 9.4 9.85 8.5H13.22V9.98C13.66 9.28 14.47 8.28 16.58 8.28C19.2 8.28 20.5 10.02 20.5 13.6V20.5Z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M9 7 4 12l5 5M15 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4 7.5 12 13l8-5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Jayanthmurala", Icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jayanth-murala-0045b2281",
    Icon: LinkedinIcon,
  },
  { label: "LeetCode", href: "https://leetcode.com/u/jayanthmurala1", Icon: CodeIcon },
  { label: "Email", href: "mailto:jayanthmurala1@gmail.com", Icon: MailIcon },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-black px-8 pb-8 pt-24 lg:px-12">
      <style>{`
        @keyframes footer-marquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
        .footer-marquee { animation: footer-marquee 70s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .footer-marquee { animation: none; }
        }
      `}</style>

      <div className="w-full">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Image
              src="/assets/avatar.png"
              alt="Jayanth Murala"
              width={72}
              height={72}
              className="h-18 w-18 rounded-full object-cover ring-1 ring-white/15"
            />

            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">
              Full-stack engineer building systems meant to carry weight long
              after launch.
            </p>

            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map(({ heading, links }) => (
            <div key={heading} className="border-t border-white/15 pt-6">
              <h2 className="font-(family-name:--font-display) text-base text-white">
                {heading}
              </h2>
              {/* padding, not margin, so each row is a 40px+ touch target */}
              <ul className="mt-5 space-y-1">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    {href ? (
                      external || href.startsWith("mailto:") ? (
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer" : undefined}
                          className={LINK}
                        >
                          {label}
                        </a>
                      ) : (
                        // routes stay client-side; a raw <a> reloads the app
                        <Link href={href} className={LINK}>
                          {label}
                        </Link>
                      )
                    ) : (
                      <span className="block break-words py-2.5 text-[15px] text-white/35">
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Solid wordmark, scrolling forever. Negative margins cancel the
            footer's padding so it runs off both screen edges rather than
            being clipped inside the layout. */}
        <div className="-mx-8 mt-10 overflow-hidden lg:-mx-12" aria-hidden>
          <div className="footer-marquee flex w-max whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className="select-none pr-16 font-(family-name:--font-display) text-[clamp(4rem,13vw,13rem)] uppercase leading-none tracking-tight text-white/[0.09]"
                  >
                    Jayanthmurala
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
            © {new Date().getFullYear()} Jayanth Murala
            <span className="text-white/20"> / Built to be inherited</span>
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
            Machilipatnam, India
          </p>
        </div>
      </div>
    </footer>
  );
}
