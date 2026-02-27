"use client";

import { useState } from "react";

export default function SettingsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [tone, setTone] = useState("academic");
    const [stats, setStats] = useState(["basic"]);

    if (!isOpen) return null;

    const toggleStat = (id: string) => {
        setStats(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    };

    return (
        <>
            <div className="fixed inset-0 z-[60] bg-black/20" onClick={onClose} />
            <div className="fixed right-0 top-16 z-[70] h-[calc(100vh-64px)] w-80 border-l border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Research Analysis Settings</h3>
                    <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">✕</button>
                </div>

                <div className="space-y-8">
                    <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">AI Insight Tone</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {["Academic", "Professional", "Conversational", "Minimalist"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t.toLowerCase())}
                                    className={`rounded-lg py-2 text-xs font-medium transition-colors ${tone === t.toLowerCase()
                                            ? "bg-brand text-white"
                                            : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Statistical Package</h4>
                        <div className="space-y-2">
                            {[
                                { id: "basic", name: "Basic Statistics", desc: "Mean, Median, Std Dev" },
                                { id: "adv", name: "Advanced Analytics", desc: "ANOVA, T-Tests, Correlation" },
                                { id: "sent", name: "Sentiment Engine", desc: "NLP Theme extraction" },
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => toggleStat(s.id)}
                                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${stats.includes(s.id)
                                            ? "border-brand bg-brand/5"
                                            : "border-zinc-100 hover:border-zinc-200 dark:border-zinc-800"
                                        }`}
                                >
                                    <div>
                                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{s.name}</p>
                                        <p className="text-[10px] text-zinc-500">{s.desc}</p>
                                    </div>
                                    {stats.includes(s.id) && <span className="text-brand">●</span>}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Export Preferences</h4>
                        <div className="space-y-3">
                            {[
                                "Include Raw Data",
                                "Highlight P-values",
                                "Generate Exec Summary",
                            ].map((pref) => (
                                <label key={pref} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="accent-brand" />
                                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{pref}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-opacity hover:opacity-90"
                        onClick={onClose}
                    >
                        Apply & Update Preview
                    </button>
                </div>
            </div>
        </>
    );
}
