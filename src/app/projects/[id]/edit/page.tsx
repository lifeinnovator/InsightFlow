"use client";

import { useState, useEffect } from "react";
import AIGeneratorModal from "@/components/builder/AIGeneratorModal";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

export default function SurveyBuilderPage() {
    const params = useParams();
    const projectId = params?.id as string;

    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [surveyId, setSurveyId] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState("Initializing...");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        if (!projectId) {
            setLoadingMessage("Waiting for route parameters...");
        } else {
            setLoadingMessage(`Fetching survey for project ID: ${projectId}`);
            fetchOrCreateSurvey();
        }
    }, [projectId]);

    const fetchOrCreateSurvey = async () => {
        setIsLoading(true);
        setErrorMsg(null);
        try {
            setLoadingMessage(`Querying database for existing survey...`);
            // Look for an existing survey for this project
            const { data: existingSurveys, error: fetchError } = await supabase
                .from('surveys')
                .select('*')
                .eq('project_id', projectId);

            if (fetchError) {
                throw new Error(`Fetch error: ${fetchError.message}`);
            }

            if (existingSurveys && existingSurveys.length > 0) {
                setLoadingMessage(`Existing survey found mapping data...`);
                const survey = existingSurveys[0];
                setSurveyId(survey.id);
                if (survey.config_json) {
                    setQuestions(survey.config_json);
                } else {
                    // Default question if none exists in DB
                    setQuestions([{ id: 1, type: "likert", title: "Based on your experience, how satisfied are you with the interface?", scale: 7 }]);
                }
            } else {
                setLoadingMessage(`No survey found. Creating a new one...`);
                // No survey found, create one for this project
                const { data: newSurvey, error: insertError } = await supabase
                    .from('surveys')
                    .insert([{ project_id: projectId, title: 'Main Survey' }])
                    .select()
                    .single();

                if (insertError) {
                    throw new Error(`Insert error: ${insertError.message}`);
                }

                if (newSurvey) {
                    setSurveyId(newSurvey.id);
                    setQuestions([{ id: 1, type: "likert", title: "Based on your experience, how satisfied are you with the interface?", scale: 7 }]);
                }
            }
        } catch (err: any) {
            console.error("Exception in fetchOrCreateSurvey:", err);
            setErrorMsg(err?.message || "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const [isSaved, setIsSaved] = useState(false);

    const handleSave = async () => {
        if (!surveyId) return;
        setIsSaving(true);
        const { error } = await supabase
            .from('surveys')
            .update({ config_json: questions })
            .eq('id', surveyId);

        setIsSaving(false);
        if (error) {
            console.error("Failed to save survey:", error);
            alert("Failed to save survey. Please try again.");
        } else {
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
            }, 2000);
        }
    };

    const addQuestion = (type: string = "text", defaultScale: number = 5) => {
        const newId = questions.length > 0 ? Math.max(...questions.map((q: any) => q.id)) + 1 : 1;
        setQuestions([...questions, { id: newId, type, title: "New Question", scale: defaultScale }]);
    };

    const updateQuestionTitle = (id: number, newTitle: string) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, title: newTitle } : q));
    };

    const removeQuestion = (id: number) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const applyAICopilot = () => {
        setQuestions(questions.map(q => {
            if (q.type === 'likert') {
                return { ...q, scale: 7 };
            }
            return q;
        }));
    };

    if (errorMsg) {
        return (
            <div className="flex flex-col h-[calc(100vh-64px)] items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-8 max-w-md">
                    <h2 className="text-red-600 font-bold mb-2">Error Loading Survey</h2>
                    <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 font-bold text-white text-sm rounded-lg hover:bg-red-700">Retry</button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col h-[calc(100vh-64px)] items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mb-4"></div>
                <p className="text-zinc-500 font-bold text-sm tracking-wide">{loadingMessage}</p>
            </div>
        );
    }

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
                        { id: "likert", name: "Likert Scale", icon: "📏", defaultScale: 5 },
                        { id: "text", name: "Open-ended", icon: "✍️" },
                        { id: "rank", name: "Ranking", icon: "🔢" },
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => type.id === 'ai' ? setIsAIModalOpen(true) : addQuestion(type.id, type.defaultScale)}
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
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Survey Canvas</h2>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-50 ${isSaved
                                ? "bg-emerald-500 hover:bg-emerald-600"
                                : "bg-zinc-900 hover:bg-zinc-800 hover:scale-105 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                                }`}
                        >
                            {isSaving ? "Saving..." : isSaved ? "Saved! ✓" : "Save Survey"}
                        </button>
                    </div>

                    <div className="mb-8 rounded-2xl bg-brand/10 border border-brand/20 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">✨</span>
                            <div>
                                <p className="text-sm font-bold text-brand">AI Copilot Suggestion</p>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400">Consider using a 7-point scale for more granular sentiment data in academic mode.</p>
                            </div>
                        </div>
                        <button onClick={applyAICopilot} className="rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand/90 transition-colors">Apply</button>
                    </div>

                    <div className="space-y-6">
                        {questions.map((q, i) => (
                            <div key={q.id} className="group relative rounded-2xl border-2 border-brand bg-white p-8 shadow-sm dark:bg-zinc-900">
                                <div className="absolute -left-3 top-8 h-8 w-1 rounded-full bg-brand"></div>
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-brand tracking-widest">Question {i + 1} • {q.type}</span>
                                    <button onClick={() => removeQuestion(q.id)} className="text-zinc-400 hover:text-red-500 transition-colors">🗑️</button>
                                </div>
                                <input
                                    type="text"
                                    value={q.title || ""}
                                    onChange={(e) => updateQuestionTitle(q.id, e.target.value)}
                                    placeholder="Enter your question here..."
                                    className="w-full text-xl font-bold text-zinc-900 focus:outline-none dark:bg-transparent dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                                />
                                {q.type === 'likert' && (
                                    <>
                                        <div className="mt-8 flex justify-between">
                                            {Array.from({ length: q.scale || 5 }, (_, i) => i + 1).map(n => (
                                                <div key={n} className="flex flex-col items-center gap-2">
                                                    <div className="h-10 w-10 rounded-full border border-zinc-200 flex items-center justify-center text-sm dark:border-zinc-800 dark:text-zinc-400">{n}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex justify-between text-[10px] uppercase font-bold text-zinc-400 px-2">
                                            <span>Very Unsatisfied</span>
                                            <span>Very Satisfied</span>
                                        </div>
                                    </>
                                )}
                                {q.type === 'text' && (
                                    <div className="mt-6 w-full h-24 rounded-lg bg-zinc-50 border border-zinc-200 p-4 text-zinc-400 dark:bg-zinc-800/50 dark:border-zinc-700">
                                        Participant will enter long-form text here...
                                    </div>
                                )}
                            </div>
                        ))}

                        <button onClick={() => addQuestion()} className="w-full rounded-2xl border-2 border-dashed border-zinc-200 p-8 text-sm font-bold text-zinc-400 transition-colors hover:border-brand hover:text-brand dark:border-zinc-800">
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
