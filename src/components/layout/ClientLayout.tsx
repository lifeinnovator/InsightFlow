"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import SettingsPanel from "@/components/ui/SettingsPanel";
import { useState } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <Header onOpenSettings={() => setIsSettingsOpen(true)} />
            <Sidebar />
            <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <main className="pl-64 pt-16 h-screen">
                <div className="h-full overflow-y-auto px-6 py-8 lg:px-10">
                    {children}
                </div>
            </main>
        </>
    );
}
