import Link from "next/link";
import {
  Search,
  FileText,
  Briefcase,
  TrendingUp
} from "lucide-react";

const actions = [
  {
    title: "Search Jobs",
    description: "Discover AI-recommended jobs tailored to your profile.",
    href: "/dashboard/jobs",
    icon: Search,
  },
  {
    title: "Resume Optimizer",
    description: "Improve your resume using AI suggestions.",
    href: "/dashboard/resume",
    icon: FileText,
  },
  {
    title: "Interview Preparation",
    description: "Practice technical and HR interviews with AI.",
    href: "/dashboard/interview",
    icon: Briefcase,
  },
  {
    title: "Career Roadmap",
    description: "Generate a personalized learning roadmap.",
    href: "/dashboard/roadmap",
    icon: TrendingUp,
  },
];

export default function QuickActions() {
  return (
    <section>

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.title}
              href={item.href}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-[#202020]
                p-8
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-violet-500
                hover:shadow-lg
                hover:shadow-violet-500/10
              "
            >

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">

                <Icon className="h-7 w-7 text-violet-400" />

              </div>

              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {item.description}
              </p>

            </Link>

          );
        })}

      </div>

    </section>
  );
}