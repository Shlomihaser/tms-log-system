import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import logRoutes from "./routes/log.route.js";
import connectDB from './lib/db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/logs",logRoutes);

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
   connectDB();
});