import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { fontSans, fontMono } from '@/config/fonts';


import { Providers } from './providers';

import { siteConfig } from '@/config/site';
// import { fontSans } from '@/config/fonts';
import  Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/assets/1685442580.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
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
          </div>
        </Providers>
      </body>
    </html>
  );
}
