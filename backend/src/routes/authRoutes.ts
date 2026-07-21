import express, { Router } from "express";
import { fetchLoggedUserData, handleLoginUser, handleRegisterUser } from "../controllers/authController";
import { validateRegisterRequest } from "../middlewares/validateRegisterRequest";
import { validateLoginRequest } from "../middlewares/validateLoginRequest";
import { verifyToken } from "../middlewares/verifyToken";
import { authRateLimitter } from "../middlewares/authRateLimitter";
const router: Router = express.Router();

// Register User
router.post("/register",authRateLimitter,validateRegisterRequest, handleRegisterUser);
router.post("/login",authRateLimitter,validateLoginRequest,handleLoginUser);
router.get("/me",verifyToken,fetchLoggedUserData)

export default router;