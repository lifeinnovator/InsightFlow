"use client";

import { useState } from "react";
import Link from "next/link";

export default function DistributionPage() {
    const [copyStatus, setCopyStatus] = useState("Copy Link");

    const handleCopy = () => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus("Copy Link"), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Distribution & Collection</h1>
                    <p className="mt-2 text-zinc-500 text-sm">Review your survey status and manage participant recruitment.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="./edit" className="rounded-xl border border-zinc-200 px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900">
                        Edit Survey
                    </Link>
                    <button className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white dark:bg-white dark:text-zinc-900">
                        Pause Collection
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: "Active Responses", value: "142", trend: "+12% from yesterday" },
                    { label: "Avg. Completion Time", value: "4m 20s", trend: "-5s improvement" },
                    { label: "Completion Rate", value: "88%", trend: "High engagement" },
                ].map((stat, i) => (
                    <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{stat.label}</p>
                        <p className="text-2xl font-black text-zinc-900 dark:text-white">{stat.value}</p>
                        <p className="mt-2 text-xs text-brand font-medium">{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white shadow-xl overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
                <div className="border-b border-zinc-100 p-8 dark:border-zinc-800">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Share Public Survey Link</h3>
                    <div className="flex gap-4">
                        <div className="flex-1 rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm text-zinc-500 font-mono flex items-center dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                            https://insightflow.ai/s/xf92j8k1
                        </div>
                        <button
                            onClick={handleCopy}
                            className="rounded-xl bg-brand px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-all hover:opacity-90"
                        >
                            {copyStatus}
                        </button>
                    </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-50/50 dark:bg-zinc-900/20">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center dark:bg-zinc-800">📧</div>
                        <div>
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Email Recruitment</h4>
                            <p className="mt-1 text-xs text-zinc-500">Send personalized invites to your participant list.</p>
                            <button className="mt-3 text-xs font-bold text-brand">Configure Email Campaign →</button>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center dark:bg-zinc-800">🔳</div>
                        <div>
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">QR Code Generator</h4>
                            <p className="mt-1 text-xs text-zinc-500">Generate professional QR codes for physical labs.</p>
                            <button className="mt-3 text-xs font-bold text-brand">Download QR Codes →</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
