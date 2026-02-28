"use client";

import { useMemo, useState } from "react";
import { Sparkles, FileText, CheckCircle2 } from "lucide-react";

// Mock data for the chart
const mockResponseData = [
    { date: "Feb 23", started: 12, completed: 8 },
    { date: "Feb 24", started: 25, completed: 18 },
    { date: "Feb 25", started: 45, completed: 32 },
    { date: "Feb 26", started: 68, completed: 50 },
    { date: "Feb 27", started: 95, completed: 75 },
    { date: "Feb 28", started: 120, completed: 102 },
];

// Mock data for AI Subjective Analysis
const aiInsights = {
    keywords: ["직관적인 UI", "가격 정책 불만", "고객 지원 우수", "모바일 최적화 필요"],
    sentiment: { positive: 65, neutral: 20, negative: 15 },
    summary: "전반적인 사용자 만족도는 높으나(65%), 일부 프리랜서 그룹에서 가격 정책에 대한 불만이 지속적으로 제기되고 있습니다. 특히 '모바일 최적화'와 관련된 키워드가 지난 조사 대비 15% 증가했습니다."
};

export default function ResultDashboard() {
    const [isAcademicMode, setIsAcademicMode] = useState(false);

    const totalResponses = useMemo(() => mockResponseData[mockResponseData.length - 1].completed, []);
    const completionRate = useMemo(() => {
        const last = mockResponseData[mockResponseData.length - 1];
        return Math.round((last.completed / last.started) * 100);
    }, []);

    const maxValue = Math.max(...mockResponseData.map(d => d.started));

    // Dynamic classes based on Academic Mode
    const containerClasses = isAcademicMode
        ? "max-w-4xl mx-auto font-serif text-zinc-900 bg-white p-12 transition-all duration-500 ease-in-out"
        : "flex flex-col gap-6 transition-all duration-300";

    const cardClasses = isAcademicMode
        ? "border-b border-zinc-300 py-6 my-2 bg-transparent"
        : "rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm";

    const textPrimaryClasses = isAcademicMode ? "text-zinc-900 font-serif leading-relaxed text-justify mt-3" : "text-zinc-900 dark:text-white mt-2";
    const textSecondaryClasses = isAcademicMode ? "text-zinc-700 font-serif font-semibold italic text-lg border-b-2 border-zinc-200 pb-2 inline-block" : "text-sm font-medium text-zinc-500";
    const titleClasses = isAcademicMode ? "text-2xl font-serif font-semibold text-black border-b border-black pb-4 mb-8 text-center" : "text-lg font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2";

    return (
        <div className={containerClasses}>
            {/* Header Area with Toggle */}
            <div className="flex justify-between items-end mb-4 relative">
                {isAcademicMode ? (
                    <div className="w-full text-center mb-8">
                        <h1 className="text-3xl font-serif font-semibold mb-2">InsightFlow Research Dashboard</h1>
                        <p className="font-serif italic text-zinc-600">Generated automatically by AI Assistant</p>
                    </div>
                ) : (
                    <div></div> // Spacer when not in academic mode, actual header is in parent page
                )}

                <button
                    onClick={() => setIsAcademicMode(!isAcademicMode)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all ${isAcademicMode
                        ? "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50 font-sans absolute top-0 right-0"
                        : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 shadow-sm"
                        }`}
                >
                    <FileText size={16} />
                    {isAcademicMode ? "Exit Academic Mode" : "Report Mode"}
                </button>
            </div>

            <div className={`grid grid-cols-1 ${isAcademicMode ? "md:grid-cols-1 gap-0 space-y-4" : "md:grid-cols-3 gap-4"}`}>
                <div className={cardClasses}>
                    <p className={textSecondaryClasses}>Total Responses</p>
                    <p className={`text-3xl font-semibold ${textPrimaryClasses}`}>{totalResponses}</p>
                    {isAcademicMode && <p className="font-serif text-sm mt-2 text-zinc-600">The total number of finalized survey responses collected up to the current date.</p>}
                    {!isAcademicMode && <p className="mt-2 text-sm text-emerald-500 font-medium">+12 from yesterday</p>}
                </div>
                <div className={cardClasses}>
                    <p className={textSecondaryClasses}>Completion Rate</p>
                    <p className={`text-3xl font-semibold ${textPrimaryClasses}`}>{completionRate}%</p>
                    {isAcademicMode && <p className="font-serif text-sm mt-2 text-zinc-600">Calculated as the ratio of completed surveys to total surveys initiated. Industry average context: 65%.</p>}
                    {!isAcademicMode && <p className="mt-2 text-sm text-zinc-500">Industry avg: 65%</p>}
                </div>
                <div className={cardClasses}>
                    <p className={textSecondaryClasses}>Avg. Time to Complete</p>
                    <p className={`text-3xl font-semibold ${textPrimaryClasses}`}>4m 12s</p>
                    {isAcademicMode && <p className="font-serif text-sm mt-2 text-zinc-600">The mean duration participants spent actively engaging with the survey instrument.</p>}
                    {!isAcademicMode && <p className="mt-2 text-sm text-emerald-500 font-medium">-30s from last week</p>}
                </div>
            </div>

            {/* AI Subjective Analysis Section */}
            <div className={cardClasses + " mt-2"}>
                <h3 className={titleClasses}>
                    {!isAcademicMode && <Sparkles className="text-brand" size={20} />}
                    AI Subjective Analysis
                </h3>

                <div className={`grid grid-cols-1 ${isAcademicMode ? "gap-8" : "md:grid-cols-2 gap-8"} mt-4`}>
                    {/* Sentiment Analysis */}
                    <div>
                        <h4 className={`mb-3 ${isAcademicMode ? "font-serif font-semibold text-lg" : "text-sm font-semibold text-zinc-700 dark:text-zinc-300"}`}>
                            Sentiment Overview
                        </h4>
                        <div className="flex h-3 w-full rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            <div className="bg-emerald-500" style={{ width: `${aiInsights.sentiment.positive}%` }} title="Positive"></div>
                            <div className="bg-zinc-400" style={{ width: `${aiInsights.sentiment.neutral}%` }} title="Neutral"></div>
                            <div className="bg-rose-500" style={{ width: `${aiInsights.sentiment.negative}%` }} title="Negative"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-medium text-zinc-500">
                            <span className="text-emerald-600 dark:text-emerald-400">Positive {aiInsights.sentiment.positive}%</span>
                            <span className="text-zinc-500">Neutral {aiInsights.sentiment.neutral}%</span>
                            <span className="text-rose-600 dark:text-rose-400">Negative {aiInsights.sentiment.negative}%</span>
                        </div>
                    </div>

                    {/* Keywords */}
                    <div>
                        <h4 className={`mb-3 ${isAcademicMode ? "font-serif font-semibold text-lg" : "text-sm font-semibold text-zinc-700 dark:text-zinc-300"}`}>
                            Top Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {aiInsights.keywords.map((kw, i) => (
                                <span key={i} className={`inline-flex items-center px-2.5 py-1 ${isAcademicMode ? "border border-zinc-400 font-serif italic text-sm" : "bg-brand/10 text-brand dark:bg-brand/20"} rounded-md text-xs font-medium`}>
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Summary Text */}
                <div className={`mt-6 p-4 rounded-lg bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800/30 ${isAcademicMode ? "bg-transparent border-none p-0 mt-8" : ""}`}>
                    {isAcademicMode && <h4 className="font-serif font-semibold text-lg mb-2">Executive Summary</h4>}
                    <div className="flex gap-3">
                        {!isAcademicMode && <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />}
                        <p className={`text-sm ${isAcademicMode ? "font-serif text-base leading-relaxed text-justify" : "text-emerald-800 dark:text-emerald-200/80 leading-relaxed"}`}>
                            "{aiInsights.summary}"
                        </p>
                    </div>
                </div>
            </div>

            {/* New Correlation Analysis Section (p-value) */}
            <div className={cardClasses}>
                <h3 className={titleClasses}>
                    {!isAcademicMode && <Sparkles className="text-brand" size={20} />}
                    Statistical Significance & Correlation
                </h3>

                <div className="mt-4 overflow-x-auto">
                    <table className={`w-full text-left text-sm ${isAcademicMode ? "font-serif border-collapse border-b-2 border-t-2 border-black" : ""}`}>
                        <thead className={`${isAcademicMode ? "border-b border-black text-black" : "bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400"}`}>
                            <tr>
                                <th className={`px-4 py-3 font-medium ${isAcademicMode ? "font-semibold italic" : ""}`}>Variable A</th>
                                <th className={`px-4 py-3 font-medium ${isAcademicMode ? "font-semibold italic" : ""}`}>Variable B</th>
                                <th className={`px-4 py-3 font-medium text-right ${isAcademicMode ? "font-semibold italic" : ""}`}>Pearson's r</th>
                                <th className={`px-4 py-3 font-medium text-right ${isAcademicMode ? "font-semibold italic" : ""}`}>p-value</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isAcademicMode ? "divide-zinc-200 text-black" : "divide-zinc-200 dark:divide-zinc-800"}`}>
                            {/* Row 1: Significant */}
                            <tr className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors ${isAcademicMode ? "" : "bg-blue-50/30 dark:bg-blue-900/10"}`}>
                                <td className={`px-4 py-3 ${isAcademicMode ? "" : "font-medium text-blue-900 dark:text-blue-100"}`}>사용 빈도 (Weekly+)</td>
                                <td className={`px-4 py-3 ${isAcademicMode ? "" : "font-medium text-blue-900 dark:text-blue-100"}`}>전반적 만족도</td>
                                <td className={`px-4 py-3 text-right ${isAcademicMode ? "" : "font-semibold text-blue-700 dark:text-blue-300"}`}>0.78</td>
                                <td className="px-4 py-3 text-right">
                                    <span className={`${isAcademicMode ? "font-semibold" : "font-semibold text-blue-700 dark:text-blue-300"}`}>
                                        &lt; .01 **
                                    </span>
                                </td>
                            </tr>
                            {/* Row 2: Significant */}
                            <tr className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors ${isAcademicMode ? "" : "bg-blue-50/30 dark:bg-blue-900/10"}`}>
                                <td className={`px-4 py-3 ${isAcademicMode ? "" : "font-medium text-blue-900 dark:text-blue-100"}`}>가격 민감도</td>
                                <td className={`px-4 py-3 ${isAcademicMode ? "" : "font-medium text-blue-900 dark:text-blue-100"}`}>재결제 의사</td>
                                <td className={`px-4 py-3 text-right ${isAcademicMode ? "" : "font-semibold text-blue-700 dark:text-blue-300"}`}>-0.62</td>
                                <td className="px-4 py-3 text-right">
                                    <span className={`${isAcademicMode ? "font-semibold" : "font-semibold text-blue-700 dark:text-blue-300"}`}>
                                        .03 *
                                    </span>
                                </td>
                            </tr>
                            {/* Row 3: Not Significant */}
                            <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">응답 소요 시간</td>
                                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">만족도 점수</td>
                                <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">0.12</td>
                                <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">.45</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={`mt-2 text-right ${isAcademicMode ? "font-serif text-sm italic" : "text-xs text-zinc-500"}`}>
                        * p &lt; .05, ** p &lt; .01
                    </div>
                </div>

                {/* AI Interpretation */}
                <div className={`mt-4 p-4 rounded-lg bg-blue-50/50 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-800/30 ${isAcademicMode ? "bg-transparent border-none p-0 mt-6" : ""}`}>
                    {isAcademicMode && <h4 className="font-serif font-semibold text-lg mb-2">Findings</h4>}
                    <div className="flex gap-3">
                        {!isAcademicMode && <Sparkles className="text-blue-500 shrink-0 mt-0.5" size={18} />}
                        <div className={`text-sm ${isAcademicMode ? "font-serif text-base leading-relaxed text-justify" : "text-blue-800 dark:text-blue-200/80 leading-relaxed"}`}>
                            <p className="mb-2">AI 해석 결과:</p>
                            <ul className={`list-disc pl-5 space-y-1 ${isAcademicMode ? "list-outside" : ""}`}>
                                <li><strong>사용 빈도</strong>와 <strong>만족도</strong> 사이에 매우 강한 양(+)의 상관관계가 발견되었습니다(p&lt;.01). 이는 서비스를 자주 이용할수록 만족도가 확연히 높아짐을 시사합니다.</li>
                                <li><strong>가격 민감도</strong>가 높을수록 <strong>재결제 의사</strong>가 낮아지는 뚜렷한 음(-)의 방향성이 확인되었습니다(p&lt;.05). 라이선스 가격 방어 전략이 필요합니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cardClasses}>
                <h3 className={titleClasses}>Response Volume Over Time</h3>

                {/* Custom bar chart using standard divs and Tailwind */}
                <div className={`h-64 flex items-end gap-2 md:gap-4 mt-4 ${isAcademicMode ? "border-b border-l border-black p-4" : ""}`}>
                    {mockResponseData.map((data, index) => {
                        const heightStarted = `${(data.started / maxValue) * 100}%`;
                        const heightCompleted = `${(data.completed / maxValue) * 100}%`;

                        return (
                            <div key={index} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                                <div className="w-full relative flex items-end justify-center h-[calc(100%-24px)] group-hover:opacity-80 transition-opacity">
                                    <div
                                        className={`absolute bottom-0 w-full md:w-3/4 ${isAcademicMode ? "bg-zinc-300" : "bg-brand/30"} rounded-t-sm`}
                                        style={{ height: heightStarted }}
                                        title={`Started: ${data.started}`}
                                    />
                                    <div
                                        className={`absolute bottom-0 w-full md:w-3/4 ${isAcademicMode ? "bg-zinc-800" : "bg-brand"} rounded-t-sm z-10`}
                                        style={{ height: heightCompleted }}
                                        title={`Completed: ${data.completed}`}
                                    />
                                </div>
                                <span className={`text-xs ${isAcademicMode ? "font-serif text-black" : "text-zinc-500"} whitespace-nowrap`}>{data.date}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${isAcademicMode ? "bg-zinc-300 rounded-none" : "rounded-full bg-brand/30"}`}></div>
                        <span className={`text-sm ${isAcademicMode ? "font-serif" : "text-zinc-600 dark:text-zinc-400"}`}>Started Mapping</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${isAcademicMode ? "bg-zinc-800 rounded-none" : "rounded-full bg-brand"}`}></div>
                        <span className={`text-sm ${isAcademicMode ? "font-serif" : "text-zinc-600 dark:text-zinc-400"}`}>Completed Survey</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
