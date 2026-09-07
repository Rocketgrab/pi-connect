import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { ContactedProvider } from "@/lib/contacted";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sydney PI BD checklist",
  description:
    "Working list of Sydney insurers, managing general agents and brokers for professional indemnity instructions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} font-sans antialiased`}>
        <ContactedProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ContactedProvider>
      </body>
    </html>
  );
}
