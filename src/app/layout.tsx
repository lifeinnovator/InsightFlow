import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InsightFlow | 전문 사용자 조사 플랫폼",
  description: "제품 기획 및 학술 연구를 위한 AI 기반 전문 의견 수렴 SaaS 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${manrope.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
