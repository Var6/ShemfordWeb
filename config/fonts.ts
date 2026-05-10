import { Fira_Code as FontMono, Inter as FontSans } from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: false,
});

export const fontMono = FontMono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: false,
});
