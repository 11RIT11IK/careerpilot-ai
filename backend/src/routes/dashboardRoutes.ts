import express, { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { handleSearchJobs } from "../controllers/dashboardController";
const router: Router = express.Router();

//search jobs
router.post("/search/jobs",verifyToken,handleSearchJobs)

export default router;