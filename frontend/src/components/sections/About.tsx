import FadeUp from "@/components/animations/FadeUp";
import GridBackground from "@/components/effects/GridBackground";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#171717] py-28"
    >
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">

        <FadeUp>

          <div className="mx-auto max-w-4xl text-center">

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
              About CareerPilot AI
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
              Helping Every Student
              Build Their Dream Career
            </h2>

            <p className="mt-8 text-lg leading-8 text-zinc-400">
              CareerPilot AI was built with one simple mission:
              to make career guidance accessible, intelligent,
              and personalized for everyone.
            </p>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Whether you're preparing your first resume,
              practicing interviews,
              exploring career paths,
              or planning your next skill,
              CareerPilot AI becomes your intelligent career companion.
            </p>

          </div>

        </FadeUp>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          <FadeUp delay={0.2}>

            <div className="rounded-3xl border border-white/10 bg-[#212121] p-8">

              <h3 className="text-4xl font-bold text-violet-400">
                10K+
              </h3>

              <p className="mt-4 text-zinc-400">
                Students Empowered
              </p>

            </div>

          </FadeUp>

          <FadeUp delay={0.35}>

            <div className="rounded-3xl border border-white/10 bg-[#212121] p-8">

              <h3 className="text-4xl font-bold text-violet-400">
                95%
              </h3>

              <p className="mt-4 text-zinc-400">
                Resume Improvement Rate
              </p>

            </div>

          </FadeUp>

          <FadeUp delay={0.5}>

            <div className="rounded-3xl border border-white/10 bg-[#212121] p-8">

              <h3 className="text-4xl font-bold text-violet-400">
                AI
              </h3>

              <p className="mt-4 text-zinc-400">
                Personalized Career Guidance
              </p>

            </div>

          </FadeUp>

        </div>

      </div>
    </section>
  );
}