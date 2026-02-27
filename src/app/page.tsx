"use client";

import { useEffect, useState } from "react";
import OnboardingModal from "@/components/ui/OnboardingModal";

export default function Home() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    // Show onboarding for new users (simulated)
    const hasBeenOnboarded = localStorage.getItem("insightflow_onboarded");
    if (!hasBeenOnboarded) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
    localStorage.setItem("insightflow_onboarded", "true");
  };

  return (
    <div className="flex h-[calc(100vh-160px)] flex-col items-center justify-center text-center">
      <OnboardingModal isOpen={isOnboardingOpen} onClose={handleCloseOnboarding} />
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
        <span className="text-4xl text-zinc-400">📄</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
        Ready to uncover your first insight?
      </h1>

      <p className="mt-4 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
        You haven&apos;t created any research projects yet.<br />
        Start by building a survey or importing data to begin your journey.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button className="flex h-12 items-center justify-center rounded-xl bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90">
          Create Your First Project
        </button>
        <button className="flex h-12 items-center justify-center rounded-xl border border-zinc-200 bg-white px-8 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900">
          Import Existing Data
        </button>
      </div>

      <p className="mt-8 text-sm text-zinc-500">
        Need help starting? <a href="#" className="font-semibold text-brand hover:underline">View Getting Started Guide</a>
      </p>
    </div>
  );
}
