import express, { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { handleGenerateInterview, handleSearchJobs } from "../controllers/dashboardController";
const router: Router = express.Router();

//search jobs
router.post("/search/jobs",verifyToken,handleSearchJobs)
router.post("/generate/interview",verifyToken,handleGenerateInterview)


export default router;