import './globals.css';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jayanth Murala - Full Stack Developer',
  description: 'Full Stack Developer Portfolio',
    icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={sora.className}>{children}</body>
    </html>
  );
}