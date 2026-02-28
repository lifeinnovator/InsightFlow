"use client";

import { useState } from "react";
import { Download, Filter, Search, Columns } from "lucide-react";

// Mock Raw Data
const MOCK_DATA = [
    { id: "R-001", participant: "P-1002", submittedAt: "2026-02-28 09:15", q1: "Strongly Agree", q2: "Daily", q3: "The UX is intuitive, but pricing is confusing." },
    { id: "R-002", participant: "P-1003", submittedAt: "2026-02-28 09:22", q1: "Agree", q2: "Weekly", q3: "Good feature set." },
    { id: "R-003", participant: "P-1004", submittedAt: "2026-02-28 10:05", q1: "Neutral", q2: "Monthly", q3: "-" },
    { id: "R-004", participant: "P-1005", submittedAt: "2026-02-28 11:30", q1: "Strongly Agree", q2: "Daily", q3: "Excellent support team! Saved my project." },
    { id: "R-005", participant: "P-1006", submittedAt: "2026-02-28 14:10", q1: "Disagree", q2: "Rarely", q3: "Too expensive for individuals." },
];

export default function RawDataPage({ params }: { params: { id: string } }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = MOCK_DATA.filter(row =>
        Object.values(row).some(val => val.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-full space-y-6 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        Raw Data
                    </h1>
                    <p className="mt-2 text-zinc-500">View and export unfiltered survey responses.</p>
                </div>

                <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-sm">
                    <Download size={16} />
                    Export CSV
                </button>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-3 items-center bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search any field..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
                        />
                    </div>

                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-zinc-200 rounded-lg bg-white hover:bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                        <Filter size={16} />
                        <span className="hidden sm:inline">Filters</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-zinc-200 rounded-lg bg-white hover:bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                        <Columns size={16} />
                        <span className="hidden sm:inline">Columns</span>
                    </button>
                </div>

                {/* Spreadsheet View */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                                <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800 w-24">Resp ID</th>
                                <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800 w-24">Part. ID</th>
                                <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800 w-40">Submitted At</th>
                                <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800 w-48 truncate" title="Q1: How satisfied are you with the platform?">Q1: Satisfaction</th>
                                <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800 w-48 truncate" title="Q2: How often do you use our features?">Q2: Usage Frequency</th>
                                <th className="px-4 py-3 font-semibold min-w-[300px]" title="Q3: What could be improved?">Q3: Improvements (Open)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-xs">
                            {filteredData.map((row) => (
                                <tr key={row.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40">
                                    <td className="px-4 py-2.5 border-r border-zinc-200 dark:border-zinc-800 text-zinc-500">{row.id}</td>
                                    <td className="px-4 py-2.5 border-r border-zinc-200 dark:border-zinc-800 text-brand">{row.participant}</td>
                                    <td className="px-4 py-2.5 border-r border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">{row.submittedAt}</td>
                                    <td className="px-4 py-2.5 border-r border-zinc-200 dark:border-zinc-800">{row.q1}</td>
                                    <td className="px-4 py-2.5 border-r border-zinc-200 dark:border-zinc-800">{row.q2}</td>
                                    <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300 whitespace-normal">{row.q3}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredData.length === 0 && (
                        <div className="p-12 text-center text-zinc-500 font-sans text-sm">
                            No records found.
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50">
                    <span>Showing {filteredData.length} of 5 records</span>
                    <div className="flex gap-1">
                        <button className="px-2 py-1 border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 disabled:opacity-50" disabled>Prev</button>
                        <button className="px-2 py-1 border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
