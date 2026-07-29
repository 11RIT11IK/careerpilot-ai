import FadeUp from "@/components/animations/FadeUp";
import GridBackground from "@/components/effects/GridBackground";

const steps = [
  {
    step: "01",
    title: "Create Your Profile",
    description:
      "Sign up and tell CareerPilot AI about your education, experience, skills, and career goals.",
  },
  {
    step: "02",
    title: "Optimize Your Resume",
    description:
      "Upload your resume to receive AI-powered ATS scoring, personalized feedback, and improvement suggestions.",
  },
  {
    step: "03",
    title: "Build Your Career Roadmap",
    description:
      "Generate a personalized learning roadmap with recommended technologies, projects, certifications, and milestones.",
  },
  {
    step: "04",
    title: "Practice & Improve",
    description:
      "Prepare for technical and HR interviews with AI mock interviews, skill-gap analysis, and personalized guidance.",
  },
  {
    step: "05",
    title: "Discover Your Next Job",
    description:
      "Search AI-curated job opportunities tailored to your skills, experience, and career aspirations, and start applying with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#171717] py-28"
    >
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">

        <FadeUp>

          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
              How It Works
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
              Four Simple Steps
              <br />
              To Your Dream Career
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              CareerPilot AI guides you from resume analysis
              to interview success through an intelligent,
              personalized career journey.
            </p>

          </div>

        </FadeUp>

        <div className="relative mx-auto mt-20 max-w-4xl">

          {/* Vertical Line */}

          <div className="absolute left-6 top-0 h-full w-px bg-white/10" />

          <div className="space-y-14">

            {steps.map((step, index) => (

              <FadeUp
                key={step.step}
                delay={index * 0.15}
              >

                <div className="relative flex gap-8">

                  {/* Step Circle */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-violet-500/40
                      bg-violet-500/10
                      text-sm
                      font-semibold
                      text-violet-400
                    "
                  >
                    {step.step}
                  </div>

                  {/* Content */}

                  <div
                    className="
                      flex-1
                      rounded-3xl
                      border
                      border-white/10
                      bg-[#212121]
                      p-8
                      transition-all
                      duration-300
                      hover:border-violet-500/40
                      hover:bg-[#252525]
                    "
                  >

                    <h3 className="text-2xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-8 text-zinc-400">
                      {step.description}
                    </p>

                  </div>

                </div>

              </FadeUp>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}