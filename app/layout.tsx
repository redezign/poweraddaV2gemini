import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://poweradda.com';
const parsedMetadataBaseUrl = rawSiteUrl.startsWith('http') ? rawSiteUrl : `https://${rawSiteUrl}`;

export const metadata: Metadata = {
  title: 'PowerAdda | Mumbai\'s Trusted Energy Solutions Partner',
  description: 'PowerAdda helps homeowners, businesses, and industries in Mumbai & across India adopt customized solar, lithium energy storage (ESS), automotive batteries, inverter backups, and wind systems cleanly.',
  keywords: 'Solar Energy Mumbai, Backup Batteries, Inverter Batteries, Lithium Energy Storage India, Wind Energy solutions, PowerAdda, Solar installation Mumbai, Net Metering Maharashtra',
  metadataBase: new URL(parsedMetadataBaseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PowerAdda | Premium Clean Energy & Power Backup Solutions',
    description: 'Mumbai\'s destination for solar systems, energy storage arrays, automotive & inverter batteries, and wind solutions nationwide.',
    siteName: 'PowerAdda',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PowerAdda | Renewable Energy & Batteries',
    description: 'Trusted solar, battery, and energy solutions.',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased scroll-smooth" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

