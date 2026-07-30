import { ai } from "./gemini";

// jobSearch.service.ts

export interface JobSearchInput {
  jobTitle: string;
  location: string;
  experience: string;
  idealJobDesc?: string;
}

export async function searchJobsUsingAI(
  searchData: JobSearchInput
): Promise<any> {

	 const {
    jobTitle,
    location,
    experience,
    idealJobDesc,
  } = searchData;

const prompt = `
You are CareerPilot AI, an expert career assistant.

Recommend the most relevant jobs based on the following profile.

Job Title:
${jobTitle}

Preferred Location:
${location}

Experience:
${experience}

Additional Requirements:
${idealJobDesc || "None"}

Return ONLY valid JSON.

The JSON format must be:

{
  "jobs": [
    {
      "jobTitle": "",
      "company": "",
      "location": "",
      "employmentType": "",
      "experience": "",
      "salary": "",
      "skills": [],
      "reason": ""
    }
  ]
}
`;

 const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

	 if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  const jobs = JSON.parse(response.text);

  return jobs;

}