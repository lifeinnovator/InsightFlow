"use client";

import { useState } from "react";

export default function CreateProjectModal({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (name: string) => void }) {
    const [projectName, setProjectName] = useState("");
    const [researchGoal, setResearchGoal] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (projectName.trim()) {
            onCreate(projectName);
            setProjectName("");
            setResearchGoal("");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-950">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Create New Research Project</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Project Name</label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-brand focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                            placeholder="e.g., 2026 Q1 User Experience Survey"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Primary Research Goal</label>
                        <textarea
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-brand focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                            placeholder="What are you trying to learn?"
                            rows={3}
                            value={researchGoal}
                            onChange={(e) => setResearchGoal(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-zinc-200 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-opacity hover:opacity-90"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
