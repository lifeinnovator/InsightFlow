"use client";

import { useState } from "react";
import Link from "next/link";
import AIGeneratorModal from "@/components/builder/AIGeneratorModal";

export default function SurveyBuilderPage() {
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [questions, setQuestions] = useState([
        { id: 1, type: "likert", title: "Based on your experience, how satisfied are you with the interface?", scale: 7 }
    ]);

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
            <AIGeneratorModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />

            {/* Left Sidebar: Question Library */}
            <aside className="w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-6">Question Types</h3>
                <div className="space-y-3">
                    {[
                        { id: "ai", name: "AI Question Generator", icon: "✨", primary: true },
                        { id: "mc", name: "Multiple Choice", icon: "🔘" },
                        { id: "likert", name: "Likert Scale", icon: "📏" },
                        { id: "text", name: "Open-ended", icon: "✍️" },
                        { id: "rank", name: "Ranking", icon: "🔢" },
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => type.id === 'ai' && setIsAIModalOpen(true)}
                            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-sm font-medium transition-colors ${type.primary
                                ? "bg-brand border-brand text-white shadow-lg shadow-brand/20"
                                : "border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-brand hover:bg-brand/5"
                                }`}
                        >
                            <span>{type.icon}</span>
                            <span>{type.name}</span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Canvas */}
            <main className="flex-1 overflow-y-auto p-12">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 rounded-2xl bg-brand/10 border border-brand/20 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">✨</span>
                            <div>
                                <p className="text-sm font-bold text-brand">AI Copilot Suggestion</p>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400">Consider using a 7-point scale for more granular sentiment data in academic mode.</p>
                            </div>
                        </div>
                        <button className="rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white">Apply</button>
                    </div>

                    <div className="space-y-6">
                        {questions.map((q, i) => (
                            <div key={q.id} className="group relative rounded-2xl border-2 border-brand bg-white p-8 shadow-sm dark:bg-zinc-900">
                                <div className="absolute -left-3 top-8 h-8 w-1 rounded-full bg-brand"></div>
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-brand tracking-widest">Question {i + 1} • Likert Scale</span>
                                    <button className="text-zinc-400 hover:text-red-500">🗑️</button>
                                </div>
                                <input
                                    type="text"
                                    value={q.title}
                                    className="w-full text-xl font-bold text-zinc-900 focus:outline-none dark:bg-transparent dark:text-white"
                                />
                                <div className="mt-8 flex justify-between">
                                    {[1, 2, 3, 4, 5, 6, 7].map(n => (
                                        <div key={n} className="flex flex-col items-center gap-2">
                                            <div className="h-10 w-10 rounded-full border border-zinc-200 flex items-center justify-center text-sm dark:border-zinc-800 dark:text-zinc-400">{n}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex justify-between text-[10px] uppercase font-bold text-zinc-400 px-2">
                                    <span>Very Unsatisfied</span>
                                    <span>Very Satisfied</span>
                                </div>
                            </div>
                        ))}

                        <button className="w-full rounded-2xl border-2 border-dashed border-zinc-200 p-8 text-sm font-bold text-zinc-400 transition-colors hover:border-brand hover:text-brand dark:border-zinc-800">
                            ＋ Add New Question
                        </button>
                    </div>
                </div>
            </main>

            {/* Right Sidebar: Properties */}
            <aside className="w-80 border-l border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-8">Properties</h3>
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Required Question</span>
                        <div className="h-6 w-11 rounded-full bg-brand relative">
                            <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Logic & Branching</span>
                        <button className="mt-3 w-full rounded-xl border border-zinc-200 py-3 text-xs font-bold text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                            Setup Branching Logic
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
