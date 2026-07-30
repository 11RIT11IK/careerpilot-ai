import { ai } from "./gemini";

// jobSearch.service.ts

export interface ResumeOptimizeInput {
targetJobRole: string,
experience: string,
resumeContent: string
}

export async function optimizeResumeUsingAi(resumeDataForAi: ResumeOptimizeInput): Promise<any> {
		const {
		targetJobRole,
		experience,
		resumeContent
	} = resumeDataForAi;

	const prompt = `
	You are CareerPilot AI,
	an expert Resume Reviewer, ATS Optimizer,
	and Senior Technical Recruiter.

	Your task is to analyze the candidate's resume
	and provide detailed, actionable feedback
	for improving their chances of getting shortlisted.

	Target Job Role

	${targetJobRole}

	Experience Level

	${experience}

	Resume

	${resumeContent}

	Instructions

	Carefully analyze the resume.

	Do NOT invent experience,
	projects,
	certifications,
	or skills that do not already exist.

	Only recommend improvements.

	Evaluate the resume exactly as a recruiter would.

	Provide:

	1. Overall ATS Score (0-100)

	2. Overall Resume Rating (0-10)

	3. Short Resume Summary

	4. Strengths

	5. Weaknesses

	6. Missing Technical Skills

	7. Missing Soft Skills

	8. Missing Keywords for ATS

	9. Improvements for Professional Summary

	10. Improvements for Work Experience

	11. Improvements for Projects

	12. Improvements for Skills Section

	13. Improvements for Education Section

	14. Recommended Certifications

	15. Recommended Portfolio Projects

	16. Final Recruiter Feedback

	Feedback Rules

	- Be honest.

	- Be constructive.

	- Keep every recommendation specific.

	- Explain WHY each improvement matters.

	- Prioritize improvements that increase ATS ranking.

	- If the resume is already strong,
	only suggest minor improvements.

	Return ONLY valid JSON.

	{
		"atsScore": 0,
		"resumeRating": 0,
		"summary": "",
		"strengths": [],
		"weaknesses": [],
		"missingTechnicalSkills": [],
		"missingSoftSkills": [],
		"missingKeywords": [],
		"professionalSummarySuggestions": [],
		"experienceSuggestions": [],
		"projectSuggestions": [],
		"skillSuggestions": [],
		"educationSuggestions": [],
		"recommendedCertifications": [],
		"recommendedProjects": [],
		"finalFeedback": ""
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

	const optimizedOne = JSON.parse(response.text);

	return optimizedOne;
}