import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import { StoreProvider } from "../Providers/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import SessionProviderWrapper from "../Providers/SessionProvider";
import SocketWrapper from "@/Providers/SocketProvider";

const inter = Inter({ display: "swap", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SocketWrapper>
                {children}
                <Toaster />
              </SocketWrapper>
            </ThemeProvider>
          </StoreProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
