"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  FileText,
  Briefcase,
  TrendingUp,
  User,
  LogOut,
} from "lucide-react";

export default function DashboardSidebar() {
  return (
    <aside
      className="
        sticky
        top-0
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-white/10
        bg-[#1A1A1A]/90
        backdrop-blur-xl
      "
    >
      {/* Logo */}

      <div className="border-b border-white/10 px-8 py-7">

        <h1 className="text-2xl font-bold text-white">
          CareerPilot
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          AI Career Assistant
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-5 py-6">

        <SidebarItem
          href="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />

        <SidebarItem
          href="/dashboard/jobs"
          icon={<Search size={20} />}
          label="Search Jobs"
        />

        <SidebarItem
          href="/dashboard/resume"
          icon={<FileText size={20} />}
          label="Resume Optimizer"
        />

        <SidebarItem
          href="/dashboard/interview"
          icon={<Briefcase size={20} />}
          label="Interview Prep"
        />

        <SidebarItem
          href="/dashboard/roadmap"
          icon={<TrendingUp size={20} />}
          label="Career Roadmap"
        />

      </nav>

      {/* Bottom */}

      <div className="space-y-2 border-t border-white/10 p-5">

        <SidebarItem
          href="/dashboard/profile"
          icon={<User size={20} />}
          label="Profile"
        />

        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-zinc-400
            transition-all
            hover:bg-red-500/10
            hover:text-red-400
          "
        >
          <LogOut size={20} />

          <span>Sign Out</span>

        </button>

      </div>

    </aside>
  );
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarItem({
  href,
  icon,
  label,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-zinc-300
        transition-all
        hover:bg-violet-500/10
        hover:text-violet-400
      "
    >
      {icon}

      <span>{label}</span>

    </Link>
  );
}