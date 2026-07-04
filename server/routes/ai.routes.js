import express from "express";
import isAuthenticated from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
    addExpenseUsingAI,
    addExpenseFromReceipt
} from "../controllers/ai.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/add-expense", addExpenseUsingAI);

router.post(
    "/receipt",
    upload.single("receipt"),
    addExpenseFromReceipt
);

export default router;