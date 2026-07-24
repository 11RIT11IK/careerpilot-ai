import "dotenv/config";
import { Request, Response } from 'express';
import expressAsyncHandler from "express-async-handler";
import { success } from "zod";
import prisma from "../config/database";
import { searchJobsUsingAI } from "../services/AI/jobSearch.service";
import { generateInterviewUsingAi } from "../services/AI/interview.service";

export const handleSearchJobs = expressAsyncHandler(async(req: Request, res: Response): Promise<void> => {

const { jobTitle, location, experience, idealJobDesc = null } = req.body
const userId = res.locals.user.userId; //from jwt token 

try {

	if (!jobTitle || !location || !experience) {
        res.status(400).json({
          success: false,
          message: "Job title, location and experience are required.",
        });
        return;
      }


	//insert job searches history
	const historyOfJobSearch = await prisma.jobSearch.create({
		data: {
    jobTitle,
    location,
    experience,
    idealJobDesc,
    userId,
  },
	})

const searchData = {
  jobTitle,
  location,
  experience,
  idealJobDesc,
};

const resultFromAi = await searchJobsUsingAI(searchData);
console.log('resultFromAi',resultFromAi);

res.status(200).json({
  success: true,
  jobs: resultFromAi.jobs,
});

return;

} catch (error) {

 res.status(500).json({success:false,message:'Something went wrong,Please try again later.'})
 return;
}
})

export const handleGenerateInterview = expressAsyncHandler(async(req: Request, res: Response): Promise<void> => {
console.log('data',req.body);

const { jobTitle, company = null, experience, interviewType, focusAreas = null } = req.body
const userId = res.locals.user.userId;

try {

	if(!jobTitle || !experience || !interviewType){
	res.status(400).json({success:false,message:"Job title, experience, interview type and difficulty are required."})
	return;
	}

	const interviewSession = await prisma.interviewSession.create({
		data: {
    jobTitle,
    company,
    experience,
    interviewType,
    focusAreas,
    userId,
  },
	})

	const interviewDataFromUser = {
  jobTitle,
  company,
  experience,
  interviewType,
	focusAreas,
	userId
};

interface InterviewQuestionAI {
  question: string;
  category: string;
  difficulty: string;
  expectedTopics: string[];
  referenceAnswer: string;
}

const interviewresultFromAi = await generateInterviewUsingAi(interviewDataFromUser);
console.log('interviewresultFromAi',interviewresultFromAi);

//in between we need to store ai response in our table right called 
const generatedQuestions = await prisma.interviewQuestion.createMany({
	  data: interviewresultFromAi.questions.map((question : InterviewQuestionAI) => ({
    question: question.question,
    category: question.category,
		sessionId: interviewSession.id,
    difficulty: question.difficulty,
    expectedTopics: question.expectedTopics,
    referenceAnswer: question.referenceAnswer,
  })),
})

res.status(200).json({
  success: true,
  interview: interviewresultFromAi,
});

return;

} catch (error) {
	
 res.status(500).json({success:false,message:'Something went wrong,Please try again later.'})
 return;

}
})