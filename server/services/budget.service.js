import Budget from "../models/Budget.js";

// Create or Update Budget
export const createOrUpdateBudget = async (
  userId,
  month,
  year,
  budgetLimit,
  warningPercentage = 80
) => {
  let budget = await Budget.findOne({
    user: userId,
    month,
    year,
  });

  if (budget) {
    budget.budgetLimit = budgetLimit;
    budget.warningPercentage = warningPercentage;

    await budget.save();

    return budget;
  }

  budget = await Budget.create({
    user: userId,
    month,
    year,
    budgetLimit,
    warningPercentage,
  });

  return budget;
};

// Get Current Budget
export const getBudget = async (userId, month, year) => {
  const budget = await Budget.findOne({
    user: userId,
    month,
    year,
  });

  return budget;
};

// Delete Budget
export const deleteBudget = async (userId, month, year) => {
  return await Budget.findOneAndDelete({
    user: userId,
    month,
    year,
  });
};