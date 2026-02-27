"use client";

import { useEffect, useState } from "react";
import OnboardingModal from "@/components/ui/OnboardingModal";
import CreateProjectModal from "@/components/ui/CreateProjectModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState<string[]>([]);
  const router = useRouter();

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

  const handleCreateProject = (name: string) => {
    setProjects([...projects, name]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="max-w-5xl">
      <OnboardingModal isOpen={isOnboardingOpen} onClose={handleCloseOnboarding} />
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />

      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-zinc-500">Manage your research projects and insights.</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex h-12 items-center justify-center rounded-xl bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-lg shadow-brand/20"
        >
          ＋ New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="flex h-[calc(100vh-300px)] flex-col items-center justify-center text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <span className="text-4xl text-zinc-400">📄</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            Ready to uncover your first insight?
          </h2>

          <p className="mt-4 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
            You haven&apos;t created any research projects yet.<br />
            Start by building a survey or importing data to begin your journey.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex h-12 items-center justify-center rounded-xl bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Create Your First Project
            </button>
            <button className="flex h-12 items-center justify-center rounded-xl border border-zinc-200 bg-white px-8 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900">
              Import Existing Data
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={i} className="group relative rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-brand dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand">📊</div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md text-zinc-500">Design Phase</span>
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-lg">{p}</h4>
              <p className="mt-1 text-xs text-zinc-500 italic">Last modified: Just now</p>

              <div className="mt-8 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2].map(u => (
                    <div key={u} className="h-6 w-6 rounded-full border-2 border-white bg-zinc-200 dark:border-zinc-950 dark:bg-zinc-800"></div>
                  ))}
                </div>
                <button
                  onClick={() => router.push(`/projects/${i}/edit`)}
                  className="text-xs font-bold text-brand hover:underline"
                >
                  Edit Survey →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-zinc-500">
        Need help starting? <a href="#" className="font-semibold text-brand hover:underline">View Getting Started Guide</a>
      </p>
    </div>
  );
}
