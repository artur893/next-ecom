import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { NotificationProvider } from "./components/providers/NotificationProvider";
import AuthSessionProvider from "./components/providers/AuthSessionProvider";

export const metadata: Metadata = {
  title: "DevstockHub",
  description: "Sklep internetowy w Next.js",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AuthSessionProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
