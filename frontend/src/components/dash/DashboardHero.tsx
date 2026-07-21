"use client"
import { useDashboard } from "@/context/DashboardContext";

export default function DashboardHero() {
	const { user } = useDashboard();

  return (
    <section>

      <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
        CareerPilot AI
      </p>

      <h1 className="mt-3 text-5xl font-bold tracking-tight text-white">
        Welcome back, {user?.fullName} 👋
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
        Everything you need to build your career in one place.
        Search jobs, optimize your resume, prepare for interviews,
        and let AI guide your next opportunity.
      </p>

    </section>
  );
}