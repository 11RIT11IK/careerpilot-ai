"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function SearchJobs() {

interface SearchCard {
	jobTitle : string,
	location : string,
	experience : string,
	idealJobDesc : string
}

interface SearchCardErrors {
  jobTitle: string;
  location: string;
}

interface RecommendedJob {
  jobTitle: string;
  company: string;
  location: string;
  employmentType: string;
  experience: string;
  salary: string;
  skills: string[];
  reason: string;
}

	const [ searchCardData, setSearchCardData ] = useState<SearchCard>({
  jobTitle : "",
	location : "",
	experience : "Any",
	idealJobDesc : ""
	})

	const [ searchCardErrors, setSearchCardErrors ] = useState<SearchCardErrors>({
  jobTitle : "",
	location : ""
	})

	const [ searchLoading, setSearchLoading ] = useState(false)
	const [recommendedJobs, setRecommendedJobs] = useState<RecommendedJob[]>([]);

const validateForm = (): boolean => {
	const newSearchCardErrors: SearchCardErrors = {
		jobTitle: "",
		location: ""
	}

 if (searchCardData.jobTitle.trim() === "") {
    newSearchCardErrors.jobTitle = "Job title is required.";
  }

  if (searchCardData.location.trim() === "") {
    newSearchCardErrors.location = "Location is required.";
  }


	setSearchCardErrors(newSearchCardErrors)
	return Object.values(newSearchCardErrors).every(error => error === "")
}

const handleOnChange = (elementName: keyof SearchCard, value: string) => {
		setSearchCardData(prev => ({
			...prev,
			[elementName] : value
		}))

		setSearchCardErrors(prev => ({
			...prev,
			[elementName] : ""
		}))

}

const handleSearchJobs = async(event: React.FormEvent<HTMLFormElement>) => {
	console.log('button clicked');
	event.preventDefault();

	//required fields checking
	const isValid: boolean = validateForm();
	if(!isValid){
		return;
	}
	
	const searchJobsData : SearchCard = {
		jobTitle : searchCardData.jobTitle.trim(),
		location : searchCardData.location.trim(),
		experience : searchCardData.experience.trim(),
		idealJobDesc : searchCardData.idealJobDesc.trim()
	}

	console.log('searchJobsData',searchJobsData);
	

	setSearchLoading(true)

	try {

	const response  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/search/jobs`,searchJobsData,{
		withCredentials: true,
    timeout: 10000,
		})

	setRecommendedJobs(response.data.jobs);

	} catch (error) {
		console.error('something went wrong,Please try again later')
		
	} finally {
    setSearchLoading(false)

	}


}

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-14">

      {/* Header */}

      <section className="mb-20">

        <h1 className="text-4xl font-bold text-white">
          AI Job Search
        </h1>

        <p className="mt-3 max-w-3xl text-zinc-400">
          Let CareerPilot AI discover jobs that match your skills,
          experience and career goals.
        </p>

      </section>

      {/* Search Card */}

      <section
        className="
        rounded-3xl
        border
        border-white/10
        bg-[#202020]
        p-8
        "
      >
				<form onSubmit={handleSearchJobs}>

        <div className="grid gap-6 md:grid-cols-3">

          {/* Job */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Job Title   <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
							value={searchCardData.jobTitle}
							onChange={(e) => handleOnChange("jobTitle",e.target.value)}
              placeholder="Frontend Developer"
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
						{ searchCardErrors.jobTitle && (
							<p className="mt-2 text-sm text-red-400">
							{searchCardErrors.jobTitle}
							</p>
						)}

          </div>

          {/* Location */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Location <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
							value={searchCardData.location}
							onChange={(e) => handleOnChange("location",e.target.value)}
              placeholder="Remote / Bangalore"
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

						{ searchCardErrors.location && (
							<p className="mt-2 text-sm text-red-400">
							{searchCardErrors.location}
							</p>
						)}

          </div>

          {/* Experience */}

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Experience
            </label>

            <select
						 value={searchCardData.experience}
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
              <option value="Any">Any</option>
              <option value="0-1">0 - 1 Years</option>
              <option value="2-4">2 - 4 Years</option>
              <option value="5+">5+ Years</option>
            </select>

          </div>

        </div>

        {/* AI Prompt */}

        <div className="mt-8">

          <label className="mb-2 block text-sm text-zinc-300">
            Describe your ideal job (Optional)
          </label>

          <textarea
            rows={5}
						value={searchCardData.idealJobDesc}
						onChange={(e) => handleOnChange("idealJobDesc",e.target.value)}
            placeholder="Example:
            I am looking for a remote Node.js Backend Developer role using Express, Prisma, PostgreSQL and AWS. Salary above 10 LPA."
            className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-[#171717]
            px-4
            py-4
            text-white
            outline-none
            resize-none
            focus:border-violet-500
            "
          />

        </div>

        {/* Button */}

        <button
				 disabled={ searchLoading }
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
          <Search size={18} />

				{searchLoading ? "Searching..." : "Search Jobs"}

        </button>

				</form>

      </section>

			{/* Recommended jobs */}

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
    Recommended Jobs
  </h2>

  {searchLoading ? (

	<div className="flex flex-col items-center py-20">

  <div className="mb-8 h-16 w-16 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />

  <h3 className="text-2xl font-semibold text-white">
    CareerPilot AI is searching...
  </h3>

  <p className="mt-4 text-zinc-400">
    Analyzing your request and finding the best opportunities.
  </p>

  <div className="mt-10 w-full max-w-lg space-y-4">

    <div className="h-4 animate-pulse rounded bg-zinc-700" />

    <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-700" />

    <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-700" />

  </div>

</div>

	) : recommendedJobs.length === 0 ? (
    
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
      text-5xl
    "
  >
    🤖
  </div>

  <h3 className="text-2xl font-semibold text-white">
    Discover AI-Powered Job Matches
  </h3>

  <p className="mt-4 max-w-xl leading-7 text-zinc-400">
    Enter your preferred role, location and experience above.
    CareerPilot AI will analyze your profile and recommend the
    most relevant job opportunities.
  </p>

  <p className="mt-3 text-sm text-zinc-500">
    Your personalized recommendations will appear here.
  </p>

</div>

	) : (

		 <div className="grid gap-6">

      {recommendedJobs.map((job, index) => (

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
          <h3 className="text-xl font-semibold text-white">
            {job.jobTitle}
          </h3>

          <p className="mt-2 text-zinc-400">
            {job.company}
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            📍 {job.location}
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            💼 {job.employmentType}
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            🧑‍💻 {job.experience}
          </p>

          <p className="mt-2 text-green-400">
            💰 {job.salary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  bg-violet-500/10
                  px-3
                  py-1
                  text-xs
                  text-violet-300
                "
              >
                {skill}
              </span>
            ))}
          </div>

          <p className="mt-5 text-zinc-400">
            {job.reason}
          </p>

        </div>

      ))}

    </div>

  )
  }

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

          <li>• Mention your preferred tech stack.</li>

          <li>• Mention Remote, Hybrid or Onsite.</li>

          <li>• Mention expected salary.</li>

          <li>• Mention companies or industries you prefer.</li>

        </ul>

      </section>



    </div>
  );
}