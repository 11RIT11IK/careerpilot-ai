import { ai } from "./gemini";

// jobSearch.service.ts

export interface RoadmapSearchInput {
  currentRole: string,
	targetRole: string,
	experience: string,
  currentSkills? : string,
	timeline: string
}

export async function generateRoadMapUsingAi(careerRoadmapData: RoadmapSearchInput): Promise<any> {
		const {
    currentRole,
    targetRole,
    experience,
    currentSkills,
		timeline
  } = careerRoadmapData;

const prompt = `
You are CareerPilot AI, an expert Software Engineering Career Coach, Technical Mentor and Hiring Consultant.

Your responsibility is to create a realistic, practical and personalized career roadmap that helps the candidate achieve their target role.

Candidate Profile

Current Role:
${currentRole}

Target Role:
${targetRole}

Experience:
${experience}

Current Skills:
${currentSkills || "Not specified"}

Target Timeline:
${timeline}

Instructions

- Analyze the candidate's profile carefully.
- Identify the most important skill gaps.
- Create a realistic roadmap to achieve the target role.
- The roadmap MUST contain EXACTLY 5 phases.
- Each phase should naturally build upon the previous phase.
- Keep the learning order logical.
- Recommend only technologies that are relevant to the target role.
- Recommend practical portfolio projects for each phase.
- Recommend certifications ONLY if they genuinely add value.
- Keep the roadmap achievable within the selected timeline.
- Write concise but meaningful descriptions.

Return ONLY valid JSON.

The JSON format MUST be exactly:

{
  "summary": "",
  "roadmap": [
    {
      "phaseNumber": 1,
      "phaseTitle": "",
      "duration": "",
      "description": "",
      "technologies": [],
      "projects": [],
      "certifications": []
    }
  ]
}

Requirements for each field:

summary:
A short 2-4 sentence overview describing how this roadmap will help the candidate reach the target role.

phaseNumber:
Sequential number from 1 to 5.

phaseTitle:
A short professional title for the phase.

duration:
Estimated duration for completing the phase.

description:
Brief explanation of what should be learned during this phase.

technologies:
Array of technologies, frameworks, tools or platforms to learn.

projects:
Array of practical portfolio project ideas.

certifications:
Array of relevant certifications.
If no certification is recommended, return an empty array [].

Do NOT include markdown.

Do NOT include explanations outside JSON.

Return ONLY valid JSON.
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

  const roadmap = JSON.parse(response.text);

  return roadmap;
}