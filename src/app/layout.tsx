"use client";

import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InsightFlow | 전문 사용자 조사 플랫폼",
  description: "제품 기획 및 학술 연구를 위한 AI 기반 전문 의견 수렴 SaaS 플랫폼",
};

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import SettingsPanel from "@/components/ui/SettingsPanel";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <html lang="ko">
      <body
        className={`${manrope.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950`}
      >
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />
        <Sidebar />
        <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        <main className="pl-64 pt-16 h-screen">
          <div className="h-full overflow-y-auto px-6 py-8 lg:px-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
