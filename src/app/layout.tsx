import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";

/*

Layout.tsx
---

What is layout.tsx?
- This file defines the template/frame of your website.

Does it make a difference if I dont have a layout.tsx?
- It is not optional. You need to have it.

Important: What is children?
- This is a slot where your actual page content goes.

Important: What is metadata?
- 

What I change in layout.tsx, does that come back in the website?
- Yes. If you add: <body className="bg-black text-white">
- It will come in the website.

*/

// SEO (Search Engine Optimization):
export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "A beautiful and customizable Pomodoro timer with background customization",
};

// This is important (Children):
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
