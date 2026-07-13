//this is our express server main set up

import express, { Application } from "express";
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes'

const app: Application = express(); //creating our backend express server

//middlwares
app.use(cors());
app.use(helmet());
app.use(express.json());

//define routes
app.use('/auth',authRoutes)

export default app;
