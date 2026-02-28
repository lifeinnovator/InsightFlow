"use client";

import ResultDashboard from "@/components/dashboard/ResultDashboard";
import ParticipantList from "@/components/participants/ParticipantList";

export default function ResponsesPage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                    Response Management
                </h1>
                <p className="mt-2 text-zinc-500">Track real-time responses and assess participant quality.</p>
            </div>

            <ResultDashboard />
            <ParticipantList />
        </div>
    );
}
