import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import logRoutes from "./features/logs/routes/log.route.js";
import authRoutes from "./features/authentication/routes/auth.route.js";
import connectDB from './lib/db/db.js';
import { loadData } from './lib/utils/excel.js';
import { register } from './features/authentication/controllers/auth.controller.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/logs",logRoutes);
app.use("/api/auth",authRoutes);


app.listen(PORT, async () => {
   console.log(`Server running on port ${PORT}`);
   connectDB();
});