"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RespondentPage() {
    const params = useParams();
    const projectId = params?.id as string;

    const [surveyId, setSurveyId] = useState<string | null>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        if (projectId) {
            fetchSurvey();
        }
    }, [projectId]);

    const fetchSurvey = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('surveys')
            .select('*')
            .eq('project_id', projectId);

        if (data && data.length > 0) {
            setSurveyId(data[0].id);
            if (data[0].config_json && data[0].config_json.length > 0) {
                setQuestions(data[0].config_json);
            } else {
                setQuestions([]); // Empty survey
            }
        }
        setIsLoading(false);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        if (!surveyId) return;
        setIsSubmitting(true);

        try {
            // 1. Create a generic participant
            const { data: participantData, error: participantError } = await supabase
                .from('participants')
                .insert([{ project_id: projectId, status: 'completed' }])
                .select()
                .single();

            if (participantError) throw participantError;

            const participantId = participantData.id;

            // 2. Format answers for insert
            const responseRows = Object.entries(answers).map(([qIdx, answerValue]) => {
                const questionObj = questions[parseInt(qIdx)];
                return {
                    survey_id: surveyId,
                    participant_id: participantId,
                    question_id: questionObj.id.toString(), // Store abstract ID
                    value_numeric: questionObj.type === 'likert' ? parseInt(answerValue as string) : null,
                    value_text: questionObj.type === 'text' ? (answerValue as string) : null
                };
            });

            // 3. Insert responses
            const { error: responseError } = await supabase
                .from('responses')
                .insert(responseRows);

            if (responseError) throw responseError;

            setIsComplete(true);
        } catch (err) {
            console.error("Error submitting survey:", err);
            alert("Failed to submit survey. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">No Survey Found</h2>
                    <p className="text-zinc-500">This project does not have an active survey yet.</p>
                </div>
            </div>
        );
    }

    if (isComplete) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-white font-sans">
                <div className="w-full max-w-2xl text-center">
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                        <span className="text-4xl leading-none">✓</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
                    <p className="text-zinc-400">Your response has been successfully recorded.</p>
                </div>
            </div>
        );
    }

    const q = questions[currentQuestion];
    const isAnswered = answers[currentQuestion] !== undefined && answers[currentQuestion] !== '';

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-white font-sans">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</span>
                        <span className="text-xs font-bold text-brand">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand transition-all duration-500 ease-out"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="relative rounded-3xl bg-zinc-900/50 border border-zinc-800 p-10 shadow-2xl backdrop-blur-md">
                    <div className="absolute -inset-0.5 rounded-3xl bg-brand/10 blur-xl -z-10"></div>

                    <h2 className="text-2xl font-bold leading-tight mb-12">
                        {q.title}
                    </h2>

                    <div className="space-y-8 min-h-[120px]">
                        {q.type === 'likert' && (
                            <>
                                <div className="flex justify-between items-center px-2">
                                    {Array.from({ length: q.scale || 5 }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => setAnswers({ ...answers, [currentQuestion]: num })}
                                            className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 transition-all flex items-center justify-center font-bold ${answers[currentQuestion] === num
                                                ? "bg-brand border-brand shadow-lg shadow-brand/30 scale-110"
                                                : "border-zinc-800 hover:border-zinc-600 text-zinc-400"
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between px-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                    <span>{q.lowLabel || "Strongly Disagree"}</span>
                                    <span>{q.highLabel || "Strongly Agree"}</span>
                                </div>
                            </>
                        )}

                        {q.type === 'text' && (
                            <textarea
                                value={answers[currentQuestion] || ""}
                                onChange={(e) => setAnswers({ ...answers, [currentQuestion]: e.target.value })}
                                placeholder="Type your answer here..."
                                className="w-full h-32 rounded-xl bg-zinc-950 border border-zinc-800 p-4 text-white focus:outline-none focus:border-brand transition-colors resize-none placeholder:text-zinc-700"
                            />
                        )}
                    </div>

                    <div className="mt-16 flex justify-between gap-4">
                        <button
                            onClick={handleBack}
                            disabled={currentQuestion === 0}
                            className="px-8 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-300 disabled:opacity-0 transition-all"
                        >
                            Back
                        </button>

                        {currentQuestion === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!isAnswered || isSubmitting}
                                className="px-10 py-3 rounded-xl bg-brand text-sm font-bold text-white shadow-lg shadow-brand/20 hover:opacity-90 disabled:opacity-50 transition-all"
                            >
                                {isSubmitting ? "Submitting..." : "Finish Survey"}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!isAnswered}
                                className="px-10 py-3 rounded-xl bg-brand text-sm font-bold text-white shadow-lg shadow-brand/20 hover:opacity-90 disabled:opacity-50 transition-all"
                            >
                                Next Question
                            </button>
                        )}
                    </div>
                </div>

                <footer className="mt-12 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                    Powered by <span className="text-zinc-500">InsightFlow</span> Deep Engine
                </footer>
            </div>
        </div>
    );
}
