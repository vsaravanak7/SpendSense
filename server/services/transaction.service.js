import Transaction from "../models/Transaction.js";

// Create Transaction
export const createTransaction = async (data, userId) => {
  const transaction = await Transaction.create({
    ...data,
    user: userId,
  });

  return transaction;
};

// Get All Transactions
export const getTransactions = async (userId) => {
  return await Transaction.find({ user: userId }).sort({
    transactionDate: -1,
  });
};

// Get One Transaction
export const getTransactionById = async (id, userId) => {
  const transaction = await Transaction.findOne({
    _id: id,
    user: userId,
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};

// Update Transaction
export const updateTransaction = async (id, userId, data) => {
  const transaction = await Transaction.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};

// Delete Transaction
export const deleteTransaction = async (id, userId) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};