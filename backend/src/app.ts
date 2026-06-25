//this is our express server main set up

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express(); //creating our backend express server

//middlwares
app.use(cors());
app.use(helmet());
app.use(express.json());

export default app;
