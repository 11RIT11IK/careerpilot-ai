import { MapPinned } from "lucide-react";

export default function CareerRoadmapPage() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-14">

      {/* Header */}

      <section className="mb-20">

        <h1 className="text-4xl font-bold text-white">
          AI Career Roadmap
        </h1>

        <p className="mt-3 max-w-3xl text-zinc-400 leading-7">
          Build a personalized roadmap that helps you reach your dream
          career. CareerPilot AI analyzes your current profile and
          creates a step-by-step learning journey with skills,
          technologies, projects and milestones.
        </p>

      </section>

      {/* Generator Card */}

      <section
        className="
          rounded-3xl
          border
          border-white/10
          bg-[#202020]
          p-8
        "
      >

        <div className="grid gap-6 md:grid-cols-2">

          {/* Current Role */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Current Role
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Backend Developer"
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#171717]
                px-4
                py-3
                text-white
                outline-none
                focus:border-violet-500
              "
            />

          </div>

          {/* Target Role */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Target Role
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Senior Backend Engineer"
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#171717]
                px-4
                py-3
                text-white
                outline-none
                focus:border-violet-500
              "
            />

          </div>

          {/* Experience */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Experience
            </label>

            <select
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#171717]
                px-4
                py-3
                text-white
                outline-none
                focus:border-violet-500
              "
            >
              <option>0 - 1 Years</option>
              <option>2 - 4 Years</option>
              <option>5+ Years</option>
            </select>

          </div>

          {/* Timeline */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Goal Timeline
            </label>

            <select
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#171717]
                px-4
                py-3
                text-white
                outline-none
                focus:border-violet-500
              "
            >
              <option>3 Months</option>
              <option>6 Months</option>
              <option>1 Year</option>
              <option>2 Years</option>
            </select>

          </div>

        </div>

        {/* Skills */}

        <div className="mt-8">

          <label className="mb-2 block text-sm text-zinc-300">
            Current Skills
          </label>

          <textarea
            rows={5}
            placeholder="Example:

JavaScript
Node.js
Express
MySQL
Git
Prisma"
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-white/10
              bg-[#171717]
              px-4
              py-4
              text-white
              outline-none
              focus:border-violet-500
            "
          />

        </div>

        <button
          className="
            mt-8
            flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-violet-700
          "
        >

          <MapPinned size={18} />

          Generate Career Roadmap

        </button>

      </section>

      {/* Roadmap */}

      <section
        className="
          mt-10
          rounded-3xl
          border
          border-white/10
          bg-[#202020]
          p-10
        "
      >

        <h2 className="mb-8 text-2xl font-semibold text-white">
          Career Roadmap
        </h2>

        <div className="flex flex-col items-center justify-center py-20 text-center">

          <div
            className="
              mb-6
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-violet-500/10
            "
          >

            <MapPinned
              size={42}
              className="text-violet-400"
            />

          </div>

          <h3 className="text-2xl font-semibold text-white">
            Your AI Career Roadmap will appear here
          </h3>

          <p className="mt-4 max-w-xl leading-7 text-zinc-400">
            Generate a personalized roadmap to receive AI-powered
            learning milestones, recommended technologies, projects,
            certifications and career guidance tailored to your goals.
          </p>

        </div>

      </section>

      {/* AI Tips */}

      <section
        className="
          mt-10
          rounded-3xl
          border
          border-white/10
          bg-[#202020]
          p-6
        "
      >

        <h2 className="mb-4 text-lg font-semibold text-white">
          AI Tips
        </h2>

        <ul className="space-y-2 text-zinc-400">

          <li>• Be specific about your target role.</li>

          <li>• Include your current skills honestly.</li>

          <li>• Set realistic learning timelines.</li>

          <li>• Follow projects and milestones consistently.</li>

        </ul>

      </section>

    </div>
  );
}