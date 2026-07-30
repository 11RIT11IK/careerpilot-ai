"use client";
import { MapPinned } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function CareerRoadmapPage() {

	interface RoadMap {
	currentRole : string,
	targetRole : string,
	experience : string,
	timeline : string,
	currentSkills : string,
	}
  interface RoadMapError {
	currentRole : string,
	targetRole : string,

	}
  interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  duration: string;
  description: string;
  technologies: string[];
  projects: string[];
  certifications: string[];
	}
  interface GeneratedRoadmap {
	summary: string;
  roadmap: RoadmapPhase[];
	}

	const [ roadmapData,setRoadMapData ] = useState<RoadMap>({
  currentRole : "",
	targetRole : "",
	experience : "0-1",
	timeline : "3 months",
	currentSkills : "",
	})

	const [ roadMapErrors,setRoadMapErrors ] = useState<RoadMapError>({
  currentRole : "",
	targetRole : "",
	})

	const [roadMapLoading, setRoadMapLoading] = useState(false)
  const [generatedCareerRoadmap, setGeneratedCareerRoadmap] =  useState<GeneratedRoadmap | null>(null);
	const hasRoadmap =
  generatedCareerRoadmap &&
  generatedCareerRoadmap.roadmap.length > 0;


	const handleOnChange = (elementName: keyof RoadMap, value: string) => {
  	setRoadMapData(prev => ({
			...prev,
			[elementName] : value
		}))

		setRoadMapErrors(prev => ({
			...prev,
			[elementName] : ""
		}))
	}

	const validateForm = (): boolean => {
	const newRoadMapErrors: RoadMapError = {
	currentRole : "",
	targetRole : "",
	}

 if (roadmapData.currentRole.trim() === "") {
    newRoadMapErrors.currentRole = "Current role is required.";
  }

if (roadmapData.targetRole.trim() === "") {
    newRoadMapErrors.targetRole = "Target role is required.";
  }

 setRoadMapErrors(newRoadMapErrors)
	return Object.values(newRoadMapErrors).every(error => error === "")
	}

	const handleCareerRoadMap = async(event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

	//required fields checking
	const isValid: boolean = validateForm();
	if(!isValid){
		return;
	}

	setRoadMapLoading(true)

	const roadMapDataToSend: RoadMap = {

	currentRole : roadmapData.currentRole.trim(),
	targetRole : roadmapData.targetRole.trim(),
	experience : roadmapData.experience.trim(),
	timeline : roadmapData.timeline.trim(),
	currentSkills : roadmapData.currentSkills.trim()

	}

	try {

		const response  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/generate/roadmap`,roadMapDataToSend,{
		withCredentials: true,
    timeout: 120000,
		})
  
		setGeneratedCareerRoadmap(response.data.roadmap)
		
	} catch (error) {
		console.error(error);

	} finally {

    setRoadMapLoading(false)

	}

	}

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
				<form onSubmit={ handleCareerRoadMap }>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Current Role */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Current Role
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
						 value={roadmapData.currentRole}
						 onChange={(e) => handleOnChange("currentRole",e.target.value)}
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

						{ roadMapErrors.currentRole && (
							<p className="mt-2 text-sm text-red-400">
							{roadMapErrors.currentRole}
							</p>
						)}

          </div>

          {/* Target Role */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Target Role
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
							value={roadmapData.targetRole}
						  onChange={(e) => handleOnChange("targetRole",e.target.value)}
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

						{ roadMapErrors.targetRole && (
							<p className="mt-2 text-sm text-red-400">
							{roadMapErrors.targetRole}
							</p>
						)}

          </div>

          {/* Experience */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Experience
            </label>

            <select
						  value={roadmapData.experience}
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
              <option value="0-1">0 - 1 Years</option>
              <option value="2-4">2 - 4 Years</option>
              <option value="5+">5+ Years</option>
            </select>

          </div>

          {/* Timeline */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Goal Timeline
            </label>

            <select
						  value={roadmapData.timeline}
						  onChange={(e) => handleOnChange("timeline",e.target.value)}
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
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
              <option value="2 years">2 Years</option>
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
						 value={roadmapData.currentSkills}
						 onChange={(e) => handleOnChange("currentSkills",e.target.value)}
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

          <MapPinned size={18} />

          { roadMapLoading ? "Generating..." : "Generate Career Roadmap" }

        </button>
				</form>

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

  {roadMapLoading ? (

    /* ==========================
       Loading State
    ========================== */

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
        Building your AI Career Roadmap...
      </h3>

      <p className="mt-3 text-center text-zinc-400">
        CareerPilot AI is analyzing your profile,
        identifying skill gaps and generating
        a personalized learning roadmap.
      </p>

      <div className="mt-12 space-y-6">

        {[1,2,3,4,5].map((phase)=>(
          <div
            key={phase}
            className="
              animate-pulse
              rounded-2xl
              border
              border-white/10
              bg-[#171717]
              p-6
            "
          >

            <div className="h-6 w-44 rounded bg-zinc-700" />

            <div className="mt-5 h-4 w-full rounded bg-zinc-700" />

            <div className="mt-3 h-4 w-5/6 rounded bg-zinc-700" />

            <div className="mt-6 flex flex-wrap gap-3">

              <div className="h-8 w-24 rounded-full bg-zinc-700" />

              <div className="h-8 w-28 rounded-full bg-zinc-700" />

              <div className="h-8 w-20 rounded-full bg-zinc-700" />

            </div>

          </div>
        ))}

      </div>

    </div>

  ) : !hasRoadmap ? (

    /* ==========================
       Initial State
    ========================== */

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
        Generate a personalized roadmap to receive
        AI-powered learning milestones, technologies,
        projects and certifications tailored to
        your career goals.
      </p>

    </div>

  ) : (

    /* ==========================
       Generated State
    ========================== */

    <div className="space-y-8">

      <div
        className="
          rounded-2xl
          border
          border-violet-500/20
          bg-violet-500/10
          p-6
        "
      >

        <h3 className="text-xl font-semibold text-white">
          Career Summary
        </h3>

        <p className="mt-3 leading-7 text-zinc-300">
          {generatedCareerRoadmap.summary}
        </p>

      </div>

      <div className="space-y-8">

        {generatedCareerRoadmap.roadmap.map((phase)=>(
          <div
            key={phase.phaseNumber}
            className="
              rounded-2xl
              border
              border-white/10
              bg-[#171717]
              p-6
            "
          >

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-semibold text-white">
                Phase {phase.phaseNumber} • {phase.phaseTitle}
              </h3>

              <span
                className="
                  rounded-full
                  bg-violet-500/10
                  px-4
                  py-2
                  text-sm
                  text-violet-300
                "
              >
                {phase.duration}
              </span>

            </div>

            <p className="mt-5 leading-7 text-zinc-400">
              {phase.description}
            </p>

            {/* Technologies */}

            <div className="mt-8">

              <h4 className="mb-3 font-medium text-white">
                Technologies
              </h4>

              <div className="flex flex-wrap gap-3">

                {phase.technologies.map((tech:string)=>(
                  <span
                    key={tech}
                    className="
                      rounded-full
                      bg-violet-500/10
                      px-3
                      py-1
                      text-sm
                      text-violet-300
                    "
                  >
                    {tech}
                  </span>
                ))}

              </div>

            </div>

            {/* Projects */}

            <div className="mt-8">

              <h4 className="mb-3 font-medium text-white">
                Projects
              </h4>

              <ul className="list-disc space-y-2 pl-6 text-zinc-400">

                {phase.projects.map((project:string)=>(
                  <li key={project}>
                    {project}
                  </li>
                ))}

              </ul>

            </div>

            {/* Certifications */}

            {phase.certifications.length > 0 && (

              <div className="mt-8">

                <h4 className="mb-3 font-medium text-white">
                  Certifications
                </h4>

                <ul className="list-disc space-y-2 pl-6 text-zinc-400">

                  {phase.certifications.map((cert:string)=>(
                    <li key={cert}>
                      {cert}
                    </li>
                  ))}

                </ul>

              </div>

            )}

          </div>
        ))}

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

          <li>• Be specific about your target role.</li>

          <li>• Include your current skills honestly.</li>

          <li>• Set realistic learning timelines.</li>

          <li>• Follow projects and milestones consistently.</li>

        </ul>

      </section>

    </div>
  );
}