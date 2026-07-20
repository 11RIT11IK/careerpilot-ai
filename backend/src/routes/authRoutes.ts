import express, { Router } from "express";
import { handleLoginUser, handleRegisterUser } from "../controllers/authController";
import { validateRegisterRequest } from "../middlewares/validateRegisterRequest";
import { validateLoginRequest } from "../middlewares/validateLoginRequest";
const router: Router = express.Router();

// Register User
router.post("/register",validateRegisterRequest, handleRegisterUser);
router.post("/login",validateLoginRequest,handleLoginUser);


export default router;