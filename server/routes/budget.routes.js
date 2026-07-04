import express from "express";

import isAuthenticated from "../middleware/auth.middleware.js";

import {
  createOrUpdateBudget,
  getBudget,
  deleteBudget,
} from "../controllers/budget.controller.js";

const router = express.Router();

router.use(isAuthenticated);
router.post("/", createOrUpdateBudget);
router.get("/", getBudget);
router.delete("/", deleteBudget);

export default router;