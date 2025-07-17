import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/database.js';
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from './routes/UserRoutes.js';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
connectDB();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthRoutes);
app.use(UserRoutes);
app.use("/admin", adminRoutes);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
