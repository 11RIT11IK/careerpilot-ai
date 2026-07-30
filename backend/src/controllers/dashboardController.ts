import "dotenv/config";
import { Request, Response } from 'express';
import expressAsyncHandler from "express-async-handler";
import { success } from "zod";
import prisma from "../config/database";
import { searchJobsUsingAI } from "../services/AI/jobSearch.service";
import { generateInterviewUsingAi } from "../services/AI/interview.service";
import { generateRoadMapUsingAi } from "../services/AI/roadmap.service";
import { uploadResumeToCloudinary } from "../services/cloudinary/resumeUploadService";
import { extractResumeContent } from "../services/resume/resumeContentExtractor";
import { optimizeResumeUsingAi } from "../services/AI/resume.service";

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

export const handleGenerateCareerRoadMap = expressAsyncHandler(async(req: Request, res: Response): Promise<void> => {

  const { currentRole, targetRole, experience, timeline, currentSkills = null } = req.body
	const userId = res.locals.user.userId

	try {

		if(!currentRole || !targetRole){
			res.status(400).json({success:false,message:"Bad request! currentRole and targetRole is required."})
			return;
		}

		const careerRoadMapHistory = await prisma.careerRoadmap.create({
			data:{

				currentRole,
				targetRole,
				experience,
				currentSkills,
				timeline,
				userId

			}
		})

		const careerRoadmapData = {
		currentRole,
		targetRole,
		experience,
		currentSkills,
		timeline
		}

		const roadMapresultFromAi = await generateRoadMapUsingAi(careerRoadmapData);

	interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  duration: string;
  description: string;
  technologies: string[];
  projects: string[];
  certifications: string[];
}

	const roadmapResponseFromAi = await prisma.careerRoadmapStep.createMany({
		data: roadMapresultFromAi.roadmap.map((phase: RoadmapPhase) => ({
    phaseNumber: phase.phaseNumber,
    phaseTitle: phase.phaseTitle,
    duration: phase.duration,
    description: phase.description,
    technologies: phase.technologies,
    projects: phase.projects,
    certifications: phase.certifications,
    roadmapId: careerRoadMapHistory.id,
  })),
	})

	res.status(200).json({
		success: true,
		roadmap: roadMapresultFromAi,
	});

	return;

} catch (error) {
	
 res.status(500).json({success:false,message:'Something went wrong,Please try again later.'})
 return;

	}
})

export const handleOptimizeResume = expressAsyncHandler(async(req: Request, res: Response): Promise<void> => {
	const { targetJobRole, experience } = req.body
	const resume  = req.file
	const userId = res.locals.user.userId;
	let resumeRequestsStore;



	try {

		if(!targetJobRole || !experience || !resume){
    res.status(400).json({success:false,message:"Bad request! targetJobRole,experience and resume is required."})
		return;
		}

	//first thing we do is store user given resume to cloudinary right 
	// Upload resume to Cloudinary

    const uploadedResume = await uploadResumeToCloudinary(resume);

	 resumeRequestsStore = await prisma.resumeRequest.create({
		data: {
			targetJobRole,
			experience,
      resumeUrl: uploadedResume.secureUrl,
			resumePublicId: uploadedResume.publicId,
			originalFileName: uploadedResume.originalFileName,
			fileType: uploadedResume.fileType,
			fileSize: uploadedResume.fileSize,
      status: "Processing",
      userId,
		},
		});

		//now we need to pass targetJobRole,experience and extracted text from resume right to optimize reume to ai service pass as an argument
		const extractedResumeText = await extractResumeContent(resume);

	const resumeDataForAi = {
  targetJobRole,
  experience,
  resumeContent: extractedResumeText,
	};

	const aiResponse = await optimizeResumeUsingAi(
	resumeDataForAi
	);

	

	//we need to store its ai response right
   await prisma.resumeRequest.update({
        where: {
          id: resumeRequestsStore.id,
        },
        data: {
          aiResponse,
          status: "Completed",
        },
    });

 res.status(200).json({
 success: true,
 resumeOptimization: aiResponse,
 });

   return;
		
	} catch (error) {

		 if (resumeRequestsStore) {
        await prisma.resumeRequest.update({
          where: {
            id: resumeRequestsStore.id,
          },
          data: {
            status: "Failed",
          },
        });
      }
		
		 res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });

      return;
	}
})