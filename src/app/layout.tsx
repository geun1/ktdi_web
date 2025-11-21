import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ktdi.co.kr'), // Update this with your actual domain
  title: {
    default: "대한재능개발원 (KTDI)",
    template: "%s | 대한재능개발원",
  },
  description: "미래를 선도하는 AI 교육의 중심, 대한재능개발원입니다. 자격증, AI 교육, 전문가 양성.",
  keywords: ["KTDI", "대한재능개발원", "AI 교육", "자격증", "미래 인재", "교육원"],
  authors: [{ name: "KTDI" }],
  openGraph: {
    title: "대한재능개발원 (KTDI)",
    description: "미래를 선도하는 AI 교육의 중심, 대한재능개발원입니다.",
    url: "https://ktdi.co.kr",
    siteName: "대한재능개발원",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "대한재능개발원 (KTDI)",
    description: "미래를 선도하는 AI 교육의 중심, 대한재능개발원입니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
