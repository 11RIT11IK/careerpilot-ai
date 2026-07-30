"use client"
import { FileText } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function ResumeOptimizerPage() {

	interface SetResume {
  targetJobRole: string,
	experience: string,
	resume: File | null;
	}

	interface SetResumeError {
  targetJobRole: string,
	resume: string
	}

	interface OptimizedResume {
  atsScore: number;
  resumeRating: number;

  summary: string;

  strengths: string[];
  weaknesses: string[];

  missingTechnicalSkills: string[];
  missingSoftSkills: string[];
  missingKeywords: string[];

  professionalSummarySuggestions: string[];
  experienceSuggestions: string[];
  projectSuggestions: string[];
  skillSuggestions: string[];
  educationSuggestions: string[];

  recommendedCertifications: string[];
  recommendedProjects: string[];

  finalFeedback: string;
}

	const [ resumeOptimizeData,setResumeOptimizeData ] = useState<SetResume>({
  targetJobRole: "",
	experience: "0-1 Years",
	resume: null
	})

	const [ resumeOptimizeErrors,setResumeOptimizeErrors ] = useState<SetResumeError>({
  targetJobRole: "",
	resume: ""
	})

	const [ resumeOptLoading,setResumeOptLoading ] = useState(false)
	const [optimizedOne, setOptimizedOne] =  useState<OptimizedResume | null>(null);


	const handleOnChange = (elementName: keyof SetResume, value: string) => {
  	setResumeOptimizeData(prev => ({
			...prev,
			[elementName] : value
		}))

		setResumeOptimizeErrors(prev => ({
			...prev,
			[elementName] : ""
		}))
	}

	const handleResumeFileChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {

		const file = event.target.files?.[0];

		if (!file) return;

		setResumeOptimizeData((prev) => ({
			...prev,
			resume: file,
		}));

		setResumeOptimizeErrors((prev) => ({
			...prev,
			resume: ""
		}))

	};

	const validateForm = (): boolean => {

			const newResumeOptErrors: SetResumeError = {
				targetJobRole: "",
				resume: "",
			};

			// Target Role

			if (resumeOptimizeData.targetJobRole.trim() === "") {
				newResumeOptErrors.targetJobRole =
					"Target job role is required.";
			}

			// Resume Validation

			if (!resumeOptimizeData.resume) {

				newResumeOptErrors.resume =
					"Please upload your resume.";

			} else {

				const allowedTypes = [
					"application/pdf",
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				];

				const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

				if (!allowedTypes.includes(resumeOptimizeData.resume.type)) {

					newResumeOptErrors.resume =
						"Only PDF and DOCX files are supported.";

				} else if (resumeOptimizeData.resume.size > MAX_FILE_SIZE) {

					newResumeOptErrors.resume =
						"Resume size must not exceed 5 MB.";

				}

			}

			setResumeOptimizeErrors(newResumeOptErrors);

			return Object.values(newResumeOptErrors).every(
				(error) => error === ""
			);

	};

	const handleResumeOptimization = async(event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();

	//required fields checking
	const isValid: boolean = validateForm();
	if(!isValid){
		return;
	}

	setResumeOptLoading(true)

	const formData = new FormData();
  formData.append(
  "targetJobRole",
  resumeOptimizeData.targetJobRole.trim()
);

	formData.append(
		"experience",
		resumeOptimizeData.experience
	);

	if (resumeOptimizeData.resume) {
		formData.append(
			"resume",
			resumeOptimizeData.resume
		);
	}

	try {

	const response  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/optimize/resume`,formData,{
	withCredentials: true,
	headers: {
  "Content-Type": "multipart/form-data",
  },
  timeout: 120000,
	})

 setOptimizedOne(response.data.resumeOptimization)

	} catch (error) {
		console.error(error);

	} finally {
    
		setResumeOptLoading(false)

	}


	}

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
				<form onSubmit={handleResumeOptimization}>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Target Role */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Target Job Role
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
						 value={resumeOptimizeData.targetJobRole}
						 onChange={(e) => handleOnChange("targetJobRole",e.target.value)}
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

				{resumeOptimizeErrors.targetJobRole && (

					<p className="mt-3 text-sm text-red-400">
					{resumeOptimizeErrors.targetJobRole}
					</p>

				)}

          </div>

          {/* Experience */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Experience
            </label>

            <select
						  value={resumeOptimizeData.experience}
						  onChange={(e) => handleOnChange("experience",e.target.value)}
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
              <option value="0-1 Years">0 - 1 Years</option>
              <option value="2-4 Years">2 - 4 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>

          </div>

        </div>


       {/* Upload Resume */}
			<div className="mt-8">

				<label className="mb-3 block text-sm text-zinc-300">
					Upload Resume
					<span className="ml-1 text-red-500">*</span>
				</label>

				{/* Hidden File Input */}

				<input
					id="resume-upload"
					type="file"
					accept=".pdf,.docx"
					className="hidden"
					onChange={handleResumeFileChange}
				/>

				{/* Upload Card */}

				<label
					htmlFor="resume-upload"
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

					{resumeOptimizeData.resume ? (

						<>

							<p className="mt-5 text-lg font-medium text-white">
								{resumeOptimizeData.resume.name}
							</p>

							<p className="mt-2 text-sm text-green-400">
								Resume selected successfully
							</p>

							<p className="mt-2 text-xs text-zinc-500">
								Click to choose another file
							</p>

						</>

					) : (

						<>

							<p className="mt-5 font-medium text-white">
								Drag & Drop your resume here
							</p>

							<p className="mt-2 text-sm text-zinc-500">
								or click to browse
							</p>

							<p className="mt-6 text-xs text-zinc-500">
								Supported formats:
								PDF • DOCX
							</p>

						</>

					)}

				</label>

				{resumeOptimizeErrors.resume && (

					<p className="mt-3 text-sm text-red-400">
						{resumeOptimizeErrors.resume}
					</p>

				)}

			</div>

        <button
				  disabled={resumeOptLoading}
				  type="submit"
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

          { resumeOptLoading ? "Optimizing..." : "Optimize Resume" }

        </button>
				</form>

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

  {resumeOptLoading ? (

    /* ===========================
       Loading State
    ============================ */

    <div className="py-10">

      <div className="flex justify-center">

        <div
          className="
            h-14
            w-14
            animate-spin
            rounded-full
            border-4
            border-violet-500
            border-t-transparent
          "
        />

      </div>

      <h3 className="mt-8 text-center text-2xl font-semibold text-white">
        Analyzing your resume...
      </h3>

      <p className="mt-3 text-center text-zinc-400">
        CareerPilot AI is reviewing your resume,
        evaluating ATS compatibility,
        identifying missing skills,
        and preparing personalized recommendations.
      </p>

      <div className="mt-12 space-y-6">

        {[1,2,3,4,5].map((item) => (

          <div
            key={item}
            className="
              animate-pulse
              rounded-2xl
              border
              border-white/10
              bg-[#171717]
              p-6
            "
          >

            <div className="h-6 w-52 rounded bg-zinc-700" />

            <div className="mt-5 h-4 w-full rounded bg-zinc-700" />

            <div className="mt-3 h-4 w-5/6 rounded bg-zinc-700" />

            <div className="mt-6 flex gap-3">

              <div className="h-8 w-20 rounded-full bg-zinc-700" />

              <div className="h-8 w-24 rounded-full bg-zinc-700" />

              <div className="h-8 w-28 rounded-full bg-zinc-700" />

            </div>

          </div>

        ))}

      </div>

    </div>

  ) : optimizedOne === null ? (

    /* ===========================
       Initial State
    ============================ */

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
        Upload your resume and let CareerPilot AI evaluate
        your ATS compatibility, technical skills,
        content quality, recruiter expectations,
        and improvement opportunities.
      </p>

    </div>

  ) : (

    /* ===========================
       Generated State
    ============================ */

   <div className="space-y-8">

  {/* ===========================
      ATS SCORE & RESUME RATING
  ============================ */}

  <div className="grid gap-6 md:grid-cols-2">

    <div
      className="
        rounded-2xl
        border
        border-emerald-500/20
        bg-emerald-500/10
        p-6
      "
    >
      <p className="text-sm uppercase tracking-wide text-emerald-300">
        ATS Score
      </p>

      <h3 className="mt-2 text-5xl font-bold text-white">
        {optimizedOne.atsScore}
        <span className="text-2xl text-zinc-400"> /100</span>
      </h3>

      <p className="mt-3 text-zinc-300">
        {optimizedOne.atsScore >= 80
          ? "Excellent ATS compatibility."
          : optimizedOne.atsScore >= 60
          ? "Good ATS compatibility with room for improvement."
          : "Your resume requires optimization for ATS systems."}
      </p>

    </div>

    <div
      className="
        rounded-2xl
        border
        border-violet-500/20
        bg-violet-500/10
        p-6
      "
    >

      <p className="text-sm uppercase tracking-wide text-violet-300">
        Resume Rating
      </p>

      <h3 className="mt-2 text-5xl font-bold text-white">
        {optimizedOne.resumeRating}
        <span className="text-2xl text-zinc-400"> /10</span>
      </h3>

      <p className="mt-3 text-zinc-300">
        Overall recruiter impression based on content,
        structure and technical relevance.
      </p>

    </div>

  </div>

  {/* ===========================
      AI SUMMARY
  ============================ */}

  <div
    className="
      rounded-2xl
      border
      border-white/10
      bg-[#171717]
      p-7
    "
  >

    <h3 className="text-xl font-semibold text-white">
      CareerPilot AI Summary
    </h3>

    <p className="mt-5 leading-8 text-zinc-300">
      {optimizedOne.summary}
    </p>

  </div>

  {/* ===========================
      STRENGTHS & WEAKNESSES
  ============================ */}

  <div className="grid gap-6 lg:grid-cols-2">

    <div
      className="
        rounded-2xl
        border
        border-emerald-500/20
        bg-[#171717]
        p-6
      "
    >

      <h3 className="text-xl font-semibold text-emerald-400">
        Strengths
      </h3>

      <ul className="mt-5 space-y-4">

        {optimizedOne.strengths.map((item: string) => (

          <li
            key={item}
            className="flex items-start gap-3 text-zinc-300"
          >

            <span className="mt-1 text-emerald-400">
              ✓
            </span>

            <span>{item}</span>

          </li>

        ))}

      </ul>

    </div>

    <div
      className="
        rounded-2xl
        border
        border-red-500/20
        bg-[#171717]
        p-6
      "
    >

      <h3 className="text-xl font-semibold text-red-400">
        Improvement Areas
      </h3>

      <ul className="mt-5 space-y-4">

        {optimizedOne.weaknesses.map((item: string) => (

          <li
            key={item}
            className="flex items-start gap-3 text-zinc-300"
          >

            <span className="mt-1 text-red-400">
              ✕
            </span>

            <span>{item}</span>

          </li>

        ))}

      </ul>

    </div>

  </div>

  {/* ===========================
      MISSING SKILLS
  ============================ */}

  <div
    className="
      rounded-2xl
      border
      border-white/10
      bg-[#171717]
      p-7
    "
  >

    <h3 className="text-xl font-semibold text-white">
      Skills & Keywords To Improve
    </h3>

    <div className="mt-8 space-y-8">

      <div>

        <h4 className="mb-4 font-medium text-zinc-300">
          Technical Skills
        </h4>

        <div className="flex flex-wrap gap-3">

          {optimizedOne.missingTechnicalSkills.map((item: string) => (

            <span
              key={item}
              className="
                rounded-full
                bg-violet-500/10
                px-3
                py-2
                text-sm
                text-violet-300
              "
            >
              {item}
            </span>

          ))}

        </div>

      </div>

      <div>

        <h4 className="mb-4 font-medium text-zinc-300">
          Soft Skills
        </h4>

        <div className="flex flex-wrap gap-3">

          {optimizedOne.missingSoftSkills.map((item: string) => (

            <span
              key={item}
              className="
                rounded-full
                bg-blue-500/10
                px-3
                py-2
                text-sm
                text-blue-300
              "
            >
              {item}
            </span>

          ))}

        </div>

      </div>

      <div>

        <h4 className="mb-4 font-medium text-zinc-300">
          ATS Keywords
        </h4>

        <div className="flex flex-wrap gap-3">

          {optimizedOne.missingKeywords.map((item: string) => (

            <span
              key={item}
              className="
                rounded-full
                bg-orange-500/10
                px-3
                py-2
                text-sm
                text-orange-300
              "
            >
              {item}
            </span>

          ))}

        </div>

      </div>

    </div>

  </div>

  {/* ===========================
      IMPROVEMENT PLAN
  ============================ */}

  <div
    className="
      rounded-2xl
      border
      border-white/10
      bg-[#171717]
      p-7
    "
  >

    <h3 className="text-xl font-semibold text-white">
      Priority Improvement Plan
    </h3>

    <div className="mt-8 space-y-8">

      {[
        {
          title: "Professional Summary",
          data: optimizedOne.professionalSummarySuggestions,
        },
        {
          title: "Experience",
          data: optimizedOne.experienceSuggestions,
        },
        {
          title: "Projects",
          data: optimizedOne.projectSuggestions,
        },
        {
          title: "Skills",
          data: optimizedOne.skillSuggestions,
        },
        {
          title: "Education",
          data: optimizedOne.educationSuggestions,
        },
      ].map((section) => (

        <div
          key={section.title}
          className="border-b border-white/10 pb-6 last:border-none"
        >

          <h4 className="font-semibold text-violet-300">
            {section.title}
          </h4>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">

            {section.data.map((item: string) => (

              <li key={item}>
                {item}
              </li>

            ))}

          </ul>

        </div>

      ))}

    </div>

  </div>

  {/* ===========================
      RECOMMENDATIONS
  ============================ */}

  <div className="grid gap-6 lg:grid-cols-2">

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#171717]
        p-6
      "
    >

      <h3 className="text-xl font-semibold text-white">
        Recommended Certifications
      </h3>

      <ul className="mt-5 list-disc space-y-3 pl-6 text-zinc-300">

        {optimizedOne.recommendedCertifications.map((item: string) => (

          <li key={item}>
            {item}
          </li>

        ))}

      </ul>

    </div>

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#171717]
        p-6
      "
    >

      <h3 className="text-xl font-semibold text-white">
        Recommended Projects
      </h3>

      <ul className="mt-5 list-disc space-y-3 pl-6 text-zinc-300">

        {optimizedOne.recommendedProjects.map((item: string) => (

          <li key={item}>
            {item}
          </li>

        ))}

      </ul>

    </div>

  </div>

  {/* ===========================
      FINAL FEEDBACK
  ============================ */}

  <div
    className="
      rounded-2xl
      border
      border-violet-500/20
      bg-violet-500/10
      p-8
    "
  >

    <h3 className="text-xl font-semibold text-white">
      Recruiter Feedback
    </h3>

    <p className="mt-5 leading-8 text-zinc-200">
      {optimizedOne.finalFeedback}
    </p>

  </div>

</div>

  )}

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