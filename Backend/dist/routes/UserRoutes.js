import express from "express";
import { VerifyAuth } from "../middleware/authMiddleware";
import { Home } from "../controllers/homeController/homeController";
import { ProfileUpdate } from "../controllers/homeController/profileController";
const router = express.Router();
router.post("/profile", VerifyAuth, ProfileUpdate);
router.get('/fetch-data', VerifyAuth, Home);
router.get('/', VerifyAuth, Home);
export default router;
