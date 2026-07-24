import { FileText } from "lucide-react";

export default function ResumeOptimizerPage() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-14">

      {/* Header */}

      <section className="mb-20">

        <h1 className="text-4xl font-bold text-white">
          AI Resume Optimizer
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
          Upload your resume and let CareerPilot AI analyze it like a
          recruiter. Receive personalized suggestions to improve your
          resume, increase ATS compatibility and maximize your chances
          of getting shortlisted.
        </p>

      </section>

      {/* Upload Card */}

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

          {/* Target Role */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Target Job Role
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

        </div>

        {/* Upload */}

        <div className="mt-8">

          <label className="mb-3 block text-sm text-zinc-300">
            Upload Resume
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div
            className="
              flex
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-white/10
              bg-[#171717]
              px-8
              py-14
              transition
              hover:border-violet-500
            "
          >

            <FileText
              size={48}
              className="text-violet-400"
            />

            <p className="mt-5 font-medium text-white">
              Drag & Drop your resume here
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              or click to browse
            </p>

            <p className="mt-6 text-xs text-zinc-500">
              Supported formats:
              PDF • DOC • DOCX
            </p>

          </div>

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

          <FileText size={18} />

          Optimize Resume

        </button>

      </section>

      {/* Analysis */}

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
          Resume Analysis
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

            <FileText
              size={42}
              className="text-violet-400"
            />

          </div>

          <h3 className="text-2xl font-semibold text-white">
            Your AI Resume Analysis will appear here
          </h3>

          <p className="mt-4 max-w-xl leading-7 text-zinc-400">
            CareerPilot AI will analyze your resume and provide
            personalized feedback on ATS compatibility, content,
            formatting, missing skills and overall improvements.
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

          <li>• Upload your latest resume.</li>

          <li>• Mention your target job role.</li>

          <li>• Keep your resume concise and relevant.</li>

          <li>• AI will recommend missing keywords and skills.</li>

        </ul>

      </section>

    </div>
  );
}