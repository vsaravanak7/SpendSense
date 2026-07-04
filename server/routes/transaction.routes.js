import express from "express";
import isAuthenticated from "../middleware/auth.middleware.js";

import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from "../controllers/transaction.controller.js";

const router = express.Router();

// Protect every transaction route
router.use(isAuthenticated);
// Create
router.post("/", createTransaction);
// Get All
router.get("/", getTransactions);
// Get One
router.get("/:id", getTransactionById);
// Update
router.put("/:id", updateTransaction);
// Delete
router.delete("/:id", deleteTransaction);

export default router;