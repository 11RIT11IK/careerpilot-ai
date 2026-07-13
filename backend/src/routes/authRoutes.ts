import express, { Router } from "express";
import { handleRegisterUser } from "../controllers/authController";
import { validateRegisterRequest } from "../middlewares/validateRegisterRequest";
const router: Router = express.Router();

// Register User
router.post("/register",validateRegisterRequest, handleRegisterUser);

export default router;