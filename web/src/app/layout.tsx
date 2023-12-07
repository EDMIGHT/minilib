import '@/assets/styles/globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Comic Library',
    template: '%s • Comic Library',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className={cn('min-h-screen bg-background font-sans antialiased', font.variable)}>
        <main className='container py-4'>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
