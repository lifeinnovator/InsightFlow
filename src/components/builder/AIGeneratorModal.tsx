"use client";

import { useState } from "react";

export default function AIGeneratorModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [goal, setGoal] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md">
            <div className="w-full max-w-xl rounded-3xl bg-zinc-900 border border-zinc-800 p-10 shadow-3xl">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">✨</span>
                        <h2 className="text-xl font-bold text-white">Generate Questions with AI</h2>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">✕</button>
                </div>

                <div className="space-y-8">
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Describe your research goal</label>
                        <textarea
                            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-4 text-sm text-white focus:border-brand focus:outline-none placeholder:text-zinc-700 min-h-[120px]"
                            placeholder="e.g., I want to measure the usability and navigation efficiency of a new fintech application targeted at Gen Z users."
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        />
                    </div>

                    <button className="w-full rounded-2xl bg-brand py-4 text-sm font-bold text-white shadow-xl shadow-brand/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <span>✨</span> Generate with AI Copilot
                    </button>

                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Quick Start with Templates</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: "usab", name: "Usability Test", icon: "👁️" },
                                { id: "cons", name: "Consumer Perception", icon: "🧠" },
                                { id: "brand", name: "Brand Awareness", icon: "🎯" },
                            ].map(t => (
                                <button key={t.id} className="flex flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 text-center hover:border-brand transition-all">
                                    <span className="text-lg">{t.icon}</span>
                                    <span className="text-[10px] font-bold text-zinc-400">{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
