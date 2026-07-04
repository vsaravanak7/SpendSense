import express from "express";
import isAuthenticated from "../middleware/auth.middleware.js";
import { getDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();
router.use(isAuthenticated);
router.get("/", getDashboard);

export default router;