'use client';

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${GeistSans.variable} ${GeistMono.variable}`}>
      {children}
    </div>
  );
} 