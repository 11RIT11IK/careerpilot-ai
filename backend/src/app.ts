//this is our express server main set up
import dotenv from "dotenv"
import express, { Application } from "express";
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes'
import { authRateLimitter } from "./middlewares/authRateLimitter";

const app: Application = express(); //creating our backend express server

dotenv.config()

//middlwares
app.use(helmet());
app.use(cors({
	origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(authRateLimitter);
app.use(express.json());

//define routes
app.use('/auth',authRoutes)

export default app;
