import express, { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { handleGenerateCareerRoadMap, handleGenerateInterview, handleOptimizeResume, handleSearchJobs } from "../controllers/dashboardController";
import { uploadResume } from "../middlewares/uploadResume";
import { validateResumeFile } from "../middlewares/validateResumeFile";
const router: Router = express.Router();

//search jobs
router.post("/search/jobs",verifyToken,handleSearchJobs)
router.post("/generate/interview",verifyToken,handleGenerateInterview)
router.post("/generate/roadmap",verifyToken,handleGenerateCareerRoadMap)
router.post(
"/optimize/resume",
verifyToken,
uploadResume.single("resume"),
validateResumeFile,
handleOptimizeResume
);


export default router;