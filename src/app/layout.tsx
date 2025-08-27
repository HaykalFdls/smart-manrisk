import type { Metadata } from 'next';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'SMART Dashboard',
  description: 'A centralized dashboard for risk management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <Toaster />
      </body>
    
  );
}
