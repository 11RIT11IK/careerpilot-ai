import { ai } from "./gemini";

// jobSearch.service.ts

export interface InterviewGenerateInput {
	jobTitle: string;
	company?: string;
	experience: string;
	interviewType: string;
	focusAreas?: string;
	userId: number

}

export async function generateInterviewUsingAi(
	interviewDataFromUser: InterviewGenerateInput
): Promise<any> {

	 const {
		jobTitle,
		company,
		experience,
		interviewType,
		focusAreas,
	} = interviewDataFromUser;

const prompt = `
You are CareerPilot AI, an expert software engineering interviewer with extensive experience conducting interviews for top technology companies such as Google, Microsoft, Amazon, Meta and other leading organizations.

Your task is to generate a personalized interview session based on the candidate's profile.

Candidate Profile

Job Title:
${jobTitle}

Target Company:
${company || "Not specified"}

Experience Level:
${experience}

Interview Type:
${interviewType}

Focus Areas:
${focusAreas || "General software engineering concepts"}

Instructions

Generate exactly 8 interview questions.

The interview should simulate a real interview experience.

The questions must:
- Be highly relevant to the candidate's target role.
- Match the candidate's experience level.
- Match the selected interview type.
- Cover the specified focus areas whenever provided.
- Progress naturally from easier questions to more challenging ones.
- Avoid duplicate or repetitive questions.
- Be practical and realistic rather than purely theoretical.
- If a company is provided, slightly adapt the interview style to resemble that company's interview process without mentioning the company in every question.

For every question include:

- question
- category
- difficulty
- expectedTopics
- referenceAnswer

The referenceAnswer should:
- Be concise and professional.
- Represent what a strong candidate is expected to explain.
- Not be excessively long.
- Cover only the important points.

Return ONLY valid JSON.

Do NOT include:
- Markdown
- Code fences
- Explanations
- Additional text before or after the JSON

The JSON format must be exactly:

{
  "title": "",
  "estimatedDuration": "",
  "questions": [
    {
      "question": "",
      "category": "",
      "difficulty": "",
      "expectedTopics": [],
      "referenceAnswer": ""
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

	const generatedInterview = JSON.parse(response.text);

  return generatedInterview;

	

}