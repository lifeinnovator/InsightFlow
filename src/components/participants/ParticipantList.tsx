"use client";

import { useState } from "react";
import { Check, X, Search, Filter, AlertCircle, ShieldCheck } from "lucide-react";

// Mock Data
const MOCK_PARTICIPANTS = [
    { id: "P-1002", email: "user1@example.com", cohort: "B2B Tech", timeSpent: "5m 20s", aiScore: 95, status: "pending" },
    { id: "P-1003", email: "user2@startup.io", cohort: "SaaS", timeSpent: "3m 45s", aiScore: 82, status: "approved" },
    { id: "P-1004", email: "user3@enterprise.com", cohort: "Fintech", timeSpent: "0m 45s", aiScore: 45, status: "rejected" },
    { id: "P-1005", email: "user4@agency.co", cohort: "Marketing", timeSpent: "4m 10s", aiScore: 88, status: "pending" },
    { id: "P-1006", email: "user5@freelance.net", cohort: "Design", timeSpent: "8m 30s", aiScore: 99, status: "approved" },
];

export default function ParticipantList() {
    const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAction = (id: string, action: "approved" | "rejected") => {
        setParticipants(prev => prev.map(p => p.id === id ? { ...p, status: action } : p));
    };

    const filteredParticipants = participants.filter(p =>
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cohort.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400";
        if (score >= 70) return "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400";
        return "text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400";
    };

    return (
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
            {/* Header / Controls */}
            <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Recent Responses</h3>
                    <p className="text-sm text-zinc-500 mt-1">Manage and verify participant quality.</p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search email or cohort..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-zinc-200 rounded-lg bg-white hover:bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                        <Filter size={16} />
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-3 font-medium">Participant</th>
                            <th className="px-6 py-3 font-medium">Cohort</th>
                            <th className="px-6 py-3 font-medium">Time Spent</th>
                            <th className="px-6 py-3 font-medium group cursor-help">
                                <span className="flex items-center gap-1.5 border-b border-dashed border-zinc-400 pb-0.5 w-fit">
                                    AI Quality Score
                                    <AlertCircle size={14} className="text-zinc-400" />
                                </span>
                            </th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {filteredParticipants.map((p) => (
                            <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-zinc-900 dark:text-zinc-100">{p.id}</div>
                                    <div className="text-zinc-500 text-xs mt-0.5">{p.email}</div>
                                </td>
                                <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">{p.cohort}</td>
                                <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">{p.timeSpent}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`px-2.5 py-1 rounded-md font-bold text-xs flex items-center gap-1.5 ${getScoreColor(p.aiScore)}`}>
                                            {p.aiScore >= 90 && <ShieldCheck size={14} />}
                                            {p.aiScore} / 100
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {p.status === "pending" && <span className="inline-flex items-center px-2 py-1 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded text-xs font-medium">Pending Review</span>}
                                    {p.status === "approved" && <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 rounded text-xs font-medium">Approved</span>}
                                    {p.status === "rejected" && <span className="inline-flex items-center px-2 py-1 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 rounded text-xs font-medium">Rejected</span>}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {p.status === "pending" ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleAction(p.id, "approved")}
                                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-500 dark:hover:bg-emerald-500/10 rounded-md transition-colors"
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(p.id, "rejected")}
                                                className="p-1.5 text-rose-600 hover:bg-rose-50 dark:text-rose-500 dark:hover:bg-rose-500/10 rounded-md transition-colors"
                                                title="Reject"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="text-xs font-medium text-brand hover:underline">View Details</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredParticipants.length === 0 && (
                    <div className="p-8 text-center text-zinc-500">
                        No participants found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
