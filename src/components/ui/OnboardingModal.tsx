"use client";

import { useState } from "react";

interface OnboardingOption {
    id: string;
    name: string;
    icon?: string;
    info?: string;
    features?: string[];
    desc?: string;
}

interface OnboardingStep {
    title: string;
    description: string;
    options?: OnboardingOption[];
    modes?: OnboardingOption[];
}

const steps: OnboardingStep[] = [
    {
        title: "Welcome to InsightFlow. Tell us about your role.",
        description: "Your role helps us tailor the toolset to your professional needs.",
        options: [
            { id: "uxr", name: "UX Researcher", icon: "👁️", info: "Enables usability testing & user journey mapping" },
            { id: "acad", name: "Academic Researcher", icon: "🎓", info: "Enables formal statistical analysis & APA exports" },
            { id: "pm", name: "Product Manager", icon: "🍱", info: "Enables executive summaries & trend analysis" },
            { id: "mkt", name: "Marketing Analyst", icon: "📈", info: "Enables consumer behavior & sentiment tracking" },
        ],
    },
    {
        title: "What is your primary focus?",
        description: "We'll optimize the AI analysis for your specific domain.",
        options: [
            { id: "hci", name: "Human-Computer Interaction (HCI)" },
            { id: "cons", name: "Consumer Behavior" },
            { id: "psych", name: "Psychological Study" },
            { id: "prod", name: "Product Usability" },
        ],
    },
    {
        title: "Choose your Analysis Engine.",
        description: "This sets the default tone and format of your AI-generated reports.",
        modes: [
            {
                id: "academic",
                name: "Academic Research Mode",
                desc: "Best for formal studies.",
                features: ["Formal tone", "p-value & significance focus", "APA-style table exports"],
            },
            {
                id: "business",
                name: "Business Insight Mode",
                desc: "Best for product teams.",
                features: ["Actionable tone", "Executive summaries", "Trend & ROI focus"],
            },
        ],
    },
];

export default function OnboardingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-950">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-12 rounded-full transition-colors ${i <= currentStep ? "bg-brand" : "bg-zinc-100 dark:bg-zinc-800"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-zinc-400">STEP {currentStep + 1} OF 3</span>
                </div>

                <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                    {steps[currentStep].title}
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    {steps[currentStep].description}
                </p>

                <div className="mt-8">
                    {currentStep === 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {steps[0].options?.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setSelections({ ...selections, role: opt.id })}
                                    className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all ${selections.role === opt.id
                                        ? "border-brand bg-brand/5 ring-1 ring-brand"
                                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                                        }`}
                                >
                                    <span className="text-2xl">{opt.icon}</span>
                                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{opt.name}</span>
                                    <span className="text-xs text-zinc-500">{opt.info}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="flex flex-wrap gap-3">
                            {steps[1].options?.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setSelections({ ...selections, focus: opt.id })}
                                    className={`rounded-full border px-6 py-2 text-sm font-medium transition-all ${selections.focus === opt.id
                                        ? "border-brand bg-brand text-white"
                                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400"
                                        }`}
                                >
                                    {opt.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="grid grid-cols-2 gap-6">
                            {steps[2].modes?.map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => setSelections({ ...selections, mode: mode.id })}
                                    className={`flex flex-col items-start rounded-xl border p-6 text-left transition-all ${selections.mode === mode.id
                                        ? "border-brand bg-brand/5 ring-1 ring-brand"
                                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                                        }`}
                                >
                                    <span className="mb-2 font-bold text-zinc-900 dark:text-zinc-100">{mode.name}</span>
                                    <p className="mb-4 text-xs text-zinc-500">{mode.desc}</p>
                                    <ul className="space-y-2">
                                        {mode.features?.map((f) => (
                                            <li key={f} className="flex items-center gap-2 text-[10px] text-zinc-600 dark:text-zinc-400">
                                                <span className="text-brand">✓</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-10 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                        Skip for now
                    </button>
                    <button
                        onClick={handleNext}
                        className="rounded-xl bg-brand px-10 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-opacity hover:opacity-90"
                    >
                        {currentStep === 2 ? "Activate & Start Research" : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );
}
