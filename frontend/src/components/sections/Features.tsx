import {
  FileText,
  BrainCircuit,
  Target,
  BarChart3,
  MessageSquare,
  Route,
} from "lucide-react";

import GridBackground from "@/components/effects/GridBackground";
import FadeUp from "@/components/animations/FadeUp";

const features = [
  {
    icon: FileText,
    title: "AI Resume Analyzer",
    description:
      "Receive detailed feedback on your resume with ATS scoring and improvement suggestions.",
  },
  {
    icon: BrainCircuit,
    title: "Interview Preparation",
    description:
      "Practice technical and HR interviews with an AI interviewer and instant feedback.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description:
      "Discover the exact skills you need to land your dream role.",
  },
  {
    icon: Route,
    title: "Career Roadmaps",
    description:
      "Follow personalized learning paths generated specifically for your career goals.",
  },
  {
    icon: MessageSquare,
    title: "AI Career Assistant",
    description:
      "Ask career questions anytime and receive intelligent guidance instantly.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Track your learning progress, resume score, interview readiness, and goals.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#171717] py-28"
    >
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        <FadeUp>

          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
              Features
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
              Everything You Need
              <br />
              to Build Your Career
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              CareerPilot AI combines artificial intelligence,
              resume analysis, interview preparation,
              and personalized career guidance
              into one powerful platform.
            </p>

          </div>

        </FadeUp>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <FadeUp
                key={feature.title}
                delay={index * 0.1}
              >

                <div
                  className="
                    group
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#212121]
                    p-8
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-violet-500/40
                    hover:bg-[#252525]
                  "
                >

                  <div
                    className="
                      mb-6
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-violet-500/10
                      transition-colors
                      duration-300
                      group-hover:bg-violet-500/20
                    "
                  >
                    <Icon
                      className="
                        h-7
                        w-7
                        text-violet-400
                      "
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-zinc-400">
                    {feature.description}
                  </p>

                </div>

              </FadeUp>

            );

          })}

        </div>

      </div>
    </section>
  );
}