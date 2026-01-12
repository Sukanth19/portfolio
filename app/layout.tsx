import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sukanth | Terminal Portfolio',
  description: 'Interactive terminal-style portfolio of Sukanth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>{children}</body>
    </html>
  );
}
