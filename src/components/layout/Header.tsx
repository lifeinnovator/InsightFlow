"use client";

import Link from "next/link";

export default function Header({ onOpenSettings }: { onOpenSettings: () => void }) {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="flex h-16 items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xl">
                            I
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Insight<span className="text-brand">Flow</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenSettings}
                        className="h-9 rounded-full bg-zinc-100 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                    >
                        분석 설정
                    </button>
                    <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                </div>
            </div>
        </header>
    );
}
