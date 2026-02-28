"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "대시보드", href: "/", icon: "📊" },
    { name: "설문 설계", href: "/builder", icon: "📝" },
    { name: "응답 관리", href: "/responses", icon: "👥" },
    { name: "데이터 분석", href: "/analysis", icon: "🔬" },
    { name: "보고서 생성", href: "/reports", icon: "📁" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const projectIdMatch = pathname.match(/\/projects\/([^/]+)/);
    const projectId = projectIdMatch ? projectIdMatch[1] : null;

    const navItems = projectId ? [
        { name: "대시보드", href: `/`, icon: "🏠" },
        { name: "설문 설계", href: `/projects/${projectId}/edit`, icon: "📝" },
        { name: "배포 관리", href: `/projects/${projectId}/distribute`, icon: "🚀" },
        { name: "응답 관리", href: `/projects/${projectId}/responses`, icon: "👥" },
        { name: "원시 데이터", href: `/projects/${projectId}/data`, icon: "📁" },
    ] : [
        { name: "대시보드", href: "/", icon: "📊" },
    ];

    return (
        <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <nav className="flex flex-col gap-1 p-4">
                {navItems.map((item) => {
                    // Match paths accurately for active state
                    let isActive = pathname === item.href;
                    if (projectId && item.href !== '/') {
                        isActive = pathname.includes(item.href);
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                ? "bg-zinc-100 text-brand dark:bg-zinc-900"
                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-4 w-full px-4">
                <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900/50">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                        현재 플랜
                    </p>
                    <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        Professional
                    </p>
                    <button className="mt-3 w-full rounded-lg bg-brand py-2 text-xs font-bold text-white transition-opacity hover:opacity-90">
                        업그레이드
                    </button>
                </div>
            </div>
        </aside>
    );
}
