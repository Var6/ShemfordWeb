import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { fontSans, fontMono } from '@/config/fonts';
import { generateSchemaMarkup, EDUCATIONAL_ORG_SCHEMA } from '@/lib/schema';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
// import { fontSans } from '@/config/fonts';
import  Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import AIChartbot from '@/components/AIChat';

export const metadata: Metadata = {
  metadataBase: new URL('https://shemford.edu'),
  title: {
    default: `${siteConfig.name} - Best CBSE School in Patna`,
    template: `%s - ${siteConfig.name}`,
  },
  description: 'Shemford Futuristic School - Premier CBSE school in Jaganpur, Patna, Bihar. Providing quality education with modern facilities, experienced faculty, and holistic development programs.',
  keywords: ['school in Patna', 'CBSE school', 'best school Bihar', 'school in Jaganpur', 'admission', 'education Patna'],
  authors: [{ name: 'Shemford Futuristic School' }],
  creator: 'Shemford Futuristic School',
  publisher: 'Shemford Futuristic School',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/assets/1685442580.png',
  },
  openGraph: {
    title: `${siteConfig.name} - Best CBSE School in Patna`,
    description: siteConfig.description,
    url: 'https://shemford.edu',
    siteName: siteConfig.name,
    images: [
      {
        url: '/assets/banner1.jpg',
        width: 1200,
        height: 600,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/assets/banner1.jpg'],
    creator: '@shemford_patna',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://shemford.edu',
    languages: {
      'en-IN': 'https://shemford.edu',
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaMarkup = generateSchemaMarkup(EDUCATIONAL_ORG_SCHEMA);

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMarkup }}
        />
      </head>
      <body
        className={clsx(
          `min-h-screen bg-background font-sans antialiased
          ${fontSans.variable} ${fontMono.variable} font-sans`,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto  pt-1 px-2 flex-grow">
              {children}
            </main>
            <Footer/>
            <AIChartbot />
          </div>
        </Providers>
      </body>
    </html>
  );
}
