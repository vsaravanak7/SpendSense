import * as transactionService from "../services/transaction.service.js";

// Create
export const createTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(
      req.body,
      req.user._id
    );

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All
export const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions(
      req.user._id
    );

    res.json({
      success: true,
      transactions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get One
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(
      req.params.id,
      req.user._id
    );

    res.json({
      success: true,
      transaction,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// Update
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.updateTransaction(
      req.params.id,
      req.user._id,
      req.body
    );

    res.json({
      success: true,
      transaction,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete
export const deleteTransaction = async (req, res) => {
  try {
    await transactionService.deleteTransaction(
      req.params.id,
      req.user._id
    );

    res.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};