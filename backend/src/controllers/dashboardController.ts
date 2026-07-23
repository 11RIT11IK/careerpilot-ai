import "dotenv/config";
import { Request, Response } from 'express';
import expressAsyncHandler from "express-async-handler";
import { success } from "zod";
import prisma from "../config/database";
import { searchJobsUsingAI } from "../services/AI/jobSearch.service";

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