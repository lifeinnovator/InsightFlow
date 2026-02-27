"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function RespondentPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const questions = [
        {
            id: 1,
            text: "How intuitive did you find the dashboard layout?",
            type: "likert",
            lowLabel: "Strongly Disagree",
            highLabel: "Strongly Agree"
        },
        {
            id: 2,
            text: "Was the onboarding process helpful in setting up your workspace?",
            type: "likert",
            lowLabel: "Not Helpful",
            highLabel: "Very Helpful"
        }
    ];

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
                        {questions[currentQuestion].text}
                    </h2>

                    <div className="space-y-8">
                        <div className="flex justify-between items-center px-2">
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setAnswers({ ...answers, [currentQuestion]: num })}
                                    className={`h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center font-bold ${answers[currentQuestion] === num
                                            ? "bg-brand border-brand shadow-lg shadow-brand/30 scale-110"
                                            : "border-zinc-800 hover:border-zinc-600 text-zinc-400"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between px-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            <span>{questions[currentQuestion].lowLabel}</span>
                            <span>{questions[currentQuestion].highLabel}</span>
                        </div>
                    </div>

                    <div className="mt-16 flex justify-between gap-4">
                        <button
                            onClick={handleBack}
                            disabled={currentQuestion === 0}
                            className="px-8 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-300 disabled:opacity-0 transition-all"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-10 py-3 rounded-xl bg-brand text-sm font-bold text-white shadow-lg shadow-brand/20 hover:opacity-90 transition-all"
                        >
                            {currentQuestion === questions.length - 1 ? "Finish Survey" : "Next Question"}
                        </button>
                    </div>
                </div>

                <footer className="mt-12 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                    Powered by <span className="text-zinc-500">InsightFlow</span> Deep Engine
                </footer>
            </div>
        </div>
    );
}
