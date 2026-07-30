"use client";

import { Brain } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function InterviewPrepPage() {

	interface InterviewCard {
	jobTitle : string,
	company : string,
	experience : string,
	interviewType : string,
	focusAreas : string
	}

	interface InterviewError {
	jobTitle : string
	}

	interface InterviewQuestion {
  question: string;
  category: string;
  difficulty: string;
  expectedTopics: string[];
  referenceAnswer: string;
	}

	interface GeneratedInterview {
		title: string;
		estimatedDuration: string;
		questions: InterviewQuestion[];
	}

	const [interviewData, setInterviewData ] = useState<InterviewCard>({
  jobTitle : "",
	company : "",
	experience : "0-1",
	interviewType : "Technical",
	focusAreas : ""
	})

	const [interviewDataErrors, setInterviewDataErrors ] = useState<InterviewError>({
  jobTitle : ""
  })

	const [interviewLoading, setInterviewLoading] = useState(false)

	const [generatedInterview, setGeneratedInterview] =  useState<GeneratedInterview | null>(null);

	const handleOnChange = (elementName: keyof InterviewCard, value: string) => {
  	setInterviewData(prev => ({
			...prev,
			[elementName] : value
		}))

		setInterviewDataErrors(prev => ({
			...prev,
			[elementName] : ""
		}))
	}

	const validateForm = (): boolean => {
	const newInterviewCardErrors: InterviewError = {
		jobTitle: "",
	}

 if (interviewData.jobTitle.trim() === "") {
    newInterviewCardErrors.jobTitle = "Job title is required.";
  }

 setInterviewDataErrors(newInterviewCardErrors)
	return Object.values(newInterviewCardErrors).every(error => error === "")
}

	const handleGenerateInterview = async(event: React.FormEvent<HTMLFormElement>) => {
	 event.preventDefault()

	//required fields checking
	const isValid: boolean = validateForm();
	if(!isValid){
		return;
	}

	setInterviewLoading(true)

	const interviewDataToSend: InterviewCard = {

	jobTitle : interviewData.jobTitle.trim(),
	company : interviewData.company.trim(),
	experience : interviewData.experience.trim(),
	interviewType : interviewData.interviewType.trim(),
	focusAreas : interviewData.focusAreas.trim()

	}

	try {

	const response  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/generate/interview`,interviewDataToSend,{
		withCredentials: true,
    timeout: 120000,
		})
		
	setGeneratedInterview(response.data.interview);

 } catch (error) {
  console.error(error);

	} finally {
		setInterviewLoading(false)

	}

	}

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-14">

      {/* Header */}

      <section className="mb-20">

        <h1 className="text-4xl font-bold text-white">
          AI Interview Preparation
        </h1>

        <p className="mt-3 max-w-3xl text-zinc-400">
          Prepare for technical, HR and behavioral interviews with
          personalized AI-generated questions tailored to your target role.
        </p>

      </section>

      {/* Interview Setup */}

      <section
        className="
          rounded-3xl
          border
          border-white/10
          bg-[#202020]
          p-8
        "
      >

				<form onSubmit={handleGenerateInterview}>


        <div className="grid gap-6 md:grid-cols-2">

          {/* Job Title */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Job Title
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
							value={interviewData.jobTitle}
							onChange={(e) => handleOnChange("jobTitle", e.target.value)}
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
						{ interviewDataErrors.jobTitle && (
							<p className="mt-2 text-sm text-red-400">
							{interviewDataErrors.jobTitle}
							</p>
						)}

          </div>

          {/* Company */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Company (Optional)
            </label>

            <input
              type="text"
							value={interviewData.company}
							onChange={(e) => handleOnChange("company", e.target.value)}
              placeholder="Google"
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
						  value={interviewData.experience}
							onChange={(e) => handleOnChange("experience", e.target.value)}
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
              <option value="0-1">0 - 1 Years</option>
              <option value="2-4">2 - 4 Years</option>
              <option value="5+">5+ Years</option>
            </select>

          </div>

          {/* Interview Type */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Interview Type
            </label>

            <select
						  value={interviewData.interviewType}
							onChange={(e) => handleOnChange("interviewType", e.target.value)}
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
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
              <option value="HR">HR</option>
              <option value="Mixed">Mixed</option>
            </select>

          </div>

        </div>

        {/* Focus */}

        <div className="mt-8">

          <label className="mb-2 block text-sm text-zinc-300">
            Focus Areas (Optional)
          </label>

          <textarea
            rows={5}
						value={interviewData.focusAreas}
						onChange={(e) => handleOnChange("focusAreas", e.target.value)}
            placeholder="Example:

							Node.js
							Express
							Prisma
							MySQL
							System Design
							Behavioral Questions"
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
				 disabled={interviewLoading}
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
          <Brain size={18} />

         {interviewLoading ? " Generating..." : " Generate Interview" }

        </button>

				</form>

      </section>

      {/* Generated Interview */}

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
    Interview Session
  </h2>

  {interviewLoading ? (

    /* ---------- LOADING ---------- */

    <div className="flex flex-col items-center py-20 text-center">

      <div className="mb-8 animate-pulse rounded-full bg-violet-500/10 p-6">

        <Brain
          size={42}
          className="text-violet-400"
        />

      </div>

      <h3 className="text-2xl font-semibold text-white">
        Preparing your personalized interview...
      </h3>

      <p className="mt-5 max-w-xl leading-7 text-zinc-400">
        Our AI is analyzing your profile and generating interview
        questions tailored to your target role.
      </p>

      <div className="mt-10 space-y-3 text-zinc-500">

        <p>✓ Understanding your profile</p>

        <p>✓ Matching your experience level</p>

        <p>✓ Generating interview questions</p>

      </div>

    </div>

  ) : generatedInterview ? (

    /* ---------- GENERATED ---------- */

    <div>

      <div className="mb-10">

        <h3 className="text-3xl font-semibold text-white">

          {generatedInterview.title}

        </h3>

        <p className="mt-2 text-zinc-400">

          Estimated Duration • {generatedInterview.estimatedDuration}

        </p>

      </div>

      <div className="space-y-6">

        {generatedInterview.questions.map((question, index) => (

          <div
            key={index}
            className="
              rounded-2xl
              border
              border-white/10
              bg-[#171717]
              p-6
            "
          >

            <div className="flex items-center justify-between">

              <h4 className="text-lg font-semibold text-white">

                Question {index + 1}

              </h4>

              <span
                className="
                  rounded-full
                  bg-violet-500/10
                  px-3
                  py-1
                  text-xs
                  text-violet-300
                "
              >
                {question.difficulty}
              </span>

            </div>

            <p className="mt-5 text-white">

              {question.question}

            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              {question.expectedTopics.map((topic) => (

                <span
                  key={topic}
                  className="
                    rounded-full
                    bg-zinc-800
                    px-3
                    py-1
                    text-xs
                    text-zinc-300
                  "
                >
                  {topic}
                </span>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  ) : (

    /* ---------- EMPTY ---------- */

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

        <Brain
          size={42}
          className="text-violet-400"
        />

      </div>

      <h3 className="text-2xl font-semibold text-white">

        Your AI Interview Session will appear here

      </h3>

      <p className="mt-4 max-w-xl leading-7 text-zinc-400">

        Generate a personalized interview to receive AI-powered
        technical, behavioral and HR questions tailored to your
        target role.

      </p>

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

          <li>• Practice answering out loud.</li>

          <li>• Use the STAR method for behavioral questions.</li>

          <li>• Explain your thought process clearly.</li>

          <li>• Keep technical answers concise and structured.</li>

        </ul>

      </section>

    </div>
  );
}