import "./globals.css";
import "./theme.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flexwork",
  description: "Flexwork dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
