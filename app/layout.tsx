import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-display",
  weight: "800",
  subsets: ["latin"],
});

// Set NEXT_PUBLIC_SITE_URL once the domain is live; everything canonical,
// every OG image URL and the sitemap all derive from this one value.
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jayanthmurala.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Jayanth Murala · Full-stack engineer",
    template: "%s · Jayanth Murala",
  },
  description:
    "Full-stack engineer in Machilipatnam, India, working with clients in India and the US. I build web apps, AI products and automation that keep working long after launch.",
  applicationName: "Jayanth Murala",
  authors: [{ name: "Jayanth Murala", url: SITE }],
  creator: "Jayanth Murala",
  publisher: "Jayanth Murala",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Jayanth Murala",
    locale: "en_IN",
    url: SITE,
    title: "Jayanth Murala · Full-stack engineer",
    description:
      "Web apps, AI products and automation, built to hold up after launch.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayanth Murala · Full-stack engineer",
    description:
      "Web apps, AI products and automation, built to hold up after launch.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Structured data. Search results use it for the knowledge panel, and answer
 * engines read it to state who I am rather than guessing from page text.
 */
const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jayanth Murala",
  alternateName: "M. Jayanth Murala",
  url: SITE,
  jobTitle: "Full-stack engineer",
  email: "mailto:jayanthmurala1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Machilipatnam",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  description:
    "Freelance full-stack engineer building web apps, AI products and automation for clients in India and the US.",
  knowsAbout: [
    "Full-stack web development",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AI product engineering",
    "Workflow automation",
    "n8n",
  ],
  sameAs: [
    "https://github.com/Jayanthmurala",
    "https://linkedin.com/in/jayanth-murala-0045b2281",
    "https://leetcode.com/u/jayanthmurala1",
  ],
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Jayanth Murala",
  url: SITE,
  inLanguage: "en",
  author: { "@type": "Person", name: "Jayanth Murala" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} h-full antialiased`}
    >
      {/* Browser extensions (Grammarly et al.) inject attributes on <body>
          before hydration; suppress the resulting mismatch warning. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([PERSON, WEBSITE]) }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
